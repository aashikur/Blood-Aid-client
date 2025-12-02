import React from "react";

export default function SidebarLoading({ open = true }) {
  return (
    <aside
      className={`fixed md:static z-40 h-screen bg-[#0B0B15] border-r border-white/10 transition-all duration-300 flex flex-col
        ${open ? "w-64" : "w-20"}
      `}
    >
      {/* Logo Area Skeleton */}
      <div className="h-20 flex items-center justify-center border-b border-white/10 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
          {open && (
            <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Navigation Skeleton */}
      <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar space-y-8">
        {/* Section 1 */}
        <div className="space-y-3">
          {open && (
            <div className="px-4 mb-2 h-3 w-20 bg-white/5 rounded animate-pulse"></div>
          )}
          {[...Array(4)].map((_, i) => (
            <div
              key={`s1-${i}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 animate-pulse
                ${!open && "justify-center px-2"}
              `}
            >
              <div className="w-5 h-5 rounded bg-white/10"></div>
              {open && <div className="h-4 w-32 bg-white/10 rounded"></div>}
            </div>
          ))}
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          {open && (
            <div className="px-4 mb-2 h-3 w-16 bg-white/5 rounded animate-pulse"></div>
          )}
          {[...Array(5)].map((_, i) => (
            <div
              key={`s2-${i}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 animate-pulse
                ${!open && "justify-center px-2"}
              `}
            >
              <div className="w-5 h-5 rounded bg-white/10"></div>
              {open && <div className="h-4 w-28 bg-white/10 rounded"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* User Profile Skeleton */}
      <div className="p-4 border-t border-white/10 bg-[#131320]/50">
        <div className={`flex items-center gap-3 ${!open && "justify-center"}`}>
          <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse shrink-0"></div>

          {open && (
            <div className="flex flex-col gap-2 w-full">
              <div className="h-3 w-24 bg-white/10 rounded animate-pulse"></div>
              <div className="h-2 w-16 bg-white/5 rounded animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
