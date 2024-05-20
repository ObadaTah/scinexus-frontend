import { Box } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import React, { useState } from "react";
import JournalCardHeader from "../Components/JournalCardHeader";
import SendButton from "../Components/SendButton";
import OpinionButton from "../Opinion/OpinionButton";
import VarifiedChip from "./VarifiedChip";
function NewResearchPaper(props) {
    return (
        <>
            <Card
                variant="outlined"
                orientation="horizontal"
                size="lg"
                sx={{
                    // width: 320,
                    minWidth: "60%",
                    "&:hover": {
                        boxShadow: "md",
                        borderColor: "neutral.outlinedHoverBorder",
                    },
                }}
            >
                <AspectRatio ratio="1" sx={{ width: 130 }}>
                    <img
                        src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                        srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                        // loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <CardContent>
                    <CardContent
                        orientation="horizontal"
                        sx={{
                            alignItems: "center",
                            mx: -1,
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            // color="neutral"
                            fontSize="xxl"
                            fontWeight="lg"
                            level="h22"
                        >
                            {props.title}
                        </Typography>
                        {props.validatedBy.length != 0 && (
                            <VarifiedChip validatedBy={props.validatedBy} />
                        )}
                    </CardContent>

                    <JournalCardHeader
                        publisher={props.publisher}
                        publishDate={props.publishDate}
                    />

                    <CardContent
                        orientation="horizontal"
                        sx={{
                            // alignItems: "center",
                            mx: -1,
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                width: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1.5,
                                }}
                            >
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                >
                                    <OpinionButton
                                        opinionsCount={props.opinionsCount}
                                        journalId={props.journalId}
                                    />
                                </IconButton>
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                >
                                    <SendButton journalId={props.journalId} />
                                </IconButton>
                            </Box>
                            <Box>
                                <Button
                                    color="success"
                                    disabled={false}
                                    loading={false}
                                    onClick={function () {}}
                                    size="sm"
                                    variant="soft"
                                    xs={{ width: "100%" }}
                                >
                                    Read Full Text
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </CardContent>
            </Card>
        </>
    );
}

export default NewResearchPaper;
