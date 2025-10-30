import React, { useMemo } from "react";

export default function FilterControls({
  items = [],
  filterCategory,
  setFilterCategory,
}) {
  const categories = useMemo(() => {
    if (!Array.isArray(items)) return [];

    const uniqueCategories = [
      ...new Set(items.map((item) => item.category).filter(Boolean)),
    ];

    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [items]);

  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <label
        htmlFor="filter-category"
        style={{
          color: "#ccc",
          fontWeight: "500",
          fontSize: "0.9rem",
        }}
      >
        Filter by:
      </label>

      <select
        key={categories.join(",")}
        id="filter-category"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          backgroundColor: "#1c1c1c",
          color: "white",
          border: "1px solid #333",
          minWidth: "160px",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="">All Categories</option>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))
        ) : (
          <option disabled>No categories available</option>
        )}
      </select>
    </div>
  );
}
