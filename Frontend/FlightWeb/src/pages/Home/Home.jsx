import React from "react";
import video from "../../assets/video.mp4";
import aeroplane from "../../assets/takeoff3.png";
import Search from "../../Components/HomeComponents/Search/Search";
import Hero from "../../Components/HomeComponents/Hero/Hero";

const Home = () => {
  return (
    <>
      <div className="home flex container">
        <div className="mainText">
          <h1>Create Ever-Lasting Memories With US</h1>
        </div>
        <div className="homeImages flex">
          <div className="videoDiv">
            <video src={video} autoPlay muted className="video"></video>
          </div>
          <img src={aeroplane} className="plane" alt="plane" />
        </div>
      </div>
    </>
  );
};
export default Home;
