/* import React, { useState } from "react"; */
/* import useIsMobile from "../../z.Mobile/useIsMobile"; */
/* import PrevControls from "../PrevControls"; */
import TurnGridButton from "../../z.Mobile/TurnGridButton";
import "./prevSettings.css";
import SaveButton from "./SaveButton";
import resetImage from "./../../../../../assets/reset.png";
import cleanImage from "./../../../../../assets/clean.png";


const PrevSettings = ({ handleClear, handleReset, orientation, setOrientation }) => {
    /* const isMobile = useIsMobile (); */
    
    return(
        <div className="prev-settings">
            <div className="turn-grid">
            <TurnGridButton orientation={orientation} setOrientation={setOrientation} />
            </div>
        <button  onClick={handleReset}> <img src={resetImage} className="reset-icon" alt="reset"/></button>
        <button  onClick={handleClear}> <img src={cleanImage} className="clean-icon" alt="clean"/> </button>
        
        <div className="savebutton">
                <SaveButton />
            </div>
       


        </div>

        
    )

}

export default PrevSettings;