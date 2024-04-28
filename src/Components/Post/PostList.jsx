import { List, ListItem } from "@mui/material";
import Post from "./Post";

function PostList() {
    // TBI : To be implemented

    const onClick = () => {};
    return (
        <>
            <List>
                <ListItem>
                    <Post postId={1} />
                </ListItem>
                <ListItem>
                    <Post />
                </ListItem>
                <ListItem>
                    <Post />
                </ListItem>
                <ListItem>
                    <Post />
                </ListItem>
            </List>
        </>
    );
}

export default PostList;
