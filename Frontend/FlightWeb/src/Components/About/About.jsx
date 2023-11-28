// src/components/AboutPage.js
import React from "react";
import Navbar from "../Navbar/Navbar";
import { Container, Typography, Paper, Grid, Avatar, Box } from "@mui/material";

const AboutPage = () => {
  // Example team members data
  const teamMembers = [
    { name: "Magdy Hafez", role: "Software Engineer", image: "path_to_image" },
    { name: "Brandon", role: "Software Engineer", image: "path_to_image" },
    { name: "Siam", role: "Software Engineer", image: "path_to_image" },
    { name: "Diter", role: "Software Engineer", image: "path_to_image" },
    // Add more team members here
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: "120px" }}>
        <Typography variant="h2" align="center" style={{ padding: "20px" }}>
          About Us
        </Typography>

        <Paper style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5">Our Mission</Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            {/* Insert mission statement here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum.
          </Typography>
        </Paper>

        <Typography variant="h5" style={{ margin: "20px 0" }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper style={{ padding: "10px", textAlign: "center" }}>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  style={{ width: 100, height: 100, margin: "auto" }}
                />
                <Typography variant="h6" style={{ marginTop: "10px" }}>
                  {member.name}
                </Typography>
                <Typography variant="body1">{member.role}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AboutPage;
