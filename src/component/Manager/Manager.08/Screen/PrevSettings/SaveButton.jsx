

import "./saveButton.css";
import saveImage from "./../../../../../assets/save_img.png";

const SaveButton = () => {
    return (
        <button className="save-button">
     
            <img src={saveImage} className="save-icon" />
        </button>
    );
}

export default SaveButton;
