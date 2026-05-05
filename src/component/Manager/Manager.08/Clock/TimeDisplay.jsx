import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";

const TimeDisplay = ({ timeZone, is24Hour, timeColor, showBorder }) => {
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

        const timeFormat = is24Hour ? "HH:mm" : "hh:mm a";
        const formattedTime = formatInTimeZone(now, timeZone, timeFormat);

        const seconds = formatInTimeZone(now, timeZone, "ss");

        setCurrentTime({
          date: formattedDate,
          time: formattedTime,
          seconds,
        });
      } catch (error) {
        console.error("Error formatting time:", error);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timeZone, is24Hour]);

  return (
    <div className="time-display">
      <div className="time-border">
        <div className="date">{currentTime.date}</div>

        <div className="clock" style={{ color: timeColor }}>
          {currentTime.time.replace(/ (AM|PM)/, "")}

          {currentTime.time.match(/ (AM|PM)/) && (
            <span className="meridiem">
              {currentTime.time.match(/ (AM|PM)/)[1]}
            </span>
          )}

          <span className="seconds">{currentTime.seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;