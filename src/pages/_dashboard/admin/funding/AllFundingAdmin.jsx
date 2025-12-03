import FundingTable from '@/components/funding/FundingTable';
import useDashboardStars from '@/hooks/useDashboardStars';
import React from 'react';
import { FaDonate, FaRegListAlt, FaUser } from 'react-icons/fa';

const AllFundingAdmin = () => {
    const stats = useDashboardStars();
    
    const statCards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <FaUser className="text-2xl" />,
            gradient: "from-purple-500 to-indigo-600",
            sub: "All registered users",
        },
        {
            title: "Total Donations",
            value: stats.totalFundings,
            icon: <FaRegListAlt className="text-2xl" />,
            gradient: "from-pink-500 to-rose-600",
            sub: "Number of contributions",
        },
        {
            title: "Total Funds Raised",
            value: stats.totalFundingAmount ? `৳${stats.totalFundingAmount.toLocaleString()}` : "৳0",
            icon: <FaDonate className="text-2xl" />,
            gradient: "from-emerald-400 to-teal-600",
            sub: "Total amount collected",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Funding Overview</h1>
                <p className="text-gray-400 text-sm">Track donations and funding statistics.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group"
                    >
                        {/* Decorative Gradient Blob */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>

                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg shadow-black/20 text-white`}>
                                {stat.icon}
                            </div>
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                            <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                {stat.sub}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Funding Table Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm min-h-[500px] flex flex-col">
                <h2 className="text-lg font-bold text-white mb-4">Recent Transactions</h2>
                <div className="flex-1">
                    <FundingTable />
                </div>
            </div>
        </div>
    );
};

export default AllFundingAdmin;