import React from "react";

export default function FilterControls({
  items = [],
  filterCategory,
  setFilterCategory,
}) {
  // Defensive guard: ensure we don’t break when items is undefined
  const categories = Array.isArray(items)
    ? [...new Set(items.map((item) => item.category).filter(Boolean))]
    : [];

  return (
    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      style={{ margin: "10px", padding: "8px", borderRadius: "8px" }}
    >
      <option value="">All Categories</option>
      {categories.length > 0 ? (
        categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))
      ) : (
        <option disabled>No categories found</option>
      )}
    </select>
  );
}
