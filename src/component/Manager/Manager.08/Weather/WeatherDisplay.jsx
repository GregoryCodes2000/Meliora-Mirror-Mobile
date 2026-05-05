import React, { useState, useEffect } from "react";
import "./weatherDisplay.css";
import {
  WiStrongWind,
  WiDaySunny,
  WiCloudy,
  WiCloud,
  WiFog,
  WiRainMix,
  WiDayCloudy,
} from "react-icons/wi";

const WeatherDisplay = () => {
  const API_KEY = "5fb9ca4aa33fbbce9c2417dab5e99de9";

  // Load saved city from Weather.jsx
  const savedCity = JSON.parse(localStorage.getItem("selectedCity")) || {
    name: "New York",
    lat: 40.7128,
    lon: -74.006,
  };

  const [weather, setWeather] = useState(null);
  const [cityInfo, setCityInfo] = useState(savedCity);

  const fetchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    setWeather(data);
  };

  useEffect(() => {
    const handleCityChange = () => {
      const updatedCity = JSON.parse(localStorage.getItem("selectedCity"));
      if (updatedCity) setCityInfo(updatedCity);
    };

    window.addEventListener("storage", handleCityChange);

    handleCityChange();
    fetchWeather();

    const interval = setInterval(fetchWeather, 600000);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleCityChange);
    };
  }, [cityInfo.lat, cityInfo.lon]);

  if (!weather) return <div className="weather-mini">Loading...</div>;

  const temp = Math.round(weather.main.temp);
  const feels = Math.round(weather.main.feels_like);
  const wind = Math.round(weather.wind.speed);
  const direction = weather.wind.deg;
  const desc = weather.weather[0].description;

  // SKY ICON MAP
  const mapIcon = () => {
    const d = desc.toLowerCase();
    if (d.includes("fog") || d.includes("mist")) return <WiFog />;
    if (d.includes("clear")) return <WiDaySunny />;
    if (d.includes("few clouds")) return <WiDayCloudy />;
    if (d.includes("cloud")) return <WiCloudy />;
    if (d.includes("rain")) return <WiRainMix />;
    return <WiCloud />;
  };

  // WIND DIRECTION
  const directionMap = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const windDir = directionMap[Math.round(direction / 45) % 8] || "N";

  return (
    <div className="weather-mini">
      <div className="weather-top-row">
        <div className="weather-wind">
          <WiStrongWind className="w-icon" />
          <span className="wind-val">{wind}</span>
          <span className="wind-dir">{windDir}</span>
        </div>

        {/* ⭐ Replaced TIME with LOCATION */}
        <div className="weather-location">
          <WiDaySunny className="sun-icon" />
        
          <span className="loc-val">{cityInfo.name}</span>
        
        </div>
      </div>

      <div className="weather-mid">
        <div className="sky-icon">{mapIcon()}</div>
        <div className="big-temp">{temp}°</div>
        <div className="weather-bottom">FL {feels}°</div>
      </div>

      
    </div>
  );
};

export default WeatherDisplay;