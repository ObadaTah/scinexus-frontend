import React, { useState } from "react";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import {
    AspectRatio,
    Avatar,
    Box,
    Card,
    CardContent,
    CardOverflow,
    IconButton,
    Link,
    Typography,
    Input,
    Snackbar, // Import TextField
} from "@mui/joy";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Components/custom-slick.css"; // Import your custom CSS file
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";
import BioCard from "./BioCard";
import OpinionButton from "../Opinion/OpinionButton";
import OpinionBar from "../Opinion/OpinionBar";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import SaveIcon from "@mui/icons-material/Save"; // Import Save icon
import { useAuth } from "../../contexts/AuthContext";
import zIndex from "@mui/material/styles/zIndex";

function getTimeDifference(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - date;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
        return "Today";
    } else if (daysDifference === 1) {
        return "Yesterday";
    } else {
        return `${daysDifference} Days Ago`;
    }
}

export default function NewPost(props) {
    const { jwtToken } = useAuth();
    const [showBioCard, setShowBioCard] = React.useState(false);
    const [opinionCountState, setOpinionCountState] = React.useState(
        props.opinionsCount
    );
    const [opinions, setOpinions] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false); // State for edit mode
    const [content, setContent] = React.useState(props.content); // State for post content
    async function deletePost() {
        const response = await fetch(
            `http://localhost:8080/posts/${props.id}`,
            {
                method: "DELETE",
                // body: JSON.stringify({
                //     content: content,
                //     journalId: null,
                // }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    }
    const handleMouseEnter = () => setShowBioCard(true);
    const handleMouseLeave = () => setShowBioCard(false); // to Be Changed Back to False
    const [deleted, setDeleted] = useState(false);
    const handleDeleteClick = () => {
        deletePost();
        props.setOpen(true);
        setDeleted(true);
    };
    console.log(props.publisher.profilePicture);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomArrow />,
        prevArrow: <CustomArrow />,
    };
    async function submitPostChanges() {
        const response = await fetch(
            `http://localhost:8080/posts/${props.id}`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    content: content,
                    journalId: null,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    }

    const handleEditClick = () => {
        if (editMode) {
            console.log("Saving content:", content);
            submitPostChanges();
        }
        setEditMode(!editMode);
    };

    return deleted === true ? null : (
        <>
            <Card
                variant="outlined"
                sx={{
                    width: "100%",
                    "--Card-radius": "10px",
                    "&:hover": {
                        boxShadow: "md",
                        borderColor: "neutral.outlinedHoverBorder",
                    },
                    position: "relative", // Ensure the Card is positioned relatively
                }}
            >
                <CardContent
                    orientation="horizontal"
                    sx={{ alignItems: "center", gap: 1 }}
                >
                    <Box
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            size="sm"
                            src={
                                props.publisher.profilePicture?.path !==
                                "autogenerated"
                                    ? `http://localhost:8080/medias/${props.publisher.profilePicture?.id}/files`
                                    : props.publisher.profilePicture?.fileName
                            }
                            sx={{
                                border: "2px solid",
                                borderColor: "background.body",
                            }}
                        />
                        <Typography fontWeight="lg" sx={{ marginLeft: 1 }}>
                            {props.publisher.firstName}
                        </Typography>

                        {showBioCard && (
                            <Box
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    position: "absolute",
                                    bottom: 0, // Adjust this value to position the card correctly
                                    left: 0,
                                    width: "320px", // Ensure the BioCard has enough width
                                }}
                            >
                                <BioCard {...props} />
                            </Box>
                        )}
                    </Box>
                    {props.owner && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                display: "flex",
                                gap: 1,
                            }}
                        >
                            <>
                                <IconButton
                                    variant="outlined"
                                    color="primary"
                                    size="sm"
                                    onClick={handleEditClick}
                                >
                                    {editMode ? <SaveIcon /> : <EditIcon />}
                                </IconButton>
                                <IconButton
                                    variant="outlined"
                                    color="danger"
                                    size="sm"
                                    onClick={handleDeleteClick}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        </Box>
                    )}
                </CardContent>
                {props.medias && props.medias.length > 0 && (
                    <CardContent sx={{ mb: 2 }}>
                        {/* <CardOverflow> */}
                        <Slider {...settings}>
                            {props.medias.map((image, index) => (
                                <AspectRatio key={index}>
                                    {/* {image.type} */}
                                    {image.type.includes("image") ? (
                                        <img
                                            src={`http://localhost:8080/medias/${image.id}/files`}
                                            alt=""
                                            loading="lazy"
                                        />
                                    ) : null}
                                    {image.type === "video/mp4" ? (
                                        <div>
                                            <video
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                                ratio
                                                controls
                                                src={`http://localhost:8080/medias/${image.id}/files`}
                                                alt=""
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : null}
                                </AspectRatio>
                            ))}
                        </Slider>
                        {/* </CardOverflow> */}
                    </CardContent>
                )}
                <CardContent>
                    {editMode ? (
                        <Input
                            fullWidth
                            variant="outlined"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    ) : (
                        <Typography fontSize="sm">
                            <Link
                                component="button"
                                color="neutral"
                                fontWeight="lg"
                                textColor="text.primary"
                            >
                                {props.publisher.firstName}
                            </Link>{" "}
                            <br />
                            {content}
                        </Typography>
                    )}
                    <Link
                        component="button"
                        underline="none"
                        fontSize="10px"
                        sx={{ color: "text.tertiary", my: 0.5 }}
                    >
                        {getTimeDifference(props.createDateTime)}
                    </Link>
                </CardContent>
                <CardContent orientation="horizontal" style={{}}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            mx: 1,
                            flexDirection: { xs: "column", sm: "row" },
                            marginLeft: { xs: "auto", sm: "0" },
                            marginRight: { xs: "auto", sm: "0" },
                            alignItems: "center",
                        }}
                    >
                        <IconButton variant="plain" color="neutral" size="sm">
                            <ReactionButton
                                reactToId={props.id}
                                reactionFromType="journal"
                            />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <OpinionButton
                                setOpinions={setOpinions}
                                opinions={opinions}
                                setOpinionCountState={setOpinionCountState}
                                opinionCountState={opinionCountState}
                                journalId={props.id}
                            />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <SendButton journalId={props.id} />
                        </IconButton>
                    </Box>
                </CardContent>
                <OpinionBar
                    setOpinions={setOpinions}
                    opinions={opinions}
                    opinionTo={props.id}
                    opinionCountState={opinionCountState}
                    setOpinionCountState={setOpinionCountState}
                    type="post"
                />
            </Card>
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
