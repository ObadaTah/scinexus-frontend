import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Textarea,
    Input,
    Typography,
    AspectRatio,
    SvgIcon,
    styled,
    IconButton,
    Select,
    Option,
    Snackbar,
    CircularProgress,
} from "@mui/joy";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./custom-slick.css"; // Import your custom CSS file
import { useAuth } from "../../contexts/AuthContext";

const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;

function NewArticleWidget({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [visibility, setVisibility] = useState("PUBLIC");
    const { jwtToken } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBriefChange = (e) => {
        setBrief(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFilePreview(URL.createObjectURL(file));
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFilePreview(null);
    };

    async function mediaing(file) {
        const formData = new FormData();
        formData.append("files", file);

        const response = await fetch("http://localhost:8080/medias", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to upload media");
        }

        return response.json();
    }

    const handleSubmit = async () => {
        if (title && brief && content) {
            setLoading(true); // Start loading spinner
            try {
                const mediaResponse = await mediaing(selectedFile);
                console.log(mediaResponse);
                const mediaId = mediaResponse._embedded.mediaList[0].id;

                const postData = {
                    title,
                    brief,
                    content,
                    visibility,
                };

                const postResponse = await fetch(
                    "http://localhost:8080/articles",
                    {
                        method: "POST",
                        body: JSON.stringify(postData),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );

                if (!postResponse.ok) {
                    throw new Error("Failed to create post");
                }

                const postResult = await postResponse.json();
                const postId = postResult.id;

                // Attach media to the post
                await fetch(`http://localhost:8080/journals/${postId}/media`, {
                    method: "POST",
                    body: JSON.stringify({ mediaIds: [mediaId] }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                console.log("Post created successfully");
                setOpen(true);
                setTitle("");
                setBrief("");
                setContent("");
                setSelectedFile(null);
                setFilePreview(null);
                setVisibility("PUBLIC");
            } catch (error) {
                console.error("Error creating post:", error);
            } finally {
                setLoading(false); // Stop loading spinner
            }
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomArrow />,
        prevArrow: <CustomArrow />,
    };

    return (
        <>
            <Card variant="outlined" fullWidth>
                <CardContent>
                    <Typography level="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        Create New Article
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <Input
                            variant="outlined"
                            placeholder="Article Title"
                            value={title}
                            onChange={handleTitleChange}
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                        <Input
                            variant="outlined"
                            placeholder="Brief Description"
                            value={brief}
                            onChange={handleBriefChange}
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                        <Textarea
                            variant="outlined"
                            placeholder="Article Body, Share your knowledge..."
                            value={content}
                            onChange={handleContentChange}
                            minRows={4}
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                        <Select
                            value={visibility}
                            onChange={(e, newValue) => setVisibility(newValue)}
                            fullWidth
                            sx={{ mb: 1 }}
                        >
                            <Option value="PUBLIC">Public</Option>
                            <Option value="PRIVATE">Private</Option>
                            <Option value="LINKS">Links</Option>
                        </Select>
                        <Button
                            fullWidth
                            component="label"
                            role={undefined}
                            tabIndex={-1}
                            variant="outlined"
                            color="neutral"
                            type="file"
                            accept="image/*,video/*"
                            startDecorator={
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                        />
                                    </svg>
                                </SvgIcon>
                            }
                        >
                            Upload Media
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Button>

                        {filePreview && (
                            <Box sx={{ m: 2 }}>
                                <Slider {...settings}>
                                    <Box sx={{ position: "relative" }}>
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                zIndex: 1,
                                                backgroundColor:
                                                    "rgba(0,0,0,0.5)",
                                                color: "white",
                                            }}
                                            onClick={handleRemoveFile}
                                        >
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="white"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </SvgIcon>
                                        </IconButton>
                                        <AspectRatio
                                            ratio="16/9"
                                            sx={{ mb: 1 }}
                                        >
                                            {selectedFile.type.startsWith(
                                                "video/"
                                            ) ? (
                                                <video
                                                    src={filePreview}
                                                    controls
                                                />
                                            ) : (
                                                <img
                                                    src={filePreview}
                                                    alt="Preview"
                                                />
                                            )}
                                        </AspectRatio>
                                    </Box>
                                </Slider>
                            </Box>
                        )}
                    </Box>
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={
                            !title.trim() ||
                            !brief.trim() ||
                            !content.trim() ||
                            loading
                        }
                        startDecorator={
                            loading ? <CircularProgress size="sm" /> : null
                        }
                    >
                        {loading ? "Posting..." : "Post"}
                    </Button>
                </CardContent>
            </Card>
            <Snackbar
                autoHideDuration={3000}
                open={open}
                variant={"solid"}
                color="success"
                onClose={() => {
                    setOpen(false);
                }}
            >
                Your Article Has Been Saved
            </Snackbar>
        </>
    );
}

// Custom Arrow component for the slider
const CustomArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", color: "darkblue" }}
            onClick={onClick}
        />
    );
};

export default NewArticleWidget;
