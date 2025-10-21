import React, { useState } from "react";

export default function AddItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Stationery",
    "Electronics",
    "Accessories",
    "Food",
  ]);

  function handleSubmit(e) {
    e.preventDefault();

    // If user typed a new category, use it and add it to the list
    const finalCategory = newCategory || category;
    if (!name || !quantity || !finalCategory) return;

    const newItem = {
      name,
      quantity: Number(quantity),
      category: finalCategory,
    };

    onAddItem(newItem);

    // Add new category if it's new
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }

    // Reset form
    setName("");
    setQuantity("");
    setCategory("");
    setNewCategory("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
        <option value="new">Add new category…</option>
      </select>

      {category === "new" && (
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      )}

      <button type="submit">Add Item</button>
    </form>
  );
}
