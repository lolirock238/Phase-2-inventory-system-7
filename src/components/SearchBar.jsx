import React from "react";

export default function SearchControls({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search items..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // ✅ Updates the state
      style={{
        margin: "10px",
        padding: "8px 12px",
        borderRadius: "8px",
        width: "250px",
        border: "1px solid #333",
        backgroundColor: "#1c1c1c",
        color: "white",
        outline: "none",
      }}
    />
  );
}
