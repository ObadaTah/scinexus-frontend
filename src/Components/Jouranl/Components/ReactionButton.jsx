import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";

import { useState } from "react";
import ASSETS from "../../../assets/Assets";
import { Container } from "@mui/material";
import "./style.css";
import { ReactionBarSelector } from "@charkour/react-reactions";
import { Image } from "react-bootstrap";
import { key } from "localforage";
const reactions = [
    {
        label: "Like",
        node: <Image src={ASSETS.emojis.like} alt="like" width="30" />,
    },
    {
        label: "Smart",
        node: <Image src={ASSETS.emojis.smart} alt="smart" width="30" />,
    },
    {
        label: "Angry",
        node: <Image src={ASSETS.emojis.angry} alt="angry" width="30" />,
    },
    {
        label: "Intrested",
        node: <Image src={ASSETS.emojis.looking} alt="looking" width="30" />,
    },
    {
        label: "Mind Blowing",
        node: (
            <Image
                src={ASSETS.emojis.mindBlowing}
                alt="mindBlowing"
                width="30"
            />
        ),
    },
    {
        label: "Taking Notes...",
        node: (
            <Image
                src={ASSETS.emojis.takingNotes}
                alt="takingNotes"
                width="30"
            />
        ),
    },
];

function ReactionButton(props) {
    const [showReactionsHolder, setShowReactionsHolder] = useState("none");
    const [selectedReaction, setSelectedReaction] = useState(null);

    const reaction = (key) => {
        console.log(key);
        setShowReactionsHolder("none");
        reactions.map((reaction) => {
            if (selectedReaction != null && selectedReaction.label == key) {
                setSelectedReaction(null);
                return;
            }
            if (reaction.label === key) {
                setSelectedReaction(reaction);
            }
        });
        // setSelectedReaction(key);
    };
    const toggleReactionsHolder = () => {
        const reactionsHolder = document.getElementById("reactionsHolder");
        console.log(reactionsHolder);
        if (showReactionsHolder === "none") {
            setShowReactionsHolder("block");
            // showReactionsHolder = "block";
        } else {
            setShowReactionsHolder("none");
            // showReactionsHolder = "none";
        }
    };
    return (
        <>
            <div
                className="reactionsHolder"
                id="reactionsHolder"
                style={{ display: showReactionsHolder }}
            >
                <ReactionBarSelector
                    key="reactionsHolder"
                    iconSize={"24px"}
                    reactions={reactions}
                    onSelect={(key) => reaction(key)}
                />
            </div>
            {selectedReaction == null ? (
                <FavoriteBorderIcon
                    className="reactionButton"
                    onClick={() => toggleReactionsHolder()}
                />
            ) : (
                <div
                    className="reactionButton"
                    onClick={() => toggleReactionsHolder()}
                >
                    {selectedReaction.node}
                </div>

                // <Image
                //     src={reactions[selectedReaction].node.props.src}
                //     alt={reactions[selectedReaction].label}
                //     width="40"
                // />
            )}
        </>
    );
}

export default ReactionButton;
