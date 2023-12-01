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
const PaymentForm = () => {
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const location = useLocation();
  const { price, flightDetails, selectedSeats } = location.state || {}; // Extracting price from the state <----FlightDetails should have the flight data, selectedSeats is the userSelectedSeats
  console.log(selectedSeats);
  // Mock data - replace with actual data from the user's profile
  const totalLoyaltyPoints =
    parseInt(localStorage.getItem("loyaltyPoints")) || 200;
  const totalAmount = price || 100; // Replace with actual amount

  const handleLoyaltyChange = (event, newValue) => {
    setLoyaltyPoints(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form Submitted");
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
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
          <form>
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

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={useLoyaltyPoints}
                      onChange={(e) => setUseLoyaltyPoints(e.target.checked)}
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
                  <Typography variant="body1">
                    Total Amount: ${totalAmount}
                  </Typography>
                  <Typography variant="body1">
                    Loyalty Points Used: {loyaltyPoints}
                  </Typography>
                  <Typography variant="body1">
                    Final Amount: ${totalAmount - loyaltyPoints}
                  </Typography>
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
  );
};

export default PaymentForm;
