import { useContext } from "react";
import { FaBell, FaSearch, FaBars } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import { Link, useNavigate } from "react-router";

export default function DashboardHeader({ toggleSidebar }) {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => navigate("/"));
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0B0B15]/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-gray-400 hover:text-white md:hidden"
        >
          <FaBars className="text-xl" />
        </button>
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 focus-within:border-purple-500/50 transition-colors w-64">
          <FaSearch className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <FaBell className="text-xl" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-2 border-purple-500/30">
              <img 
                alt="User" 
                src={user?.photoURL || "/logo/icon-2.png"} 
              />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-[#131320] border border-white/10 rounded-xl w-52 text-gray-300">
            <li className="px-4 py-2 border-b border-white/10 mb-2">
              <span className="font-bold text-white block truncate">{user?.displayName}</span>
              <span className="text-xs text-gray-500 block truncate">{user?.email}</span>
            </li>
            <li>
              <Link to="/dashboard/profile" className="hover:bg-white/5 hover:text-purple-400">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:bg-white/5 hover:text-purple-400">
                Home Page
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-red-400 hover:bg-red-500/10 hover:text-red-500">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}