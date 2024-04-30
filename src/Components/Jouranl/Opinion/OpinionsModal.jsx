import {
    Backdrop,
    Box,
    Button,
    Fade,
    List,
    ListItem,
    Modal,
    Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

import React from "react";
import { Container } from "react-bootstrap";
import Opinion from "./Opinion";
const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: "inset 24px",
    p: 4,
};
function Opinions(props) {
    const opinions = [
        {
            publisher: {
                username: "UserName",
                image: "https://placehold.co/40x40",
            },
            content: "This is a dummy post",
            publishDate: "2021-10-10",
        },
        {
            publisher: {
                username: "UserName",
                image: "https://placehold.co/40x40",
            },
            content: "This is a dummy post",
            publishDate: "2021-10-10",
        },
        {
            publisher: {
                username: "UserName",
                image: "https://placehold.co/40x40",
            },
            content: "This is a dummy post",
            publishDate: "2021-10-10",
        },
        {
            publisher: {
                username: "UserName",
                image: "https://placehold.co/40x40",
            },
            content: "This is a dummy post",
            publishDate: "2021-10-10",
        },
        {
            publisher: {
                username: "UserName",
                image: "https://placehold.co/40x40",
            },
            content: "This is a dummy post",
            publishDate: "2021-10-10",
        },
    ];
    const [open, setOpen] = React.useState(props.open);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <ForumIcon onClick={handleOpen} />

            <Modal
                style={{ overflow: "hidden", width: "100%", height: "100%" }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade
                    in={open}
                    style={{
                        borderRadius: "20px",
                        overflowY: "scroll",

                        scrollbarWidth: "none",

                        // overflowX: "hidden",
                        maxHeight: "80vh",
                        width: "60%",
                    }}
                >
                    <Box sx={style}>
                        <div
                            style={{
                                position: "sticky",
                                top: "0",
                                // left: "0",
                                zIndex: "100",
                                backgroundColor: "white",
                                height: "100px",
                                alignContent: "center",
                            }}
                        >
                            <Typography
                                style={{
                                    backgroundColor: "white",
                                    position: "relative",
                                    top: "-32px",
                                }}
                                id="transition-modal-title"
                                variant="h4"
                                component="h2"
                            >
                                Opinions
                            </Typography>
                        </div>
                        <Container>
                            <List>
                                {opinions.map((opinion, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <Opinion
                                                publisher={opinion.publisher}
                                                content={opinion.content}
                                                publishDate={
                                                    opinion.publishDate
                                                }
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
export default Opinions;
