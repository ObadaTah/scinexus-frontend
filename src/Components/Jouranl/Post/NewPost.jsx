/* eslint-disable jsx-a11y/anchor-is-valid */
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

import OpinionsContainer from "../Opinion/OpinionsContainer";

import {
    AspectRatio,
    Avatar,
    Box,
    Card,
    CardContent,
    CardOverflow,
    DialogContent,
    DialogTitle,
    IconButton,
    Input,
    Link,
    Modal,
    ModalDialog,
    Typography,
} from "@mui/joy";
import * as React from "react";
import { Transition } from "react-transition-group";
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";

import OpinionButton from "../Opinion/OpinionButton";
import OpinionsModal from "../Opinion/OpinionsModal";

export default function NewPost(props) {
    function getTimeDifference(dateString) {
        // Parse the string into a Date object
        const date = new Date(dateString);

        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDate - date;
        // Calculate the time difference in days
        const daysDifference = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24)
        );

        // Return the formatted time difference
        if (daysDifference === 0) {
            return "Today";
        } else if (daysDifference === 1) {
            return "Yesterday";
        } else {
            return `${daysDifference} Days Ago`;
        }
    }
    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: "60%",
                "--Card-radius": "10px",
            }}
        >
            <CardContent
                orientation="horizontal"
                sx={{ alignItems: "center", gap: 1 }}
            >
                <Box
                    sx={{
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            m: "-2px",
                            borderRadius: "50%",
                            background:
                                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                        },
                    }}
                >
                    <Avatar
                        size="sm"
                        src={
                            props.publisher.profilePicture != null
                                ? props.publisher.profilePicture.fileName
                                : null
                        }
                        sx={{
                            border: "2px solid",
                            borderColor: "background.body",
                        }}
                    />
                </Box>
                <Typography fontWeight="lg">
                    {props.publisher.firstName}
                </Typography>
                <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ ml: "auto" }}
                >
                    <MoreHoriz />
                </IconButton>
            </CardContent>
            {props.image != null ? (
                <CardOverflow>
                    <AspectRatio>
                        <img
                            src={
                                props.image != null
                                    ? "http://localhost:8080/medias/" +
                                      props.image.id +
                                      "/files"
                                    : null
                            }
                            alt=""
                            loading="lazy"
                        />
                    </AspectRatio>
                </CardOverflow>
            ) : null}

            <CardContent>
                <Link
                    component="button"
                    underline="none"
                    fontSize="sm"
                    fontWeight="lg"
                    textColor="text.primary"
                >
                    {props.interactionsCount} Interactions
                </Link>
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
                {/* <Link
                    component="button"
                    underline="none"
                    fontSize="sm"
                    startDecorator="…"
                    sx={{ color: "text.tertiary" }}
                >
                    more
                </Link> */}
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
                <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <ReactionButton journalId={props.journalId} />
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <OpinionButton journalId={props.journalId} />
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
                    {/* {[...Array(5)].map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                borderRadius: "50%",
                                width: `max(${6 - index}px, 3px)`,
                                height: `max(${6 - index}px, 3px)`,
                                bgcolor:
                                    index === 0
                                        ? "primary.solidBg"
                                        : "background.level3",
                            }}
                        />
                    ))} */}
                </Box>
                <Box
                    sx={{
                        width: 0,
                        display: "flex",
                        flexDirection: "row-reverse",
                    }}
                >
                    <IconButton variant="plain" color="neutral" size="sm">
                        <BookmarkBorderRoundedIcon />
                    </IconButton>
                </Box>
            </CardContent>
            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                <Input
                    variant="soft"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{ flex: 1, px: 2, "--Input-focusedThickness": "0px" }}
                />
                <Link disabled underline="none" role="button">
                    Post
                </Link>
            </CardContent>
        </Card>
    );
}
