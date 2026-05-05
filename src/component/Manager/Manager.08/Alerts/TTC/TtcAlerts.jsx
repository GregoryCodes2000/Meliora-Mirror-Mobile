import React, { useEffect, useState } from "react";
import { formatForMirror } from "../../../../../server/ttcFormater.js";

const TtcAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:5001/api/ttc");
      const json = await res.json();
      console.log(json);
    }
    load();
  }, []);

  if (loading) return <div>Loading TTC Alerts…</div>;
  if (error) return <div>{error}</div>;
  if (!alerts.length) return <div>No subway service alerts</div>;

  return (
    <div>
      {alerts.map((alertText, i) => (
        <pre key={i}>{alertText}</pre>
      ))}
    </div>
  );
};

export default TtcAlerts;