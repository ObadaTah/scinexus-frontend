import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import NewPostWidget from "./NewPostWidget";
import NewResearchpaperWidget from "./NewResearchpaperWidget";
import NewArticleWidget from "./NewArticleWidget";
import { Row } from "react-bootstrap";
import {
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    Grid,
    Stack,
    Sheet,
    ModalDialog,
} from "@mui/joy";

const NewJournalModal = (props) => {
    const [step, setStep] = useState(1);
    const [choice, setChoice] = useState("");

    const handleChoice = (type) => {
        setChoice(type);
        setStep(2);
    };

    const renderWidget = () => {
        switch (choice) {
            case "post":
                return <NewPostWidget />;
            case "researchpaper":
                return <NewResearchpaperWidget />;
            case "article":
                return <NewArticleWidget />;
            default:
                return null;
        }
    };

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.open}
            onClose={props.onClose}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ModalDialog
                layout="center"
                size="sm"
                style={{
                    width: "50%",
                    // maxHeight: "120vh",
                    overflowY: "auto",
                }}
            >
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        padding: 4,
                        borderRadius: 2,
                    }}
                >
                    {step === 1 && (
                        <>
                            <Typography variant="h6" id="modal-title">
                                How Would You Like to Share Your knowledge?
                            </Typography>
                            <Stack spacing={2} direction="column">
                                <IconButton
                                    style={{ width: "100%" }}
                                    variant="contained"
                                    onClick={() => handleChoice("post")}
                                >
                                    <Card
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        orientation="horizontal"
                                    >
                                        <CardContent>
                                            <Typography
                                                level="h2"
                                                fontWeight={"bold"}
                                            >
                                                Post
                                            </Typography>
                                            <Typography>
                                                Posts are made for everyone and
                                                can contain images and videos.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </IconButton>

                                <IconButton
                                    style={{ minWidth: "100%" }}
                                    variant="contained"
                                    orientation="horizontal"
                                    onClick={() => handleChoice("article")}
                                >
                                    <Card
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        orientation="horizontal"
                                    >
                                        <CardContent>
                                            <Typography
                                                level="h2"
                                                fontWeight={"bold"}
                                            >
                                                Articles
                                            </Typography>

                                            <Typography>
                                                Articles Are designed for long
                                                and thoughtful content.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </IconButton>

                                <IconButton
                                    variant="contained"
                                    onClick={() =>
                                        handleChoice("researchpaper")
                                    }
                                >
                                    <Card
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                    >
                                        <CardContent>
                                            <Typography
                                                level="h1"
                                                fontWeight={"bold"}
                                            >
                                                Research Paper
                                            </Typography>

                                            <Typography>
                                                Research Papers are for academic
                                                and scientific content.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </IconButton>
                            </Stack>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <Sheet>
                                <Typography variant="h6" id="modal-title">
                                    Create{" "}
                                    {choice.charAt(0).toUpperCase() +
                                        choice.slice(1)}
                                </Typography>
                                {renderWidget()}
                                <Button
                                    style={{ marginTop: 5 }}
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>
                            </Sheet>
                        </>
                    )}
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default NewJournalModal;
