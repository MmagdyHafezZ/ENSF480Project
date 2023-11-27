// src/components/ProfilePage.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  IconButton,
  TextField,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    membershipStatus: "",
    recentBookings: [],
    profilePictureUrl: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);
  // State for accordion toggle
  const [isContactInfoExpanded, setIsContactInfoExpanded] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [seatPreference, setSeatPreference] = useState("Aisle"); // Assuming it's either "Aisle" or "Window"
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditFormOpen(!isEditFormOpen);
  };
  const handleEmailNotificationChange = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const handleSeatPreferenceChange = (event) => {
    setSeatPreference(event.target.value);
  };
  const handleSettingsToggle = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };
  const handleContactInfoToggle = () => {
    setIsContactInfoExpanded(!isContactInfoExpanded);
  };
  const saveProfile = () => {
    // Here, we would send data to the server.
    // For now, just close the form
    setIsEditFormOpen(false);
  };

  const upcomingFlights = [
    { flight: "Los Angeles to Tokyo", date: "2023-04-05" },
    { flight: "Berlin to New York", date: "2023-05-11" },
  ];
  const fetchUserData = async () => {
    try {
      // Simulating an API call
      const response = await fetch("https://api.example.com/user/profile");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Using dummy data in case of an error or while the backend is not available
      setUserData({
        name: "John Doe",
        role: "Software Developer",
        membershipStatus: "Gold Member",
        recentBookings: [
          { flight: "New York to London", date: "2023-01-15" },
          { flight: "Paris to Tokyo", date: "2023-02-20" },
        ],
        profilePictureUrl:
          "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Avatar
              alt="Profile Picture"
              src={userData.profilePictureUrl}
              sx={{ width: 100, height: 100 }}
              style={{ margin: "auto" }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h4">{userData.name}</Typography>
            <Typography variant="subtitle1">{userData.role}</Typography>
            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              {userData.membershipStatus}
            </Typography>

            <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
              Loyalty Points: 1200
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditProfileClick}
            >
              Edit Profile
            </Button>

            {/* Settings Icon */}
            <IconButton onClick={toggleSettings} style={{ float: "right" }}>
              <SettingsIcon />
            </IconButton>
            {isEditFormOpen && (
              <Paper style={{ padding: "20px", marginTop: "20px" }}>
                <Typography variant="h6">Edit Profile</Typography>
                <form noValidate autoComplete="off">
                  <Grid container spacing={2} style={{ marginTop: "10px" }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Role"
                        value={userData.role}
                        onChange={(e) =>
                          setUserData({ ...userData, role: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px" }}
                    onClick={saveProfile}
                  >
                    Save Changes
                  </Button>
                </form>
              </Paper>
            )}

            {/* Settings Options */}
            {isSettingsOpen && (
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h6">Settings and Preferences</Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Email Notifications" />
                    <Switch
                      checked={emailNotifications}
                      onChange={handleEmailNotificationChange}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Seat Preference" />
                    <Typography component="div">
                      <Button
                        variant={
                          seatPreference === "Aisle" ? "contained" : "outlined"
                        }
                        onClick={() => setSeatPreference("Aisle")}
                      >
                        Aisle
                      </Button>
                      <Button
                        variant={
                          seatPreference === "Window" ? "contained" : "outlined"
                        }
                        onClick={() => setSeatPreference("Window")}
                      >
                        Window
                      </Button>
                    </Typography>
                  </ListItem>
                  {/* Additional settings can be added here */}
                </List>
              </div>
            )}
          </Grid>
          {/* Contact Information Accordion */}
          <Grid item xs={12}>
            <Accordion
              expanded={isContactInfoExpanded}
              onChange={handleContactInfoToggle}
              style={{ width: "100%", marginTop: "20px" }}
            >
              <AccordionSummary
                expandIcon={
                  isContactInfoExpanded ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
              >
                <Typography>Contact Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Email: {userData.email}</Typography>
                <Typography>Phone: {userData.phone}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Recent Bookings:</Typography>
            <List>
              {userData.recentBookings.map((booking, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={booking.flight}
                      secondary={`Date: ${booking.date}`}
                    />
                  </ListItem>
                  {index < userData.recentBookings.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            {/* Upcoming Flights Section */}
            <Typography variant="h6" style={{ marginTop: "20px" }}>
              Upcoming Flights:
            </Typography>
            <List>
              {upcomingFlights.map((flight, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={flight.flight}
                      secondary={`Date: ${flight.date}`}
                    />
                  </ListItem>
                  {index < upcomingFlights.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              style={{ margin: "5px" }}
              color="primary"
            >
              View All Reservations
            </Button>
            <Button
              variant="outlined"
              style={{ margin: "5px" }}
              color="primary"
            >
              View Membership Benefits
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;