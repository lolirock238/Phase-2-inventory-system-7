import React from "react";

export default function PaginationControls({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null; // hide if only one page

  function handlePrev() {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }

  function handleNext() {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginTop: "8px",
      }}
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          backgroundColor: currentPage === 1 ? "#333" : "#1e90ff",
          color: "white",
          border: "none",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
      >
        ← Prev
      </button>

      <span
        style={{
          color: "#ccc",
          fontSize: "0.9rem",
          minWidth: "100px",
          textAlign: "center",
        }}
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          backgroundColor: currentPage === totalPages ? "#333" : "#1e90ff",
          color: "white",
          border: "none",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
      >
        Next →
      </button>
    </div>
  );
}
