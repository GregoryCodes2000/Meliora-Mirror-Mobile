import React, { useEffect, useState } from "react";
import { formatForMirror } from "../../../../../server/ttcFormater.js";

const TtcAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:4006/ttc");

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();

        console.log("TTC Response:", json);

        const formattedAlerts = (json.siteWideCustom || []).map((alert) =>
          formatForMirror(alert)
        );

        setAlerts(formattedAlerts);
        setError(null);
      } catch (err) {
        console.error("TTC Error:", err);
        setError("Failed to load TTC alerts");
      } finally {
        setLoading(false);
      }
    }

    load();

    const interval = setInterval(load, 60000); // refresh every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading TTC Alerts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (alerts.length === 0) {
    return <div>No subway service alerts</div>;
  }

  return (
    <div>
      {alerts.map((alertText, index) => (
        <pre key={index}>{alertText}</pre>
      ))}
    </div>
  );
};

export default TtcAlerts;