import { List, ListItem, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { helix } from "ldrs";
import NewResearchPaper from "../../Components/Jouranl/ResearchPaper/NewResearchPaper";
import { useAuth } from "../../Components/contexts/AuthContext";
import SkeletonLoader from "../../Components/Jouranl/Post/SkeletonLoader";

function ResearchpapersTab() {
    const [researchpapers, setResearchpapers] = useState([]);
    const [isLoading, setIsLoading] = useState("block");

    const { jwtToken } = useAuth();

    useEffect(function () {
        async function getAllResearchpapers() {
            const response = await fetch(
                "http://localhost:8080/users/researchpapers",
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
                console.log(data["_embedded"]);
                if (data["_embedded"] === undefined) {
                    setResearchpapers([]);
                    setIsLoading("none");
                    return;
                }
                setResearchpapers(data["_embedded"]?.researchPaperList);
            } else {
                // Handle error
            }
            setIsLoading("none");
        }

        getAllResearchpapers();
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
                    {researchpapers?.map((article, index) => (
                        <Grid
                            item
                            // xs={12}
                            md={6}
                            lg={6}
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <NewResearchPaper {...article} />
                        </Grid>
                    ))}
                    {researchpapers.length === 0 && (
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <h1>You Don't have any Research Papers</h1>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    );
}
export default ResearchpapersTab;
