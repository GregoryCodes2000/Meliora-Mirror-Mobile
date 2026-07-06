import React, { useEffect, useState } from "react";
import "./newsDisplay.css";

function smartShorten(text) {
  if (!text) return "";

  // remove " - Source Name" endings
  text = text.replace(/ - .+$/, "");

  // remove bracketed extras
  text = text.replace(/\(.*?\)/g, "").trim();

  if (text.length <= 60) return text;

  const words = text.split(" ");
  let summary = words.slice(0, 10).join(" ");
  summary = summary.replace(/[,.:; ]+$/, "");
  return summary + "…";
}

const timeAgo = (date) => {
  if (!date) return "";

  const diffMs = Date.now() - new Date(date).getTime();
  const diffHours = Math.max(0, Math.floor(diffMs / 3600000));

  if (diffHours < 1) return "Just now";
  if (diffHours === 1) return "1 hour ago";
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const NewsDisplay = () => {
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);

      const res = await fetch("/.netlify/functions/news");

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      console.log("News response:", data);

      if (data.articles?.length) {
        setArticles(data.articles);
        setIndex(0); // reset after refresh
        setError("");
      } else {
        setArticles([]);
        setError("No news available");
      }
    } catch (err) {
      console.error("News fetch error:", err);
      setError("Failed to load news");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // initial fetch + refresh every 15 min
  useEffect(() => {
    fetchNews();
    const refresh = setInterval(fetchNews, 900000);
    return () => clearInterval(refresh);
  }, []);

  // rotate headlines every 8 sec
  useEffect(() => {
    if (!articles.length) return;

    const rotate = setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length);
    }, 8000);

    return () => clearInterval(rotate);
  }, [articles.length]);

  if (loading) {
    return <div className="newsfeed">Loading news...</div>;
  }

  if (error) {
    return <div className="newsfeed">{error}</div>;
  }

  if (!articles.length) {
    return <div className="newsfeed">No news available</div>;
  }

  const article = articles[index];

  return (
    <div className="newsfeed">
      <div className="news-source">
        {article.source?.name || "News"} {article.publishedAt ? `• ${timeAgo(article.publishedAt)}` : ""}
      </div>

      <div className="news-headline">
        {smartShorten(article.title)}
      </div>
    </div>
  );
};

export default NewsDisplay;