import React, { useState } from "react";
import { useAuth } from "../../Components/contexts/AuthContext";
import { Box, Button, Input, Typography } from "@mui/joy";

function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography level="h4" fontWeight="bold" mb={2}>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography level="body1" mb={1}>
            Email
          </Typography>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography level="body1" mb={1}>
            Password
          </Typography>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
        </Box>
        {error && (
          <Typography color="danger" mb={2}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="solid" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default AdminLogin;
