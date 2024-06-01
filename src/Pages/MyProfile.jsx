// MyProfile.js
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
import ProfileHead from "../Components/Generic/ProfileHead";
import SimilarItemsCard from "../Components/Generic/SimilarItemsCard"; // Import the new component
import { useAuth } from "../Components/contexts/AuthContext";

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
  }, []);
  // const peopleYouMayKnow = [
  //   { name: "Yareli Aburto", sharedSkills: 3, imgSrc: "path/to/image1.jpg" },
  //   { name: "Uttam Pattar", sharedSkills: 3, imgSrc: "path/to/image2.jpg" },
  //   { name: "Oladayo Bello", sharedSkills: 3, imgSrc: "path/to/image3.jpg" },
  // ];

  const organizationsYouMayFollow = [
    { name: "Tech Organization", sharedSkills: 5, imgSrc: "path/to/org1.jpg" },
    { name: "Research Group", sharedSkills: 4, imgSrc: "path/to/org2.jpg" },
    { name: "Innovative Labs", sharedSkills: 6, imgSrc: "path/to/org3.jpg" },
  ];
    const [open, setOpen] = React.useState(false);

    const { user } = useUser();

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
        <ProfileHead />
      </ProfileContainer>

      <MainContentContainer>
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
      </MainContentContainer>
    </div>
  );
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
                                    ? `http://localhost:8080/medias/${user.profilePicture.id}/files`
                                    : "/path/to/default-picture.jpg"
                            }
                            alt="Profile Picture"
                            sx={{ width: 80, height: 80, mr: 2 }}
                        />
                        <Box>
                            <Typography level="h4" fontWeight="bold">
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography level="body2" color="neutral">
                                {user.education} · {user.position} ·{" "}
                                {user.fieldOfWork}
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
                    <ActionButtons
                        sx={{
                            mb: 1,
                            justifyContent: { xs: "center", sm: "flex-start" },
                        }}
                    >
                        <div>
                            <ActionButton
                                variant="outlined"
                                color="primary"
                                onClick={() => setOpen(true)}
                            >
                                + Add Journal
                            </ActionButton>
                            <NewJournalModal
                                open={open}
                                onClose={() => setOpen(false)}
                            />
                        </div>
                    </ActionButtons>
                </Box>
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
                    <TabPanel value={0}>
                        <ProfileCard />
                        <AboutMeCard />
                    </TabPanel>
                    <TabPanel value={1}>
                        <ArticlesTab id={user.id} />
                    </TabPanel>
                    <TabPanel value={2}>
                        <ResearchpapersTab id={user.id} />
                    </TabPanel>

                    <TabPanel value={3}>
                        <PostsTab id={user.id} />
                    </TabPanel>
                </StyledTabs>
            </ProfileContainer>
        </>
    );
}

export default MyProfile;
