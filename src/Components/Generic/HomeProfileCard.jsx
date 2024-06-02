import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemDecorator,
  Button,
  Avatar,
} from "@mui/joy";
import { styled } from "@mui/material/styles";
import MailIcon from "@mui/icons-material/Mail";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";
const StyledListItem = styled(ListItem)({
  "&:hover": {
    backgroundColor: "#f4f4f4", // Adjust hover background color as needed
  },
  cursor: "pointer",
  color: "#185ea5",
  fontWeight: "bold",
  borderRadius: "10px",
});

const HomeProfileCard = () => {
  const { user } = useUser();
  console.log("User:", user);

  const { jwtToken } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    researchPapers: 0,
    articles: 0,
    posts: 0,
  });
  const { journalModalOpen, setJournalModalOpen } = useStateContext();

  useEffect(() => {
    if (!user.id || !jwtToken) return;
    async function fetchData(endpoint) {
      try {
        const response = await fetch(
          `http://localhost:8080/${endpoint}/count/${user.id}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.count;
      } catch (error) {
        console.error(`Error fetching ${endpoint} count`, error);
        return 0;
      }
    }

    Promise.all([
      fetchData("researchpapers"),
      fetchData("articles"),
      fetchData("posts"),
    ]).then(([researchPapers, articles, posts]) => {
      setCounts({ researchPapers, articles, posts });
    });
  }, [user.id, jwtToken]);

  return (
    <Card
      style={{
        position: { xs: "relative", md: "sticky" },
        top: { xs: "relative", md: "sticky" },
      }}
      variant="outlined"
      sx={{
        // width: "100%",
        padding: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row", md: "column" },
        alignItems: "left",
        // alignSelf: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Avatar
          src={user.profilePicture || "/path/to/default-picture.jpg"}
          alt={`${user.firstName} ${user.lastName}`}
          sx={{ width: 80, height: 80, borderRadius: "50%" }}
        />
        <Typography level="h5" sx={{ mt: 1, mb: 2 }}>
          {user.firstName} {user.lastName}
        </Typography>
      </div>
      <List sx={{ width: "100%", padding: 0, mb: 2 }}>
        <StyledListItem onClick={() => navigate("/nexus")}>
          <ListItemDecorator>
            <PeopleOutlineOutlinedIcon />
          </ListItemDecorator>
          My Nexus
        </StyledListItem>
        <ListItem sx={{ pl: 6 }}>Links: 4</ListItem>
        <ListItem sx={{ pl: 6 }}>
          Research Papers: {counts.researchPapers}
        </ListItem>
        <ListItem sx={{ pl: 6 }}>Articles: {counts.articles}</ListItem>
        <ListItem sx={{ pl: 6 }}>Posts: {counts.posts}</ListItem>
      </List>
      <List sx={{ width: "100%", padding: 0, mb: 2 }}>
        <StyledListItem onClick={() => navigate("/chatting")}>
          <ListItemDecorator>
            <MailIcon />
          </ListItemDecorator>
          Messages
        </StyledListItem>
        <StyledListItem onClick={() => navigate("/profile")}>
          <ListItemDecorator>
            <AccountCircleIcon />
          </ListItemDecorator>
          Profile
        </StyledListItem>
      </List>
      <Button
        variant="solid"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => {
          setJournalModalOpen(true);
        }}
      >
        UPLOAD
      </Button>
    </Card>
  );
};

export default HomeProfileCard;
