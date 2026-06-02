import React, { useState } from "react";
import PreviewGrid from "../PreviewGrid";
import "./zoom.css"; // Optional styling for overlay

const Zoom = ({
  gridContent,
  orientation,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  stockModules,
  options,
}) => {
  const [zoomed, setZoomed] = useState(false);

  const toggleZoom = () => { 
    console.log("ZOOM CLICKED");
    setZoomed((prev) => !prev);};

  return (
    <>
      <button onClick={toggleZoom} className="zoom-button box-shadowed">Zoom In</button>

      {zoomed && (
        <div className="zoom-overlay" onClick={toggleZoom}>
          <div
            className="zoom-close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
          >
            &times;
          </div>
          <div className="zoom-preview" onClick={(e) => e.stopPropagation()}>
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
      )}
    </>
  );
};

export default Zoom;
