const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const API_KEY = "ea567c37e3d64382b78fbe664d0b0ded";

app.use(express.static(path.join(__dirname, "build")));

app.get("/news", async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/everything?domains=businessinsider.com,techcrunch.com,theverge.com,arstechnica.com&pageSize=10&apiKey=${API_KEY}`;
    const r = await fetch(url);
    const d = await r.json();
    res.json(d);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Always return React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(4006, () =>
  console.log("App + Backend running on http://xtal.asia:4006")
);