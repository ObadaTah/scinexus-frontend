const academicOptions = [
  { label: "Academic researcher", value: "RESEARCHER" },
  { label: "Academic faculty member", value: "PROFESSOR" },
  { label: "Retired academic", value: "POSTDOC" },
  { label: "Self-employed professional", value: "LECTURER" },
  {
    label: "Academic affiliated with an organization",
    value: "ASSOCIATE_PROFESSOR",
  },
  { label: "Graduate student", value: "GRADUATE_STUDENT" },
  { label: "Undergraduate student", value: "UNDERGRADUATE_STUDENT" },
];

const organizationOptions = [
  { label: "Business", value: "BUSINESS" },
  { label: "Non Profit", value: "NON_PROFIT" },
  { label: "Educational", value: "EDUCATIONAL" },
  { label: "Governmental", value: "GOVERNMENT" },
  { label: "Professional Association", value: "PROFESSIONAL_ASSOCIATION" },
  { label: "Community Group", value: "COMMUNITY_GROUP" },
  { label: "Media", value: "MEDIA" },
  { label: "Religious", value: "RELIGIOUS" },
  { label: "Sports", value: "SPORTS" },
];

const getPositionValue = (label, role) => {
  const options = role === "ACADEMIC" ? academicOptions : organizationOptions;
  const option = options.find((opt) => opt.value === label);
  return option ? option.label : label;
};

const getPositionLabel = (value, role) => {
  const options =
    role === "ACADEMIC" || role === "ADMING "
      ? academicOptions
      : organizationOptions;
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};

import React from "react";
import ProfileCard from "./ProfileCard";
import AboutMeCard from "./AboutMeCard";
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
import { useUser } from "../contexts/UserContext"; // Correct import path
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
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

function ProfileHead({ userProfile }) {
  let user = userProfile;

  if (userProfile === undefined) {
    user = useUser().user;
  }
  const { jwtToken } = useAuth();
  const [researchPaperCount, setResearchPaperCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    async function fetchResearchPaperCount() {
      try {
        const response = await fetch(
          `http://localhost:8080/researchpapers/count/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResearchPaperCount(data.count);
      } catch (error) {
        console.error("Error fetching research paper count", error);
      }
    }
    fetchResearchPaperCount();
  }, [user.id, jwtToken]);

  useEffect(() => {
    async function fetchArticlesCount() {
      try {
        const response = await fetch(
          `http://localhost:8080/articles/count/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArticlesCount(data.count);
      } catch (error) {
        console.error("Error fetching research paper count", error);
      }
    }
    fetchArticlesCount();
  }, [user.id, jwtToken]);

  useEffect(() => {
    async function fetchPostsCount() {
      try {
        const response = await fetch(
          `http://localhost:8080/posts/count/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPostsCount(data.count);
      } catch (error) {
        console.error("Error fetching research paper count", error);
      }
    }
    fetchPostsCount();
  }, [user.id, jwtToken]);

  return (
    <div>
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
              {user.role === "ACADEMIC" || user.role === "ADMIN"
                ? `${user.education} · ${getPositionLabel(
                    user.position,
                    user.role
                  )} · ${user.fieldOfWork}`
                : `${getPositionLabel(user.type, user.role)} · ${
                    user.fieldOfWork
                  }`}
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
            <Typography>Research Papers</Typography>
            <Box
              sx={{
                mx: 1,
                height: "1px",
                width: "180px",
                backgroundColor: "#d1d1d2",
              }}
            />
            <Typography>{researchPaperCount}</Typography>
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
            <Typography>{articlesCount}</Typography>
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
            <Typography>{postsCount}</Typography>
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
            <StyledTab>Profile</StyledTab>
            <StyledTab>Articles</StyledTab>
            <StyledTab>Researches</StyledTab>
            <StyledTab>Posts</StyledTab>
          </TabList>
        </StyledTabs>

        {!userProfile && (
          <ActionButtons
            sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
          >
            <ActionButton variant="outlined" color="primary">
              + Add Journal
            </ActionButton>
          </ActionButtons>
        )}
      </Box>
    </div>
  );
}

export default ProfileHead;
