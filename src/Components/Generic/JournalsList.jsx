import { List, ListItem } from "@mui/material";
import Container from "react-bootstrap/Container";

import NewResearchPaper from "../Jouranl/ResearchPaper/NewResearchPaper";
import { useEffect, useState } from "react";
import { helix } from "ldrs";
import NewPost from "../Jouranl/Post/NewPost";

helix.register();

const dummyOrgs = [
    { name: "Bethlehem University", image: "https://placehold.co/400x400" },
    { name: "Bethlehem University", image: "https://placehold.co/400x400" },
    { name: "Bethlehem University", image: "https://placehold.co/400x400" },
    { name: "Bethlehem University", image: "https://placehold.co/400x400" },
];
const dummyCont = [
    { name: "Obada Tahboub", image: "https://placehold.co/400x400" },
    { name: "Obada Tahboub", image: "https://placehold.co/400x400" },
    { name: "Obada Tahboub", image: "https://placehold.co/400x400" },
    { name: "Obada Tahboub", image: "https://placehold.co/400x400" },
];
const dummyResearchPapers = [
    {
        publisher: "UserName",
        title: "This is a dummy research paper",
        publishDate: "2021-10-10",
        organizations: dummyOrgs,
        image: "https://placehold.co/400x400",
        contributors: dummyCont,
        content: {
            header: "Abstraction",
            paragraph: "This is a dummy research paper",
        },
    },
    {
        publisher: "UserName",
        title: "This is a dummy research paper",
        publishDate: "2021-10-10",
        organizations: dummyOrgs,
        image: "https://placehold.co/400x400",
        contributors: dummyCont,
        content: {
            header: "Abstraction",
            paragraph: "This is a dummy research paper",
        },
    },
    {
        publisher: "UserName",
        title: "This is a dummy research paper",
        publishDate: "2021-10-10",
        organizations: dummyOrgs,
        image: "https://placehold.co/400x400",
        contributors: dummyCont,
        content: {
            header: "Abstraction",
            paragraph: "This is a dummy research paper",
        },
    },
    {
        publisher: "UserName",
        title: "This is a dummy research paper",
        publishDate: "2021-10-10",
        organizations: dummyOrgs,
        image: "https://placehold.co/400x400",
        contributors: dummyCont,
        content: {
            header: "Abstraction",
            paragraph: "This is a dummy research paper",
        },
    },
];
const dummyPosts = [
    {
        publisher: "UserName",
        content: "This is a dummy post",
        publishDate: "2021-10-10",
    },
    {
        publisher: "UserName",
        content: "This is a dummy post",
        publishDate: "2021-10-10",
    },
    {
        publisher: "UserName",
        content: "This is a dummy post",
        publishDate: "2021-10-10",
        image: "https://placehold.co/400x400",
    },
    {
        publisher: "UserName",
        content: "This is a dummy post",
        publishDate: "2021-10-10",
        image: "https://placehold.co/3000x3000",
    },
];
function JournalsList() {
    const [posts, setPosts] = useState([]);
    const [researchpapers, setResearchpapers] = useState([]);
    const [isLoading, setIsLoading] = useState("block");
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

    useEffect(function () {
        async function getAllPosts() {
            const jwt = await authenticate();
            // console.log(" this is jwt token ", jwt);
            const response = await fetch("http://localhost:8080/posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                setPosts(data["_embedded"].postList);
                console.log(data["_embedded"].postList);
            } else {
                setPosts(dummyPosts);
            }
            setIsLoading("none");
        }

        getAllPosts();
    }, []);

    useEffect(function () {
        async function getAllResearchPapers() {
            const jwt = await authenticate();
            // console.log(" this is jwt token ", jwt);
            const response = await fetch(
                "http://localhost:8080/researchpapers",
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
                setResearchpapers(data["_embedded"].researchPaperList);
                console.log(data["_embedded"].researchPaperList);
            } else {
                setResearchpapers(dummyResearchPapers);
            }
            setIsLoading("none");
        }

        getAllResearchPapers();
    }, []);

    const onClick = () => {};
    return (
        <>
            <Container
                fluid
                // fixed
                // maxWidth="false"
                style={{
                    wordWrap: "break-word",
                    marginTop: "20px",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <l-helix
                    size="45"
                    speed="2.5"
                    color="black"
                    style={{ display: isLoading }}
                />
                <List>
                    {researchpapers.map((researchPaper, index) => {
                        return (
                            <ListItem
                                key={index}
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <NewResearchPaper
                                    journalId={researchPaper.id}
                                    publisher={researchPaper.publisher}
                                    title={researchPaper.title}
                                    publishDate={researchPaper.createDateTime}
                                    // organizations={researchPaper.validatedBy}
                                    image="https://placehold.co/3000x3000"
                                    content={researchPaper.content}
                                    contributors={researchPaper.contributors}
                                />
                            </ListItem>
                        );
                    })}
                    {posts.map((post, index) => {
                        return (
                            <ListItem
                                key={index}
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <NewPost
                                    journalId={post.id}
                                    publisher={post.publisher}
                                    content={post.content}
                                    publishDate={post.createDateTime}
                                    image={post.medias[0]}
                                    interactionsCount={post.interactionsCount}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        </>
    );
}

export default JournalsList;
