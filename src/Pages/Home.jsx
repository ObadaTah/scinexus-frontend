import { Container, Grid } from "@mui/material";
import Post from "../Components/Post/Post";
import PostList from "../Components/Post/PostList";

function Home() {
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item xs={3}>
                    <h1>Home</h1>
                    <Container>
                        <PostList />
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}
export default Home;
