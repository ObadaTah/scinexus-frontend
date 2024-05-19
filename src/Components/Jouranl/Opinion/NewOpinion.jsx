import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import * as React from "react";

function NewOpinion(props) {
    return (
        <>
            <Card
                // variant="outlined"
                sx={{
                    // position: "relative",
                    // alignSelf: "center",
                    width: "100%",
                    "--Card-radius": (theme) => "15px",
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
                                // p: 0.5,
                                border: "2px solid",
                                borderColor: "background.body",
                            }}
                        />
                    </Box>
                    <Typography fontWeight="lg">
                        {props.publisher.firstName +
                            " " +
                            props.publisher.lastName}
                    </Typography>
                    {/* <IconButton
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ ml: "auto" }}
                    >
                        <MoreHoriz />
                    </IconButton> */}
                </CardContent>
                <Typography
                    style={{
                        flexWrap: "wrap",
                        wordWrap: "break-word",
                    }}
                >
                    {props.content}
                </Typography>
            </Card>
        </>
    );
}
export default NewOpinion;
