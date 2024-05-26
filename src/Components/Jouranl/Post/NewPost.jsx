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
    const [showBioCard, setShowBioCard] = React.useState(false);
    const [opinionCountState, setOpinionCountState] = React.useState(
        props.opinionsCount
    );
    const [opinions, setOpinions] = React.useState([]);

    const handleMouseEnter = () => setShowBioCard(true);
    const handleMouseLeave = () => setShowBioCard(false);

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
                            props.publisher.profilePicture
                                ? props.publisher.profilePicture.fileName
                                : null
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
                            sx={{
                                position: "absolute",
                                bottom: "calc(100% )", // Adjust this value to position the card correctly
                                left: 0,
                                zIndex: 10, // Ensure the BioCard is above other elements
                                width: "320px", // Ensure the BioCard has enough width
                            }}
                        >
                            <BioCard {...props} />
                        </Box>
                    )}
                </Box>
                <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ ml: "auto" }}
                >
                    {/* <MoreHoriz /> */}
                </IconButton>
            </CardContent>
            {props.images && props.images.length > 0 && (
                <CardContent sx={{ mb: 2 }}>
                    <CardOverflow>
                        <Slider {...settings}>
                            {props.images.map((image, index) => (
                                <AspectRatio key={index}>
                                    <img
                                        src={`http://localhost:8080/medias/${image.id}/files`}
                                        alt=""
                                        loading="lazy"
                                    />
                                </AspectRatio>
                            ))}
                        </Slider>
                    </CardOverflow>
                </CardContent>
            )}
            <CardContent>
                <Typography fontSize="sm">
                    <Link
                        component="button"
                        color="neutral"
                        fontWeight="lg"
                        textColor="text.primary"
                    >
                        {props.publisher.firstName}
                    </Link>{" "}
                    {props.content}
                </Typography>
                <Link
                    component="button"
                    underline="none"
                    fontSize="10px"
                    sx={{ color: "text.tertiary", my: 0.5 }}
                >
                    {getTimeDifference(props.publishDate)}
                </Link>
            </CardContent>
            <CardContent
                orientation="horizontal"
                sx={{ alignItems: "center", mx: -1 }}
            >
                <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <ReactionButton
                            reactToId={props.journalId}
                            reactionFromType="journal"
                        />
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <OpinionButton
                            setOpinions={setOpinions}
                            opinions={opinions}
                            setOpinionCountState={setOpinionCountState}
                            opinionCountState={opinionCountState}
                            journalId={props.journalId}
                        />
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <SendButton journalId={props.journalId} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mx: "auto",
                    }}
                >
                    {/* Dots or any additional content */}
                </Box>
            </CardContent>
            <OpinionBar
                setOpinions={setOpinions}
                opinions={opinions}
                opinionTo={props.journalId}
                opinionCountState={opinionCountState}
                setOpinionCountState={setOpinionCountState}
                type="post"
            />
        </Card>
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
