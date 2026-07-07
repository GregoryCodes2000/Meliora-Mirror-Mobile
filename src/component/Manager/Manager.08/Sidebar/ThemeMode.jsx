import React, { useEffect } from "react";
import "./theme_mode.css";

import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../../../store/persisted/themeSlice";

const ThemeMode = () => {
  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.theme.theme
  );

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="theme_mode">
      <button
        className={`theme-button ${theme === "light" ? "active" : ""}`}
        onClick={() => dispatch(setTheme("light"))}
      >
        light
      </button>

      <button
        className={`theme-button ${theme === "dark" ? "active" : ""}`}
        onClick={() => dispatch(setTheme("dark"))}
      >
        dark
      </button>
    </div>
  );
};

export default ThemeMode;