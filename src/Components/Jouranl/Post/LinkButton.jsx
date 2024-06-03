import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/joy";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

function LinkButton({ id, ...props }) {
  const { jwtToken } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  async function getStatus() {
    console.log(user);
    if (user.id === id) {
      setStatus("SELF");
      return;
    }
    if (!jwtToken) return;
    if (!user.id) return;
    setLoading(true);
    await fetch(`http://localhost:8080/users/links/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);

        if (data.accepted === true) {
          setStatus("LINKED");
          return;
        } else if (data.linksFrom.id === user.id && data.accepted === null)
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
    console.log("STATUS: " + status);
    getStatus();
    console.log("STATUS: " + status);
  }, [jwtToken, user.id]);
  let connect = () => {
    setLoading(true);
    // console.log(loading);
    // console.log(loading);
    if (status === "LINKED" || status === "SENT") {
      fetch(`http://localhost:8080/users/links/${id}`, {
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
      fetch(`http://localhost:8080/users/links/${id}/response/true`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ answer: true }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (status === "NOTHING") {
      console.log("LINKING: " + id);
      fetch(`http://localhost:8080/users/links/${id}`, {
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
      setLoading(false);
    }
    setTimeout(() => {
      getStatus();
    }, 500);
  };

  return (
    <Button
      variant="solid"
      color={
        status === "LINKED"
          ? "danger"
          : status === "SENT"
          ? "warning"
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
      // loading={loading !== undefined ? loading : false}
      // loadingIndicator={<CircularProgress color="inherit" size={16} />}

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
      {loading ? <CircularProgress /> : null}
      {status === "LINKED"
        ? "Unlink"
        : status === "SENT"
        ? "Unsend"
        : status === "RECEIVED"
        ? "Accept"
        : status === "NOTHING"
        ? "Link"
        : status === "SELF"
        ? "It is You :)"
        : null}
    </Button>
  );
}

export default LinkButton;
