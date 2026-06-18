import React, { useEffect, useState } from "react";
import "./newsDisplay.css";

function smartShorten(text) {
  if (!text) return "";

  text = text.replace(/ - .+$/, "");
  text = text.replace(/\(.*?\)/g, "").trim();

  if (text.length <= 60) return text;

  const words = text.split(" ");
  let summary = words.slice(0, 10).join(" ");
  summary = summary.replace(/[,.:; ]+$/, "");
  return summary + "…";
}

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 3600000);
  return `${diff} hours ago`;
};

const NewsDisplay = () => {
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchNews = async () => {
    try {
      const res = await fetch("/.netlify/functions/news");
      const data = await res.json();

      if (data.articles?.length) {
        setArticles(data.articles);
        setIndex(0); // reset to first article on refresh
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Fetch on mount + periodic refresh
  useEffect(() => {
    fetchNews();
    const refresh = setInterval(fetchNews, 900000);
    return () => clearInterval(refresh);
  }, []);

  // Rotate between loaded articles
  useEffect(() => {
    if (!articles.length) return;

    const rotate = setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length);
    }, 8000);

    return () => clearInterval(rotate);
  }, [articles.length]);

  if (!articles.length) return <div className="newsfeed">Loading news...</div>;

  const article = articles[index];

  return (
    <div className="newsfeed">
      <div className="news-source">
        {article.source.name}, {timeAgo(article.publishedAt)}
      </div>

      <div className="news-headline">
        {smartShorten(article.title)}
      </div>
    </div>
  );
};

export default NewsDisplay;