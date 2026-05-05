import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import "../clock.css";
import "./lcdClock.css";




const LCDClock = ({ theme }) => {
  const allTimeZones = Intl.supportedValuesOf("timeZone") || [];
  const defaultTimeZone = allTimeZones.includes(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "UTC";

  const [timeZone, setTimeZone] = useState(
    localStorage.getItem("userTimeZone") || defaultTimeZone
  );
  const [is24Hour, setIs24Hour] = useState(true); 
  const [currentTime, setCurrentTime] = useState({
    date: "",
    time: "",
    seconds: "",
  });

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formattedDate = formatInTimeZone(
          now,
          timeZone,
          "EEEE, MMMM d, yyyy"
        );
        const timeFormat = is24Hour ? "HH:mm" : "hh:mm a"; // Use 12H/24H format
        let formattedTime = formatInTimeZone(now, timeZone, timeFormat);
        let timePart = formattedTime;
        let meridiem = "";

        if (!is24Hour) {
          const parts = formattedTime.split(" ");
          timePart = parts[0];
          meridiem = parts[1]; // "AM" or "PM"
        }

        const seconds = formatInTimeZone(now, timeZone, ":ss");
        setCurrentTime({ date: formattedDate, time: formattedTime, seconds });
      } catch (error) {
        console.error("Error formatting time:", error);
        setCurrentTime({ date: "Invalid time zone", time: "", seconds: "" });
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, is24Hour]); // update when toggle changes

  const handleTimeZoneChange = (e) => {
    const selectedTimeZone = e.target.value;
    if (allTimeZones.includes(selectedTimeZone)) {
      setTimeZone(selectedTimeZone);
      localStorage.setItem("userTimeZone", selectedTimeZone);
    } else {
      console.warn("Invalid time zone selected:", selectedTimeZone);
    }
  };

  const options = allTimeZones.map((tz) => ({
    label: tz.replace("_", " "), // optional formatting
    value: tz,
  }));

  const [timeColor, setTimeColor] = useState("#ffffff"); // default white
  /* const options = allTimeZones.map(tz => ({ value: tz, label: tz })); */

  const filteredOptions = options.filter(
    (opt) => !opt.value.startsWith("Africa/")
  );

  return (
    <div className="time-zone1">
      <div className="lcd-clock">
      <div className="lcd-time">
        <div className="time-border">
         
          <div className="lcd-date">{currentTime.date}</div>
          <div className="lcd-clock" >
            {currentTime.time.replace(/ (AM|PM)/, "")}
            {currentTime.time.match(/ (AM|PM)/) && (
              <span className="lcd-meridiem">
                {currentTime.time.match(/ (AM|PM)/)[1]}
              </span>
            )}
            <span className="lcd-seconds">{currentTime.seconds}</span>
          </div>
          
        </div>
       

        
      </div>

      </div>

      
     
    </div>
    
  );
};

export default LCDClock;
