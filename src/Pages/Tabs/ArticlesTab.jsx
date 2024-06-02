import { List, ListItem, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { helix } from "ldrs";
import Article from "../../Components/Jouranl/Post/Article";
import { useAuth } from "../../Components/contexts/AuthContext";
import SkeletonLoader from "../../Components/Jouranl/Post/SkeletonLoader";

function ArticlesTab(props) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState("block");
    const { jwtToken } = useAuth();

    useEffect(function () {
        async function getAllArticles() {
            const response = await fetch(
                `http://localhost:8080/users/${props.id}/articles`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                if (data["_embedded"] === undefined) {
                    setArticles([]);
                    setIsLoading("none");
                    return;
                }
                setArticles(data["_embedded"].articleList);
            } else {
                // Handle error
            }
            setIsLoading("none");
        }

        getAllArticles();
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
                    // style={{ maxWidth: "50%" }}
                    isLoading={isLoading}
                />
                <Grid spacing={5} container>
                    {articles.map((article, index) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <Article {...article} />
                        </Grid>
                    ))}
                    {articles.length === 0 && (
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <h1>There Are No Any Articles To Show</h1>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    );
}
export default ArticlesTab;
