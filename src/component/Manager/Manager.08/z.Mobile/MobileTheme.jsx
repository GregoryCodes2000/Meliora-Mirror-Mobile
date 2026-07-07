import React, { useEffect } from "react";
import "./mobileTheme.css";
import { FaSun, FaMoon } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../../../store/persisted/themeSlice";

const MobileTheme = () => {
  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.theme.theme
  );

  console.log("Theme:", theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    console.log("Redux theme changed:", theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log("clicked");
    dispatch(
      setTheme(theme === "light" ? "dark" : "light")
    );
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