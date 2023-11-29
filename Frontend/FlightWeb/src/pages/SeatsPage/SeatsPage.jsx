import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./SeatsPage.scss";
import SeatContainer from "../../Components/SeatMaps/SeatsContainer";
import MediumPlane from "../../Components/SeatMaps/MediumPlane";
import SmallPlane from "../../Components/SeatMaps/SmallPlane";
import LargePlane from "../../Components/SeatMaps/LargePlane";
/* This is the page where the use  */
import mediumAircraftData from "../../data/mp_planeDetails.json";
import smallAircraftData from "../../data/sm_planeDetails.json";
import largeAircraftData from "../../data/lg_planeDetails.json";
import SeatSelectionCard from "./SeatSelectionCard";
const SeatsPage = () => {
  const smallAircraft = smallAircraftData["Embraer E175-E2"];
  const mediumAircraft = mediumAircraftData["Boeing 737-8 MAX"];
  const largeAircraft = largeAircraftData["Airbus A350-900"];
  // const mediumAircraft = mediumAircraftData["Boeing 737-8 MAX"];
  // const info = Object.entries(aircraft)[0];
  return (
    <>
      <Navbar />
      <div className="seats-page container flex">
        <div className="seats-page__header">
          <h1>Choose Your Flight Experience</h1>
          <h4>Explore Our Diverse Fleet - Small, Medium, and Large Planes</h4>
        </div>
        <SeatSelectionCard
          SeatMapComponent={SmallPlane}
          aircraftData={smallAircraft}
          planeType="Small - Embraer E175-E2"
          // size={false}
        />
        <SeatSelectionCard
          SeatMapComponent={MediumPlane}
          aircraftData={mediumAircraft}
          planeType="Medium - Boeing 737 MAX 8"
          // size={false}
        />

        {/* <SeatSelectionCard
          SeatMapComponent={LargePlane}
          aircraftData={largeAircraft}
          planeType="Large - Airbus A350-900"
          // size={true}
        /> */}
      </div>
    </>
  );
};

export default SeatsPage;
