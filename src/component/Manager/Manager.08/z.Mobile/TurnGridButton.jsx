// TurnGridButton.jsx
import React from "react";


import turngridImage from "./../../../../assets/turngrid.png";
import "./turnGrid.css"
/* import "./turnGridButton.css";  */

const TurnGridButton = ({ orientation, setOrientation }) => {
  const toggleOrientation = () => {
    setOrientation(prev => (prev === "horizontal" ? "vertical" : "horizontal"));
  };

  return (
    <button className="turn-grid-button" onClick={toggleOrientation}>
      {/* Turn Grid */}
      <img src={turngridImage} className="turngrid-icon" alt="" />
    </button>
  );
};

export default TurnGridButton;
