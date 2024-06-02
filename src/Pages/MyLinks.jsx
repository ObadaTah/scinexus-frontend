import { Container, Grid } from "@mui/joy";
import BioCard from "../Components/Jouranl/Post/BioCard";
import { useEffect, useState } from "react";
import { useAuth } from "../Components/contexts/AuthContext";
import { useUser } from "../Components/contexts/UserContext";

function MyLinks() {
    const { user } = useUser();
    const [users, setUsers] = useState([]);
    const { jwtToken } = useAuth();
    const getMyLinks = async () => {
        if (!jwtToken) return;
        if (!user) return;
        const response = await fetch(`http://localhost:8080/users/links`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUsers(data["_embedded"].userLinksList);
        } else {
            console.error("Error fetching users:", response.statusText);
        }
    };
    useEffect(() => {
        console.log(user);
        getMyLinks();
    }, [jwtToken]);

    return (
        <>
            <Container style={{ my: 2 }}>
                <Grid container spacing={5}>
                    {users.map((link, index) => (
                        <Grid key={index} item xs={6}>
                            {link.linksFrom.id === user.id ? (
                                <BioCard
                                    id={link.linksTo.id}
                                    publisher={link.linksTo}
                                />
                            ) : (
                                <BioCard
                                    id={link.linksFrom.id}
                                    publisher={link.linksFrom}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
export default MyLinks;
