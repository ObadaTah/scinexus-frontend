// MyProfile.js
import React, { useEffect, useState } from "react";
import ProfileCard from "../Components/Generic/ProfileCard";
import AboutMeCard from "../Components/Generic/AboutMeCard";
import { Box, Container } from "@mui/joy";
import { styled } from "@mui/system";
import { useUser } from "../Components/contexts/UserContext"; // Correct import path
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

function MyProfile() {
  const { user } = useUser();
  const { jwtToken } = useAuth();
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
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
          name: user.name,
          sharedSkills: user.sharedSkills,
          imgSrc: user.profilePicture.fileName,
          linked: user.accepted,
        }));

        console.log("transformedData", transformedData);
        setPeopleYouMayKnow(transformedData);
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
}

export default MyProfile;
