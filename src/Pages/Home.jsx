import { Container, Grid } from "@mui/material";
import JournalsList from "../Components/Generic/JournalsList";

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
            <JournalsList />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
export default Home;
