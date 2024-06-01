import React, { useEffect, useState } from "react";
import ProfileCard from "../Components/Generic/ProfileCard";
import AboutMeCard from "../Components/Generic/AboutMeCard";
import { Box, Container } from "@mui/joy";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import ProfileHead from "../Components/Generic/ProfileHead";
import SimilarItemsCard from "../Components/Generic/SimilarItemsCard"; // Import the new component
import { useAuth } from "../Components/contexts/AuthContext";
import { CircularProgress } from "@mui/joy";
const ProfileContainer = styled(Container)({
  backgroundColor: "#f9f9f9",
  padding: "var(--joy-spacing-4)",
  borderRadius: "10px",
  boxShadow: "var(--joy-shadow-md)",
  border: "1px solid #e0e0e0",
  maxWidth: "1200px",
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
  maxWidth: "1200px",
  "@media (max-width: 960px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});
const LeftContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "70%",
  "@media (max-width: 960px)": {
    alignItems: "center",
    width: "100%",
  },
});

const RightContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "30%",
  "@media (max-width: 960px)": {
    alignItems: "center",
    width: "100%",
  },
});

function UserProfile() {
  const { userId } = useParams();
  const { jwtToken } = useAuth();
  const [isPeopleYouMayKnowLoading, setIsPeopleYouMayKnowLoading] =
    useState(false);
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserProfile();
  }, [userId, jwtToken]);

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
  const organizationsYouMayFollow = [
    { name: "Tech Organization", sharedSkills: 5, imgSrc: "path/to/org1.jpg" },
    { name: "Research Group", sharedSkills: 4, imgSrc: "path/to/org2.jpg" },
    { name: "Innovative Labs", sharedSkills: 6, imgSrc: "path/to/org3.jpg" },
  ];
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {" "}
        <CircularProgress />
      </div>
    );
  }

  if (!userProfile) {
    return <div>No profile found</div>;
  }

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
      {/* 
      <MainContentContainer>
        <LeftContainer>
          <ProfileCard userProfile={userProfile} />
          <AboutMeCard userProfile={userProfile} />
        </LeftContainer>
        <RightContainer>
          <SimilarItemsCard
            title="People You May Know"
            items={peopleYouMayKnow}
            type="people"
            isLoading={isLoading}
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

export default UserProfile;
