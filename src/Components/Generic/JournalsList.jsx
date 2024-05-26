import { List, ListItem, Container } from "@mui/material";
// import Container from "react-bootstrap/Container";

import NewResearchPaper from "../Jouranl/ResearchPaper/NewResearchPaper";
import SkeletonLoader from "../Jouranl/Post/SkeletonLoader";
import { useEffect, useState } from "react";
import { helix } from "ldrs";
import NewPost from "../Jouranl/Post/NewPost";
import { useAuth } from "../../Components/contexts/AuthContext";
import { AspectRatio, Card, Skeleton, Typography } from "@mui/joy";

helix.register();

function JournalsList() {
  const [posts, setPosts] = useState([]);
  const [researchpapers, setResearchpapers] = useState([]);
  const [isLoading, setIsLoading] = useState("block");
  const { jwtToken } = useAuth();

  useEffect(function () {
    async function getAllPosts() {
      // console.log(" this is jwt token ", jwt);
      const response = await fetch("http://localhost:8080/posts", {
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
        // alert("error")
      }
      setIsLoading("none");
    }

    getAllPosts();
  }, []);

  useEffect(function () {
    async function getAllResearchPapers() {
      // console.log(" this is jwt token ", jwt);
      const response = await fetch("http://localhost:8080/researchpapers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        setResearchpapers(data["_embedded"].researchPaperList);
        console.log(data["_embedded"].researchPaperList);
      } else {
        // alert("error")
      }
      setIsLoading("none");
    }

    getAllResearchPapers();
  }, []);

  return (
    <>
      <Container
        // fluid
        // fixed
        // maxWidth="false"
        style={{
          wordWrap: "break-word",
          marginTop: "20px",
          justifyContent: "center",
          // display: "flex",
          maxWidth: "60%",
        }}
      >
        <SkeletonLoader style={{ width: "100%" }} isLoading={isLoading} />
        <List>
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
                  opinionsCount={post.opinionsCount}
                  content={post.content}
                  publishDate={post.createDateTime}
                  images={post.medias}
                  interactionsCount={post.interactionsCount}
                />
              </ListItem>
            );
          })}
          {researchpapers.map((researchPaper, index) => {
            return (
              <ListItem
                key={index}
                style={{
                  justifyContent: "center",
                  // minWidth: "100%",
                }}
              >
                <NewResearchPaper
                  opinionsCount={researchPaper.opinionsCount}
                  journalId={researchPaper.id}
                  publisher={researchPaper.publisher}
                  title={researchPaper.title}
                  publishDate={researchPaper.createDateTime}
                  // organizations={researchPaper.validatedBy}
                  image="https://placehold.co/3000x3000"
                  content={researchPaper.content}
                  contributors={researchPaper.contributors}
                  validatedBy={researchPaper.validatedBy}
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
