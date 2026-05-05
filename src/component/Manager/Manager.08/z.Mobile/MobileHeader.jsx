import React from "react";
import { useNavigate } from "react-router-dom";
import "./mobileFooter.css";
import { Squash as Hamburger } from "hamburger-react";
import ThemeMode from "../Sidebar/ThemeMode";
import Sidebar from "../Sidebar/Sidebar";
import MobileTheme from "./MobileTheme";
import logo from "../../../../assets/mobile_logo.png";

const MobileHeader = ({ hamburgerOpen, setHamburgerOpen, theme, setTheme }) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  /* const theme = "light"; */

  return (
    <>
      <div className="mobile-footer-wrapper">

        {/* Sidebar overlay shows when hamburger is open */}
        {hamburgerOpen && (
          <div className="mobile-sidebar">
            <Sidebar isMobile={isMobile} />
            <ThemeMode theme={theme} setTheme={setTheme} />
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
            <MobileTheme theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
