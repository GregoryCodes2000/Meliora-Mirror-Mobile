import React, { useState, useEffect } from "react";
import "./calendar.css";

const Calendar = () => {

  const [today, setToday] = useState(new Date());

  useEffect(() => {

    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );

    const msUntilMidnight = tomorrow - now;

    const timer = setTimeout(() => {
      setToday(new Date());
    }, msUntilMidnight);

    return () => clearTimeout(timer);

  }, [today]);

  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  // previous month days
  for (let i = firstDay; i > 0; i--) {
    days.push({
      day: daysInPrevMonth - i + 1,
      current: false
    });
  }

  // current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      current: true
    });
  }

  // next month days
  while (days.length % 7 !== 0) {
    days.push({
      day: days.length - daysInMonth - firstDay + 1,
      current: false
    });
  }

  return (
    <div className="calendar">

      <div className="calendar-header">
        {monthNames[month].toUpperCase()} {year}
      </div>

      <div className="calendar-weekdays">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((d, i) => (
          <div
            key={i}
            className={`calendar-day
              ${!d.current ? "dim" : ""}
              ${d.day === todayDate && d.current ? "selected" : ""}`}
          >
            {d.day}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Calendar;