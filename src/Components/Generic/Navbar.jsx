import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";
import { useAuth } from "/src/Components/contexts/AuthContext";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import { useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  SearchRounded as SearchRoundedIcon,
  DarkModeRounded as DarkModeRoundedIcon,
  LightModeRounded as LightModeRoundedIcon,
  BookRounded as BookRoundedIcon,
  LanguageRounded as LanguageRoundedIcon,
  SettingsRounded as SettingsRoundedIcon,
  HelpRounded as HelpRoundedIcon,
  OpenInNewRounded as OpenInNewRoundedIcon,
  LogoutRounded as LogoutRoundedIcon,
  MenuRounded as MenuRoundedIcon,
} from "@mui/icons-material";

import Logo from "/src/assets/svg/logo.svg";
import styles from "./Navbar.module.css";
import TeamNav from "./Navigation";

export default function Navbar({
  email = "switi.2003@gmail.com",
  notifications,
  name = "Mohamemd Sowiaty",
  messages,
}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const { logout } = useAuth();

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
    setIsMessagesOpen(!isMessagesOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        paddingTop: 2,
        paddingBottom: 3,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", // Add bottom box shadow
        "@media (max-width: 1280px)": {
          justifyContent: "space-between", // Apply space-between for wider screens
        },
        position: "relative", // Add this to the parent container
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
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
          onClick={handleUploadClick}
          size="md"
          sx={{ alignSelf: "center" }}
        >
          UPLOAD
        </Button>
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
          <DialogTitle>Acme Co.</DialogTitle>
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
            display: {
              xs: "none",
              sm: "flex",
            },
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
            <Badge badgeContent={4} color="error">
              <NotificationsNoneIcon
                sx={{
                  fontSize: "32px", // Adjust the size here
                }}
              />
            </Badge>
          </MenuButton>
          <Menu
            placement="bottom-start"
            sx={{
              marginTop: "20px !important",
              width: "23%",
              mw: "17%",
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
            PopperProps={{
              modifiers: [
                {
                  name: "flip",
                  options: {
                    flipVariations: false, // true by default
                  },
                },
              ],
            }}
          >
            <p className={styles.paragraph}>Notificaitons</p>
            <ListDivider />
            <MenuItem>Notification 1</MenuItem>
            <MenuItem>Notification 2</MenuItem>
            <MenuItem>Notification 3</MenuItem>
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
            <Badge badgeContent={4} color="error">
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
          <Menu
            placement="bottom-start"
            sx={{
              marginTop: "20px !important",
              width: "23%",
              mw: "17%",
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
            PopperProps={{
              modifiers: [
                {
                  name: "flip",
                  options: {
                    flipVariations: false, // true by default
                  },
                },
              ],
            }}
          >
            <p className={styles.paragraph}>Chats</p>
            <ListDivider />
            <MenuItem>Message 1</MenuItem>
            <MenuItem>Message 2</MenuItem>
            <MenuItem>Message 3</MenuItem>
          </Menu>
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
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="https://i.pravatar.cc/40?img=2"
                  srcSet="https://i.pravatar.cc/80?img=2"
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
            <MenuItem component="a" href="/blog/first-look-at-joy/">
              First look at Joy UI
              <OpenInNewRoundedIcon />
            </MenuItem>
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
