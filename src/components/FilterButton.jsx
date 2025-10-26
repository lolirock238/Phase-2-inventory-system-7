import React from "react";

export default function App() {














  return (
    <div>
      <AddItemForm onAddItem={handleAddItem} />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Stationery">Stationery</option>
        <option value="Electronics">Electronics</option>
        <option value="Accessories">Accessories</option>
        <option value="Food">Food</option>
      </select>

      <ItemList items={filteredItems} onDeleteItem={handleDeleteItem} />
    </div>
  );
}
