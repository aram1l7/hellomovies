import React from "react";

function Pagination({
  startIndex,
  endIndex,
  total,
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="flex mt-8 mb-20 justify-between items-center">
      <div>
        Showing {startIndex} to {endIndex} of {total} results
      </div>

      <div className="flex gap-3 items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
