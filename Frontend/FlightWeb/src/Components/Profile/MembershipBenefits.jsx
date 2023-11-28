import React from "react";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
const MembershipBenefits = () => {
  return (
    <>
      <Navbar style={{ marginBottom: "150px" }} />
      <Container maxWidth="md">
        <Box textAlign="center" style={{ marginTop: "130px" }} my={5}>
          <Typography variant="h2" className="animated-title">
            Membership Benefits
          </Typography>
        </Box>
        <div className="benefits-list">
          <Card className="benefit-item" variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Gold Member
              </Typography>
              <Typography variant="body2">
                Enjoy exclusive benefits such as priority boarding, lounge
                access, and more.
              </Typography>
            </CardContent>
          </Card>
          <Card className="benefit-item" variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Silver Member
              </Typography>
              <Typography variant="body2">
                Get additional baggage allowance and faster check-in.
              </Typography>
            </CardContent>
          </Card>
          <Card className="benefit-item" variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Bronze Member
              </Typography>
              <Typography variant="body2">
                Access to special offers and discounted flights.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default MembershipBenefits;
