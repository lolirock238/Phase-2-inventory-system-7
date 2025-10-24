import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import PaginationControls from "./PaginationControls";
import FilterControls from "./FilterControls";

export default function InventoryTable({ items, onDeleteItem, onEditItem }) {
  const [sorting, setSorting] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Unique categories for filter dropdown
  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))];
  }, [items]);

  // Filter items by category
  const filteredItems = useMemo(() => {
    return selectedCategory
      ? items.filter((item) => item.category === selectedCategory)
      : items;
  }, [items, selectedCategory]);

  // Table setup
  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Quantity", accessorKey: "quantity" },
      { header: "Category", accessorKey: "category" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <>
            <button
              onClick={() =>
                onEditItem(row.original.id, {
                  name: prompt("New name:", row.original.name),
                })
              }
            >
              ✏️
            </button>
            <button onClick={() => onDeleteItem(row.original.id)}>🗑️</button>
          </>
        ),
      },
    ],
    [onDeleteItem, onEditItem]
  );

  const table = useReactTable({
    data: filteredItems,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div style={{ color: "#eee" }}>
      {/* Filtering dropdown */}
      <FilterControls
        categories={categories}
        selectedCategory={selectedCategory}
        onFilterChange={setSelectedCategory}
      />

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          background: "#111",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #333",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{ borderBottom: "1px solid #222" }}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: "8px" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <PaginationControls table={table} />
    </div>
  );
}
