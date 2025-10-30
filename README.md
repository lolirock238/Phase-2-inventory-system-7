#  Inventory Management System (React/JS + JSON Server)

This is a component-driven **Inventory Management System** built with **React** and **JavaScript**. It leverages **JSON Server** pointed at the local **`db.json`** file to function as a mock REST API.

---

##  Core Features Mapped to Components

The application's structure, visible in the `/components` directory, organizes functionality clearly:

* **Data Entry:** Handled via **`AddItemForm.jsx`** for creating new stock records.

* **Inventory View:** The main data display component is **`InventoryTable.jsx`**, showing essential details like **ID**, **Name**, **Quantity**, **Category**, **Cost Per Unit**, and calculated **Total Value**.

* **Data Manipulation:** Includes dedicated components for **`EditButton.jsx`**, **`SaveButton.jsx`**, and logic within **`CostPerUnit.jsx`**.

* **Filtering & Search:** Features **`SearchBar.jsx`** and **`FilterControls.jsx`** for efficient data querying.

* **Navigation:** **`PaginationControls.jsx`** manages large datasets across pages.

---

##  Technology Stack
| **Frontend** |
**React** & **JavaScript** - Primary framework for building the UI.

| **API/Data Source** |
**`db.json`** & **JSON Server** - Simulates backend persistence for all **CRUD** operations. 

| **Entry Point** |
**`main.jsx`** / **`index.html`** - Standard React entry files. 

| **Styling** | 
**`App.css`**, **`main.css`**(and other stylings inside individual components)- Defines the visual presentation. 

---

##  Local Setup Instructions

Follow these steps to get the project running locally.

### Prerequisites

1.  **Node.js** and **npm** installed.
2.  **JSON Server** installed (e.g., globally with `npm install -g json-server`).

### 1. Clone and Install


# Clone the repository
git clone [Your Repository URL]
cd PHASE-2-INVENTORY-SYSTEM-7

# Install frontend dependencies
npm install

# run this script to start the json server
json-server --watch db.json --port

# Start the front-end application
npm run dev

