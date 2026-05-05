import React, { useEffect, useState, useCallback } from "react";
import "./forecastDisplay.css";
import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiFog,
  WiRainMix,
} from "react-icons/wi";

const ForecastDisplay = () => {
  const API_KEY = "5fb9ca4aa33fbbce9c2417dab5e99de9";

  // Load city from Weather.jsx
  const savedCity =
    JSON.parse(localStorage.getItem("selectedCity")) || {
      name: "New York",
      lat: 40.7128,
      lon: -74.006,
    };

  const [forecast, setForecast] = useState([]);
  const [cityName, setCityName] = useState(savedCity.name);

  const fetchForecast = useCallback(async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${savedCity.lat}&lon=${savedCity.lon}&units=metric&appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    // Group by day
    const daily = {};

    data.list.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!daily[date]) {
        daily[date] = [];
      }
      daily[date].push(entry);
    });

    // Extract high/low + representative icon
    const formatted = Object.keys(daily)
      .slice(0, 5)
      .map((date) => {
        const temps = daily[date].map((t) => t.main.temp);
        const min = Math.min(...temps);
        const max = Math.max(...temps);
        const cloudState = daily[date][4]?.weather[0]?.description || "";
        return { date, min, max, cloudState };
      });

      setForecast(formatted);
    }, [savedCity.lat, savedCity.lon]);

  // Map descriptors to icons
  const getIcon = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes("fog") || d.includes("mist")) return <WiFog />;
    if (d.includes("few clouds")) return <WiDayCloudy />;
    if (d.includes("cloud")) return <WiCloudy />;
    if (d.includes("rain")) return <WiRainMix />;
    if (d.includes("clear")) return <WiDaySunny />;
    return <WiCloud />;
  };

  const dayLabel = (index, dateStr) => {
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });
  };

  useEffect(() => {
    fetchForecast();

    const interval = setInterval(fetchForecast, 900000);
    return () => clearInterval(interval);
  }, []);

  if (!forecast.length)
    return <div className="forecast-container">Loading forecast...</div>;

  return (
    <div className="forecast-container">
      <div className="forecast-title">
        WEATHER FORECAST <br/> {cityName.toUpperCase()}
      </div>

      {forecast.map((day, i) => (
        <div className="forecast-row" key={i}>
          <div className="forecast-day">{dayLabel(i, day.date)}</div>

          <div className="forecast-icon">{getIcon(day.cloudState)}</div>

          <div className="forecast-max">{day.max.toFixed(1)}°</div>

          <div className="forecast-min">{day.min.toFixed(1)}°</div>
        </div>
      ))}
    </div>
  );
};

export default ForecastDisplay;