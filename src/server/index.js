import express from "express";
import cors from "cors";
import { getTTCAlerts } from "./ttc.js";

const app = express();
app.use(cors());

let cache = { alerts: [], lastFetch: 0 };

// Helper to filter only active subway alerts
function filterSubwayAlerts(alerts) {
  const now = Date.now();

  return alerts.filter((a) => {
    const start = new Date(a.activePeriod?.start).getTime();
    const end = new Date(a.activePeriod?.end).getTime();

    // Only subway alerts, currently active, and critical effects
    return (
      a.routeType === "Subway" &&
      now >= start &&
      now <= end &&
      ["NO_SERVICE", "REDUCED_SERVICE", "CLOSURE"].includes(a.effect)
    );
  });
}

// API endpoint
app.get("/api/ttc", async (req, res) => {
  const now = Date.now();

  // Refresh cache every 60s
  if (now - cache.lastFetch > 60_000) {
    const rawAlerts = await getTTCAlerts();
    const subwayAlerts = filterSubwayAlerts(rawAlerts);

    cache = {
      alerts: subwayAlerts,
      lastFetch: now,
    };
  }

  res.json({ updated: new Date(cache.lastFetch), alerts: cache.alerts });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`TTC backend running on port ${PORT}`));