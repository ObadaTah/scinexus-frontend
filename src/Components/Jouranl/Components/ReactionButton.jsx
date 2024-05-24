import { ReactionBarSelector } from "@charkour/react-reactions";
import { useState } from "react";
import { Image } from "react-bootstrap";

import ASSETS from "../../../assets/Assets";
import "./style.css";
const reactions = [
    {
        label: "Like",
        node: (
            <>
                <Image src={ASSETS.emojis.like} alt="like" width="30" />
            </>
        ),
    },
    {
        label: "Smart",
        node: (
            <>
                <Image src={ASSETS.emojis.smart} alt="smart" width="30" />
            </>
        ),
    },
    {
        label: "Angry",
        node: (
            <>
                <Image src={ASSETS.emojis.angry} alt="angry" width="30" />
            </>
        ),
    },
    {
        label: "Intrested",
        node: (
            <>
                <Image src={ASSETS.emojis.looking} alt="looking" width="30" />
            </>
        ),
    },
    {
        label: "Mind Blowing",
        node: (
            <>
                <Image
                    src={ASSETS.emojis.mindBlowing}
                    alt="mindBlowing"
                    width="30"
                />
            </>
        ),
    },
    {
        label: "Taking Notes",
        node: (
            <>
                <Image
                    src={ASSETS.emojis.takingNotes}
                    alt="takingNotes"
                    width="30"
                />
            </>
        ),
    },
];

function ReactionButton(props) {
    const [showReactionsHolder, setShowReactionsHolder] = useState("none");
    const [selectedReaction, setSelectedReaction] = useState(null);

    const reaction = (key) => {
        setShowReactionsHolder("none");
        reactions.map((reaction) => {
            if (selectedReaction != null && selectedReaction.label == key) {
                // remove Reaction
                setSelectedReaction(null);
                return;
            }
            if (reaction.label === key) {
                // add Reaction
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
                style={{
                    display: showReactionsHolder,
                }}
            >
                <ReactionBarSelector
                    // key="reactionsHolder"
                    style={{ border: "1px solid rgb(0, 0, 0, 0.1" }}
                    iconSize={"10px"}
                    reactions={reactions}
                    onSelect={(key) => reaction(key)}
                />
            </div>
            {selectedReaction == null ? (
                <div
                    className="reactionButton"
                    onClick={() => toggleReactionsHolder()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#000000"}
                        fill={"none"}
                    >
                        <path
                            d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            ) : (
                <div
                    className="reactionButton"
                    onClick={() => toggleReactionsHolder()}
                >
                    {selectedReaction.node}
                </div>
            )}
        </>
    );
}

export default ReactionButton;
