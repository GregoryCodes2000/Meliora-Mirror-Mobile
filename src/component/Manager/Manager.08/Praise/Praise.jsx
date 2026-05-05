import React, { useState, useEffect } from "react";
import "./praise.css";

const praises = [
  "your focus may outshine the morning sun itself",
  "the world seems to move just a bit smoother when you take charge",
  "one might say excellence has become you routine",
  "that's what i'm talking about!"
];

const Praise = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % praises.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="praise-container">
      {praises[index]}
    </div>
  );
};

export default Praise;