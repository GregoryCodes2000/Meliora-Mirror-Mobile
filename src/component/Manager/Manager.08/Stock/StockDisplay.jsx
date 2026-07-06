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
  
      const res = await fetch(
        `/.netlify/functions/stock?symbol=${symbol}`
      );
  
      const json = await res.json();
  
      if (!json.quote?.c)
        throw new Error("No stock data");
  
      setData({
        price: json.quote.c,
        change: json.quote.d,
        percent: json.quote.dp,
        candles: json.candles,
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

  const isUp = data.change >= 0;
const color = isUp ? "#2ecc71" : "#ff4d4d";
const candles = data.candles || [];
const recent = candles.slice(-10);

console.log(candles);

  

 

  return (
    <div className="stock-card">
      <div className="stock-info">
        <div className="stock-symbol">{symbol}</div>
        <div className="stock-price">{data.price.toFixed(2)}</div>
        <div className={`stock-change ${isUp ? "green" : "red"}`}>
      {isUp ? "▲" : "▼"}{" "}
      {isUp ? "+" : ""}
      {data.change.toFixed(2)}
    </div>
      </div>

      <svg className="stock-chart" viewBox="0 0 120 40">
  {recent.length === 0 ? (
    <text
      x="60"
      y="22"
      fill={color}
      textAnchor="middle"
      fontSize="7"
    >
      No data
    </text>
  ) : (() => {
      const allPrices = recent.flatMap(c => [
        c.high,
        c.low,
      ]);

      const max = Math.max(...allPrices);
      const min = Math.min(...allPrices);

      const scaleY = value =>
        38 - ((value - min) / (max - min || 1)) * 34;

      return recent.map((candle, i) => {
        const candleWidth = 5;
const spacing = 100 / recent.length;

const x = i * spacing + spacing / 2;

        const candleColor =
          candle.close >= candle.open
            ? "#2ecc71"
            : "#ff4d4d";

        return (
          <g key={i}>
            {/* Wick */}
            <line
              x1={x}
              x2={x}
              y1={scaleY(candle.high)}
              y2={scaleY(candle.low)}
              stroke={candleColor}
              strokeWidth="1"
            />

            {/* Body */}
            <rect
  x={x - candleWidth / 2}
  y={Math.min(scaleY(candle.open), scaleY(candle.close))}
  width={candleWidth}
  height={Math.max(
    1,
    Math.abs(scaleY(candle.open) - scaleY(candle.close))
  )}
  fill={candleColor}
/>
          </g>
        );
      });
    })()}
</svg>
      
    </div>
  );
}