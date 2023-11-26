import React, { useState, useEffect } from "react";

import { SiConsul } from "react-icons/si";
import { BsPhoneVibrate } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const [active, setActive] = useState("navBarMenu");
  const [noBg, addBg] = useState("navBarTwo");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const showNavBar = () => {
    if (active === "navBarMenu") {
      setActive("navBarMenu showNavBar");
    } else {
      setActive("navBarMenu");
    }
  };
  const hideNavBar = () => {
    setActive("navBarMenu");
  };
  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("navBarTwo navbar_With_Bg");
    }else{
      addBg("navBarTwo");
    }
  }
  window.addEventListener("scroll", addBgColor);


  return (
    <>
      <div className="navBar flex">
        <div className="navBarOne flex">
          <div>
            <SiConsul className="icon" />
          </div>
          <div className="none flex">
            <li className="flex">
              <BsPhoneVibrate className="icon" />
              Support
            </li>
            <li className="flex">
              <AiOutlineGlobal className="icon" />
              Languages
            </li>
          </div>
          <div className="atb flex">
            <span>Sign in </span>
            <span>Sign out </span>
          </div>
        </div>

        <div className={noBg}>
          <div className="logoDiv">
            <img src={Logo} alt="Airplane logo" className="Logo" />
          </div>
          <div className={active}>
            <ul className="menu flex">
              <li onClick={hideNavBar} className="listItem">
                Home
              </li>
              <li onClick={hideNavBar} className="listItem">
                About
              </li>
              <li onClick={hideNavBar} className="listItem">
                Offers
              </li>
              <li onClick={hideNavBar} className="listItem">
                Seats
              </li>
              <li onClick={hideNavBar} className="listItem">
                Destinations
              </li>
              <button onClick={hideNavBar} className="btn flex btnOne">
              Contact
            </button>
            </ul>

          </div>

          {screenWidth <= 768 && (
          <div onClick={showNavBar} className="toggleIcon">
            <CgMenuGridO className="icon" />
          </div>
        )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
