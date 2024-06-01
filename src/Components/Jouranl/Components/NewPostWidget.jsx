import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Textarea,
    Typography,
    AspectRatio,
    SvgIcon,
    styled,
    IconButton,
    Select,
    Option,
    Snackbar,
    CircularProgress,
    List,
    ListItem,
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

function NewPostWidget({ onSubmit }) {
    const [content, setContent] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const [visibility, setVisibility] = useState("PUBLIC");
    const { jwtToken } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

        const previews = files.map((file) => URL.createObjectURL(file));
        setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = [...selectedFiles];
        const newPreviews = [...filePreviews];

        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);

        setSelectedFiles(newFiles);
        setFilePreviews(newPreviews);
    };

    async function mediaing(files) {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

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
        if (content) {
            setLoading(true); // Start loading spinner
            try {
                var mediaIds = [];
                if (selectedFiles.length !== 0) {
                    const mediaResponse = await mediaing(selectedFiles);

                    mediaIds = mediaResponse._embedded.mediaList.map(
                        (media) => media.id
                    );
                }

                const postData = {
                    content,
                    visibility,
                };

                const postResponse = await fetch(
                    "http://localhost:8080/posts",
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
                if (selectedFiles.length !== 0) {
                    await fetch(
                        `http://localhost:8080/journals/${postId}/media`,
                        {
                            method: "POST",
                            body: JSON.stringify({ mediaIds: mediaIds }),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${jwtToken}`,
                            },
                        }
                    );
                    console.log(
                        "Post created successfully: " +
                            JSON.stringify({ mediaIds: mediaIds })
                    );
                }
                setOpen(true);
                setContent("");
                setSelectedFiles([]);
                setFilePreviews([]);
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
                        Create New Post
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <Textarea
                            variant="outlined"
                            placeholder="What's on your mind?"
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
                                multiple
                                onChange={handleFileChange}
                            />
                        </Button>

                        {filePreviews.length > 0 && (
                            <Box sx={{ m: 2 }}>
                                <Slider {...settings}>
                                    {filePreviews.map((preview, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                position: "relative",
                                            }}
                                        >
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
                                                onClick={() =>
                                                    handleRemoveFile(index)
                                                }
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
                                                sx={{
                                                    mb: 1,
                                                }}
                                            >
                                                {selectedFiles[
                                                    index
                                                ].type.startsWith("video/") ? (
                                                    <video
                                                        src={preview}
                                                        controls
                                                    />
                                                ) : (
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${
                                                            index + 1
                                                        }`}
                                                    />
                                                )}
                                            </AspectRatio>
                                        </Box>
                                    ))}
                                </Slider>
                            </Box>
                        )}
                    </Box>
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!content.trim() || loading}
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
                Your Post Has Been Published
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

export default NewPostWidget;
