import { List, ListItem, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Opinion from "./Opinion";
import { helix } from "ldrs";
import { DialogContent, DialogTitle, Modal, ModalDialog } from "@mui/joy";
// import * as React from "react";
import { Transition } from "react-transition-group";
helix.register();
const dummyOpinions = [
    {
        publisher: {
            username: "UserName",
            image: "https://placehold.co/40x40",
        },
        content: "This is a dummy post",
        publishDate: "2021-10-10",
    },
    {
        publisher: {
            username: "UserName",
            image: "https://placehold.co/40x40",
        },
        content: "This is a dummy post",
        publishDate: "2021-10-10",
    },
    {
        publisher: {
            username: "UserName",
            image: "https://placehold.co/40x40",
        },
        content: "This is a dummy post",
        publishDate: "2021-10-10",
    },
    {
        publisher: {
            username: "UserName",
            image: "https://placehold.co/40x40",
        },
        content: "This is a dummy post",
        publishDate: "2021-10-10",
    },
    {
        publisher: {
            username: "UserName",
            image: "https://placehold.co/40x40",
        },
        content: "This is a dummy post",
        publishDate: "2021-10-10",
    },
];
function OpinionsContainer(props) {
    const [isLoading, setIsLoading] = useState("block");
    const [finishedLoadingAndEmpty, setFinishedLoadingAndEmpty] =
        useState("none");
    async function authenticate() {
        const response = await fetch(
            "http://localhost:8080/api/v1/auth/authenticate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: "obada@gmail.com",
                    password: "Mohammed1234!",
                }),
            }
        );

        const data = await response.json();
        return data["jwtToken"];
    }
    const [opinions, setOpinions] = React.useState([]);
    useEffect(function () {
        async function getAllOpinions() {
            const jwt = await authenticate();
            // console.log(" this is jwt token ", jwt);
            console.log("this is journal id", props.journalId);
            const response = await fetch(
                "http://localhost:8080/journals/" +
                    props.journalId +
                    "/opinions",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                console.log(data);
                if (data["_embedded"] !== undefined) {
                    setOpinions(data["_embedded"].opinionList);
                    console.log(data["_embedded"].opinionList);
                } else {
                    setOpinions([]);
                    setFinishedLoadingAndEmpty("block");
                }
                // setOpinions(data["_embedded"].opinionList);
                // console.log(data["_embedded"].opinionList);
            } else {
                setOpinions(dummyOpinions);
            }
            setIsLoading("none");
        }

        getAllOpinions();
    }, []);

    return (
        <Transition in={props.open} timeout={400} unmountOnExit>
            {(state) => (
                <Modal
                    keepMounted
                    open={!["exited", "exiting"].includes(state)}
                    onClose={() => props.setOpen(false)}
                    slotProps={{
                        backdrop: {
                            sx: {
                                opacity: 0,
                                backdropFilter: "none",
                                transition: `opacity 400ms, backdrop-filter 400ms`,
                                ...{
                                    entering: {
                                        opacity: 1,
                                        backdropFilter: "blur(8px)",
                                    },
                                    entered: {
                                        opacity: 1,
                                        backdropFilter: "blur(8px)",
                                    },
                                }[state],
                            },
                        },
                    }}
                    sx={{
                        visibility: state === "exited" ? "hidden" : "visible",
                    }}
                >
                    <ModalDialog
                        sx={{
                            opacity: 0,
                            transition: `opacity 300ms`,
                            ...{
                                entering: { opacity: 1 },
                                entered: { opacity: 1 },
                            }[state],
                        }}
                    >
                        <DialogTitle>Opinions</DialogTitle>
                        <DialogContent>
                            <>
                                <l-helix
                                    size="45"
                                    speed="2.5"
                                    color="black"
                                    style={{
                                        display: isLoading,
                                        position: "center",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                    }}
                                />

                                <Container fixed style={{ maxWidth: "50%" }}>
                                    <List>
                                        <Typography
                                            style={{
                                                display:
                                                    finishedLoadingAndEmpty,
                                                position: "center",
                                                textAlign: "center",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                            }}
                                        >
                                            There are no opinions yet, be the
                                            first to share your Opinion
                                        </Typography>
                                        {opinions.map((opinion, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <Opinion
                                                        papaOpinionId={
                                                            opinion.papaOpinion
                                                        }
                                                        publisher={
                                                            opinion.opinionOwner
                                                        }
                                                        content={
                                                            opinion.content
                                                        }
                                                        publishDate={
                                                            opinion.createDateTime
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Container>
                            </>
                        </DialogContent>
                    </ModalDialog>
                </Modal>
            )}
        </Transition>
    );
}
export default OpinionsContainer;
