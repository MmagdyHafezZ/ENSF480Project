import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Navbar from "../Navbar/Navbar";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    userRole: "",
    membershipType: "Basic",
    recentBookings: [],
    email: "",
    phoneNumber: "",
    emailNotification: false,
    loyaltyPoints: 0,
    upcomingFlights: [],
    mealPreference: "",
  });

  const profileImage =
    "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png";
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/profile/${userId}`
      );
      setUserData({
        ...response.data,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        emailNotification: response.data.emailNotification,
        loyaltyPoints: response.data.loyaltyPoints,
        mealPreference: response.data.mealPreference,
        membershipType: response.data.membershipType,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      const userId = parseInt(localStorage.getItem("id"));
      const response = await axios.post(
        `http://localhost:8080/api/user/profile`,
        {
          ...updatedData,
          id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUserData(response.data);
      localStorage.setItem("userProfile", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const saveProfile = async () => {
    await updateProfile(userData);
    alert("Profile updated successfully!");
    isEditFormOpen && setIsEditFormOpen(false);
  };
  const handleEditProfileClick = () => setIsEditFormOpen(!isEditFormOpen);
  const handleEmailNotificationChange = async (event) => {
    const updatedUserData = {
      ...userData,
      emailNotification: event.target.checked,
    };
    setUserData(updatedUserData);
    await updateProfile(updatedUserData);
  };
  const saveUserPreferences = async (preferences) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/preferences`,
        preferences
      );
      console.log("Preferences saved:", response.data);
    } catch (error) {
      console.error("Error saving user preferences:", error);
    }
  };
  const fetchUserPreferences = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/preferences/${userId}`
      );
      console.log("Fetched preferences:", response.data);
      // Handle the fetched preferences as needed
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    }
  };

  // UI State
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isContactInfoExpanded, setIsContactInfoExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [seatPreference, setSeatPreference] = useState("Aisle");

  // UI Handlers
  const toggleSettings = async () => {
    if (isSettingsOpen) {
      await saveUserPreferences({
        id: localStorage.getItem("id"),
        seatPreference: seatPreference,
        mealPreference: userData.mealPreference,
      });
    }
    setIsSettingsOpen(!isSettingsOpen);
  };
  const handleContactInfoToggle = () =>
    setIsContactInfoExpanded(!isContactInfoExpanded);

  // Replace upcomingFlights with real data if available
  const upcomingFlights = userData.upcomingFlights || [];

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ position: "relative", top: "100px" }}>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Avatar
                alt="Profile Picture"
                src={profileImage}
                sx={{ width: 200, height: 200 }}
                style={{ margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography variant="h4">{userData.username}</Typography>
              <Typography variant="subtitle1">{userData.userRole}</Typography>
              <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
                {userData.membershipType}
              </Typography>
              <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
                Loyalty Points: {userData.loyaltyPoints || 0}
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
                          label="Username"
                          value={userData.username}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              username: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="User Role"
                          value={userData.userRole}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              userRole: e.target.value,
                            })
                          }
                        />
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
                          label="phoneNumber"
                          value={userData.phoneNumber}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              phoneNumber: e.target.value,
                            })
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
                    </Grid>
                  </form>
                </Paper>
              )}

              {isSettingsOpen && (
                <div style={{ marginTop: "20px" }}>
                  <Typography variant="h6">Settings and Preferences</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Email Notifications" />
                      <Switch
                        checked={userData.emailNotification}
                        onChange={handleEmailNotificationChange}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Meal Preference" />
                      <TextField
                        value={userData.mealPreference}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            mealPreference: e.target.value,
                          });
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Seat Preference" />
                      <Typography component="div">
                        <Button
                          variant={
                            seatPreference === "Aisle"
                              ? "contained"
                              : "outlined"
                          }
                          onClick={() => setSeatPreference("Aisle")}
                        >
                          Aisle
                        </Button>
                        <Button
                          variant={
                            seatPreference === "Window"
                              ? "contained"
                              : "outlined"
                          }
                          onClick={() => setSeatPreference("Window")}
                        >
                          Window
                        </Button>
                      </Typography>
                    </ListItem>
                  </List>
                </div>
              )}
            </Grid>

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
                  <Typography>phoneNumber: {userData.phoneNumber}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                style={{ margin: "5px" }}
                color="primary"
                onClick={() => {
                  window.location.href = "/reservations";
                }}
              >
                View All Reservations
              </Button>
              <Button
                variant="outlined"
                style={{ margin: "5px" }}
                color="primary"
                onClick={() => {
                  window.location.href = "/membership";
                }}
              >
                View Membership Benefits
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
