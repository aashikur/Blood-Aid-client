import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaUser, FaTint, FaDonate, FaRegListAlt, FaArrowRight } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useDashboardStars from "@/hooks/useDashboardStars";

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  inprogress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  done: "bg-green-500/10 text-green-500 border-green-500/20",
  canceled: "bg-red-500/10 text-red-500 border-red-500/20",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequest: 0,
    totalFunding: 0,
  });

  const { totalFundingAmount } = useDashboardStars();
  const axiosSecure = useAxiosSecure();
  
  useEffect(() => {
    axiosSecure("/admin-dashboard-stats").then(({ data }) => setStats(data));
  }, []);

  const { user } = useContext(AuthContext);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-donation-requests-home", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-donation-requests?email=${user.email}&limit=3`);
      return data;
    },
  });

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUser className="text-2xl" />,
      gradient: "from-blue-500 to-purple-600",
      sub: "Registered members",
    },
    {
      title: "Total Requests",
      value: stats.totalRequest,
      icon: <FaRegListAlt className="text-2xl" />,
      gradient: "from-pink-500 to-rose-600",
      sub: "Blood donation needs",
    },
    {
      title: "Total Funding",
      value: totalFundingAmount ? `৳${totalFundingAmount}` : "৳0",
      icon: <FaDonate className="text-2xl" />,
      gradient: "from-emerald-400 to-teal-600",
      sub: "Funds raised",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B15] text-white p-6 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full blur opacity-70"></div>
            <img
              src={user?.photoURL || "/logo/icon-2.png"}
              alt="Admin"
              className="relative w-20 h-20 rounded-full border-2 border-white/20 object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Welcome back, {user?.displayName?.split(' ')[0] || "Admin"}!
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl">
              Here's what's happening with BloodAid today. You have full control over the platform statistics and user management.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg shadow-purple-900/20`}>
                {stat.icon}
              </div>
              <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                +2.5% this week
              </span>
            </div>
            
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-2">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests Section */}
      <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Recent Requests</h2>
            <p className="text-sm text-gray-400">Latest blood donation requests from you</p>
          </div>
          <button
            onClick={() => navigate("/dashboard/my-donation-requests")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all group"
          >
            View All
            <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-purple-500"></span>
            </div>
          ) : requests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-white/10">
                    <th className="pb-4 font-medium pl-4">Recipient</th>
                    <th className="pb-4 font-medium">Location</th>
                    <th className="pb-4 font-medium">Date & Time</th>
                    <th className="pb-4 font-medium">Group</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {requests.map((req) => (
                    <tr key={req._id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                      <td className="py-4 pl-4">
                        <div className="font-medium text-white">{req.recipientName}</div>
                      </td>
                      <td className="py-4 text-gray-400">
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </td>
                      <td className="py-4 text-gray-400">
                        <div className="text-white">{req.donationDate}</div>
                        <div className="text-xs opacity-70">{req.donationTime}</div>
                      </td>
                      <td className="py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/30">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[req.donationStatus] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                          {req.donationStatus}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => navigate(`/dashboard/donation-request-details-edit/${req._id}`)}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 text-xs transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => navigate(`/dashboard/donation-request-details/${req._id}`)}
                            className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 text-xs transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRegListAlt className="text-2xl text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white">No Requests Found</h3>
              <p className="text-gray-400 text-sm mt-1">You haven't created any donation requests yet.</p>
              <button
                onClick={() => navigate("/dashboard/create-donation-request")}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all"
              >
                Create Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;