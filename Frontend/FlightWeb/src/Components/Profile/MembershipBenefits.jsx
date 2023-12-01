import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Navbar from "../Navbar/Navbar";
import "../../main.css"; // Ensure this includes the necessary CSS for animation
import { useNavigate } from "react-router-dom";

const MembershipBenefits = () => {
  const [cart, setCart] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const memberships = [
    {
      type: "Gold",
      price: 200,
      benefits:
        "Enjoy exclusive benefits such as priority boarding, lounge access, and more.",
    },
    {
      type: "Silver",
      price: 150,
      benefits: "Get additional baggage allowance and faster check-in.",
    },
    {
      type: "Bronze",
      price: 100,
      benefits: "Access to special offers and discounted flights.",
    },
  ];

  const addToCart = (membership) => {
    setCart(membership);
    // Add a class to trigger the animation
    document.querySelector(".cart-icon").classList.add("animate");
    setTimeout(() => {
      document.querySelector(".cart-icon").classList.remove("animate");
    }, 1000); // Duration of the animation
  };

  const toggleCart = () => {
    setOpen(!open);
  };

  const proceedToPay = () => {
    console.log("Proceeding to payment with:", cart);
    navigate("/payment", { state: { cart: cart } });
  };

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
          {memberships.map((membership, index) => (
            <Card
              key={index}
              className={`benefit-item ${membership.type
                .toLowerCase()
                .replace(" ", "-")}`}
              variant="outlined"
              onClick={() => addToCart(membership)}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {membership.type}
                </Typography>
                <Typography variant="body2">{membership.benefits}</Typography>
                <Typography variant="body2">
                  Price: ${membership.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(membership)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Box position="fixed" bottom={20} right={20} className="cart-icon">
          <Button onClick={toggleCart}>
            <ShoppingCartIcon fontSize="large" />
          </Button>
        </Box>
      </Container>
      <Dialog open={open} onClose={toggleCart}>
        <DialogTitle>Cart</DialogTitle>
        <DialogContent>
          {cart ? (
            <Typography>
              {cart.type} - ${cart.price}
            </Typography>
          ) : (
            <Typography>Your cart is empty</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCart}>Close</Button>
          <Button onClick={proceedToPay} color="primary" variant="contained">
            Proceed to Pay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MembershipBenefits;
