import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaHome, FaUser, FaUsers, FaRegListAlt, FaBlog, FaDonate, FaPlus, FaEdit, FaEnvelope,
  FaChevronLeft, FaChevronRight, FaHospital, FaAmbulance
} from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";
import SidebarLoading from "@/components/loading/SidebarLoading";

// Power links (admin/volunteer only)
const adminPowerLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage Users" },
  { to: "/dashboard/manage-donations", icon: <FaRegListAlt />, label: "Manage Requests" },
  { to: "/dashboard/content-management", icon: <FaBlog />, label: "Content Mgmt" },
  { to: "/dashboard/funding", icon: <FaDonate />, label: "Funding" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Contacts" },
];

const volunteerPowerLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/all-blood-donation-request", icon: <FaRegListAlt />, label: "All Requests" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Messages" },
  { to: "/dashboard/content-management", icon: <FaBlog />, label: "Manage Blogs" },
];

// General links (all roles)
const generalLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/my-donation-requests", icon: <FaRegListAlt />, label: "My Requests" },
  { to: "/dashboard/create-donation-request", icon: <FaPlus />, label: "Create Request" },
  { to: "/dashboard/add-blog", icon: <FaEdit />, label: "Add Blog" },
  { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
];

export default function DashboardSidebar({ isOpen, toggleSidebar }) {
  const { user } = useContext(AuthContext);
  const { role, loading } = useRole();

  if (loading) return <SidebarLoading />;

  const renderLinks = (links) =>
    links.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 mb-1 group relative overflow-hidden
          ${isActive
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/20"
            : "text-gray-400 hover:text-white hover:bg-white/5"
          }
          ${!isOpen && "justify-center px-2"}
          `
        }
        title={!isOpen ? item.label : ""}
        end
      >
        <span className={`text-lg relative z-10 ${!isOpen ? "text-xl" : ""}`}>{item.icon}</span>
        {isOpen && <span className="relative z-10 text-sm">{item.label}</span>}

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </NavLink>
    ));

  let powerLinks = [];
  let powerTitle = "";
  if (role === "admin") {
    powerLinks = adminPowerLinks;
    powerTitle = "Admin Tools";
  } else if (role === "volunteer") {
    powerLinks = volunteerPowerLinks;
    powerTitle = "Volunteer Tools";
  }

  return (
    <aside
      className={`fixed md:static z-40 h-screen bg-[#0B0B15] border-r border-white/10 transition-all duration-300 flex flex-col
        ${isOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"}
      `}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center border-b border-white/10 relative">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center gap-2">
            <img src="/logo/icon-2.png" alt="Logo" className="w-8 h-8" />
            {isOpen && (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                BloodAid
              </span>
            )}
          </div>
        </Link>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#131320] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-all md:flex hidden"
        >
          {isOpen ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
        {/* Power Section */}
        {powerLinks.length > 0 && (
          <div className="mb-6">
            {isOpen && (
              <div className="px-4 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                {powerTitle}
              </div>
            )}
            <nav className="flex flex-col">{renderLinks(powerLinks)}</nav>
          </div>
        )}

        {/* General Section */}
        <div>
          {isOpen && (
            <div className="px-4 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              Menu
            </div>
          )}
          <nav className="flex flex-col">
            {renderLinks(
              (role === "admin" || role === "volunteer")
                ? generalLinks.slice(1)
                : generalLinks
            )}
          </nav>
        </div>
      </div>

      {/* User Profile Snippet */}
      <div className="p-4 border-t border-white/10 bg-[#131320]/50">
        <div className={`flex items-center gap-3 ${!isOpen && "justify-center"}`}>
          <div className="relative">
            <img
              src={user?.photoURL || "/logo/icon-2.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-white/10 object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0B0B15] rounded-full"></div>
          </div>

          {isOpen && (
            <div className="overflow-hidden">
              <h4 className="text-sm font-medium text-white truncate w-32">
                {user?.displayName || "User"}
              </h4>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}