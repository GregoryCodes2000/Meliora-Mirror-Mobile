import React, { useState, useEffect } from "react";
import "../../Manager.08/Screen/screen8.css";
import SearchBar from "../y.Search_Bar/SearchBar";
import PrevControls from "./PrevControls";
import PreviewGrid from "./PreviewGrid";
import PrevSettings from "./PrevSettings/PrevSettings";
import SaveButton from "./PrevSettings/SaveButton";
import ToggleSwitches from "./Switches";
import Zoom from "./Zoom/Zoom";

const Manager8 = () => {
  const [options, setOptions] = useState({
    clock: true, //default ON
    weather: true,
    calendar: true,
    forecast:true,
    praise: true,
    newsfeed: true,
  });

  const [showImageSection, setShowImageSection] = useState({
    clock: false,
    weather: false,
    calendar: false,
    praise: false,
    newsfeed: false,
  });

  /* const [stockModules, setStockModules] = useState([
    { id: 1, symbol: "AAPL" },
  ]) */
  const [stockModules, setStockModules] = useState([{ id: 0, symbol: "AAPL" }]);

  useEffect(() => {
    setGridContent((prevGrid) => {
      if (prevGrid.includes("stock-0")) return prevGrid; // Already added
      return handleAddToGrid("stock-0") || prevGrid;
    });
  }, []);

  const [gridContent, setGridContent] = useState(() => {
    const grid = Array(42).fill(null);
    grid[0] = "clock";
    grid[2] = "weather";
    grid[3] = "calendar";
    grid[5] = "forecast";
    grid[20] = "praise";
    grid[26] = "newsfeed";
    return grid;
  });
  const [orientation, setOrientation] = useState("vertical");

  const handleToggleChange = (event) => {
    const { name, checked } = event.target;

    setOptions((prevOptions) => ({ ...prevOptions, [name]: checked }));

    if (checked) {
      setGridContent((prevGrid) => {
        const newGrid = [...prevGrid];
        const firstEmptyIndex = newGrid.findIndex((item) => item === null);
        if (firstEmptyIndex !== -1) newGrid[firstEmptyIndex] = name;
        return newGrid;
      });
    } else {
      setGridContent((prevGrid) =>
        prevGrid.map((item) => (item === name ? null : item))
      );
    }
  };

  const handleGroupClick = (name) => {
    setShowImageSection((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleDragStart = (e, content) => {
    e.dataTransfer.setData("draggedItem", content);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop by preventing default behavior
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    const draggedItem = e.dataTransfer.getData("draggedItem");

    setGridContent((prevGrid) => {
      const newGrid = [...prevGrid];
      const dragIndex = newGrid.findIndex((item) => item === draggedItem);

      if (dragIndex === -1) return newGrid;

      // SWAP the two cells
      const temp = newGrid[dropIndex];
      newGrid[dropIndex] = newGrid[dragIndex];
      newGrid[dragIndex] = temp;

      return newGrid;
    });
  };

  const handleDragEnd = (e) => {
    const previewWindow = document.querySelector(".preview-window");
    const previewRect = previewWindow.getBoundingClientRect();
    const { clientX, clientY } = e;

    // Check if drag ended outside preview window
    if (
      clientX < previewRect.left ||
      clientX > previewRect.right ||
      clientY < previewRect.top ||
      clientY > previewRect.bottom
    ) {
      e.preventDefault();
    }
  };

  const handleClearMirror = () => {
    setOptions({
      clock: false,
      weather: false,
      forecast: false,
      calendar: false,
      praise: false,
      newsfeed: false,
      ttc: false,
      stock: false,
    });

    /* setShowImageSection({
      clock: false,
      weather: false,
      calendar: false,
      compliments: false,
      newsfeed: false,
    }); */

    setGridContent(Array(42).fill(null));
  };

  const handleReset = () => {
    // Reset toggle switches
    setOptions({
      clock: true,
      weather: true,
      calendar: true,
      forecast: true,
      praise: true,
      newsfeed: true,
    });

    // Reset grid content
    setGridContent(() => {
      const grid = Array(42).fill(null);
      grid[0] = "clock"; // Default position
      grid[2] = "weather";
      grid[3] = "calendar";
      grid[5] = "forecast";
      grid[20] = "praise";
      grid[26] = "newsfeed";

      return grid;
    });
  };

  // ADD A MODULE TO FIRST EMPTY GRID CELL
  const handleAddToGrid = (item) => {
    setGridContent((prevGrid) => {
      const newGrid = [...prevGrid];
      const firstEmpty = newGrid.findIndex((cell) => cell === null);

      if (firstEmpty !== -1) {
        newGrid[firstEmpty] = item; // e.g. "stock-0"
      }
      return newGrid;
    });
  };

  // REMOVE A MODULE FROM GRID
  const handleRemoveFromGrid = (item) => {
    setGridContent((prevGrid) =>
      prevGrid.map((cell) => (cell === item ? null : cell))
    );
  };

  return (
    <div className="layout">
      <div className="screen-control">
        <div className="toggle-group">
        
         {/*  <SearchBar /> */}
         

          {
            <ToggleSwitches
              options={options}
              handleToggleChange={handleToggleChange}
              handleGroupClick={handleGroupClick}
              showImageSection={showImageSection}
              stockModules={stockModules}
              setStockModules={setStockModules}
              handleAddToGrid={handleAddToGrid}
              handleRemoveFromGrid={handleRemoveFromGrid}
            />
          }
        </div>


        <div className="top-section">
          {/* <div> */}
          <PrevControls
            orientation={orientation}
            setOrientation={setOrientation}
          />

          <Zoom
            gridContent={gridContent}
            orientation={orientation}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
          {/* </div> */}
          <div className="screen-content">
            <PreviewGrid
              gridContent={gridContent}
              orientation={orientation}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              stockModules={stockModules}
              options={options}
            />
          </div>
        </div>

        <div className="prev-settings-group">
          <PrevSettings
            handleClear={handleClearMirror}
            handleReset={handleReset}
            orientation={orientation}
            setOrientation={setOrientation}
          />
        </div>
      </div>
      <div className="mobile-control">
        <div className="prev-settings-group-mobile">
          {}{" "}
          <PrevSettings
            handleClear={handleClearMirror}
            handleReset={handleReset}
            orientation={orientation}
            setOrientation={setOrientation}
          />
        </div>
        <div className="toggle-group-mobile">
          {/* <SearchBar /> */}

          {
            <ToggleSwitches
              options={options}
              handleToggleChange={handleToggleChange}
              handleGroupClick={handleGroupClick}
              showImageSection={showImageSection}
              stockModules={stockModules}
              setStockModules={setStockModules}
              handleAddToGrid={handleAddToGrid}
              handleRemoveFromGrid={handleRemoveFromGrid}
            />
          }
        </div>
        <div className="savebutton-mobile">
          <SaveButton />
        </div>
      </div>
    </div>
  );
};

export default Manager8;
