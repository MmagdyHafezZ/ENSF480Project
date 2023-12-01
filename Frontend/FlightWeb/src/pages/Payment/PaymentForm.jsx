import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Slide,
  Checkbox,
  FormControlLabel,
  Box,
  Switch,
  Slider,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
const PaymentForm = () => {
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [paymentIsSuccessful, setPaymentIsSuccessful] = useState(false);

  useEffect(() => {
    // Replace 'userId' with the actual user ID
    const userId = parseInt(localStorage.getItem("id"));

    axios
      .get(`http://localhost:8080/api/user/profile/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const location = useLocation();
  const { price, flightDetails, selectedSeats, cart } = location.state || {}; // Extracting price from the state <----FlightDetails should have the flight data, selectedSeats is the userSelectedSeats
  // Calculate the price from the cart
  const cartPrice = cart
    ? Array.isArray(cart)
      ? cart.reduce((sum, item) => sum + item.price, 0)
      : cart.price
    : 0;

  // Sum the price and cartPrice
  const totalAmount = (price || 0) + cartPrice;
  console.log(selectedSeats);
  // Mock data - replace with actual data from the user's profile
  const totalLoyaltyPoints =
    parseInt(localStorage.getItem("loyaltyPoints")) || 200;
  const handleLoyaltyChange = (event, newValue) => {
    setLoyaltyPoints(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = parseInt(localStorage.getItem("id"));

    try {
      const balanceResponse = await axios.get(
        `http://localhost:8080/api/user/GetBalance/${userId}`
      );
      const currentBalance = balanceResponse.data;

      const totalDiscount =
        loyaltyPoints + (discountCode ? parseInt(discountCode) : 0);
      const finalAmount = totalAmount - totalDiscount;

      if (currentBalance < finalAmount) {
        alert("Insufficient Balance");
      } else {
        const updatedBalance = currentBalance - finalAmount;

        const updateResponse = await axios.post(
          `http://localhost:8080/api/user/SetBalance/${userId}`,
          { balance: updatedBalance }, // Send the data as JSON with 'balance' field
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setBalance(updateResponse.data);
        alert("Payment Successful new balance is " + updatedBalance);
        setPaymentIsSuccessful(true);
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("Error during payment process");
    }
    if (paymentIsSuccessful && cart) {
      // Add the membership to the user's profile
      const membershipType = cart.type;
      try {
        const updateResponse = await axios.put(
          `http://localhost:8080/api/user/UpdateMembership/${userId}`,
          { membershipType }, // Send the data as JSON with 'membershipType' and 'membershipDiscount' fields
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUserProfile(updateResponse.data);
      } catch (error) {
        console.error("Error updating membership:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Slide
        direction="up"
        in={true}
        mountOnEnter
        unmountOnExit
        style={{ marginTop: "110px" }}
      >
        <Card
          sx={{
            maxWidth: 500,
            mx: "auto",
            mt: 5,
            p: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Payment Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Card Number" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Expiry Date" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="CVV" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Cardholder Name"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Address" fullWidth variant="outlined" />
                </Grid>
                {userProfile &&
                  ["Bronze Member", "Silver Member", "Gold Member"].includes(
                    userProfile.membershipType
                  ) && (
                    <>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={useLoyaltyPoints}
                              onChange={(e) =>
                                setUseLoyaltyPoints(e.target.checked)
                              }
                            />
                          }
                          label="Use Loyalty Points"
                        />
                        <Typography variant="body2" gutterBottom>
                          {`You have ${totalLoyaltyPoints} loyalty points`}
                        </Typography>

                        {useLoyaltyPoints && (
                          <Slider
                            value={loyaltyPoints}
                            onChange={handleLoyaltyChange}
                            aria-labelledby="loyalty-slider"
                            valueLabelDisplay="auto"
                            max={
                              totalLoyaltyPoints > totalAmount
                                ? totalAmount
                                : totalLoyaltyPoints
                            }
                          />
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Discount Code"
                          fullWidth
                          variant="outlined"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                      </Grid>
                    </>
                  )}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={saveCardDetails}
                        onChange={(e) => setSaveCardDetails(e.target.checked)}
                      />
                    }
                    label="Save Card Details for Future Use"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box border={1} borderColor="grey.300" p={2} borderRadius={2}>
                    {cart.price && (
                      <Typography variant="body1">
                        Membership price: ${cart.price}
                      </Typography>
                    )}
                    <Typography variant="body1">
                      Total Amount: ${totalAmount}
                    </Typography>
                    {useLoyaltyPoints && (
                      <Typography variant="body1">
                        Loyalty Points Applied: ${loyaltyPoints}
                      </Typography>
                    )}
                    {discountCode && (
                      <Typography variant="body1">
                        Discount Applied: ${discountCode}
                      </Typography>
                    )}

                    {userProfile &&
                      [
                        "Bronze Member",
                        "Silver Member",
                        "Gold Member",
                      ].includes(userProfile.membershipType) && (
                        <>
                          <Typography variant="body1">
                            Membership Discount Applied: $
                            {userProfile.membershipDiscount}
                          </Typography>
                          <Typography variant="body1">
                            Final Amount: ${totalAmount - loyaltyPoints}
                          </Typography>
                        </>
                      )}
                    {/* Calculate and display final amount after applying loyalty points */}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Pay Now
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Slide>
    </>
  );
};

export default PaymentForm;
