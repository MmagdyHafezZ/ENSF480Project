import React from "react";
import "./Hero.scss";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { sliderSettings } from "../../../utils/common";
import data from "../../../utils/hero-dest.json";
import "swiper/css";
const Hero = () => {
  return (
    <>
      <div className="hero-register-wrapper sectionContainer">
        <div className="hero-register-container">
          <h4>Register With Us Today</h4>
          <button>Register</button>
        </div>
      </div>
      <div className="hero-wrapper">
        <div className="hero-container">
          <div className="hero-container__header">Explore Destinations</div>
          <Swiper {...sliderSettings}>
            <SliderButtons />
            {data.map((card, i) => (
              <SwiperSlide key={i}>
                <div className="flexColStart r-card">
                  <img src={card.img} alt="home" />
                  <span className="primaryText">{card.country}</span>
                  {/* <span className="secondaryText">{card.detail}</span> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Hero;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
