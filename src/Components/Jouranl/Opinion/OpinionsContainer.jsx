import { List, ListItem, Typography } from "@mui/material";

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Opinion from "./Opinion";
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
                setOpinions(data["_embedded"].opinionList);
                console.log(data["_embedded"].opinionList);
            } else {
                setOpinions(dummyOpinions);
            }
        }

        getAllOpinions();
    }, []);

    return (
        <>
            <Typography id="transition-modal-title" variant="h4" component="h2">
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
