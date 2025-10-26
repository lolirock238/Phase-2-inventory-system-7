import React, { useState } from "react";
import CostPerUnit from "./CostPerUnit";
import TotalValue from "./TotalValue";

export default function ItemList({ items, onDeleteItem, onEditItem }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    quantity: 0,
    costPerUnit: 0,
  });

  function handleEditClick(item) {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      quantity: item.quantity,
      costPerUnit: item.costPerUnit || 0,
    });
  }

  function handleSaveClick(id) {
    onEditItem(id, {
      name: editForm.name,
      quantity: parseFloat(editForm.quantity),
      costPerUnit: parseFloat(editForm.costPerUnit),
    });
    setEditingId(null);
    setEditForm({ name: "", quantity: 0, costPerUnit: 0 });
  }

  function handleCancelClick() {
    setEditingId(null);
    setEditForm({ name: "", quantity: 0, costPerUnit: 0 });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div
          key={item.id}
          className="item-card"
          style={{
            border: "1px solid #333",
            borderRadius: "8px",
            padding: "16px",
            margin: "8px 0",
            background: "#1a1a1a",
          }}
        >
          {editingId === item.id ? (
            <div className="edit-form">
              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "#eee",
                  }}
                >
                  Name:
                </label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#333",
                    border: "1px solid #555",
                    color: "#eee",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "#eee",
                  }}
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={editForm.quantity}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#333",
                    border: "1px solid #555",
                    color: "#eee",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "#eee",
                  }}
                >
                  Cost Per Unit:
                </label>
                <input
                  type="number"
                  name="costPerUnit"
                  value={editForm.costPerUnit}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#333",
                    border: "1px solid #555",
                    color: "#eee",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                style={{
                  marginBottom: "12px",
                  padding: "8px",
                  background: "#2a2a2a",
                  borderRadius: "4px",
                }}
              >
                <strong style={{ color: "#eee" }}>Preview:</strong>
                <div
                  style={{ color: "#ccc", fontSize: "14px", marginTop: "4px" }}
                >
                  Cost: <CostPerUnit cost={editForm.costPerUnit} />
                </div>
                <div style={{ color: "#ccc", fontSize: "14px" }}>
                  Total Value:{" "}
                  <TotalValue
                    quantity={editForm.quantity}
                    costPerUnit={editForm.costPerUnit}
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleSaveClick(item.id)}
                  style={{
                    marginRight: "8px",
                    padding: "8px 16px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  style={{
                    padding: "8px 16px",
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="item-display">
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#eee", fontSize: "18px" }}>
                  {item.name}
                </strong>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <div style={{ color: "#ccc", fontSize: "14px" }}>
                    Quantity
                  </div>
                  <div style={{ color: "#eee" }}>{item.quantity}</div>
                </div>

                <div>
                  <div style={{ color: "#ccc", fontSize: "14px" }}>
                    Cost Per Unit
                  </div>
                  <div style={{ color: "#eee" }}>
                    <CostPerUnit cost={item.costPerUnit} />
                  </div>
                </div>

                <div>
                  <div style={{ color: "#ccc", fontSize: "14px" }}>
                    Total Value
                  </div>
                  <div style={{ color: "#4CAF50", fontWeight: "bold" }}>
                    <TotalValue
                      quantity={item.quantity}
                      costPerUnit={item.costPerUnit}
                    />
                  </div>
                </div>

                {item.category && (
                  <div>
                    <div style={{ color: "#ccc", fontSize: "14px" }}>
                      Category
                    </div>
                    <div style={{ color: "#eee" }}>{item.category}</div>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => handleEditClick(item)}
                  style={{
                    marginRight: "8px",
                    padding: "6px 12px",
                    background: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
