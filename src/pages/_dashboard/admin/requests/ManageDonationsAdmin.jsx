import React, { useState, useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaEllipsisV, FaEye, FaEdit, FaTrash, FaTint, FaHospital } from 'react-icons/fa';

import useAxiosSecure from '@/hooks/useAxiosSecure';
import FilterBar from '@/components/dashboard/shared/FilterBar';
import Pagination from '@/components/dashboard/shared/Pagination';

const ManageDonationsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodFilter, setBloodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Data Fetching ---
  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ["all-donation-requests-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-donation-requests'); // Assuming admin endpoint exists, or use public
      return res.data;
    },
  });

  // --- Handlers ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#131320",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/donation-request/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The request has been deleted.",
              icon: "success",
              background: "#131320",
              color: "#fff",
              confirmButtonColor: "#9333ea"
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/donation-request-status/${id}`, { status: newStatus });
      refetch();
      Swal.fire({
        title: "Updated",
        text: `Status changed to ${newStatus}`,
        icon: "success",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#9333ea",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error(error);
    }
  };

  // --- Filtering Logic ---
  const filteredDonations = useMemo(() => {
    return donations.filter(donation => {
      const searchText = searchTerm.toLowerCase();
      const matchesSearch =
        donation.requesterName?.toLowerCase().includes(searchText) ||
        donation.recipientName?.toLowerCase().includes(searchText) ||
        donation.recipientDistrict?.toLowerCase().includes(searchText);

      const matchesBlood = bloodFilter === 'All' || donation.bloodGroup === bloodFilter;
      const matchesStatus = statusFilter === 'All' || donation.donationStatus === statusFilter;

      return matchesSearch && matchesBlood && matchesStatus;
    });
  }, [donations, searchTerm, bloodFilter, statusFilter]);

  // --- Pagination Logic ---
  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  // --- Configuration ---
  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    inprogress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    done: "bg-green-500/10 text-green-500 border-green-500/20",
    canceled: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const filterOptions = [
    {
      value: bloodFilter,
      onChange: (e) => setBloodFilter(e.target.value),
      options: [
        { value: "All", label: "All Blood Groups" },
        { value: "A+", label: "A+" }, { value: "A-", label: "A-" },
        { value: "B+", label: "B+" }, { value: "B-", label: "B-" },
        { value: "AB+", label: "AB+" }, { value: "AB-", label: "AB-" },
        { value: "O+", label: "O+" }, { value: "O-", label: "O-" },
      ]
    },
    {
      value: statusFilter,
      onChange: (e) => setStatusFilter(e.target.value),
      options: [
        { value: "All", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "inprogress", label: "In Progress" },
        { value: "done", label: "Done" },
        { value: "canceled", label: "Canceled" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Manage Donations : {filteredDonations.length} </h1>
        <p className="text-gray-400 text-sm">Oversee all blood donation requests across the platform.</p>
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
                  <th className="p-4 font-medium">Requester</th>
                  <th className="p-4 font-medium">Recipient Info</th>
                  <th className="p-4 font-medium">Blood Group</th>
                  <th className="p-4 font-medium">Date & Time</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedDonations.length > 0 ? (
                  paginatedDonations.map((donation) => (
                    <tr key={donation._id} className="group border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-white">{donation.requesterName}</div>
                        <div className="text-xs text-gray-500">{donation.requesterEmail}</div>
                      </td>
                      
                      <td className="p-4">
                        <div className="font-medium text-white">{donation.recipientName}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                           {donation.recipientDistrict}, {donation.recipientUpazila}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                           <FaHospital size={10} /> {donation.hospitalName}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/30">
                            {donation.bloodGroup}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-gray-400">
                        <div className="text-white">{donation.donationDate}</div>
                        <div className="text-xs opacity-70">{donation.donationTime}</div>
                      </td>

                      <td className="p-4">
                        <select
                          value={donation.donationStatus}
                          onChange={(e) => handleStatusChange(donation._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border bg-[#0B0B15] cursor-pointer outline-none
                            ${statusColors[donation.donationStatus] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="inprogress">In Progress</option>
                          <option value="done">Done</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <div className="dropdown dropdown-end dropdown-left">
                          <button tabIndex={0} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <FaEllipsisV size={14} />
                          </button>
                          <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow-xl shadow-black/50 bg-[#1A1A2E] border border-white/10 rounded-xl w-48 text-sm mt-2">
                            <li>
                              <button 
                                onClick={() => navigate(`/dashboard/donation-request-details/${donation._id}`)}
                                className="text-gray-300 hover:text-white hover:bg-white/5 rounded-lg py-2"
                              >
                                <FaEye className="mr-2" /> View Details
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => navigate(`/dashboard/donation-request-details-edit/${donation._id}`)}
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg py-2"
                              >
                                <FaEdit className="mr-2" /> Edit Request
                              </button>
                            </li>
                            <div className="h-px bg-white/5 my-1"></div>
                            <li>
                              <button 
                                onClick={() => handleDelete(donation._id)}
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
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default ManageDonationsAdmin;
