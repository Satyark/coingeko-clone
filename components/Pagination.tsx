import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  handlePageClick: (page: number) => void;
  pages: number[];
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, handlePrev, handleNext,handlePageClick, pages }) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 mr-2 hover:bg-gray-400 transition  text-black"
      >
        Prev
      </button>
      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageClick(pageNum)}
          className={`px-4 py-2 mx-1 rounded transition ${
            page === pageNum ? 'bg-[#830846] text-black' : 'bg-gray-200 hover:bg-gray-300 text-black'
          }`}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 ml-2 hover:bg-gray-400 transition  text-black"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
