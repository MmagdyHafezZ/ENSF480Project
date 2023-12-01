import React from "react";
/*Search and Book Your Ideal Flight 🔍✈️
"Find the best flights at competitive prices"
Earn Miles for Every Flight 🌟
"Accumulate miles to unlock exclusive benefits"
Exclusive Deals with Membership 💳
"Access members-only discounts and offers"
Flexible Rebooking Options 🔄
"Change your flight without hassle if your plans shift" */
import { BsAirplane } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./footer.scss";
const Footer = () => {
  return (
    <>
      <div className="register-footer-wrapper">
        <div className="register-footer-container">
          <div className="register-footer-left">
            {" "}
            <h4>Register With Us Today</h4>
            <button
              onClick={() => {
                window.location.href = "/membership";
              }}
            >
              Register
            </button>
          </div>
          <div className="register-footer-right">
            <div className="register-footer-subcontainer">
              <BsAirplane size={65} className="register-footer-icon" />
              <span className="register-footer-subcontainer-text">
                Find the best flights at competitive prices
              </span>
            </div>
            <div className="register-footer-subcontainer">
              <BsCreditCard size={65} className="register-footer-icon" />
              <span className="register-footer-subcontainer-text">
                Access members-only discounts and offers
              </span>
            </div>
            <div className="register-footer-subcontainer">
              <RiArrowGoBackLine size={55} className="register-footer-icon" />
              <span className="register-footer-subcontainer-text">
                Flexible Rebooking Options
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-container"></div>
    </>
  );
};
export default Footer;
