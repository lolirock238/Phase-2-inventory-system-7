import React, { useState, useEffect, useMemo } from "react";
import AddItemForm from "./components/AddItemForm";
import InventoryTable from "./components/InventoryTable";
import ItemList from "./components/ItemList";
import SearchBar from "./components/SearchBar";
import FilterControls from "./components/FilterControls";
import PaginationControls from "./components/PaginationControls";

export default function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch items once
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
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
      .then((addedItem) => {
        // ensure we keep array shape
        setItems((prev) => [...prev, addedItem]);
      })
      .catch((err) => console.error("Add error:", err));
  }

  // Delete item
  function handleDeleteItem(id) {
    fetch(`http://localhost:3001/items/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setItems((prev) => prev.filter((item) => item.id !== id));
      })
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
        setItems((prev) => prev.map((it) => (it.id === id ? updatedItem : it)))
      )
      .catch((err) => console.error("Update error:", err));
  }

  // Derived filtered + searched items (memoized)
  const filteredItems = useMemo(() => {
    return items
      .filter((it) => (filterCategory ? it.category === filterCategory : true))
      .filter((it) => (it.name || "").toLowerCase().includes(searchTerm.toLowerCase()));
  }, [items, filterCategory, searchTerm]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  useEffect(() => {
    // If filtering/search changed, reset to first page to avoid empty pages
    setCurrentPage(1);
  }, [searchTerm, filterCategory]);

  // If currentPage gets out of range (e.g., after deletions), clamp it
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  // Get unique categories for filter dropdown
  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="app-container">
      <div className="card" style={{ marginBottom: 16 }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <h1 style={{ margin: 0 }}>🧾 Inventory System</h1>


          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterControls
              items={items}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
            />
          </div>
        </header>
      </div>

      <main style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        <aside>
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Add Item</h2>
            <AddItemForm onAddItem={handleAddItem} />
          </div>
        </aside>

        <section>
          <div className="card">
            <h2 style={{ marginTop: 0, marginBottom: 12 }}>Items</h2>

            <InventoryTable
              items={paginatedItems}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
            />

            <div style={{ marginTop: 12 }}>
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </section>
      </main>

      <AddItemForm onAddItem={handleAddItem} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <FilterControls
        categories={categories}
        selectedCategory={filterCategory}
        onFilterChange={setFilterCategory}
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
