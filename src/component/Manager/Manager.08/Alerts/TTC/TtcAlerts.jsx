import React, { useEffect, useState } from "react";
import ttcIcon from "../../../../../assets/ttc-logo.png";
import "./ttcAlerts.css";

const lineColors = {
  "1": "#fcba03",
  "2": "#2cb802",
  "4": "#9302b8",
  "5": "#fc6f17",
  "6": "#b5b5b5",
};

const TtcAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await fetch("/.netlify/functions/ttc");

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();

        console.log("TTC Response:", json);
        console.log("siteWideCustom:", json.siteWideCustom);
        console.log("routes:", json.routes);
        console.log("stops:", json.stops);
        console.log("generalCustom:", json.generalCustom);
        console.log("alerts:", json.alerts);

        // Support both response formats
        setAlerts(
          json.alerts ||
          json.siteWideCustom ||
          []
        );

        setError(null);
      } catch (err) {
        console.error("TTC Error:", err);
        setError("Failed to load TTC alerts");
      } finally {
        setLoading(false);
      }
    }

    load();

    const interval = setInterval(load, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div>
        <img src={ttcIcon} alt="TTC" className="ttc-icon" />
        <div>Loading TTC Alerts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <img src={ttcIcon} alt="TTC" className="ttc-icon" />
        <div>{error}</div>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div>
        <img src={ttcIcon} alt="TTC" className="ttc-icon" />
        <div>No subway service alerts</div>
      </div>
    );
  }

  return (
    <div className="ttc-container">
      <div  className="ttc-header">
      <img src={ttcIcon} alt="TTC" className="ttc-icon" />
      <div className="ttc-divider"></div>
      </div>

      {alerts.map((alert, index) => (
  <div key={index} className="ttc-alert">
    <div className="ttc-title">
      {lineColors[alert.route] ? (
        <span
          className="ttc-line-badge subway"
          style={{
            backgroundColor: lineColors[alert.route],
          }}
        >
          {alert.route}
        </span>
      ) : (
        <span className="ttc-line-badge streetcar">
          {alert.route}
        </span>
      )}

      {alert.headerText
        ?.replace(/^Line\s+\d+\s*[^:]*:\s*/i, "")
        ?.replace(/^\d+\s+[A-Za-z]+\s*:\s*/i, "")}
    </div>

    {alert.description && (
      <div className="ttc-description">
        {alert.description}
      </div>
    )}
  </div>
))}
    </div>
  );
};

export default TtcAlerts;