import { Avatar, Box, CardContent, Typography } from "@mui/joy";
import * as React from "react";

import { Row } from "react-bootstrap";

function JournalCardHeader(props) {
    return (
        <CardContent
            orientation="horizontal"
            sx={{ alignItems: "center", gap: 1, mx: -2, mb: 2 }}
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
                        // background:
                        //     "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                    },
                }}
            >
                {/* <Avatar
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
                /> */}
            </Box>
            <Row>
                <Typography fontWeight="sm">
                    🧑🏻‍🏫 {props.publisher.firstName} {props.publisher.lastName}
                </Typography>

                <Typography level="body-xs">
                    {new Date(props.publishDate).toLocaleDateString("en-US", {
                        month: "long",
                        // day: "2-digit",
                        year: "numeric",
                    })}
                </Typography>
            </Row>
            {/* <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
            >
                <IconButtonMenu />
            </IconButton> */}
        </CardContent>
        // <CardHeader
        //     avatar={
        //         <Avatar
        //             sx={{ bgcolor: red[500] }}
        //             aria-label="recipe"
        //             src={
        //                 props.publisher.profilePicture != null
        //                     ? props.publisher.profilePicture.fileName
        //                     : null
        //             }
        //         >
        //             {props.publisher.firstName[0]}
        //         </Avatar>
        //     }
        //     action={
        //         <IconButton aria-label="settings">
        //             <MoreVertIcon />
        //         </IconButton>
        //     }
        //     title={props.publisher.firstName + " " + props.publisher.lastName}
        // subheader={new Date(props.publishDate).toLocaleDateString("en-US", {
        //     month: "long",
        //     day: "2-digit",
        //     year: "numeric",
        // })}
        // />
    );
}
export default JournalCardHeader;
