import React, { useState, useEffect } from "react";
import "./weather.css";
import WeatherDisplay from "../../../../component/Manager/Manager.08/Weather/WeatherDisplay";

const Weather = () => {
  const savedCity = JSON.parse(localStorage.getItem("selectedCity"));
  const [city, setCity] = useState(savedCity?.name || "New York");
  const [inputValue, setInputValue] = useState(city);
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState({
    latitude: savedCity?.lat || 40.7128,
    longitude: savedCity?.lon || -74.006,
  });
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "5fb9ca4aa33fbbce9c2417dab5e99de9";

  console.log("hello0");

  const fetchCitySuggestions = async (query) => {
    console.log("hello2", query);
    if (!query) return;
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    const data = await res.json();
    console.log(data);
    if (data.length > 0) {
      setSuggestions(
        data.map((item, index) => ({
          id: index,
          name: item.name,
          country: item.country,
          latitude: item.lat,
          longitude: item.lon,
        }))
      );
    } else {
      setSuggestions([]);
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    console.log("hello4");
    if (!API_KEY) return;
    console.log("hello5", API_KEY);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    console.log("Flag2", data);
    setWeatherData(data);
  };

  // Fetch weather whenever coords changes
  useEffect(() => {
    console.log("Coords changed, fetching weather:", coords);
    const fetchData = async () => {
      console.log("hello4");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      console.log("Flag2", data);
      setWeatherData(data);
    };
  
    fetchData();
  
    const interval = setInterval(fetchData, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, [coords]);

  const handleCitySelect = (selectedCity) => {
    console.log("City selected:", selectedCity.name);

    // Update city and input value
    setCity(selectedCity.name);
    setInputValue(selectedCity.name);
    setSuggestions([]);

    // Update coords → triggers useEffect to fetch weather
    setCoords({
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
    });

    // Save to localStorage
    localStorage.setItem(
      "selectedCity",
      JSON.stringify({
        name: selectedCity.name,
        lat: selectedCity.latitude,
        lon: selectedCity.longitude,
      })
    );
  };

  return (
    <div className="weather-container">
      <div className="location-input">
        <label htmlFor="city-input">Location:</label>
        <div className="input-wrapper">
          <input
            id="city-input"
            type="text"
            className="city-input"
            placeholder="Search for a city..."
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);
              if (val.length > 1) fetchCitySuggestions(val);
              else setSuggestions([]);
            }}
            onFocus={() => {
              if (inputValue.length > 1) fetchCitySuggestions(inputValue);
            }}
            onBlur={() => setTimeout(() => setSuggestions([]), 150)}
          />
        </div>
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((s) => (
              <li
                key={s.id}
                className="suggestion-item"
                onClick={() => handleCitySelect(s)}
              >
                {s.name}, {s.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="weather-displays">
        {weatherData && (
          <div className="weatherscreen" key={weatherData ? weatherData.id : "default"}>
          {weatherData && (
            <WeatherDisplay
              city={city}
              temperature={weatherData.main.temp}
              feelsLike={weatherData.main.feels_like}
              windSpeed={weatherData.wind.speed}
              sky={weatherData.weather[0].description}
            />
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default Weather;