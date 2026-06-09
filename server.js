const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const API_KEY = "ea567c37e3d64382b78fbe664d0b0ded";

app.get("/news", async (req, res) => {
  try {
    const url =
      `https://newsapi.org/v2/everything?domains=businessinsider.com,techcrunch.com,theverge.com,arstechnica.com&pageSize=10&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
});



app.get("/ttc", async (req, res) => {
  try {
    const response = await fetch(
      "https://alerts.ttc.ca/api/alerts/site-wide"
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("TTC error:", err);

    res.status(500).json({
      error: "Failed to fetch TTC alerts",
    });
  }
  app.listen(4006, () => {
    console.log("Server running on http://localhost:4006");
  });
});