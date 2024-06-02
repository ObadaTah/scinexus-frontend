import { Box, Container } from "@mui/material";
import JournalsList from "../Components/Generic/JournalsList";
import { useEffect, useState } from "react";
import { useAuth } from "../Components/contexts/AuthContext";
import HomeProfileCard from "../Components/Generic/HomeProfileCard";
import SimilarItemsCard from "../Components/Generic/SimilarItemsCard";
import { Grid } from "@mui/joy";
import { Height } from "@mui/icons-material";

function Home() {
  const { jwtToken } = useAuth();
  const [data, setData] = useState([]);
  const [isUserYouMayLinkLoading, setisUserYouMayLinkLoading] = useState(false);
  const [userYouMayLink, setuserYouMayLink] = useState([]);

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
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("User data:", data);

        const transformedData = data["_embedded"].userList.map((user) => ({
          id: user.id,
          name: user.firstName,
          sharedSkills: user.sharedSkills,
          imgSrc: user.profilePicture
            ? user.profilePicture.fileName
            : "https://i.pravatar.cc/40?img=100",
          linked: user.accepted,
        }));

        console.log("Transformed data:", transformedData);
        setuserYouMayLink(transformedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [jwtToken]);

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <HomeProfileCard data={data} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Container sx={{ flexGrow: 1 }}>
            <JournalsList />
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <SimilarItemsCard
            title="People You May Link With"
            items={userYouMayLink}
            type="people"
            isLoading={isUserYouMayLinkLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;

// <Box
//     display="flex"
//     alignItems={{ xs: "center", md: "flex-start" }}
//     justifyContent={{ xs: "center", md: "space-around" }}
//     flexDirection={{ xs: "column", md: "row" }}
//     sx={{ minHeight: "100vh" }}
//     s
// >
//     <Box
//         sx={{
//             width: { xs: "100%", md: "20%" },
//             paddingLeft: { xs: 0, md: 20 },
//             paddingTop: { xs: 2, md: 13 },
//             position: "sticky",
//             top: { xs: 0, md: 20 }, // Adjust the top value as needed
//             mb: { xs: 2, md: 0 },
//         }}
//     >
//         <HomeProfileCard data={data} />
//     </Box>
//     <Box
//         sx={{
//             flexGrow: 1,
//             padding: 2,
//             marginTop: { xs: 10, md: 9 },
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//         }}
//     >
//         {/* <Container sx={{ flexGrow: 1 }}> */}
//         <JournalsList />
//         {/* </Container> */}
//     </Box>
//     <Box
//         sx={{
//             width: { xs: "100%", md: "20%" },
//             paddingRight: { xs: 0, md: 2 },
//             paddingTop: { xs: 2, md: 13 },
//             position: "sticky",
//             top: { xs: 0, md: 20 },
//             mb: { xs: 2, md: 0 },
//             zIndex: 2,
//         }}
//     >
//         <SimilarItemsCard
//             title="People You May Link With"
//             items={userYouMayLink}
//             type="people"
//             isLoading={isUserYouMayLinkLoading}
//         />
//     </Box>
// </Box>
