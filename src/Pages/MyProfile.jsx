import React from "react";
import ProfileCard from "../Components/Generic/ProfileCard";
import AboutMeCard from "../Components/Generic/AboutMeCard";
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Button,
  Container,
  Divider,
  Link,
} from "@mui/joy";
import { styled } from "@mui/system";
import ArticleIcon from "@mui/icons-material/Article";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useUser } from "../Components/contexts/UserContext"; // Correct import path

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "var(--joy-palette-primary-main)",
  },
});

const StyledTab = styled(Tab)({
  typography: "body1",
  fontWeight: "bold",
  textTransform: "none",
  color: "var(--joy-palette-text-primary)",
  "&.Mui-selected": {
    color: "#185ea5",
  },
});

const ProfileHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "auto",
  alignItems: "center",
  marginTop: "var(--joy-spacing-4)",
  flexWrap: "wrap",
  gap: "var(--joy-spacing-2)",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const ProfileContainer = styled(Container)({
  backgroundColor: "#f9f9f9",
  padding: "var(--joy-spacing-4)",
  borderRadius: "10px",
  boxShadow: "var(--joy-shadow-md)",
  border: "1px solid #e0e0e0",
  "@media (max-width: 600px)": {
    padding: "var(--joy-spacing-2)",
  },
});

const ActionButtons = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "var(--joy-spacing-2)",
  "@media (max-width: 600px)": {
    justifyContent: "center",
    width: "100%",
  },
});

const ActionButton = styled(Button)({
  textTransform: "none",
  borderColor: "var(--joy-palette-primary-main)",
  fontWeight: 300,
  borderWidth: "1px",
  "&:hover": {
    backgroundColor: "#185ea5",
    color: "white",
  },
});

const StackedItems = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  "@media (max-width: 600px)": {
    alignItems: "flex-start",
    width: "100%",
    marginTop: "var(--joy-spacing-2)",
  },
});

function MyProfile() {
  const { user } = useUser();

  return (
    <>
      <ProfileContainer
        maxWidth="lg"
        sx={{
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <ProfileHeader>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: "auto" },
              mb: { xs: 2, sm: 0 },
              "@media (max-width: 600px)": {
                flexDirection: "column",
                alignItems: "flex-start",
              },
            }}
          >
            <Avatar
              src={
                user.profilePicture
                  ? user.profilePicture.url
                  : "/path/to/default-picture.jpg"
              } // Replace with the actual image path
              alt="Profile Picture"
              sx={{ width: 80, height: 80, mr: 2 }}
            />
            <Box>
              <Typography level="h4" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography level="body2" color="neutral">
                {user.education} · {user.position} · {user.fieldOfWork}
              </Typography>
              <Typography level="body2" color="neutral">
                Palestinian Territory ·{" "}
              </Typography>
            </Box>
          </Box>
          <StackedItems>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                "@media (max-width: 600px)": {
                  justifyContent: "flex-start",
                },
              }}
            >
              <Typography>Research Interest Score</Typography>
              <Box
                sx={{
                  mx: 1,
                  height: "1px",
                  width: "200px",
                  backgroundColor: "#d1d1d2",
                }}
              />
              <Typography>30</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                "@media (max-width: 600px)": {
                  justifyContent: "flex-start",
                  mt: 2,
                },
              }}
            >
              <Typography>Research Items</Typography>
              <Box
                sx={{
                  mx: 1,
                  height: "1px",
                  width: "180px",
                  backgroundColor: "#d1d1d2",
                }}
              />
              <Typography>0</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                "@media (max-width: 600px)": {
                  justifyContent: "flex-start",
                  mt: 2,
                },
              }}
            >
              <Typography>Articles</Typography>
              <Box
                sx={{
                  mx: 1,
                  height: "1px",
                  width: "150px",
                  backgroundColor: "#d1d1d2",
                }}
              />
              <Typography>0</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                "@media (max-width: 600px)": {
                  justifyContent: "flex-start",
                  mt: 2,
                },
              }}
            >
              <Typography>Posts</Typography>
              <Box
                sx={{
                  mx: 1,
                  height: "1px",
                  width: "100px",
                  backgroundColor: "#d1d1d2",
                }}
              />
              <Typography>0</Typography>
            </Box>
          </StackedItems>
        </ProfileHeader>

        <Divider sx={{ mb: 4, mt: 4, backgroundColor: "black" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <StyledTabs defaultValue={0}>
            <TabList
              sx={{
                display: { xs: "flex", sm: "flex" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <StyledTab>PROFILE</StyledTab>
              <StyledTab>ARTICLES</StyledTab>
              <StyledTab>Researches</StyledTab>
              <StyledTab>POSTS</StyledTab>
            </TabList>
          </StyledTabs>

          <ActionButtons
            sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
          >
            <ActionButton variant="outlined" color="primary">
              + Add research
            </ActionButton>
            <ActionButton variant="outlined" color="primary">
              + Add article
            </ActionButton>
            <ActionButton variant="outlined" color="primary">
              + Add post
            </ActionButton>
          </ActionButtons>
        </Box>
      </ProfileContainer>
      <ProfileCard />
      <AboutMeCard />
    </>
  );
}

export default MyProfile;
