import React, { useState } from "react";
import "./Hero.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { sliderSettings } from "../../../utils/common";
import data from "../../../utils/hero-dest.json";
import HeroMainImage from "../../../assets/hero-main-image.jpeg";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserDataContext } from "../../../context/UserDataContext";
import "swiper/css";
const Hero = () => {
  const navigate = useNavigate();
  const {
    setSearchState,
    setUserFlightData,
    userFlightData,
    handleButtonClick,
  } = useUserDataContext();
  const [cardFlightData, setCardFlightData] = useState({
    leaving: {
      name: "Calgary",
      iata: "YYC",
    },
    going: {
      name: "",
      iata: "",
    },
    travellers: 1,
    depart: new Date(),
    return: new Date(),
    // You can update other properties as needed here
  });
  const handleCardClick = (e) => {
    setCardFlightData({
      ...cardFlightData, // Spread the existing state
      going: {
        name: e.city,
        iata: e.iata,
      },
      depart: new Date(e.depart_date),
      return: new Date(e.return_date),
      // Update other properties as needed based on the event data
    });
    handleButtonClick();
    sessionStorage.setItem("userFlightData", JSON.stringify(userFlightData));
    setUserFlightData({ ...cardFlightData });

    navToFlights();
    // sessionStorage.setItem("userFlightData", JSON.stringify(userFlightData));
    // navigate("/flights", { state: { userFlightData: newData } });
  };
  const navToFlights = () => {
    console.log(cardFlightData);
    navigate("/flights", { state: { cardFlightData } });
  };
  return (
    <>
      <div className="hero-wrapper">
        <div className="deals-image-container">
          <div className="deals-content">
            <h1>Unlock the World with Exclusive Offers</h1>
            <p>You can now save on our most recent Offers</p>

            <button
              onClick={() => {
                navigate("/offers");
              }}
              className="deals-button"
            >
              Shop Deals
            </button>
          </div>
        </div>
        <div className="hero-container">
          <div className="hero-container__header">Explore Destinations</div>
          <Swiper {...sliderSettings}>
            <SliderButtons />
            {data.map((card, i) => (
              <SwiperSlide key={i}>
                <a href={card.homepage}>
                  {" "}
                  <div className="flexColStart r-card">
                    <img src={card.img} alt="home" />
                    <div className="card-destination">
                      <span className="secondaryText">{card.city}</span>
                      <span className="primaryText">{card.country}</span>
                    </div>

                    {/* <span className="secondaryText">{card.detail}</span> */}
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>{" "}
        </div>
      </div>
    </>
  );
};

export default Hero;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="r-buttons">
      <div className="swiper-button-prev" onClick={() => swiper.slidePrev()}>
        <MdArrowBackIosNew />
      </div>
      <div className="swiper-button-next" onClick={() => swiper.slideNext()}>
        <MdArrowForwardIos />
      </div>
    </div>
  );
};
