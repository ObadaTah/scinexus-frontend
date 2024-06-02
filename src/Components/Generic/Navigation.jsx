import * as React from "react";
import Chip from "@mui/joy/Chip";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { useNavigate } from "react-router-dom";

import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import { useStateContext } from "../contexts/StateContext";

export default function Navigation() {
  const navigate = useNavigate();

  const { journalModalOpen, setJournalModalOpen } = useStateContext();
  return (
    <List
      size="sm"
      sx={{ "--ListItem-radius": "var(--joy-radius-sm)", "--List-gap": "4px" }}
    >
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
          Browse
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/profile");
              }}
            >
              <ListItemDecorator>
                <PeopleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>My Profile</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/chatting");
              }}
            >
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Messages</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() => {
                setJournalModalOpen(true);
              }}
            >
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <TodayRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Upload</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
