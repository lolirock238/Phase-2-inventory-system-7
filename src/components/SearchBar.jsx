import React from "react";

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search items..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      style={{
        marginBottom: "10px",
        padding: "8px",
        width: "300px",
        borderRadius: "6px",
      }}
    />
  );
}
