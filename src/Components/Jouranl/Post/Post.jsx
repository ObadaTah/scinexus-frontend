import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import React from "react";
import OpinionsModal from "../Opinion/OpinionsModal";
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";

function Post(props) {
    // const onClick = () => {};
    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            {props.image != null ? (
                <CardMedia
                    children={
                        <img
                            style={{
                                width: "100%",
                                maxHeight: "500px",
                                objectFit: "cover",
                            }}
                            src={props.image}
                            alt="Paella dish"
                        />
                    }
                />
            ) : null}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid>
                    <IconButton aria-label="add to favorites">
                        <ReactionButton journalId={props.journalId} />
                    </IconButton>
                    <IconButton aria-label="share">
                        <SendButton journalId={props.journalId} />
                    </IconButton>
                    <IconButton aria-label="share">
                        <OpinionsModal journalId={props.journalId} />
                    </IconButton>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default Post;
