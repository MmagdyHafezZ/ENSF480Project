import React from "react";

const Footer = () => {
  return (
    <div>
      {" "}
      <div className="hero-register-wrapper sectionContainer">
        <div className="hero-register-container">
          <h4>Register With Us Today</h4>
          <button
            onClick={() => {
              window.location.href = "/signin";
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
export default Footer;
