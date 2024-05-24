import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Divider } from "@nextui-org/divider";

import { styled } from "@mui/material/styles";
import React from "react";
import JournalCardHeader from "../Components/JournalCardHeader";
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";
import OpinionButton from "../Opinion/OpinionButton";
import OpinionsContainer from "../Opinion/OpinionsContainer";

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
    <Card>
      <JournalCardHeader
        publisher={props.publisher}
        publishDate={props.publishDate}
      />
      {/* <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src={
                            props.publisher.profilePicture != null
                                ? props.publisher.profilePicture.fileName
                                : null
                        }
                    >
                        {props.publisher.firstName[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    props.publisher.firstName + " " + props.publisher.lastName
                }
                subheader={new Date(props.publishDate).toLocaleDateString(
                    "en-US",
                    {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    }
                )}
            /> */}
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
          {props.content}
          {props.content}
        </Typography>
      </CardContent>
      <Divider />

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
          <OpinionsContainer journalId={props.journalId} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
