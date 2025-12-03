import { Link } from "react-router";
import FundingForm from "./funding/FundingForm";
import FundingStatCard from "./funding/FundingStatCard";
import FundingTable from "./funding/FundingTable";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FaHeart, FaHandHoldingHeart, FaShieldAlt } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function SponsorBloodAid() {
  return (
    <div className="min-h-screen w-full pt-28 pb-12 relative bg-[#0B0B15] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40 opacity-50" />
          
          <div className="relative z-10 p-8 md:p-16 text-center">
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-white/5 border border-white/10 shadow-lg shadow-purple-500/20">
              <FaHandHoldingHeart className="text-3xl text-pink-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Support <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">BloodAid</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your generous contribution empowers us to connect donors with those in need, maintain our platform, and save lives across the nation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                <FaShieldAlt className="text-emerald-400" /> Secure Payment
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                <FaHeart className="text-red-500" /> 100% Goes to Cause
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Stats & Donation Form (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Stats Card Wrapper */}
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
               <FundingStatCard />
            </div>
            
            {/* Donation Form */}
            <div className="rounded-2xl bg-[#131320] border border-white/10 p-6 shadow-xl shadow-black/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full -z-0" />
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full block" />
                Make a Donation
              </h3>
              
              <div className="relative z-10">
                <Elements stripe={stripePromise}>
                  <FundingForm />
                </Elements>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Supporters (8 cols) */}
          <div className="lg:col-span-8">
            <div className="h-full rounded-2xl bg-[#131320]/80 border border-white/10 backdrop-blur-md overflow-hidden flex flex-col">
              <div className="p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-4 bg-white/5">
                <div>
                  <h3 className="text-xl font-bold text-white">Recent Supporters</h3>
                  <p className="text-sm text-gray-400">Real-time donation feed</p>
                </div>
                <Link 
                  to="/funding" 
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all hover:text-purple-400"
                >
                  View All History
                </Link>
              </div>
              
              <div className="p-6 flex-1 overflow-hidden">
                <FundingTable />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            Thank you for considering supporting <span className="text-purple-400 font-semibold">BloodAid</span> <FaHeart className="text-red-500 animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
}