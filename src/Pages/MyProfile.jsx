import React, { useEffect, useState } from "react";
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
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { styled } from "@mui/system";
import { useUser } from "../Components/contexts/UserContext"; // Correct import path
import NewJournalModal from "../Components/Jouranl/Components/NewJournalModal";
import ResearchpapersTab from "./Tabs/ResearchpapersTab";
import ArticlesTab from "./Tabs/ArticlesTab";
import PostsTab from "./Tabs/PostsTab";
import ProfileHead from "../Components/Generic/ProfileHead";
import SimilarItemsCard from "../Components/Generic/SimilarItemsCard"; // Import the new component
import { useAuth } from "../Components/contexts/AuthContext";

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
  maxWidth: "1200px", // Ensure consistent max width
  "@media (max-width: 600px)": {
    marginLeft: "10px",
    padding: "0 20px",
  },
});

const MainContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "20px",
  width: "100%",
  marginTop: "20px",
  maxWidth: "1200px", // Ensure consistent max width
  "@media (max-width: 960px)": {
    flexDirection: "column",
    alignItems: "center",
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

const LeftContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "70%", // Adjust width as needed
  "@media (max-width: 960px)": {
    alignItems: "center",
    width: "100%", // Full width on smaller screens
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

const RightContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "30%", // Adjust width as needed
  "@media (max-width: 960px)": {
    alignItems: "center",
    width: "100%", // Full width on smaller screens
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
  const { jwtToken } = useAuth();
  const [isPeopleYouMayKnowLoading, setIsPeopleYouMayKnowLoading] =
    useState(false);
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      setIsPeopleYouMayKnowLoading(true);

      try {
        const response = await fetch(
          "http://localhost:8080/users/people-you-may-know",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        const transformedData = data.map((user) => ({
          id: user.id,
          name: user.name,
          sharedSkills: user.sharedSkills,
          imgSrc: user.profilePicture
            ? user.profilePicture.fileName
            : "https://i.pravatar.cc/40?img=100",
          linked: user.accepted,
        }));

        console.log("transformedData", transformedData);
        setPeopleYouMayKnow(transformedData);
        setIsPeopleYouMayKnowLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [jwtToken]);

  const organizationsYouMayFollow = [
    { name: "Tech Organization", sharedSkills: 5, imgSrc: "path/to/org1.jpg" },
    { name: "Research Group", sharedSkills: 4, imgSrc: "path/to/org2.jpg" },
    { name: "Innovative Labs", sharedSkills: 6, imgSrc: "path/to/org3.jpg" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ProfileContainer
        maxWidth="lg"
        sx={{ marginTop: "20px", paddingTop: "20px" }}
      >
        <ProfileHead
          isPeopleYouMayKnowLoading={isPeopleYouMayKnowLoading}
          peopleYouMayKnow={peopleYouMayKnow}
          organizationsYouMayFollow={organizationsYouMayFollow}
        />
      </ProfileContainer>

      {/* <MainContentContainer>
        <LeftContainer>
          <ProfileCard />
          <AboutMeCard />
        </LeftContainer>
        <RightContainer>
          <SimilarItemsCard
            title="People You May Know"
            items={peopleYouMayKnow}
            type="people"
            isLoading={isPeopleYouMayKnowLoading}
          />
          <SimilarItemsCard
            title="Organizations You May Follow"
            items={organizationsYouMayFollow}
            type="organizations"
          />
        </RightContainer>
      </MainContentContainer> */}
    </div>
  );
}

export default MyProfile;
