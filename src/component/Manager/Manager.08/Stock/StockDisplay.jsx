import React, { useEffect, useState } from "react";
import "./stockDisplay.css";

export default function StockDisplay({ symbol }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    if (!symbol) return;

    try {
      setLoading(true);
      setError(null);

      const API_KEY = "d6s9kjhr01qj447arfd0d6s9kjhr01qj447arfdg";
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );

      const json = await res.json();

      if (!json.c) throw new Error("Invalid stock symbol or API limit reached");

      // Build a fake sparkline (Finnhub does not give history in /quote)
      const fakeSeries = Array.from({ length: 15 }, () =>
        json.c + (Math.random() - 0.5) * 1.5
      );

      setData({
        price: json.c,
        change: json.d,
        series: fakeSeries,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [symbol]);

  useEffect(() => {
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, [symbol]);

  if (!symbol) return <div className="stock-card">Enter a stock ticker…</div>;
  if (loading) return <div className="stock-card">Loading…</div>;
  if (error) return <div className="stock-card">Error: {error}</div>;
  if (!data) return <div className="stock-card">--</div>;

  // Sparkline
  const min = Math.min(...data.series);
  const max = Math.max(...data.series);

  const points = data.series
    .map((p, i) => {
      const x = (i / (data.series.length - 1)) * 120;
      const y = max === min ? 20 : 40 - ((p - min) / (max - min)) * 40;
      return `${x},${y}`;
    })
    .join(" ");

  const isUp = data.change >= 0;
  const color = isUp ? "#2ecc71" : "#ff4d4d";

  return (
    <div className="stock-card">
      <div className="stock-info">
        <div className="stock-symbol">{symbol}</div>
        <div className="stock-price">{data.price.toFixed(2)}</div>
        <div className={`stock-change ${isUp ? "green" : "red"}`}>
          {isUp ? "+" : ""}
          {data.change.toFixed(2)}
        </div>
      </div>

      <svg className="stock-chart" viewBox="0 0 120 40">
        <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
      </svg>
    </div>
  );
}