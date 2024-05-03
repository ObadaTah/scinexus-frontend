import { List, ListItem, Typography } from "@mui/material";

import React from "react";
import { Container } from "react-bootstrap";
import Opinion from "./Opinion";
const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: "inset 24px",
    p: 4,
};
function OpinionsContainer(props) {
    const opinions = [
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

    return (
        <>
            <Typography
                // style={{
                //     backgroundColor: "white",
                //     position: "relative",
                //     top: "-32px",
                // }}
                id="transition-modal-title"
                variant="h4"
                component="h2"
            >
                Opinions
            </Typography>
            <Container>
                <List>
                    {opinions.map((opinion, index) => {
                        return (
                            <ListItem key={index}>
                                <Opinion
                                    publisher={opinion.publisher}
                                    content={opinion.content}
                                    publishDate={opinion.publishDate}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        </>
    );
}
export default OpinionsContainer;
