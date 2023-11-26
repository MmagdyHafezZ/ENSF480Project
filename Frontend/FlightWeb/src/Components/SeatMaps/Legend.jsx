import React from "react";

const Legend = () => {
  return (
    <>
      <div className="legend">
        <div className="legend__item">
          <span className="legend__item__color legend_business"></span>
          <div className="legend__item__name">Business</div>
        </div>
        <div className="legend__item">
          <span className="legend__item__color legend_comfort"></span>
          <div className="legend__item__name">Comfort</div>
        </div>
        <div className="legend__item">
          <span className="legend__item__color legend_ordinary"></span>
          <div className="legend__item__name">Ordinary</div>
        </div>
        <div className="legend__item-wing">
          <span className="legend__item__wing legend_ordinary"></span>
          <div className="legend__item__name">Wing Seat</div>
        </div>
      </div>
    </>
  );
};

export default Legend;
