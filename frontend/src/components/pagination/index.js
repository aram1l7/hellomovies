import Button from "components/button";
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
        Showing {startIndex} to {endIndex} of{" "}
        <span className="text-primary"> {total} </span>results
      </div>

      <div className="flex gap-3 items-center">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          text="Previous"
        />

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          text="Next"
        />
      </div>
    </div>
  );
}

export default Pagination;
