import React from "react";
import "./searchbar.css";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search modules..." }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
