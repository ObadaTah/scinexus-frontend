import { ReactionBarSelector } from "@charkour/react-reactions";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useAuth } from "../../../Components/contexts/AuthContext";

import ASSETS from "../../../assets/Assets";
import "./style.css";

const reactions = [
    {
        label: "Like",
        serverKey: "LIKE",
        node: <Image src={ASSETS.emojis.like} alt="like" width="30" />,
    },
    {
        label: "Smart",
        serverKey: "SMART",
        node: <Image src={ASSETS.emojis.smart} alt="smart" width="30" />,
    },
    {
        label: "Angry",
        serverKey: "ANGRY",
        node: <Image src={ASSETS.emojis.angry} alt="angry" width="30" />,
    },
    {
        label: "Interested",
        serverKey: "INTERESTED",
        node: <Image src={ASSETS.emojis.looking} alt="looking" width="30" />,
    },
    {
        label: "Mind Blowing",
        serverKey: "MIND_BLOWING",
        node: (
            <Image
                src={ASSETS.emojis.mindBlowing}
                alt="mindBlowing"
                width="30"
            />
        ),
    },
    {
        label: "Taking Notes",
        serverKey: "TAKING_NOTES",
        node: (
            <Image
                src={ASSETS.emojis.takingNotes}
                alt="takingNotes"
                width="30"
            />
        ),
    },
];

function ReactionButton({ reactionFromType, reactToId }) {
    const [showReactionsHolder, setShowReactionsHolder] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const { jwtToken, user } = useAuth();
    const [reaction, setReaction] = useState(null);
    const addInteraction = async (type, data, id) => {
        const response = await fetch(
            `http://localhost:8080/interactions/${
                type === "journal" ? "journal" : "opinion"
            }/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(data),
            }
        );
        if (response.ok) return response.json();
        return null;
    };

    const removeInteraction = async (id) => {
        const response = await fetch(
            `http://localhost:8080/interactions/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
        // console.log(response);
        // if (response.ok) return response.json();
        return null;
    };

    const getInteraction = async (type, reactionToId) => {
        const response = await fetch(
            `http://localhost:8080/${
                type === "journal" ? "journals" : "opinions"
            }/${reactionToId}/interactions`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );

        if (response.ok) return response.json();
        return null;
    };

    const reactioner = (key) => {
        setShowReactionsHolder(false);
        if (selectedReaction?.label === key) {
            removeInteraction(reaction.id).then(() => {
                setSelectedReaction(null);
                setReaction(null);
            });
            return;
        }

        const newReaction = reactions.find(
            (reaction) => reaction.label === key
        );
        if (newReaction) {
            setSelectedReaction(newReaction);
            addInteraction(
                reactionFromType,
                { type: newReaction.serverKey },
                reactToId
            ).then((result) => {
                setReaction(result);
            });
        }
    };

    const toggleReactionsHolder = () => {
        setShowReactionsHolder((prev) => !prev);
    };

    useEffect(() => {
        getInteraction(reactionFromType, reactToId).then((result) => {
            if (
                result._embedded &&
                result._embedded.interactionList.length > 0
            ) {
                result._embedded.interactionList.map((interaction) => {
                    var existingReaction = null;
                    if (interaction.interactorUser.email == user.USER.email) {
                        existingReaction = reactions.find(
                            (reaction) =>
                                reaction.serverKey === interaction.type
                        );
                        setSelectedReaction(existingReaction);
                        setReaction(interaction);
                    }
                });
            }
        });
    }, [reactionFromType, reactToId]);

    return (
        <>
            {showReactionsHolder && (
                <div className="reactionsHolder" id="reactionsHolder">
                    <ReactionBarSelector
                        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                        iconSize={"30px"}
                        reactions={reactions}
                        onSelect={(key) => reactioner(key)}
                    />
                </div>
            )}
            <div className="reactionButton" onClick={toggleReactionsHolder}>
                {selectedReaction ? (
                    selectedReaction.node
                ) : (
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
                )}
            </div>
        </>
    );
}

export default ReactionButton;
