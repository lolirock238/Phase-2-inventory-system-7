import React from "react";

export default function App() {
  //state to store the list items
  const [items, setItems] = useState([]);
  //state to filter the category of the items
  const [filter, setFilter] = useState("All");
//fuction to add new item from Additemform
  function handleAddItem(newItem) {
    //adding unique id to item using date.now
    const itemWithId = { id: Date.now(), ...newItem };
    //use of spread operator existing items + add in of the new ones
    setItems([...items, itemWithId]);
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  const filteredItems =
    filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <div>
      <AddItemForm onAddItem={handleAddItem} />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Stationery">Stationery</option>
        <option value="Electronics">Electronics</option>
        <option value="Accessories">Accessories</option>
        <option value="Food">Food</option>
      </select>

      <ItemList items={filteredItems} onDeleteItem={handleDeleteItem} />
    </div>
  );
}
