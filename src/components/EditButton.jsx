function handleEditItem(id, updatedFields) {
  const apiUrl = import.meta.env.VITE_APP_URL;
  fetch(`${apiUrl}/${id}`)
  fetch(`http://localhost:3001/items/${id}`, {
    method: "PATCH",
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
