import React from "react";
import "./AirplaneLoading.scss";
const AirplaneRedirectLoading = () => {
  return (
    <div className="airlplane-loading-wrapper">
      <span className="loading-message">
        <h3>User Not Logged In</h3>
        <h4>Redirecting to Log In Page</h4>
      </span>
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

export default AirplaneRedirectLoading;
