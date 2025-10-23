import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function InventoryTable({ items, onDeleteItem, onEditItem }) {
  // Define columns (the table's structure)
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

  // Create the table instance
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        background: "#111",
        color: "#eee",
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
                  textAlign: "left",
                  cursor: "pointer",
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
  );
}
