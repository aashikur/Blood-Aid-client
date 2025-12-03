import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "@/hooks/axiosPublic";
import { FaUserCircle, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function FundingTable() {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["fundings", page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/fundings?page=${page}&limit=${pageSize}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const { fundings = [], total = 0 } = data;
  const totalPages = Math.ceil(total / pageSize);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full">
      {/* Table Container */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
              <th className="p-4 font-medium">#</th>
              <th className="p-4 font-medium">Supporter</th>
              <th className="p-4 font-medium hidden md:table-cell">Email</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {fundings.length > 0 ? (
              fundings.map((f, idx) => (
                <tr
                  key={f._id}
                  className="group border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="p-4 text-gray-500 font-mono text-xs">
                    {(page - 1) * pageSize + idx + 1}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10 text-purple-400">
                        <FaUserCircle />
                      </div>
                      <span className="font-medium text-white group-hover:text-purple-400 transition-colors">
                        {f.userName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 hidden md:table-cell">
                    {f.userEmail}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ৳{f.amount}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt size={10} className="opacity-50" />
                      {new Date(f.fundingDate).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No donations found yet. Be the first!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 p-4 border-t border-white/10 mt-auto">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          >
            <FaChevronLeft size={12} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                page === i + 1
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
