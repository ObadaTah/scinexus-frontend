import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";
import React from "react";
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";
import IconAndText from "./IconAndText";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
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
                <Typography variant="h5">Validated By:</Typography>
                <Grid container spacing={0.1} rowGap={-0.1}>
                    {props.organizations.map((organization, index) => {
                        return (
                            <>
                                <Grid item xs={3} key={index}>
                                    <IconAndText
                                        text={organization.name}
                                        iconSrc={organization.image}
                                    />
                                </Grid>
                            </>
                        );
                    })}
                </Grid>

                <Typography variant="h5">Contributors</Typography>
                <Grid container spacing={0.1} rowGap={-0.1}>
                    {props.contributors.map((contributor, index) => {
                        return (
                            <Grid item xs={3} key={index}>
                                <IconAndText
                                    text={contributor.name}
                                    iconSrc={contributor.image}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
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
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Grid>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h4">
                        {props.content.header}:
                    </Typography>
                    <Typography paragraph>{props.content.paragraph}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default ResearchPaper;
