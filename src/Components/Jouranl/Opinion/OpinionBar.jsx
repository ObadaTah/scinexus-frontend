import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { Snackbar } from "@mui/joy";

async function authenticate() {
    const response = await fetch(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "obada@gmail.com",
                password: "Mohammed1234!",
            }),
        }
    );

    const data = await response.json();
    return data["jwtToken"];
}

function OpinionBar(props) {
    async function AddOpinion(type, data) {
        const jwt = await authenticate();
        console.log(data);
        const response = await fetch(
            "http://localhost:8080/opinions" +
                (type == "post" ? "" : "/subOpinion"),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(data),
            }
        );
        if (response.status === 200 || response.status === 201) {
            return await response.json();
        } else {
            return null;
        }
    }
    const [disabledState, setDisabledState] = React.useState(true);
    const [opinionValue, setOpinionValue] = React.useState("");
    const [open, setOpen] = React.useState(false);
    function submitOpinion() {
        setOpinionValue("");
        setDisabledState(true);
        AddOpinion(props.type, {
            content: opinionValue,
            journalId: props.opinionTo,
        }).then((result) => {
            if (result !== null) {
                if (props.type != "opinion") {
                    props.setOpinions([...props.opinions, result]);
                } else {
                    for (let i = 0; i < props.opinions.length; i++) {
                        if (props.opinions[i].id == result.papaOpinion.id) {
                            props.opinions[i].subOpinions.push(result);
                            props.setOpinions([...props.opinions]);
                            break;
                        }
                    }
                }
                setOpen(true);
                props.setOpinionCountState(props.opinionCountState + 1);
            }
        });
    }
    return (
        <>
            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                <Input
                    onChange={(e) => {
                        if (e.target.value.length > 0) {
                            setDisabledState(false);
                        } else {
                            setDisabledState(true);
                        }
                        setOpinionValue(e.target.value);
                    }}
                    value={opinionValue}
                    variant="soft"
                    size="sm"
                    placeholder={
                        props.type == "post"
                            ? "Add an Opinion..."
                            : "Reply To This Opinion..."
                    }
                    sx={{
                        flex: 1,
                        px: 2,
                        "--Input-focusedThickness": "0px",
                    }}
                />
                <Link
                    style={{ borderRadius: "5px", padding: "5px" }}
                    onClick={() => submitOpinion()}
                    disabled={disabledState}
                    underline="none"
                    role="button"
                    variant="soft"
                >
                    Post
                </Link>
            </CardContent>
            <Snackbar
                autoHideDuration={3000}
                open={open}
                variant={"solid"}
                color="success"
                onClose={(event) => {
                    setOpen(false);
                }}
            >
                Your Opinion Has Been Submited
            </Snackbar>
        </>
    );
}
export default OpinionBar;
