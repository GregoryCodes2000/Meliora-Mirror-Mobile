import React from "react";
import { useNavigate } from "react-router-dom";
import "./mobileFooter.css";
import { Squash as Hamburger } from "hamburger-react";
import ThemeMode from "../Sidebar/ThemeMode";
import Sidebar from "../Sidebar/Sidebar";
import MobileTheme from "./MobileTheme";
import logo from "../../../../assets/mobile_logo.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const MobileHeader = ({ hamburgerOpen, setHamburgerOpen/* , theme, setTheme */ }) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  /* const theme = "light"; */
  const location = useLocation();

  useEffect(() => {
    // Close hamburger on ANY navigation
    if (hamburgerOpen) {
      setHamburgerOpen(false);
    }
  }, [location.pathname]); // Fires every time user clicks a sidebar button
  return (
    <>
      <div className="mobile-footer-wrapper">

        {/* Sidebar overlay shows when hamburger is open */}
        {hamburgerOpen && (
          <div className="mobile-sidebar">
            <Sidebar isMobile={isMobile} />
            <ThemeMode />
          </div>
        )}

        {/* Footer */}
        <div className="mobile-footer">
          <div className="icon-button">
            <button
              className="hamburger"
              onClick={() => setHamburgerOpen(!hamburgerOpen)}
            >
              <div style={{ height: "30px" }}>
                <Hamburger
                  toggled={hamburgerOpen}
                  toggle={setHamburgerOpen}
                  size={20}
                />
              </div>
            </button>
          </div>

          <div className="mobile-logo">
            <img src={logo} alt="Logo" />
          </div>

          <div>
          <MobileTheme />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
