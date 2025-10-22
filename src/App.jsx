import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import handleEditItem from "./components/EditButton";
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
      .then((addedItem) => setItems([...items, addedItem]));
  }
  const handleDeleteButton = async (id) => {
    try {
      await fetch(`http://localhost:3001/items/${id}`, {
        method: "DELETE",
      });

      // Update local state after delete
      setItems((prev) => prev.filter((items) => items.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  handleEditItem;
  // Edit item

  return (
    <div className="App">
      <h1>🧾 Inventory List</h1>

      {/* Pass the function down to the AddItemForm */}
      <AddItemForm onAddItem={handleAddItem} />

      {/* Pass the items to the list component */}
      <ItemList items={items} onDeleteItem={handleDeleteButton} />
    </div>
  );
}
