




import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";

import Clock from "./component/Manager/Manager.08/Clock/Clock";
import Weather from "./component/Manager/Manager.08/Weather/Weather";
import Manager8 from "./component/Manager/Manager.08/Screen/Screen8";
import Sidebar from "./component/Manager/Manager.08/Sidebar/Sidebar";
import ThemeMode from "./component/Manager/Manager.08/Sidebar/ThemeMode";
import MobileHeader from "./component/Manager/Manager.08/z.Mobile/MobileHeader";
import { Squash as Hamburger } from "hamburger-react";
import Profile from "./component/Manager/Manager.08/Profile/Profile";

function App() {
  const [theme, setTheme] = useState("light");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModules, setShowModules] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  React.useEffect(() => {
    // Whenever hamburger changes, update sidebar
    if (isMobile) {
      setSidebarOpen(hamburgerOpen);
    }
  }, [hamburgerOpen, isMobile]);
  {
    /* <div className={`app-conteiner ${showSidebar ? "shifted" : ""}`}></div> */
  }
  return (
    <BrowserRouter>
      <div className="manager-container">
        <div className={`sidebar-div ${sidebarOpen ? "open" : ""}`}>
          <Sidebar
            isMobile={isMobile}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setHamburgerOpen={setHamburgerOpen} 
          />
          <ThemeMode theme={theme} setTheme={setTheme} />
        </div>

       

        <div
  className="content-wrapper"
  style={{
    filter: hamburgerOpen && isMobile ? "blur(2.5px)" : "none",
    transition: "filter 0.3s ease",
  }}
>

          <div className="content">
            <Routes>
              
            <Route path="/profile" element={<Profile />} />
              <Route path="/screen" element={<Manager8 />} />
              <Route path="/clock" element={<Clock theme={theme} />} />
              <Route path="/weather" element={<Weather />} />
            </Routes>
          </div>
        </div>

        <MobileHeader
        hamburgerOpen={hamburgerOpen}
        setHamburgerOpen={setHamburgerOpen}
        theme={theme}
   setTheme={setTheme} />
   
      </div>
    </BrowserRouter>
  );
}

export default App;
