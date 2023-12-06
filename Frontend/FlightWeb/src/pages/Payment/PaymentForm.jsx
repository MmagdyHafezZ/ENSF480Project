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
  Icon,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Send } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useLocation } from "react-router-dom";
const PaymentForm = () => {
  const location = useLocation();

  // Extract data from location.state or use localStorage as fallback
  const locationState = location.state || {};
  const userId = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  const emailNotification = localStorage.getItem("emailNotification");
  const userProfileLocalStorage = localStorage.getItem("userProfile")
    ? JSON.parse(localStorage.getItem("userProfile"))
    : null;
  const loyaltyPointsLocalStorage =
    parseInt(localStorage.getItem("loyaltyPoints")) || 0;

  // Default values from location.state or localStorage
  const [userProfile, setUserProfile] = useState(
    locationState.userProfile || userProfileLocalStorage
  );
  const [price, setPrice] = useState(
    locationState.price || parseFloat(localStorage.getItem("price")) || 0
  );
  const [flightDetails, setFlightDetails] = useState(
    locationState.flightDetails ||
      JSON.parse(localStorage.getItem("flightDetails"))
  );
  const [selectedSeats, setSelectedSeats] = useState(
    locationState.selectedSeats ||
      JSON.parse(localStorage.getItem("selectedSeats"))
  );
  const [cart, setCart] = useState(locationState.cart || null);

  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [balance, setBalance] = useState(null);
  const [paymentIsSuccessful, setPaymentIsSuccessful] = useState(false);
  const [stringSeats, setStringSeats] = useState("");

  //Credit card constants
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("id"));

    axios
      .get(`http://localhost:8080/api/user/profile/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
        localStorage.setItem("userProfile", JSON.stringify(response.data));

        // Check if userProfile.email exists
        if (!response.data.email) {
          alert("Please update your profile before proceeding to payment");
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        alert("Please create a profile before proceeding to payment");
        window.location.href = "/profile";
      });
    axios.get(`http://localhost:8080/api/user/creditcard/${userId}`).then(
      (response) => {
        setCardNumber(response.data.cardNumber);
        setExpiryDate(response.data.expiryDate);
        setCvv(response.data.cvv);
        setCardholderName(response.data.cardholderName);
        setAddress(response.data.address);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []); // Add history to the dependency array
  console.log("price", price);
  console.log("flightDetails", flightDetails);
  console.log("selectedSeats", selectedSeats);
  // Calculate the price from the cart
  console.log("cart", cart);

  // Sum the price and cartPrice
  const cartPrice = cart
    ? Array.isArray(cart)
      ? cart.reduce((sum, item) => sum + item.price, 0)
      : cart.price
    : 0;
  const totalAmount = price + cartPrice - loyaltyPoints - discountCode;

  // Update localStorage with new values if needed
  useEffect(() => {
    localStorage.setItem("totalAmount", totalAmount);
    localStorage.setItem("flightDetails", JSON.stringify(flightDetails));
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("price", price);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [totalAmount, flightDetails, selectedSeats, price, cart]);

  // Mock data - replace with actual data from the user's profile
  const totalLoyaltyPoints =
    parseInt(localStorage.getItem("loyaltyPoints")) || 100;
  const handleLoyaltyChange = (event, newValue) => {
    setLoyaltyPoints(newValue);
  };

  const bookFlight = async () => {
    try {
      if (selectedSeats) {
        const seatsArray = Object.keys(selectedSeats).filter(
          (seat) => selectedSeats[seat]
        );
        console.log("seatsArray", seatsArray);

        const bookingPromises = seatsArray.map(async (seat) => {
          await axios.put(
            `http://localhost:8080/toggleSeat/${flightDetails.id}/${seat}`
          );
        });

        await Promise.all(bookingPromises);
        console.log("All seats booked successfully");
        const SeatsStr = seatsArray.join(",");
        setStringSeats(SeatsStr);
      }
      const bookingDetails = {
        passenger: userProfile.username, // Assuming 'name' is a field in userProfile
        origin: flightDetails.iata1, // Assuming 'origin' is a field in flightDetails
        destination: flightDetails.iata2, // Assuming 'destination' is a field in flightDetails
        confirm: "Yes", // Example value
        seat: stringSeats, // Assuming 'selectedSeats' is an array of seat numbers
        meal: localStorage.getItem("mealPreference"),
      };
      console.log("bookingDetails", bookingDetails);
      try {
        await axios.post("http://localhost:8080/postBooking", bookingDetails);
      } catch (error) {
        console.log(error);
      }
      alert("Flight booking successful");
      try {
        await axios.put(
          `http://localhost:8080/api/user/addUpcomingFlight/${userId}/${flightDetails.id}`
        );
      } catch (error) {
        console.log(error);
      }
      await sendPaymentEmail();
    } catch (error) {
      console.error("Error booking the flight:", error);
      alert("Error during flight booking");
    }
    const addloyaltypoints = loyaltyPoints + 100;
    localStorage.setItem("loyaltyPoints", addloyaltypoints);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = parseInt(localStorage.getItem("id"));
    const totalDiscount =
      loyaltyPoints + (discountCode ? parseInt(discountCode) : 0);
    const finalAmount = totalAmount - totalDiscount;
    console.log("finalAmount", finalAmount);
    const currentBalanceResponse = await axios.get(
      `http://localhost:8080/api/user/GetBalance/${userId}`
    );
    const currentBalance = currentBalanceResponse.data;

    const updatedBalance = currentBalance - finalAmount;
    await axios.post(
      `http://localhost:8080/api/user/SetBalance/${userId}`,
      { balance: updatedBalance },
      { headers: { "Content-Type": "application/json" } }
    );

    setBalance(updatedBalance);
    setPaymentIsSuccessful(true);

    if (cart && Object.keys(cart).length > 0) {
      // If cart has items, handle payment and update subscription
      await handlePaymentAndSubscription();
      if (emailNotification === "true") {
        await sendPaymentEmail();
      }
    } else if (
      cart &&
      Object.keys(cart).length > 0 &&
      flightDetails &&
      Object.keys(flightDetails).length > 0
    ) {
      await bookFlight();
      await handlePaymentAndSubscription();
      // If cart is empty, just send email
      if (emailNotification === "true") {
        await sendPaymentEmail();
      }
    } else if (flightDetails && Object.keys(flightDetails).length > 0) {
      await bookFlight();
      if (emailNotification === "true") {
        await sendPaymentEmail();
      }
    }

    localStorage.removeItem("price");
    localStorage.removeItem("mealPreference");
    localStorage.removeItem("loyaltyPoints");
    localStorage.removeItem("totalAmount");
  };

  const addpromos = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/postPromo/${userId}`);
      console.log(res);
      alert("Promo code added successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaymentAndSubscription = async () => {
    const membershipType = cart.type;
    const userId = parseInt(localStorage.getItem("id"));
    await axios.put(
      `http://localhost:8080/api/user/UpdateMembership/${userId}`,
      { membershipType },
      { headers: { "Content-Type": "application/json" } }
    );
    alert("Membership updated successfully");
    addpromos();
  };
  const sendPaymentEmail = async () => {
    try {
      await axios.post(`http://localhost:8080/generateAndSendTicket`, {
        userEmail: userProfile.email || userProfile.user.email,
        flightDetails: flightDetails,
        balancePaid: totalAmount,
        currentBalance: balance,
      });
      alert("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  const handleSaveCardDetails = async () => {
    try {
      await axios.post(`http://localhost:8080/api/user/creditcard`, {
        id: userId,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        cardholderName: cardholderName,
        address: address,
      });
      alert("Credit card details saved successfully");
    } catch (error) {
      console.error("Error saving credit card details:", error);
    }
  };
  // Handle changes in credit card details input fields
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };
  // Adjust the toggle function
  const toggleSaveCardDetails = async (event) => {
    setSaveCardDetails(event.target.checked);
    if (event.target.checked) {
      await handleSaveCardDetails();
    }
  };

  const RequestDiscountCode = async (discountCode) => {
    try {
      const discountResponse = await axios.get(
        `http://localhost:8080/getDiscount/${discountCode}`
      );
      console.log(discountResponse);
      if (discountResponse.data) {
        setDiscountCode(discountResponse.data);
        alert("Discount Code Applied");
      } else {
        alert("Invalid Discount Code");
      }
    } catch (error) {
      console.error("Error fetching discount code:", error);
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
                  <TextField
                    label="Card Number"
                    fullWidth
                    variant="outlined"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Expiry Date"
                    fullWidth
                    variant="outlined"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CVV"
                    fullWidth
                    variant="outlined"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Cardholder Name"
                    fullWidth
                    variant="outlined"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    fullWidth
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                {userProfile &&
                  ["Bronze", "Silver", "Gold"].includes(
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
                        <ArrowUpwardIcon
                          onClick={() => RequestDiscountCode(discountCode)}
                        />
                      </Grid>
                    </>
                  )}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={saveCardDetails}
                        onChange={toggleSaveCardDetails}
                      />
                    }
                    label="Save Card Details for Future Use"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box border={1} borderColor="grey.300" p={2} borderRadius={2}>
                    {cart?.price && (
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
