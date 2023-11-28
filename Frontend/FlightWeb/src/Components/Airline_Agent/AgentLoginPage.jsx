// src/components/AgentLoginPage.js
import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

const AgentLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dummyAccount = {
    username: "agent",
    password: "password123",
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (
      username === dummyAccount.username &&
      password === dummyAccount.password
    ) {
      // Replace with actual API call and authentication logic
      console.log("Login successful");
      localStorage.setItem("agent", true);
      window.location.href = "/agent";
    } else {
      console.error("Invalid credentials");
      // Implement error handling and feedback
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          Airline Agent Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AgentLoginPage;
