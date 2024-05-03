import { List, ListItem } from "@mui/material";
import Post from "../Jouranl/Post/Post";
import ResearchPaper from "../Jouranl/ResearchPaper/ResearchPaper";
import { useEffect, useState } from "react";

function JournalsList() {
  const [posts, setPosts] = useState([]);
  const [researchpapers, setResearchpapers] = useState([]);

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
    console.log(data["jwtToken"]);
    return data["jwtToken"];
  }

  useEffect(function () {
    async function getAllPosts() {
      const jwt = await authenticate();
      console.log(" this is jwt token ", jwt);
      const response = await fetch("http://localhost:8080/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      const data = await response.json();
      setPosts(data["_embedded"].postList);

      console.log(data["_embedded"].postList);
    }

    getAllPosts();
  }, []);

  useEffect(function () {
    async function getAllResearchPapers() {
      const jwt = await authenticate();
      console.log(" this is jwt token ", jwt);
      const response = await fetch("http://localhost:8080/researchpapers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      const data = await response.json();
      setResearchpapers(data["_embedded"].researchPaperList);
      console.log(data["_embedded"].researchPaperList);
    }

    getAllResearchPapers();
  }, []);

  // TBI : To be implemented
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
  const onClick = () => {};
  return (
    <>
      <List>
        {posts.map((post, index) => {
          return (
            <ListItem key={index}>
              <Post
                publisher={post.publisher}
                content={post.content}
                publishDate={post.publishDate}
                image={post.image}
              />
            </ListItem>
          );
        })}
        {researchpapers.map((researchPaper, index) => {
          return (
            <ListItem key={index}>
              <ResearchPaper
                publisher={researchPaper.publisher}
                title="dummyTitle"
                publishDate={researchPaper.createDateTime}
                organizations={dummyOrgs}
                image="https://placehold.co/3000x3000"
                content={researchPaper.content}
                contributors={researchPaper.contributors}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default JournalsList;