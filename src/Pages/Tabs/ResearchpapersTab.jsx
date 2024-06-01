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
        setResearchpapers(data["_embedded"].researchPaperList);
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
        <SkeletonLoader style={{ width: "100%" }} isLoading={isLoading} />
        <Grid spacing={5} container>
          {researchpapers.map((article, index) => (
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
        </Grid>
      </Container>
    </>
  );
}
export default ResearchpapersTab;
