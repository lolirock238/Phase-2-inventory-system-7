import React, { useState } from "react";

export default function ItemList({ items = [], onDeleteItem, onEditItem }) {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  function handleEditClick(item) {
    setEditingId(item.id);
    setNewName(item.name || "");
  }

  function handleSaveClick(id) {
    if (!newName.trim()) return;
    onEditItem(id, { name: newName.trim() });
    setEditingId(null);
    setNewName("");
  }

  function handleCancelClick() {
    setEditingId(null);
    setNewName("");
  }

  return (
    <ul className="list">
      {items.length === 0 && (
        <li className="list__empty">No items yet — add one with the form.</li>
      )}

      {items.map((item) => (
        <li key={item.id} className="list__item">
          <div className="list__main">
            {editingId === item.id ? (
              <input
                className="input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                aria-label={`Edit name for ${item.name}`}
              />
            ) : (
              <>
                <div className="list__title">{item.name}</div>
                <div className="list__meta">{item.category} • qty {item.quantity}</div>
              </>
            )}
          </div>

          <div className="list__actions">
            {editingId === item.id ? (
              <>
                <button className="btn btn--primary" onClick={() => handleSaveClick(item.id)}>Save</button>
                <button className="btn" onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <>
                <button className="btn" onClick={() => handleEditClick(item)}>Edit</button>
                <button
                  className="btn btn--danger"
                  onClick={() => { if (confirm(`Delete ${item.name}?`)) onDeleteItem(item.id); }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
