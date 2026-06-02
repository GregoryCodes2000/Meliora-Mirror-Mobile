import React, { useRef } from "react";
import "./preview_grid.css";
import TimeDisplay from "../Clock/TimeDisplay";
import Calendar from "../Calendar/Calendar";
import Praise from "../Praise/Praise";
import WeatherDisplay from "../Weather/WeatherDisplay";
import NewsDisplay from "../News/NewsDisplay";
import ForecastDisplay from "../Weather/Forecast/ForecastDisplay";
import TtcAlerts from "../Alerts/TTC/TtcAlerts";
import StockDisplay from "../Stock/StockDisplay";

const PreviewGrid = ({
  gridContent,
  orientation,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  stockModules = [],
  options = {},
}) => {
  // Touch tracking
  const touchData = useRef({
    item: null,
    startIndex: null,
  });

  const handleTouchStart = (e, item, index) => {
    touchData.current.item = item;
    touchData.current.startIndex = index;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;
  
    let target = document.elementFromPoint(x, y);
    if (!target) return;
  
    // ⬇️ climb up until preview-square is found
    while (target && !target.getAttribute("data-index")) {
      target = target.parentElement;
    }
    if (!target) return;
  
    const dropIndex = parseInt(target.getAttribute("data-index"));
    handleDropTouch(dropIndex);
  
    touchData.current = { item: null, startIndex: null };
  };

  const handleDropTouch = (dropIndex) => {
    const { startIndex } = touchData.current;
    if (startIndex === null) return;

    const fakeEvent = {
      preventDefault: () => {},
      dataTransfer: {
        getData: () => gridContent[startIndex],
      },
    };

    handleDrop(fakeEvent, dropIndex);
  };

  const totalSquares = orientation === "vertical" ? 42 : 35;
  // Expand stock into multiple preview cells
  const paddedGrid = [...gridContent];
  while (paddedGrid.length < totalSquares) {
    paddedGrid.push("");
  }



  while (paddedGrid.length < totalSquares) {
    paddedGrid.push("");
  }
  return (
    <div className="preview-container" onDragOver={handleDragOver}>
      <div className={`preview-window ${orientation}`}>
        {paddedGrid.map((content, index) => (
          
          <div
            className={`preview-square ${
              content === "forecast" || content === "calendar"
                ? "large-item"
                : content === "newsfeed"
                ? "long-item"
                : ""
            }`}
            key={index}
            data-index={index}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            style={{ position: "relative" }}
          >
            {content && options[content.split("-")[0]] && (
              
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, content)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(e, content, index)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="preview-item"
              >
               {content === "clock" ? (
  <div className="clock-preview">
    <TimeDisplay
      timeZone="UTC"
      /* is24Hour={true} */
      timeColor="#ffffff"
      showBorder={false}
    />
  </div>

) : content === "calendar" ? (

  <div className="calendar-preview">
    <Calendar />
  </div>

) : content === "praise" ? (

  <div className="praise-preview">
    <Praise />
  </div>

) : content === "newsfeed" ? (

  <div className="newsfeed-preview">
    <NewsDisplay />
  </div>

) : content === "weather" ? (
  <div className="weather-preview">
    <WeatherDisplay />
  </div>

) : content === "forecast" ? (
  <div className="forecast-preview">
    <ForecastDisplay />
  </div>

) : content === "ttc" ? (
  <div className="ttc-preview">
  <TtcAlerts />
  </div>

) : content.startsWith("stock-") && (() => {
  const index = parseInt(content.split("-")[1], 10);
  const module = stockModules[index];

  if (!module || !module.symbol) return null;

  

  return (
    <div className="stock-preview">
      <StockDisplay symbol={module.symbol} />
    </div>
  );
})()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewGrid;