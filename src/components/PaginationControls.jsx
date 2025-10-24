import React from "react";

export default function PaginationControls({ table }) {
  if (!table) {
    return <div>Loading pagination...</div>; // Optional placeholder
  }

  const pagination = table.getState()?.pagination || {};
  const pageIndex = pagination.pageIndex ?? 0;
  const pageCount = table.getPageCount?.() ?? 1;

  return (
    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage?.()}
      >
        ⬅ Prev
      </button>
      <span>
        Page {pageIndex + 1} of {pageCount}
      </span>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage?.()}
      >
        Next ➡
      </button>
    </div>
  );
}
