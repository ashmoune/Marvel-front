import React from "react";

const Pagination = ({ skip, setSkip, page, setPage, totalPages }) => {
  const handleNextPage = () => {
    setSkip(skip + 100);
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setSkip(skip - 100);
    setPage(page - 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
