import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import FilterBar from "@/components/dashboard/shared/FilterBar";
import Pagination from "@/components/dashboard/shared/Pagination";
import UserRow from "@/components/dashboard/users/UserRow";

export default function ManageUserAdmin() {
  const axiosSecure = useAxiosSecure();
  
  // --- State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // --- Data Fetching ---
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/get-users");
      return data;
    },
  });

  // --- Filtering Logic ---
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const term = searchTerm.toLowerCase();
        return (
          user.name?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term)
        );
      })
      .filter(user =>
        statusFilter === "all" ? true : user.status === statusFilter || (!user.status && statusFilter === "no status")
      )
      .filter(user =>
        roleFilter === "all" ? true : user.role === roleFilter
      );
  }, [users, searchTerm, statusFilter, roleFilter]);

  // --- Pagination Logic ---
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage, 
    currentPage * usersPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // --- Filter Configuration ---
  const filterOptions = [
    {
      value: statusFilter,
      onChange: (e) => setStatusFilter(e.target.value),
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "blocked", label: "Blocked" },
      ]
    },
    {
      value: roleFilter,
      onChange: (e) => setRoleFilter(e.target.value),
      options: [
        { value: "all", label: "All Roles" },
        { value: "donor", label: "Donor" },
        { value: "volunteer", label: "Volunteer" },
        { value: "admin", label: "Admin" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Manage Users</h1>
        <p className="text-gray-400 text-sm">View, filter, and manage user roles and statuses.</p>
      </div>

      {/* Filters */}
      <FilterBar 
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
        filters={filterOptions}
      />

      {/* Table Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-purple-500"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th className="p-4 font-medium">#</th>
                  <th className="p-4 font-medium">User Info</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, i) => (
                    <UserRow 
                      key={user._id} 
                      user={user} 
                      index={(currentPage - 1) * usersPerPage + i} 
                      refetch={refetch} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
