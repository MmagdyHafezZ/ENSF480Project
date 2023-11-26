import React from "react";
import SeatContainer from "../../Components/SeatMaps/SeatsContainer";
import Legend from "../../Components/SeatMaps/Legend";
const SeatSelectionCard = ({
  SeatMapComponent,
  aircraftData,
  planeType,
  //   size,
}) => {
  return (
    <div className="seats-page__seats-selection">
      <div className="seats-selection__card">
        <div className="seats-selection__card__map">
          <SeatContainer
            SeatMapComponent={SeatMapComponent}
            isBooking={false}
            // size={size}
          />
        </div>
        <div className="seats-selection__card__desc">
          <h2 className="seats-selection__card__desc__header">{planeType}</h2>
          <p>{Object.entries(aircraftData)[0]}</p>
          <div className="specs">
            {Object.entries(aircraftData)
              .slice(1)
              .map(([key, value]) => (
                <div key={key} className="spec-item">
                  <div className="spec-item__header">{key}:</div>
                  <div className="spec-item__description">{value}</div>
                </div>
              ))}
          </div>
          <Legend />
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionCard;
