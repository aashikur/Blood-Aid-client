import React from "react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B15] via-[#0B0B15] to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full border-2 border-purple-500/50 bg-white/10"></div>
              {/* Name + Subtitle */}
              <div className="flex-1">
                <div className="h-8 w-64 bg-white/10 rounded-lg mb-3"></div>
                <div className="h-4 w-96 bg-white/10 rounded-lg"></div>
              </div>
            </div>
            {/* Button Skeleton */}
            <div className="h-12 w-40 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl"></div>
          </div>
        </div>

        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 p-6 relative overflow-hidden"
            >
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-white/10 mb-4"></div>
              {/* Label */}
              <div className="h-3 w-24 bg-white/10 rounded mb-3"></div>
              {/* Value */}
              <div className="h-8 w-12 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>

        {/* Table Section Skeleton */}
        <div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden animate-pulse">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="h-6 w-48 bg-white/10 rounded-lg"></div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="px-6 py-4">
                      <div className="h-4 w-16 bg-white/10 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...Array(3)].map((_, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-white/5">
                    {[...Array(6)].map((_, colIdx) => (
                      <td key={colIdx} className="px-6 py-4">
                        {colIdx === 5 ? (
                          <div className="flex gap-2">
                            <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
                            <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
                          </div>
                        ) : (
                          <div className="h-4 w-20 bg-white/10 rounded"></div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Button */}
          <div className="px-6 py-4 border-t border-white/10 bg-white/5">
            <div className="h-12 w-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
