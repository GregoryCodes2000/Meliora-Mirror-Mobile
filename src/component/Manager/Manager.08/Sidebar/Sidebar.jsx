import React, { useState } from "react";
import { NavLink } from "react-router-dom";
//import "/home/kasm-user/Documents/4000_react_gri/05_Mirror_decor/decor/src/component/Manager/Manager.08/sidebar.css";
import "./sidebar.css";
import ThemeMode from "./ThemeMode";
import browserImage from "../../../../assets/browser.png";
import profileImage from "../../../../assets/profile_2.png";
import logo from "../../../../assets/mir_logo.png";

const Sidebar = ({ isMobile }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const [theme, setTheme] = useState("light");

  

  return (
    <div className="sidebar">
       <img src={logo} className="sidebar-logo" />

      <div className="sidebar-buttons-container">

      
      
      <NavLink
          to="/profile"
          className="profile-button"
          activeClassName="active"
        >
        Profile
        <img src={profileImage} alt="Profile" className="profile-img" />
        </NavLink>
  

        <NavLink
          to="/screen"
          className="sidebar-button"
          activeClassName="active"
        >
          Screen
        </NavLink>
        <h3 className="bar-header">[Customize Modules]</h3>
        {/*         <NavLink to="/custom" className="sidebar-button" activeClassName="active">Customize</NavLink>
         */}{" "}
        <NavLink
          to="/clock"
          className="sidebar-button"
          activeClassName="active"
        >
          Clock
        </NavLink>
        <NavLink
          to="/weather"
          className="sidebar-button"
          activeClassName="active"
        >
          Weather
        </NavLink>
        <h3 className="bar-header">[Quick Links]</h3>
        <a className="sidebar-button">
          Website
          <img src={browserImage} className="browser-icon" />
        </a>
        
      </div>

      <div className="logout">
      <button  className="logout-btn">
          log out
        </button>
        </div>
      {/* <div>
      <ThemeMode theme={theme} setTheme={setTheme} />
      </div> */}

      {/* <div className="dropdown">
     
        <div className="dropdown-button" onClick={toggleSettings} role="button">
          
          Settings
          <img
            src="../../settings.png"
            alt="Settings Icon"
            className="settings-icon"
          />
          <span className={`arrow ${isSettingsOpen ? "up" : "down"}`}></span>
        </div>
        <ul className={`dropdown-menu ${isSettingsOpen ? "open" : ""}`}>
          <li className="dropdown-item">
            <a href="/screen">Screen</a>
            </li>
         
          <li className="dropdown-item">
            <a href="/custom">Customize</a>
            </li>
        </ul>
      </div>  */}
    </div>
  );
};

export default Sidebar;
