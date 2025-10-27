import React, { useState } from "react";
import CostPerUnit from "./CostPerUnit";
import TotalValue from "./TotalValue";

export default function AddItemForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
    costPerUnit: "",
  });
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
    const finalCategory = newCategory || formData.category;
    if (
      !formData.name ||
      !formData.quantity ||
      !finalCategory ||
      !formData.costPerUnit
    )
      return;

    const newItem = {
      name: formData.name,
      quantity: Number(formData.quantity),
      category: finalCategory,
      costPerUnit: Number(formData.costPerUnit),
    };

    onAddItem(newItem);

    // Add new category if it's new
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }

    // Reset form
    setFormData({
      name: "",
      quantity: "",
      category: "",
      costPerUnit: "",
    });
    setNewCategory("");
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Item</h3>

      <div className="form-grid">
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Cost Per Unit:</label>
          <input
            type="number"
            name="costPerUnit"
            placeholder="0.00"
            value={formData.costPerUnit}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="new">Add new category…</option>
          </select>
        </div>
      </div>

      {formData.category === "new" && (
        <div>
          <label>New Category:</label>
          <input
            type="text"
            placeholder="Enter new category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>
      )}

      {/* Cost and Value Preview */}
      {(formData.quantity || formData.costPerUnit) && (
        <div className="preview-section">
          <h4>Preview:</h4>
          <div className="preview-grid">
            <div>
              <div>Cost Per Unit:</div>
              <div>
                <CostPerUnit cost={formData.costPerUnit || 0} />
              </div>
            </div>
            <div>
              <div>Total Value:</div>
              <div>
                <TotalValue
                  quantity={formData.quantity || 0}
                  costPerUnit={formData.costPerUnit || 0}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={
          !formData.name ||
          !formData.quantity ||
          !(newCategory || formData.category) ||
          !formData.costPerUnit
        }
      >
        Add Item
      </button>
    </form>
  );
}
