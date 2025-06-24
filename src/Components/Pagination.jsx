import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className='mt-4 space-y-2'>
      {/* Page numbers */}
      <div className='flex gap-2'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`px-3 py-1 rounded ${currentPage === pageNumber ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Prev / Next */}
      <div className='flex gap-2'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50'
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
