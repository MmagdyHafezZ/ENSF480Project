// src/components/OffersPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Flightoffer from "../../assets/FlightOffer.jpg";
import Hoteloffer from "../../assets/Hoteloffer.jpg";
import CarRent from "../../assets/CarRent.jpg";
import Offer from "../../assets/Offer.jpg";
import Discount from "../../assets/Discount.jpg";
import Adventure from "../../assets/Adventure.jpg";
import Cruise from "../../assets/Cruise.jpg";
import City from "../../assets/City.jpg";
import Holiday from "../../assets/Holiday.jpg";
import Navbar from "../Navbar/Navbar";

const OffersPage = () => {
  const [userID, setUserID] = useState(parseInt(localStorage.getItem("id")));
  const [promotions, setPromotions] = useState([]);
  console.log(userID)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getPromo/${userID}`)
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
  }, []);

  useEffect(() => {
    console.log(promotions); // This will log the updated state
  }, [promotions]);

  // Example offers data
  const offers = [
    {
      id: 1,
      title: "Special Flight Deal",
      description: "Amazing discounts on flights to Europe.",
      imageUrl: Flightoffer,
    },
    {
      id: 2,
      title: "Hotel Discount",
      description: "Save up to 50% on select hotels.",
      imageUrl: Hoteloffer,
    },
    {
      id: 3,
      title: "Last Minute Deals",
      description: "Incredible last-minute deals on flights and hotels.",
      imageUrl: Offer,
    },
    {
      id: 4,
      title: "Group Discounts",
      description:
        "Special rates for group travels, perfect for family vacations.",
      imageUrl: Discount,
    },

    {
      id: 5,
      title: "Car Rental Deals",
      description: "Exclusive discounts on car rentals when you book a flight.",
      imageUrl: CarRent,
    },
    {
      id: 6,
      title: "Adventure Tours",
      description: "Experience adventure tours at top destinations.",
      imageUrl: Adventure,
    },
    {
      id: 7,
      title: "Luxury Cruise Offers",
      description: "Luxury cruises at special rates for a limited time.",
      imageUrl: Cruise,
    },
    {
      id: 8,
      title: "City Passes",
      description:
        "Get city passes at a discount and explore major attractions.",
      imageUrl: City,
    },
    {
      id: 9,
      title: "All-Inclusive Packages",
      description: "All-inclusive holiday packages for stress-free planning.",
      imageUrl: Holiday,
    },
  ];

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        style={{ marginTop: "100px", transition: "all 0.5s ease" }}
      >
        <Typography variant="h2" align="center" style={{ margin: "20px 0" }}>
          Exclusive Offers
        </Typography>

        <Grid container spacing={4}>
          {offers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer.id}>
              <Card>
                <CardMedia
                  component="img"
                  image={offer.imageUrl}
                  alt={offer.title}
                  style={{ height: "300px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {offer.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Claim Offer</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default OffersPage;
