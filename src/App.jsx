import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import InventoryTable from "./components/InventoryTable";
import SearchBar from "./components/SearchBar";
import FilterControls from "./components/FilterControls";
import PaginationControls from "./components/PaginationControls";

export default function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch items
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add item
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

  // Filter + Search + Pagination
  const filteredItems = items
    .filter((item) =>
      filterCategory ? item.category === filterCategory : true
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="App" style={{ padding: "20px", color: "#eee" }}>
      <h1>🧾 Inventory System</h1>

      <AddItemForm onAddItem={handleAddItem} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterControls
        items={items}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <InventoryTable
        items={paginatedItems}
        onDeleteItem={handleDeleteItem}
        onEditItem={handleEditItem}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
