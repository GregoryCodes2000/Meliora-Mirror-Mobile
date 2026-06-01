import React, { useState } from "react";
import "./clock.css";
import Select from "react-select";
import TimeDisplay from "./TimeDisplay";
import TimeZoneSelect from "./ClockSelect/TimeZoneSelect";

const Clock = ({ theme }) => {
  // Get all supported time zones and set default
  const allTimeZones = Intl.supportedValuesOf("timeZone") || [];
  const defaultTimeZone = allTimeZones.includes(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "UTC";

  const [timeZone, setTimeZone] = useState(
    localStorage.getItem("userTimeZone") || defaultTimeZone
  );
  const [is24Hour, setIs24Hour] = useState(true); // 24-hour format state
  const [timeColor, setTimeColor] = useState("#ffffff"); // Default white color

  // Generate time zone options
  const options = allTimeZones.map((tz) => ({
    label: tz.replace("_", " "), // Format the timezone name
    value: tz,
  }));

  const filteredOptions = options.filter(
    (opt) => !opt.value.startsWith("Africa/")
  );

  // Handle timezone change
  const handleTimeZoneChange = (selected) => {
    setTimeZone(selected.value);
    localStorage.setItem("userTimeZone", selected.value); // Store in localStorage
  };

  return (
    <div className="time-zone">
      {/* Time Display Component */}
     <div className="clock-section">
      <div className="display">
        {/* <div className="border"> */}
      <TimeDisplay
        timeZone={timeZone}
        is24Hour={is24Hour}
        timeColor={timeColor}
        showBorder={true}
      />{/* </div> */}
      </div>
      {/* Time Format (12H / 24H) Toggle */}
      <div className="time-format-buttons">
        <button
          className={!is24Hour ? "active" : ""}
          onClick={() => setIs24Hour(false)}
        >
          12H
        </button>
        <button
          className={is24Hour ? "active" : ""}
          onClick={() => setIs24Hour(true)}
        >
          24H
        </button>
      </div></div>

      {/* Time Zone Selector */}
      <div className="selector">
        <label className="time-zone-label">Select Your Time Zone:</label>
        <TimeZoneSelect
  value={timeZone}
  onChange={(tz) => {
    setTimeZone(tz);
    localStorage.setItem("userTimeZone", tz);
  }}
/>
      </div>
    </div>
  );
};

export default Clock;
