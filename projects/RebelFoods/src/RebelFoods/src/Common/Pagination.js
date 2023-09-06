import React, { useState } from 'react';
import "./pagination.scss"

const PaginationComponent = ({ totalPages,currentPage,handlePageChange }) => {
  return (
    <div className="pagination-controls">
       {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default PaginationComponent;