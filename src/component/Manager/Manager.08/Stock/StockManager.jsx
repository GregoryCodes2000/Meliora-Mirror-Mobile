import { useDispatch } from "react-redux";
import { setSelectedTicker, fetchStockData } from "../../../../store/stockSlice";
import { useState } from "react";

export default function StockManager({ symbol, onSymbolChange }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const submit = () => {
    if (!symbol.trim()) return;
  
    const ticker = symbol.trim().toUpperCase();
    onSymbolChange(ticker); // update in parent
  };

  return (
    <div className="stock-search-container">
      <input
        className="stock-search-input"
        placeholder="Add stock..."
        value={symbol}
        onChange={(e) => onSymbolChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
    </div>
  );
}