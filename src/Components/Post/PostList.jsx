import { List, ListItem } from "@mui/material";
import Post from "./Post";
import { useEffect, useState } from "react";

function PostList() {
  // TBI : To be implemented

  const [posts, setPosts] = useState([]);

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

  const onClick = () => {};
  return (
    <>
      <List>
        {posts.map((post, index) => (
          <ListItem key={index}>
            <Post post={post}>{post["content"]}</Post>
          </ListItem>
        ))}
        {/* // <ListItem>
        //   <Post postId={1} />
        // </ListItem>
        // <ListItem>
        //   <Post />
        // </ListItem>
        // <ListItem>
        //   <Post />
        // </ListItem>
        // <ListItem>
        //   <Post />
        // </ListItem> */}
      </List>
    </>
  );
}

export default PostList;
