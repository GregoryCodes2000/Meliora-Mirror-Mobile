/* import { getTTCAlerts } from "./ttc.js";
import { formatForMirror } from "./ttcFormater.js";

const alerts = await getTTCAlerts();
alerts.forEach((a) => console.log(formatForMirror(a)));




import express from "express";
import axios from "axios";

const app = express();
const PORT = 5001;

app.get("/api/ttc", async (req, res) => {
  try {
    const response = await axios.get(
      "https://alerts.ttc.ca/api/alerts/site-wide",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );

    res.json({
      success: true,
      alerts: response.data
    });
  } catch (err) {
    console.error("TTC fetch failed:", err);
    res.status(500).json({ error: "Cannot load TTC alerts" });
  }
});

app.listen(PORT, () => {
  console.log(`TTC proxy running on port ${PORT}`);
}); */