import React, { useEffect, useState } from "react";
import ttcIcon from "../../../../../assets/ttc-logo.png";
import "./ttcAlerts.css";

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

        setAlerts(json.siteWideCustom || []);
        setAlerts([
          {
            id: "TEST",
            routeType: "Subway",
            customHeaderText:
              "Line 1: No service between St Clair and Eglinton due to signal issues.",
            description:
              "Shuttle buses are operating. Expect delays of up to 20 minutes.",
          },
        ]);
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
    <div>
      <img src={ttcIcon} alt="TTC" className="ttc-icon" />

      <div>Alert count: {alerts.length}</div>

      {alerts.map((alert, index) => (
  <div key={index} className="ttc-alert">
    <div className="ttc-title">
      {alert.customHeaderText || alert.title}
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