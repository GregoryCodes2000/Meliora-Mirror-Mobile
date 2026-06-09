/* const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const NEWS_API_KEY = "d6s9kjhr01qj447arfd0d6s9kjhr01qj447arfdg";

app.get("/news", async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json({ articles: data.articles });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "server failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
}); */