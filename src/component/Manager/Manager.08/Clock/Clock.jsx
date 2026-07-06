import React, { useState } from "react";
import "./clock.css";
import Select from "react-select";
import TimeDisplay from "./TimeDisplay";
import TimeZoneSelect from "./ClockSelect/TimeZoneSelect";

import { useSelector, useDispatch } from "react-redux";
import {
  setTimeZone,
  setIs24Hour,
  setTimeColor,
} from "../../../../store/persisted/clockSlice";

const Clock = ({ theme }) => {
  // Get all supported time zones and set default
  const allTimeZones = Intl.supportedValuesOf("timeZone") || [];
  const defaultTimeZone = allTimeZones.includes(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "UTC";

  /* const [timeZone, setTimeZone] = useState(
    localStorage.getItem("userTimeZone") || defaultTimeZone
  );
  const [is24Hour, setIs24Hour] = useState(true);
  const [timeColor, setTimeColor] = useState("#ffffff");  */

  const dispatch = useDispatch();

const timeZone = useSelector(
  (state) => state.clock.timeZone
);

const is24Hour = useSelector(
  (state) => state.clock.is24Hour
);

const timeColor = useSelector(
  (state) => state.clock.timeColor
);


  const options = allTimeZones.map((tz) => ({
    label: tz.replace("_", " "), 
    value: tz,
  }));

  const filteredOptions = options.filter(
    (opt) => !opt.value.startsWith("Africa/")
  );

  const handleTimeZoneChange = (selected) => {
    dispatch(setTimeZone(selected.value));
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
          onClick={() => dispatch(setIs24Hour(false))}
        >
          12H
        </button>
        <button
          className={is24Hour ? "active" : ""}
          onClick={() => dispatch(setIs24Hour(true))}
        >
          24H
        </button>
      </div></div>

      {/* Time Zone Selector */}
      <div className="selector">
        <label className="time-zone-label">Select Your Time Zone:</label>
        <TimeZoneSelect
  value={timeZone}
  onChange={(tz) => dispatch(setTimeZone(tz))}
/>
      </div>
    </div>
  );
};

export default Clock;
