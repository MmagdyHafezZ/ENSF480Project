import React from "react";
import "./AirplaneLoading.scss";
const AirplaneLoading = () => {
  return (
    <div className="airlplane-loading-wrapper">
      <span class="loader"></span>
      <div className="loading-airplane-body">
        <img src="https://i.imgur.com/3BGEqFQ.png" className="plane" />
        <img src="https://i.imgur.com/6tncGeG.png" className="cloud1" />
        <img src="https://i.imgur.com/6tncGeG.png" className="cloud2" />
        <img src="https://i.imgur.com/6tncGeG.png" className="cloud3" />
        <img src="https://i.imgur.com/6tncGeG.png" className="cloud4" />
        <img src="https://i.imgur.com/6tncGeG.png" className="cloud5" />

        <div className="sun"></div>
        <div className="moon"></div>
      </div>
    </div>
  );
};

export default AirplaneLoading;
