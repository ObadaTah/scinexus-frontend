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
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                            >
                                R
                            </Avatar>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />

                    <CardContent>
                        <Typography paragraph>Validated By:</Typography>
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
