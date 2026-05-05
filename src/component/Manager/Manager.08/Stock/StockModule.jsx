import { useState } from "react";
import StockDisplay from "./StockDisplay";
import StocksManager from "./StockManager";

export default function StockModuleWrapper() {
  const [instances, setInstances] = useState([1]); // start with ONE instance

  const addInstance = () => {
    setInstances((prev) => [...prev, prev.length + 1]);
  };

  return (
    <div className="stock-switch">
      {/* Search bar (always on top) */}
      <StocksManager />

      {/* Render all StockDisplays */}
      {instances.map((id) => (
        <StockDisplay key={id} instanceId={id} />
      ))}

      {/* Add button */}
      <button className="add-stock-btn" onClick={addInstance}>
        +
      </button>
    </div>
  );
}