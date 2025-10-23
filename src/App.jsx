import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import InventoryTable from "./components/InventoryTable";

export default function App() {
  const [items, setItems] = useState([]);

  // Fetch existing items from db.json
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Function to handle adding a new item
  function handleAddItem(newItem) {
    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((addedItem) => setItems((prev) => [...prev, addedItem]))
      .catch((err) => console.error("Add error:", err));
  }

  // Delete item
  function handleDeleteItem(id) {
    fetch(`http://localhost:3001/items/${id}`, { method: "DELETE" })
      .then(() => setItems((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) => console.error("Delete error:", err));
  }

  // Edit item
  function handleEditItem(id, updatedFields) {
    fetch(`http://localhost:3001/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((r) => r.json())
      .then((updatedItem) =>
        setItems((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        )
      )
      .catch((err) => console.error("Update error:", err));
  }

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>🧾 Inventory List</h1>

      {/* Form for adding items */}
      <AddItemForm onAddItem={handleAddItem} />

      {/* Table for viewing, editing, deleting items */}
      <InventoryTable
        items={items}
        onDeleteItem={handleDeleteItem}
        onEditItem={handleEditItem}
      />
    </div>
  );
}
