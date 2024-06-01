import { List, ListItem, Container } from "@mui/material";
import NewResearchPaper from "../Jouranl/ResearchPaper/NewResearchPaper";
import SkeletonLoader from "../Jouranl/Post/SkeletonLoader";
import { useEffect, useState } from "react";
import { helix } from "ldrs";
import NewPost from "../Jouranl/Post/NewPost";
import { useAuth } from "../../Components/contexts/AuthContext";
import Article from "../Jouranl/Post/Article";
import InfiniteScroll from "react-infinite-scroll-component";

helix.register();

function JournalsList() {
    const [journals, setJournals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { jwtToken } = useAuth();
    const [pageNo, setPageNo] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const getAllJournals = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/journals?pageNo=${pageNo}&pageSize=5`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                const {
                    articleList = [],
                    postList = [],
                    researchPaperList = [],
                } = data["_embedded"] || {};
                const newJournals = [
                    ...articleList,
                    ...postList,
                    ...researchPaperList,
                ];

                setJournals((prevJournals) => [
                    ...prevJournals,
                    ...newJournals,
                ]);
                setPageNo((prevPageNo) => prevPageNo + 1);
                setHasMore(newJournals.length === 5); // Assuming the API returns 5 items per page
            } else {
                console.error("Error fetching journals:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching journals:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllJournals();
    }, []);

    return (
        <Container
            sx={{
                wordWrap: "break-word",
                // marginTop: 2,
                // display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: { xs: "100%", sm: "80%", md: "60%" },
            }}
        >
            {isLoading ? (
                <SkeletonLoader
                    style={{ width: "100%" }}
                    isLoading={isLoading}
                />
            ) : (
                <InfiniteScroll
                    style={{
                        width: { xs: "100%", sm: "80%", md: "60%" },
                    }}
                    dataLength={journals.length}
                    next={getAllJournals}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <List>
                        {journals.map((journal, index) => (
                            <ListItem
                                key={index}
                                sx={
                                    {
                                        // display: "flex",
                                        // justifyContent: "center",
                                        // width: "100%",
                                    }
                                }
                            >
                                {journal.journalType === "post" && (
                                    <NewPost {...journal} />
                                )}
                                {journal.journalType === "research_paper" && (
                                    <NewResearchPaper {...journal} />
                                )}
                                {journal.journalType === "article" && (
                                    <Article {...journal} />
                                )}
                            </ListItem>
                        ))}
                    </List>
                </InfiniteScroll>
            )}
        </Container>
    );
}

export default JournalsList;
