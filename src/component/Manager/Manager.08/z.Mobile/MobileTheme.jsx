import React, { useEffect } from "react";
import "./mobileTheme.css";
import { FaSun, FaMoon } from "react-icons/fa";


const MobileTheme = ({ theme, setTheme }) => {
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <div className={`toggle-slider ${theme}`}></div>
      <FaSun className="icon sun" />
      <FaMoon className="icon moon" />
    </div>
  );
};

export default MobileTheme;
