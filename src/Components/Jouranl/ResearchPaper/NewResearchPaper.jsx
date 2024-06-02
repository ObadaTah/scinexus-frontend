import { Box, Link } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import React, { useEffect } from "react";
import JournalCardHeader from "../Components/JournalCardHeader";
import SendButton from "../Components/SendButton";
import OpinionButton from "../Opinion/OpinionButton";
import VarifiedChip from "./VarifiedChip";
import { useNavigate } from "react-router-dom";

function NewResearchPaper(props) {
    const [preview, setPreview] = React.useState(null);
    useEffect(() => {
        props.medias.map((media) => {
            if (media.type.startsWith("image/")) {
                console.log(media);
                setPreview(`http://localhost:8080/medias/${media.id}/files`);
                return;
            }
        });
    }, []);
    const [opinionCountState, setOpinionCountState] = React.useState(
        props.opinionsCount
    );
    const [opinions, setOpinions] = React.useState([]);
    const navigate = useNavigate();
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            size="lg"
            sx={{
                width: "100%",
                "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                },
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        // display: "flex",
                        // flexDirection: { xs: "column", md: "row" },
                        // alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "space-between",
                        gap: 1,
                    }}
                >
                    <Card
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                        onClick={function () {
                            console.log("Read Full Text");
                            navigate("/research-paper", {
                                state: { ...props },
                            });
                        }}
                        variant="soft"
                        color="warning"
                        orientation="horizontal"
                        backgroundcolor="#f9f7f4"
                        style={{
                            minWidth: "100%",
                            borderTop: "1px solid #cdc5af",
                            borderRight: "1px solid #cdc5af",
                            borderBottom: "1px solid #cdc5af",
                            borderLeft: "4px solid #cdc5af",
                            // border,
                        }}
                    >
                        <AspectRatio
                            id="arPhoto"
                            ratio="1/1.5"
                            sx={{ width: "30%" }}
                        >
                            <img
                                src={
                                    preview ||
                                    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564"
                                }
                                // src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564"
                                // srcSet="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564"
                                alt=""
                            />
                        </AspectRatio>
                        <Box>
                            <Typography
                                // fontSize={{
                                //     xs: "0.5rem",
                                //     md: "1rem",
                                //     lg: "1.5rem",
                                // }}
                                fontWeight="lg"
                                style={{
                                    width: "100%",
                                }}
                                sx={{
                                    wordWrap: "break-word",
                                    textAlign: {
                                        xs: "left",
                                        md: "left",
                                        lg: "left",
                                    },
                                }}
                            >
                                {props.title}
                            </Typography>
                            {props.validatedBy.length !== 0 && (
                                <VarifiedChip validatedBy={props.validatedBy} />
                            )}
                            <JournalCardHeader
                                publisher={props.publisher}
                                publishDate={props.createDateTime}
                            />
                        </Box>
                    </Card>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        gap: 1,
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            justifyContent: { xs: "center", md: "flex-start" },
                        }}
                    >
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
                </Box>
            </CardContent>
        </Card>
    );
}

export default NewResearchPaper;
