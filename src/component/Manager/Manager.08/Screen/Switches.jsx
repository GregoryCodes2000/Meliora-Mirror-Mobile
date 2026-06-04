import React, { useState, useEffect } from "react";
import TtcAlerts from "../Alerts/TTC/TtcAlerts";
import Calendar from "../Calendar/Calendar";
import TimeDisplay from "../Clock/TimeDisplay";
import Praise from "../Praise/Praise";
import StockDisplay from "../Stock/StockDisplay";
import StocksManager from "../Stock/StockManager";
import ForecastDisplay from "../Weather/Forecast/ForecastDisplay";
import WeatherDisplay from "../Weather/WeatherDisplay";
import settingsImage from "./../../../../assets/gear.png";

import { Link } from "react-router-dom";
import "./switches.css";
import NewsDisplay from "../News/NewsDisplay";
import SearchBar from "../y.Search_Bar/SearchBar";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const ToggleSwitches = ({
  options,
  handleToggleChange,
  handleGroupClick,
  showImageSection,
  stockModules,
  setStockModules,
  handleAddToGrid,
  handleRemoveFromGrid,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Correct single stockModules definition
  /* const [stockModules, setStockModules] = useState([
    { id: 1, symbol: "AAPL" },
  ]); */

  const modules = [
    "clock",
    "weather",
    "forecast",
    "calendar",
    "praise",
    "newsfeed",
    "ttc",
    "stock",
  ];

  const matches = modules.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nonMatches = modules.filter(
    (item) => !item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showWeatherPage, setShowWeatherPage] = useState(false);

  const renderModule = (item) => (
    <div className="toggle-switch-group box-shadowed" key={item}>
      <div className="switch-header" onClick={() => handleGroupClick(item)}>
        <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            id={item}
            name={item}
            checked={options[item]}
            onChange={handleToggleChange}
          />
          <span className="slider"></span>
        </label>

        <span className="toggle-label">
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </span>

        <div className="arrow-div">
          <span
            className={`arrow ${showImageSection[item] ? "up" : ""}`}
          ></span>
        </div>
      </div>

      {/* MODULE CONTENT */}
      <div className="checkbox-img">
        
        {showImageSection[item] && (
          <div className={`img-section ${item}-bottom`}>
            {item === "clock" ? (
              <div className="time-switch">
                <TimeDisplay is24Hour={true} />
                <button className="clock-settings-btn">
                  <Link to="/clock">
                    <img src={settingsImage} />
                  </Link>
                </button>
              </div>
            ) : item === "calendar" ? (
              <div className="calendar-switch">
                <Calendar />
              </div>
            ) : item === "praise" ? (
              <div className="praise-switch">
                <Praise />
              </div>
            ) : item === "weather" ? (
              <div className="weather-switch">
                <WeatherDisplay />
                
                  <button className="weather-settings-btn">
                    <Link to="/weather">
                      <img src={settingsImage} />
                    </Link>
                  </button>
                
              </div>
            ) : item === "forecast" ? (
              <div className="forecast-switch">
                <ForecastDisplay />
              </div>
              ) : item === "newsfeed" ? (
                <div className="newsfeed-switch">
                  <NewsDisplay />
                </div>
            ) : item === "ttc" ? (
              <div className="ttc-switch">
                <TtcAlerts />
              </div>
            ) : item === "stock" ? (
              <div className="stock-switch">
                {/* ALL STOCK MODULES */}
                {stockModules.map((module) => (
                  <div key={module.id} className="stock-module-wrapper">
                    <StocksManager
                      symbol={module.symbol}
                      onSymbolChange={(newSymbol) =>
                        setStockModules((prev) => {
                          const updated = [...prev];
                          updated[module.id] = {
                            ...updated[module.id],
                            symbol: newSymbol.toUpperCase(),
                          };
                          return updated;
                        })
                      }
                    />

                    <StockDisplay symbol={module.symbol || ""} />
                  </div>
                ))}

                <div className="stock-buttons">
                  <button
                    className="add-stock-btn"
                    onClick={() => {
                      setStockModules((prev) => {
                        const newIndex = prev.length;
                        handleAddToGrid(`stock-${newIndex}`); // Add to grid immediately
                        return [...prev, { id: newIndex, symbol: "" }];
                      });
                    }}
                  >
                    +
                  </button>

                  <button
  className="remove-stock-btn"
  disabled={stockModules.length <= 1}
  onClick={() => {
    if (stockModules.length <= 1) return;

    setStockModules((prev) => prev.slice(0, -1));
    handleRemoveFromGrid(`stock-${stockModules.length - 1}`);
  }}
>
  –
</button>
                </div>
              </div>
            ) : (
              // Default PNG image for modules
              {/* <img
                src={require(`/home/kasm-user/Documents/4000_react_gri/05_Mirror_decor/decor/src/component/Manager/${item}.png`)}
                alt={item}
                className={`toggle-image ${item}`}
              /> */}
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="checkbox-wrapper">
      <div className="checkbox-container">
        {matches.map(renderModule)}

        {matches.length > 0 && nonMatches.length > 0 && (
          <hr className="switch-separator" />
        )}

        {nonMatches.map(renderModule)}
      </div>
    </div>
  );
};

export default ToggleSwitches;
