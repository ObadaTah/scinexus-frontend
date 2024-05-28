import React, { useEffect, useState } from "react";
import { useAuth } from "../../Components/contexts/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/joy";

function AdminDashboard() {
  const { jwtToken, role } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(role);
  if (role !== "ADMIN") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography level="h4" fontWeight="bold">
          Unauthorized
        </Typography>
      </Box>
    );
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data = await response.json();
        setUsers(data._embedded.userList); // Extract userList from data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    }

    fetchUsers();
  }, [jwtToken]);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        setError("Failed to delete user");
      }
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography level="h4" fontWeight="bold" mb={2}>
        Admin Dashboard
      </Typography>
      {error && (
        <Typography color="danger" mb={2}>
          {error}
        </Typography>
      )}
      {users.map((user) => (
        <Card
          key={user.id}
          variant="outlined"
          sx={{ mb: 2, width: "100%", maxWidth: "500px" }}
        >
          <CardContent>
            <Typography level="body1" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography level="body2" color="neutral">
              {user.email}
            </Typography>
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleDelete(user.id)}
              sx={{ mt: 1 }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default AdminDashboard;
