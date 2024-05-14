import { Grid } from "@mui/material";
// import Card from "@mui/material/Card";
import Card from "@mui/joy/Card";

// import { Elevation } from "@blueprintjs/core";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/material/Typography";
import { Divider } from "@nextui-org/divider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { styled } from "@mui/material/styles";
import React from "react";
import JournalCardHeader from "../Components/JournalCardHeader";
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";
import OpinionButton from "../Opinion/OpinionButton";
import OpinionsContainer from "../Opinion/OpinionsContainer";
// import { Container } from "@mui/joy";

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
        <Card
            sx={{
                maxWidth: 600,
                margin: "auto",
                marginTop: "20px",
                "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                },
                "--Card-radius": "15px",
            }}
            color="neutral"
            invertedColors
            orientation="ho"
            size="sm"
            variant="soft"
        >
            <JournalCardHeader
                publisher={props.publisher}
                publishDate={props.publishDate}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.content}
                    {props.content}
                    {props.content}
                </Typography>
            </CardContent>
            {props.image != null ? (
                <CardMedia
                    children={
                        <img
                            style={{
                                width: "100%",
                                maxHeight: "500px",
                                objectFit: "cover",
                            }}
                            src={
                                "http://localhost:8080/medias/" +
                                props.image.id +
                                "/files"
                            }
                            alt="Paella dish"
                        />
                    }
                />
            ) : null}
            <Divider style={{ margin: "10px" }} />
            <Container>
                <Row>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            height: "40px",
                        }}
                    >
                        <IconButton>
                            <ReactionButton journalId={props.journalId} />
                        </IconButton>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            height: "40px",
                        }}
                    >
                        <IconButton aria-label="share">
                            <SendButton journalId={props.journalId} />
                        </IconButton>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            height: "40px",
                        }}
                    >
                        <div>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <OpinionButton />
                            </ExpandMore>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <OpinionsContainer journalId={props.journalId} />
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default Post;
