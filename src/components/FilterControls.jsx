import React, { useMemo } from "react";

export default function FilterControls({
  items = [],
  filterCategory,
  setFilterCategory,
}) {
  // Use useMemo for performance: recalculate only when `items` changes
  const categories = useMemo(() => {
    if (!Array.isArray(items)) return [];
    // Extract unique categories and sort them
    const cats = [
      ...new Set(items.map((item) => item.category).filter(Boolean)),
    ];
    return cats.sort((a, b) => a.localeCompare(b));
  }, [items]);

  return (
    <div style={{ margin: "10px 0" }}>
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          backgroundColor: "#1c1c1c",
          color: "white",
          border: "1px solid #333",
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
