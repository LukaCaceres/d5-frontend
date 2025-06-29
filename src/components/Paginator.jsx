import React from 'react';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded disabled:opacity-50 cursor-pointer"
      >
        Anterior
      </button>

      <span className="px-3 py-1 text-indigo-900 font-semibold">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded disabled:opacity-50 cursor-pointer"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginator;