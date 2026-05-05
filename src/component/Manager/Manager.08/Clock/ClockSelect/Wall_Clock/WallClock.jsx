import React, { useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

const WallClock = () => {
  const [value, setValue] = useState(new Date());

  useState(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "" }}>
      <Clock value={value} renderNumbers={true} />
    </div>
  );
};

export default WallClock;
