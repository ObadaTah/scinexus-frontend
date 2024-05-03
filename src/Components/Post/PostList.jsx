import { List, ListItem } from "@mui/material";
import Post from "./Post";
import { useEffect, useState } from "react";

function PostList() {
  // TBI : To be implemented

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
