import "./saveButton.css";
import saveImage from "./../../../../../assets/save_img2.png";

import { useDispatch } from "react-redux";
import { setGridLayout } from "../../../../../store/persisted/gridSlice";
import { setOptions } from "../../../../../store/persisted/switchesSlice";


const SaveButton = ({
    gridContent,
    options,
    orientation,
    stockModules,
  }) => {
    const dispatch = useDispatch();
  
    const handleSave = () => {
      dispatch(setGridLayout(gridContent));
      dispatch(setOptions(options));
      // dispatch(setOrientation(orientation));
      // dispatch(setStockModules(stockModules));
    };
  
    return (
      <button className="save-button" onClick={handleSave}>
        <img src={saveImage} className="save-icon" />
      </button>
    );
  };

export default SaveButton;