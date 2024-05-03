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
import Collapse from "@mui/material/Collapse";
import ForumIcon from "@mui/icons-material/Forum";

import { red } from "@mui/material/colors";
import React from "react";
import OpinionButton from "../Opinion/OpinionButton";
import OpinionsContainer from "../Opinion/OpinionsContainer";
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    // transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
function Post(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
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
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <OpinionButton />
                    </ExpandMore>
                </Grid>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <OpinionsContainer></OpinionsContainer>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default Post;
