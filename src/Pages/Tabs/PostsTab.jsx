import { List, ListItem, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { helix } from "ldrs";
import NewPost from "../../Components/Jouranl/Post/NewPost";
import { useAuth } from "../../Components/contexts/AuthContext";
import SkeletonLoader from "../../Components/Jouranl/Post/SkeletonLoader";

function PostsTab() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState("block");
    const { jwtToken } = useAuth();

    useEffect(function () {
        async function getAllPosts() {
            const response = await fetch("http://localhost:8080/users/posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                setPosts(data["_embedded"].postList);
                console.log(data["_embedded"].postList);
            } else {
                // Handle error
            }
            setIsLoading("none");
        }

        getAllPosts();
    }, []);
    return (
        <>
            <Container
                sx={{
                    wordWrap: "break-word",
                    // marginTop: 2,
                    // display: "flex",
                    // flexDirection: "column",
                    // alignItems: "center",
                    // width: { xs: "100%", sm: "80%", md: "60%" },
                }}
            >
                <SkeletonLoader
                    style={{ width: "100%" }}
                    isLoading={isLoading}
                />
                <Grid spacing={5} container>
                    {posts.map((post, index) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={6}
                            key={index}
                            sx={
                                {
                                    // display: "flex",
                                    // justifyContent: "center",
                                    // width: "100%",
                                }
                            }
                        >
                            <NewPost {...post} owner={true} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
export default PostsTab;
