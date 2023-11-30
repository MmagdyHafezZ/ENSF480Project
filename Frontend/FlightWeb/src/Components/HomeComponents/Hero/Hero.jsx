import React from "react";
import "./Hero.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { sliderSettings } from "../../../utils/common";
import data from "../../../utils/hero-dest.json";
import HeroMainImage from "../../../assets/hero-main-image.jpeg";
import { useNavigate } from "react-router-dom";
import "swiper/css";
const Hero = () => {
  const navigate = useNavigate();
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
              See travel hacks
            </button>
          </div>
        </div>
        <div className="hero-container">
          <div className="hero-container__header">Explore Destinations</div>
          <Swiper {...sliderSettings}>
            <SliderButtons />
            {data.map((card, i) => (
              <SwiperSlide key={i}>
                <div className="flexColStart r-card">
                  <img src={card.img} alt="home" />
                  <div className="card-destination">
                    <span className="secondaryText">{card.city}</span>
                    <span className="primaryText">{card.country}</span>
                  </div>

                  {/* <span className="secondaryText">{card.detail}</span> */}
                </div>
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
