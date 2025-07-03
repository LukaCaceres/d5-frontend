"use client"

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="flex items-center justify-center gap-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="py-2 px-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Anterior
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`py-2 px-3 rounded-lg transition-colors duration-200 ${
                currentPage === number
                  ? "bg-indigo-600 text-white font-medium"
                  : "bg-gray-700 border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-600"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="py-2 px-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Paginator
