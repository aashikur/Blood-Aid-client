import { useState } from "react";
import { FaUserCircle, FaEllipsisV, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function UserRow({ user, index, refetch }) {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(user.role);
  
  const isRoleChanged = selectedRole !== user.role;

  const handleStatusChange = async (newStatus) => {
    if (user.status === newStatus) return;
    
    const result = await Swal.fire({
      title: "Update Status?",
      text: `Change status to '${newStatus}'? This will trigger an SMS notification.`,
      icon: "warning",
      background: "#131320",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, update it!"
    });

    if (result.isConfirmed) {
      const { data } = await axiosSecure.patch("/update-status", { email: user.email, status: newStatus });
      if (data.modifiedCount) {
        refetch();
        Swal.fire({
            title: "Updated!",
            text: "User status has been updated.",
            icon: "success",
            background: "#131320",
            color: "#fff",
            confirmButtonColor: "#9333ea"
        });
      }
    }
  };

  const handleSaveRole = async () => {
    const result = await Swal.fire({
      title: "Change Role?",
      text: `Are you sure you want to make this user a '${selectedRole}'?`,
      icon: "question",
      background: "#131320",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, change role"
    });

    if (result.isConfirmed) {
      const { data } = await axiosSecure.patch("/update-role", { role: selectedRole, email: user.email });
      if (data.modifiedCount) {
        refetch();
        Swal.fire({
            title: "Success!",
            text: "User role updated successfully.",
            icon: "success",
            background: "#131320",
            color: "#fff",
            confirmButtonColor: "#9333ea"
        });
      }
    }
  };

  return (
    <tr className="group border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
      {/* Index */}
      <td className="p-4 text-gray-500 font-mono text-xs">{index + 1}</td>
      
      {/* User Info */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white/10 group-hover:border-purple-500/50 transition-colors" 
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10 group-hover:border-purple-500/50 transition-colors">
                <FaUserCircle className="w-6 h-6 text-gray-500" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-white text-sm group-hover:text-purple-400 transition-colors">
              {user.name || "Unknown User"}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>

      {/* Status Selector */}
      <td className="p-4">
        <div className="relative inline-block">
          <select
            value={user.status || "active"}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-medium border bg-[#0B0B15]/50 cursor-pointer outline-none transition-all
              ${user.status === 'blocked' 
                ? 'text-red-400 border-red-500/30 hover:bg-red-500/10' 
                : 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
              }`}
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          {/* Custom Arrow Indicator */}
          <div className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]
             ${user.status === 'blocked' ? 'text-red-400' : 'text-emerald-400'}`}>
            ▼
          </div>
        </div>
      </td>

      {/* Role Selector */}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="appearance-none bg-[#131320] border border-white/10 text-gray-300 text-xs rounded-lg pl-3 pr-8 py-1.5 focus:border-purple-500 outline-none hover:border-white/20 transition-colors cursor-pointer w-28"
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-[10px]">
              ▼
            </div>
          </div>
          
          {isRoleChanged && (
            <button 
              onClick={handleSaveRole}
              className="p-1.5 rounded-lg bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-all animate-in fade-in zoom-in duration-200"
              title="Save Role"
            >
              <FaCheck size={10} />
            </button>
          )}
        </div>
      </td>

      {/* Actions Dropdown */}
      <td className="p-4 text-right">
        <div className="dropdown dropdown-end dropdown-left">
          <button tabIndex={0} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <FaEllipsisV size={14} />
          </button>
          <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow-xl shadow-black/50 bg-[#1A1A2E] border border-white/10 rounded-xl w-48 text-sm mt-2">
            <li className="menu-title text-xs text-gray-500 uppercase tracking-wider px-3 py-1">Actions</li>
            <li>
              <button 
                onClick={() => navigate(`/dashboard/user-details/${user._id}`)}
                className="text-gray-300 hover:text-white hover:bg-white/5 rounded-lg py-2"
              >
                View Profile
              </button>
            </li>
            <div className="h-px bg-white/5 my-1"></div>
            <li>
              <button className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg py-2">
                Delete User
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
