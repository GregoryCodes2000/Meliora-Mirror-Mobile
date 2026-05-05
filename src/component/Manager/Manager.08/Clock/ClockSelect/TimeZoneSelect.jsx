import React, { useState, useEffect, useRef } from "react";
import "./timezoneSelect.css";

const TimeZoneSelect = ({ value, onChange }) => {
  const allTimeZones = Intl.supportedValuesOf("timeZone");
  const filteredTZ = allTimeZones.filter((tz) => !tz.startsWith("Africa/"));

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef(null);

  const filtered = filteredTZ.filter((tz) =>
    tz.toLowerCase().includes(query.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (tz) => {
    onChange(tz);
    setQuery(tz);       // make selected timezone visible
    setIsOpen(false);
  };
  const handleKey = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((prev) => (prev + 1) % filtered.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((prev) => (prev - 1 + filtered.length) % filtered.length);
    }

    if (e.key === "Enter") {
      handleSelect(filtered[highlighted]);
    }
  };

  return (
    <div className="tz-wrapper" ref={wrapperRef}>
      <div className="tz-input-box">
      <input
  className="tz-input"
  placeholder="Select time zone..."
  value={query}
  onClick={() => setIsOpen(true)}
  onChange={(e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  }}
  onKeyDown={handleKey}
/>
        <span className="tz-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="tz-dropdown">
          {filtered.map((tz, idx) => (
            <div
              key={tz}
              className={`tz-option ${
                idx === highlighted ? "highlighted" : ""
              }`}
              onMouseEnter={() => setHighlighted(idx)}
              onClick={() => handleSelect(tz)}
            >
              {tz.replace("_", " ")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeZoneSelect;