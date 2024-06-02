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
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useState, useEffect } from "react";
import NewJournalModal from "/src/Components/Jouranl/Components/NewJournalModal";
import NotificationList from "/src/Components/Generic/NotificationList";
import Logo from "/src/assets/svg/logoText.svg";
import styles from "./Navbar.module.css";
import TeamNav from "./Navigation";
import { useUser } from "../contexts/UserContext";
import { useStateContext } from "../contexts/StateContext";

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
  const { journalModalOpen, setJournalModalOpen } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchName() {
      try {
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
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchName();
  }, [jwtToken]);

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
      }
    }
    getNotifications();
  }, [jwtToken]);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const handleConnectionClick = () => {
    navigate("/connections");
  };

  const handelSearchClick = () => {
    navigate("/search");
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleMessagesClick = () => {
    navigate("/chatting");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "space-between", md: "space-between" },
        alignItems: "center",
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: { xs: 3, sm: 0 },
        paddingRight: { xs: 3, sm: 0 },
        backgroundColor: bgColor ? bgColor : "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", md: "flex-start" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            paddingLeft: {
              xs: "25%",
              sm: "38%",
              md: "30%",
              lg: "40%",
              xl: "50%",
            },
          }}
        >
          <img
            src={Logo}
            alt="logo"
            className={styles.logo}
            style={{ cursor: "pointer", width: "200px", height: "50px" }}
            onClick={handleHomeClick}
          />
        </Box>
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
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
        sx={{
          display: { xs: "none", sm: "flex" },
          paddingRight: {
            xs: "0%",
            sm: "0%",
            md: "0%",
            lg: "10%",
            xl: "20%",
          },
          paddingLeft: {
            xs: "0%",
            sm: "0%",
            md: "3%",
          },
        }}
      >
        <Button
          variant="plain"
          color="neutral"
          component="a"
          onClick={handleHomeClick}
          size="lg"
          sx={{ alignSelf: "center" }}
        >
          HOME
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="false"
          component="a"
          size="lg"
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
          size="lg"
          sx={{ alignSelf: "center" }}
        >
          CONNECTIONS
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          onClick={handelSearchClick}
          sx={{
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
            <NotificationsNoneIcon sx={{ fontSize: "32px" }} />
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
            <Typography className={styles.paragraph}>Notifications</Typography>
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
                    fontSize: "32px",
                  }}
                />
              ) : (
                <DraftsOutlinedIcon
                  sx={{
                    fontSize: "32px",
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
