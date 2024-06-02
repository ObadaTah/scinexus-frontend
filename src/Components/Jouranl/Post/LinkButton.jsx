import { useEffect, useState } from "react";
import { Button } from "@mui/joy";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

function LinkButton(props) {
    const { jwtToken } = useAuth();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    function getStatus() {
        console.log(user);
        if (user.id === props.id) {
            setStatus("SELF");
            return;
        }
        fetch(`http://localhost:8080/users/links/${props.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.accepted === true) {
                    setStatus("LINKED");
                    return;
                } else if (
                    data.linksFrom.id === user.id &&
                    data.accepted === null
                )
                    setStatus("SENT");
                else if (data.linksTo.id === user.id && data.accepted === null)
                    setStatus("RECEIVED");
            })
            .catch((error) => {
                console.error("Error:", error);
                setStatus("NOTHING");
            });
    }
    useEffect(() => {
        setLoading(true);
        getStatus();
        setLoading(false);
    }, []);
    let connect = () => {
        // setLoading(true);
        // console.log(loading);
        // console.log(loading);
        if (status === "LINKED" || status === "SENT") {
            fetch(`http://localhost:8080/users/links/${props.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else if (status === "RECEIVED") {
            fetch(
                `http://localhost:8080/users/links/${props.id}/response/true`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify({ answer: true }),
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else if (status === "NOTHING") {
            fetch(`http://localhost:8080/users/links/${props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({}),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        setTimeout(() => {
            getStatus();
        }, 500);
        setLoading(false);
    };

    return (
        <Button
            variant="solid"
            color={
                status === "LINKED"
                    ? "danger"
                    : status === "SENT"
                    ? "danger"
                    : status === "RECEIVED"
                    ? "success"
                    : status === "NOTHING"
                    ? "primary"
                    : "ERORR"
            }
            sx={{ fontSize: "inherit", fontWeight: "inherit" }}
            onClick={() => {
                setLoading(true);

                connect();
            }}
            loading={loading}
            disabled={
                !(
                    status === "LINKED" ||
                    status === "SENT" ||
                    status === "RECEIVED" ||
                    status === "NOTHING"
                ) ||
                status === "SELF" ||
                loading
            }
        >
            {loading
                ? "Just a sec..."
                : status === "LINKED"
                ? "Unlink"
                : status === "SENT"
                ? "Unsend"
                : status === "RECEIVED"
                ? "Accept Link"
                : status === "NOTHING"
                ? "Link"
                : status === "SELF"
                ? "It is You :)"
                : "Just a sec..."}
        </Button>
    );
}

export default LinkButton;
