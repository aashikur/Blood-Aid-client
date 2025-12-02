import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-8 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm w-fit mx-auto">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0B0B15] border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#0B0B15] disabled:hover:border-white/10 transition-all duration-300 group"
      >
        <FaChevronLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={typeof page !== "number"}
            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center
              ${
                page === currentPage
                  ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105 border border-transparent"
                  : typeof page === "number"
                  ? "bg-[#0B0B15] border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30 hover:bg-white/5"
                  : "text-gray-500 cursor-default"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0B0B15] border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#0B0B15] disabled:hover:border-white/10 transition-all duration-300 group"
      >
        <FaChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
