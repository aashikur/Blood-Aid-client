import { FaSearch } from "react-icons/fa";

export default function FilterBar({ searchTerm, onSearch, filters = [] }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
      {/* Search */}
      <div className="relative w-full md:w-72">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearch}
          className="w-full bg-[#0B0B15] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:border-purple-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3 w-full md:w-auto">
        {filters.map((filter, idx) => (
          <select
            key={idx}
            value={filter.value}
            onChange={filter.onChange}
            className="bg-[#0B0B15] border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2 focus:border-purple-500 focus:outline-none cursor-pointer"
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
}
