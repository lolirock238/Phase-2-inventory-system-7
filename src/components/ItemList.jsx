import React, { useState } from "react";

export default function ItemList({ items, onDeleteItem, onEditItem }) {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  function handleEditClick(item) {
    setEditingId(item.id);
    setNewName(item.name);
  }

  function handleSaveClick(id) {
    onEditItem(id, { name: newName });
    setEditingId(null);
  }

  function handleCancelClick() {
    setEditingId(null);
    setNewName("");
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {editingId === item.id ? (
            <>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button onClick={() => handleSaveClick(item.id)}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <span>{item.name}</span>
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => onDeleteItem(item.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
