function handleEditItem(id, updatedFields) {
  return fetch(`http://localhost:3001/items/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  })
    .then((r) => r.json())
    .then((updatedItem) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
    })
    .catch((err) => console.error("Error updating item:", err));
}

export default handleEditItem;
