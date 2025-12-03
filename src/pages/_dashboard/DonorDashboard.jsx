import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { FaTint, FaCheckCircle, FaClock, FaTimesCircle, FaArrowRight, FaEdit, FaEye, FaPlus } from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  inprogress: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  done: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  canceled: "bg-red-500/20 text-red-300 border border-red-500/30",
};

const SummaryCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <Icon className="text-2xl text-purple-400 group-hover:text-purple-300 transition-colors" />
    </div>
    <p className="text-gray-400 text-sm mb-2">{label}</p>
    <p className="text-4xl font-bold text-white">{value}</p>
  </div>
);

export default function DonorDashboardHome() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch all requests for this user (no limit, for summary)
  const { data: allRequests = [], isLoading } = useQuery({
    queryKey: ["my-donation-requests-home", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
      return data;
    },
  });

  // Recent 3 requests for table
  const recentRequests = allRequests.slice(0, 3);

  // Summary stats
  const total = allRequests.length;
  const pending = allRequests.filter(r => r.donationStatus === "pending").length;
  const inprogress = allRequests.filter(r => r.donationStatus === "inprogress").length;
  const done = allRequests.filter(r => r.donationStatus === "done").length;
  const canceled = allRequests.filter(r => r.donationStatus === "canceled").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B15] via-[#0B0B15] to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user.displayName || user.email} 👋
              </h1>
              <p className="text-gray-400">Track your donation requests and manage your contributions</p>
            </div>
            <button
              onClick={() => navigate("/dashboard/create-donation-request")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <FaPlus className="text-sm" />
              New Request
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <SummaryCard
            icon={FaTint}
            label="Total Requests"
            value={total}
          />
          <SummaryCard
            icon={FaClock}
            label="Pending"
            value={pending}
          />
          <SummaryCard
            icon={FaCheckCircle}
            label="In Progress"
            value={inprogress}
          />
          <SummaryCard
            icon={FaCheckCircle}
            label="Completed"
            value={done}
          />
          <SummaryCard
            icon={FaTimesCircle}
            label="Canceled"
            value={canceled}
          />
        </div>

        {/* Recent Requests Section */}
        <div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/5">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaTint className="text-purple-400" />
              Your Recent Requests
            </h2>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="px-6 py-12 text-center">
              <div className="inline-block animate-spin">
                <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full"></div>
              </div>
              <p className="text-gray-400 mt-4">Loading your requests...</p>
            </div>
          ) : recentRequests.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold text-sm">Recipient</th>
                      <th className="px-6 py-4 text-left text-white font-semibold text-sm">Location</th>
                      <th className="px-6 py-4 text-left text-white font-semibold text-sm">Blood Group</th>
                      <th className="px-6 py-4 text-left text-white font-semibold text-sm">Date & Time</th>
                      <th className="px-6 py-4 text-left text-white font-semibold text-sm">Status</th>
                      <th className="px-6 py-4 text-left text-white font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentRequests.map((req) => (
                      <tr
                        key={req._id}
                        className="hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-white font-medium">{req.recipientName}</td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          {req.recipientDistrict}, {req.recipientUpazila}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 font-semibold text-sm border border-red-500/30">
                            {req.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          <div>{req.donationDate}</div>
                          <div className="text-xs text-gray-500">{req.donationTime}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                              statusColors[req.donationStatus] || "bg-gray-500/20 text-gray-300"
                            }`}
                          >
                            {req.donationStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/dashboard/donation-request-details/${req._id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 transition-all duration-200 border border-white/10 hover:border-blue-500/30"
                              title="View"
                            >
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              onClick={() => navigate(`/dashboard/donation-request-details-edit/${req._id}`)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 transition-all duration-200 border border-white/10 hover:border-purple-500/30"
                              title="Edit"
                            >
                              <FaEdit className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Button */}
              <div className="px-6 py-4 border-t border-white/10 bg-white/5">
                <button
                  onClick={() => navigate("/dashboard/my-donation-requests")}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  View All Requests
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <FaTint className="text-3xl text-gray-600" />
              </div>
              <p className="text-gray-400 mb-6">No donation requests yet</p>
              <button
                onClick={() => navigate("/dashboard/create-donation-request")}
                className="px-6 py-2 rounded-lg bg-purple-600/50 hover:bg-purple-600 text-white font-semibold transition-all duration-300 inline-flex items-center gap-2"
              >
                <FaPlus className="text-sm" />
                Create Your First Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
