import { useContext, useState, useMemo } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaEye, FaEdit, FaTrash, FaEllipsisV, FaCheck, FaTimes } from "react-icons/fa";
import FilterBar from "@/components/dashboard/shared/FilterBar";
import Pagination from "@/components/dashboard/shared/Pagination";

export default function MyDonationRequestsDashboard() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // --- State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Data Fetching ---
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-donation-requests", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
      return data;
    },
  });

  // --- Filtering Logic ---
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
            req.recipientName?.toLowerCase().includes(term) ||
            req.recipientDistrict?.toLowerCase().includes(term) ||
            req.bloodGroup?.toLowerCase().includes(term);

        const matchesStatus = statusFilter === "all" ? true : req.donationStatus === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
  }, [requests, searchTerm, statusFilter]);

  // --- Pagination Logic ---
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // --- Handlers ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this request?",
      icon: "warning",
      background: "#131320",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-request/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Request deleted.",
            icon: "success",
            background: "#131320",
            color: "#fff",
            confirmButtonColor: "#9333ea"
          });
          queryClient.invalidateQueries(["my-donation-requests", user.email]);
        });
      }
    });
  };

  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: "Update Status?",
      text: `Mark this request as "${newStatus}"?`,
      icon: "question",
      background: "#131320",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/donation-request/${id}`, { donationStatus: newStatus })
          .then(() => {
            Swal.fire({
                title: "Success!",
                text: "Status updated.",
                icon: "success",
                background: "#131320",
                color: "#fff",
                confirmButtonColor: "#9333ea"
            });
            queryClient.invalidateQueries(["my-donation-requests", user.email]);
          });
      }
    });
  };

  // --- Configuration ---
  const filterOptions = [
    {
      value: statusFilter,
      onChange: (e) => setStatusFilter(e.target.value),
      options: [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "inprogress", label: "In Progress" },
        { value: "done", label: "Done" },
        { value: "canceled", label: "Canceled" },
      ]
    }
  ];

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    inprogress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    done: "bg-green-500/10 text-green-500 border-green-500/20",
    canceled: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Donation Requests</h1>
        <p className="text-gray-400 text-sm">Manage your blood donation requests and track their status.</p>
      </div>

      {/* Filter Bar */}
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
                            <th className="p-4 font-medium">Recipient Info</th>
                            <th className="p-4 font-medium">Location</th>
                            <th className="p-4 font-medium">Date & Time</th>
                            <th className="p-4 font-medium">Blood Group</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {paginatedRequests.length > 0 ? (
                            paginatedRequests.map((req) => (
                                <tr key={req._id} className="group border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium text-white">
                                        {req.recipientName}
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {req.recipientDistrict}, {req.recipientUpazila}
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        <div>{req.donationDate}</div>
                                        <div className="text-xs opacity-70">{req.donationTime}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/30">
                                            {req.bloodGroup}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[req.donationStatus] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                                            {req.donationStatus}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="dropdown dropdown-end dropdown-left">
                                            <button tabIndex={0} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                <FaEllipsisV size={14} />
                                            </button>
                                            <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow-xl shadow-black/50 bg-[#1A1A2E] border border-white/10 rounded-xl w-48 text-sm mt-2">
                                                <li>
                                                    <button 
                                                        onClick={() => navigate(`/dashboard/donation-request-details/${req._id}`)}
                                                        className="text-gray-300 hover:text-white hover:bg-white/5 rounded-lg py-2"
                                                    >
                                                        <FaEye className="mr-2" /> View Details
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        onClick={() => navigate(`/dashboard/donation-request-details-edit/${req._id}`)}
                                                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg py-2"
                                                    >
                                                        <FaEdit className="mr-2" /> Edit
                                                    </button>
                                                </li>
                                                
                                                {req.donationStatus === "inprogress" && (
                                                    <>
                                                        <div className="h-px bg-white/5 my-1"></div>
                                                        <li>
                                                            <button 
                                                                onClick={() => handleStatusChange(req._id, "done")}
                                                                className="text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg py-2"
                                                            >
                                                                <FaCheck className="mr-2" /> Mark Done
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button 
                                                                onClick={() => handleStatusChange(req._id, "canceled")}
                                                                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-lg py-2"
                                                            >
                                                                <FaTimes className="mr-2" /> Cancel
                                                            </button>
                                                        </li>
                                                    </>
                                                )}

                                                <div className="h-px bg-white/5 my-1"></div>
                                                <li>
                                                    <button 
                                                        onClick={() => handleDelete(req._id)}
                                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg py-2"
                                                    >
                                                        <FaTrash className="mr-2" /> Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                    No donation requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}