// TurnGridButton.jsx
import React from "react";
import turngridImage from "/home/kasm-user/Documents/21_nav_mirr/08_nav_mirr_gh/src/assets/turngrid.png";
import "./turnGrid.css"
/* import "./turnGridButton.css";  */

const TurnGridButton = ({ orientation, setOrientation }) => {
  const toggleOrientation = () => {
    setOrientation(prev => (prev === "horizontal" ? "vertical" : "horizontal"));
  };

  return (
    <button className="turn-grid-button" onClick={toggleOrientation}>
      {/* Turn Grid */}
      <img src={turngridImage} className="turngrid-icon" />
    </button>
  );
};

export default TurnGridButton;
