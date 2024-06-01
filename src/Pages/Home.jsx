import { Container, Grid } from "@mui/material";
import JournalsList from "../Components/Generic/JournalsList";
import { useEffect } from "react";
import { useAuth } from "../Components/contexts/AuthContext";
import { useState } from "react";

function Home() {
    const { jwtToken } = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchName() {
            try {
                // Assuming you have a function to get the JWT token from cookies
                const response = await fetch(
                    "http://localhost:8080/users/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("User data:", data);
                setData(data);
                // Handle redirection here
            } catch (error) {
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            }
        }

        fetchName();
    }, []);

    return (
        <>
            <Grid
                // container
                // spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Container>
                    {/* <Grid item xs={3}> */}
                    <h1>Home</h1>
                    <div>
                        <h1>User Profile</h1>
                        <p>First Name: {data.firstName}</p>
                        <p>Last Name: {data.lastName}</p>
                        <p>Email: {data.email}</p>
                        <p>Username: {data.username}</p>
                        <p>Status: {data.status}</p>
                        {/* Add more fields as needed */}
                    </div>
                    {/* <Container> */}
                    <JournalsList />
                    {/* </Container> */}
                    {/* </Grid> */}
                </Container>
            </Grid>
        </>
    );
}
export default Home;
