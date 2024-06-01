import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  DialogTitle,
  Drawer,
  Dropdown,
  IconButton,
  Input,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import Badge from "@mui/material/Badge";
import { useAuth } from "/src/Components/contexts/AuthContext";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import { useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import NewJournalModal from "/src/Components/Jouranl/Components/NewJournalModal";
import NotificationList from "/src/Components/Generic/NotificationList";

import {
  HelpRounded as HelpRoundedIcon,
  LogoutRounded as LogoutRoundedIcon,
  MenuRounded as MenuRoundedIcon,
  OpenInNewRounded as OpenInNewRoundedIcon,
  SearchRounded as SearchRoundedIcon,
  SettingsRounded as SettingsRoundedIcon,
  NotificationsNone as NotificationsNoneIcon,
} from "@mui/icons-material";
import { useEffect } from "react";

import Logo from "/src/assets/svg/logoText.svg";
import styles from "./Navbar.module.css";
import TeamNav from "./Navigation";
import { useUser } from "../contexts/UserContext";

export default function Navbar({
  email = "switi.2003@gmail.com",
  notifications,
  name = "Mohamemd Sowiaty",
  messages,
  bgColor,
}) {
  const [open, setOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const { logout, jwtToken, user } = useAuth();
  const [data, setData] = useState([]);
  const [journalModalOpen, setJournalModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchName() {
      try {
        // Assuming you have a function to get the JWT token from cookies
        const response = await fetch("http://localhost:8080/users/userinfo", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("User data:", data);
        setData(data);
        // Handle redirection here
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchName();
  }, []);
  useEffect(() => {
    async function getNotifications() {
      try {
        const response = await fetch(
          `http://localhost:8080/push-notifications`,
          {
            method: "GET",
            headers: {
              Connection: "keep-alive",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Error fetching journals:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching journals:", error);
      } finally {
        console.log("Notifications fetched eeeeeeeeee");
      }
    }
    getNotifications();
  }, []);
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const handleConnectionClick = () => {
    navigate("/connections");
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const handleMessagesClick = () => {
    navigate("/chatting");
    // setIsMessagesOpen(!isMessagesOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: { xs: "space-between", md: "center" },
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: { xs: 3, sm: 0 },
        paddingRight: { xs: 3, sm: 0 },
        backgroundColor: bgColor ? bgColor : "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", // Add bottom box shadow
        position: "relative",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          display: { xs: "none", sm: "flex" },
        }}
      >
        <img src={Logo} alt="logo" className={styles.logo} />
        <Button
          variant="plain"
          color="neutral"
          component="a"
          onClick={handleHomeClick}
          size="md"
          sx={{ alignSelf: "center" }}
        >
          HOME
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          // onClick={handleUploadClick}
          size="md"
          sx={{ alignSelf: "center" }}
          onClick={() => setJournalModalOpen(true)}
        >
          UPLOAD
        </Button>
        <NewJournalModal
          open={journalModalOpen}
          onClose={() => setJournalModalOpen(false)}
        />
        <Button
          variant="plain"
          color="neutral"
          component="a"
          onClick={handleConnectionClick}
          size="md"
          sx={{ alignSelf: "center" }}
        >
          CONNECTIONS
        </Button>
      </Stack>
      <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>
            <img src={Logo} alt="logo" className={styles.logo} />
          </DialogTitle>
          <Box sx={{ px: 1 }}>
            <TeamNav />
          </Box>
        </Drawer>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Input
          size="md"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          sx={{
            alignSelf: "center",
            width: "25vw",
            height: "45px",
            display: { xs: "none", sm: "flex" },
          }}
        />
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            alignSelf: "center",
          }}
        >
          <SearchRoundedIcon />
        </IconButton>

        <Dropdown>
          <MenuButton
            variant="plain"
            color="neutral"
            component="a"
            onClick={handleNotificationClick}
            size="md"
            sx={{ alignSelf: "center" }}
          >
            {/* <Badge badgeContent={4} color="error"> */}
            <NotificationsNoneIcon sx={{ fontSize: "32px" }} />
            {/* </Badge> */}
          </MenuButton>
          <Menu
            placement="bottom-start"
            sx={{
              marginTop: "20px !important",
              width: { xs: "90%", sm: "23%" },
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <p className={styles.paragraph}>Notifications</p>
            <ListDivider />
            <NotificationList />
          </Menu>
        </Dropdown>

        <Dropdown>
          <MenuButton
            variant="plain"
            color="neutral"
            component="a"
            open={isMessagesOpen}
            onClick={handleMessagesClick}
            size="md"
            sx={{ alignSelf: "center" }}
          >
            <Badge badgeContent={0} color="error">
              {!isMessagesOpen ? (
                <MarkunreadOutlinedIcon
                  sx={{
                    fontSize: "32px", // Adjust the size here
                  }}
                />
              ) : (
                <DraftsOutlinedIcon
                  sx={{
                    fontSize: "32px", // Adjust the size here
                  }}
                />
              )}
            </Badge>
          </MenuButton>
        </Dropdown>

        <Dropdown>
          <MenuButton
            variant="plain"
            size="md"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              src={`http://localhost:8080/medias/${data.profilePicture?.id}/files`}
              // srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ maxWidth: "32px", maxHeight: "32px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="md"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={`http://localhost:8080/medias/${data.profilePicture?.id}/files`}
                  // srcSet="https://i.pravatar.cc/80?img=2"
                  sx={{ borderRadius: "50%" }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    {name}
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {email}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem onClick={() => navigate("/profile")}>
              <PersonOutlinedIcon />
              My Profile
            </MenuItem>
            <MenuItem>
              <HelpRoundedIcon />
              Help
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>
            <ListDivider />

            <MenuItem
              component="a"
              href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
            >
              Sourcecode
              <OpenInNewRoundedIcon />
            </MenuItem>
            <ListDivider />
            <MenuItem onClick={logout}>
              <LogoutRoundedIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}
