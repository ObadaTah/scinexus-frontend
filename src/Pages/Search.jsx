import {
    Container,
    Grid,
    Input,
    Snackbar,
    Tab,
    TabList,
    TabPanel,
    Tabs,
} from "@mui/joy";
import { useAuth } from "../Components/contexts/AuthContext";
import { useState } from "react";
import SkeletonLoader from "../Components/Jouranl/Post/SkeletonLoader";
import NewPost from "../Components/Jouranl/Post/NewPost";
import Article from "../Components/Jouranl/Post/Article";
import NewResearchPaper from "../Components/Jouranl/ResearchPaper/NewResearchPaper";

export default function Search() {
    const { jwtToken } = useAuth();
    const [articles, setArticles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [researchPapers, setResearchPapers] = useState([]);
    const [isLoading, setIsLoading] = useState("none");
    const search = (e) => {
        async function fetchSearch(q) {
            console.log(q);
            if (q.length < 3) return;
            setIsLoading("block");
            const response = await fetch(
                `http://localhost:8080/journals/search?query=${q}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            console.log(response.status);
            let data = await response.json();
            // console.log(data["_embedded"].articleList);
            if (response.ok) {
                setArticles(data["_embedded"].articleList);
                setPosts(data["_embedded"].postList);
                setResearchPapers(data["_embedded"].researchPaperList);
                setIsLoading("none");
            }
            console.log(() => articles);
            console.log(() => posts);
            console.log(() => researchPapers);
        }
        fetchSearch(e);
    };

    return (
        <div>
            <Container style={{ marginTop: 20 }}>
                <Input
                    onChange={(e) => search(e.target.value)}
                    size="lg"
                    placeholder="Search The Content of The Journals"
                />

                <Tabs
                    aria-label="Vertical tabs"
                    orientation="vertical"
                    sx={{ minWidth: 300, height: 160 }}
                >
                    <TabList>
                        <Tab>Posts</Tab>
                        <Tab>Articles</Tab>
                        <Tab>Research Papers</Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <b>Posts</b> tab panel
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
                                    {posts?.map((post, index) => (
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
                                    {posts === undefined && (
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "100%",
                                            }}
                                        >
                                            <h1>There Are no Posts To Show</h1>
                                        </Grid>
                                    )}
                                </Grid>
                            </Container>
                        </>
                    </TabPanel>
                    <TabPanel value={1}>
                        <>
                            <b>Articles</b> tab panel
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
                                <Grid spacing={5} container>
                                    <Grid
                                        item
                                        xs={6}
                                        style={{ display: isLoading }}
                                    >
                                        <SkeletonLoader
                                            // style={{ maxWidth: "50%" }}
                                            isLoading={isLoading}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        style={{ display: isLoading }}
                                    >
                                        <SkeletonLoader
                                            // style={{ maxWidth: "50%" }}
                                            isLoading={isLoading}
                                        />
                                    </Grid>
                                    {articles?.map((article, index) => (
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
                                    {articles === undefined && (
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "100%",
                                            }}
                                        >
                                            <h1>
                                                There Are No Articles to Show
                                            </h1>
                                        </Grid>
                                    )}
                                </Grid>
                            </Container>
                        </>
                    </TabPanel>
                    <TabPanel value={2}>
                        <>
                            <b>Research Papers</b> tab panel
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
                                    {researchPapers?.map((article, index) => (
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
                                    {researchPapers === undefined && (
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "100%",
                                            }}
                                        >
                                            <h1>
                                                There Are No Research Papers To
                                                Show
                                            </h1>
                                        </Grid>
                                    )}
                                </Grid>
                            </Container>
                        </>
                    </TabPanel>
                </Tabs>
            </Container>
        </div>
    );
}
