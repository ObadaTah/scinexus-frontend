import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import ReactionButton from "../Components/ReactionButton";
import SendButton from "../Components/SendButton";
import { red } from "@mui/material/colors";

function Opinion(props) {
    return (
        <>
            <Container>
                <Card sx={{ width: "100%" }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                src={
                                    props.publisher.profilePicture != null
                                        ? props.publisher.profilePicture
                                              .fileName
                                        : null
                                }
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                            >
                                {props.publisher.firstName[0]}
                            </Avatar>
                        }
                        title={
                            props.publisher.firstName +
                            " " +
                            props.publisher.lastName
                        }
                        subheader="September 14, 2016"
                    />

                    <CardContent>
                        <Typography paragraph>{props.content}</Typography>
                        <Typography paragraph>
                            {props.papaOpinion ? papa : null}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Grid>
                            <IconButton aria-label="add to favorites">
                                <ReactionButton journalId={props.journalId} />
                            </IconButton>
                        </Grid>
                    </CardActions>
                </Card>
            </Container>
        </>
    );
}
export default Opinion;
