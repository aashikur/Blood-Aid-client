import React from 'react';
import { FaDonate, FaArrowUp } from 'react-icons/fa';
import useDashboardStars from '@/hooks/useDashboardStars';

const FundingStatCard = () => {
    const { totalFundingAmount } = useDashboardStars();

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-white/10 p-6 backdrop-blur-xl group hover:border-purple-500/30 transition-all duration-300">
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500"></div>
            
            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Funds Raised</p>
                    <h2 className="text-4xl font-bold text-white tracking-tight">
                        ৳{totalFundingAmount ? totalFundingAmount.toLocaleString() : '0'}
                    </h2>
                    
                    <div className="mt-4 flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                            <FaArrowUp size={10} /> +12%
                        </span>
                        <span className="text-xs text-gray-500">from last month</span>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-900/30 text-white">
                    <FaDonate className="text-2xl" />
                </div>
            </div>

            {/* Progress Bar Decoration */}
            <div className="mt-6 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full w-[75%] animate-pulse"></div>
            </div>
        </div>
    );
};

export default FundingStatCard;