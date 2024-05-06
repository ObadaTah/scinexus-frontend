import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import JournalCardHeader from "../Components/JournalCardHeader";

import { styled } from "@mui/material/styles";
import React from "react";
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";
import OpinionButton from "../Opinion/OpinionButton";
import OpinionsContainer from "../Opinion/OpinionsContainer";
import IconAndText from "./IconAndText";

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
function ResearchPaper(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // const onClick = () => {};
    return (
        <Card sx={{ width: "100%" }}>
            <JournalCardHeader
                publisher={props.publisher}
                publishDate={props.publishDate}
            />
            {props.image != null ? (
                <CardMedia
                    // component="img"
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
                    // image={props.image}
                />
            ) : null}
            <CardContent>
                <Typography variant="h4">{props.title}</Typography>
                {/* <Typography variant="h5">Validated By:</Typography>
                <Grid container spacing={0.1} rowGap={-0.1}>
                    {props.organizations.map((organization, index) => {
                        return (
                            <Grid item xs={3} key={index}>
                                <IconAndText
                                    text={organization.name}
                                    iconSrc={organization.image}
                                />
                            </Grid>
                        );
                    })}
                </Grid> */}

                <Typography variant="body1">
                    {props.contributors.length > 0 ? "Contributors:" : null}
                </Typography>
                <Grid container spacing={0.1} rowGap={-0.1}>
                    {props.contributors.map((contributor, index) => {
                        return (
                            <Grid item xs={3} key={index}>
                                <IconAndText
                                    text={
                                        contributor.firstName +
                                        " " +
                                        contributor.lastName
                                    }
                                    iconSrc={
                                        contributor.profilePicture != null
                                            ? contributor.profilePicture
                                                  .fileName
                                            : null
                                    }
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container>
                    <Grid item xs={6}>
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
                        >
                            <OpinionButton />
                        </ExpandMore>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                        <Button color="primary" variant="contained">
                            Read Full Text
                        </Button>
                    </Grid>
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

export default ResearchPaper;
