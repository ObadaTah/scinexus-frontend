import { useState } from "react";
import OpinionsModal from "./OpinionsModal";
import OpinionsContainer from "./OpinionsContainer";
import Container from "@mui/material/Container";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Typography } from "@mui/joy";
function OpinionButton(props) {
    // TBI : To be implemented
    const [open, setOpen] = useState(false);

    return (
        <>
            <ChatBubbleOutlineOutlinedIcon
                onClick={() => {
                    setOpen(true);
                }}
            ></ChatBubbleOutlineOutlinedIcon>
            <div
                style={{
                    backgroundColor: "red",
                    borderRadius: "100%",
                    aspectRatio: "1/1",
                    width: "15px",
                    height: "15px",
                    position: "absolute",
                    top: "-2px",
                    right: "70px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "10px",
                }}
            >
                {props.opinionCountState}
            </div>
            <Typography style={{ marginLeft: 5 }}>Opinions</Typography>
            <OpinionsContainer
                setOpinions={props.setOpinions}
                opinions={props.opinions}
                setOpinionCountState={props.setOpinionCountState}
                opinionCountState={props.opinionCountState}
                journalId={props.journalId}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
}

export default OpinionButton;
