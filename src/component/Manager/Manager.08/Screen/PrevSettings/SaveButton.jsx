import "./saveButton.css";
import saveImage from "/home/kasm-user/Documents/21_nav_mirr/08_nav_mirr_gh/src/assets/save_img.png";

const SaveButton = () => {
    return (
        <button className="save-button">
     
            <img src={saveImage} className="save-icon" />
        </button>
    );
}

export default SaveButton;
