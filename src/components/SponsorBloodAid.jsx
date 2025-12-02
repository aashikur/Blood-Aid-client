import { Link } from "react-router";
import FundingForm from "./funding/FundingForm";
import FundingStatCard from "./funding/FundingStatCard";
import FundingTable from "./funding/FundingTable";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FaHeart } from "react-icons/fa6";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function SponsorBloodAid() {
  return (
    <div className="min-h-screen w-full pt-28 pb-12 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 mb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Support <span className="text-gradient">BloodAid</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your contribution helps us save more lives. Join our mission to make blood donation accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Form */}
          <div className="lg:col-span-1 space-y-8">
            <FundingStatCard />
            
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
                Make a Donation
              </h3>
              <Elements stripe={stripePromise}>
                <FundingForm />
              </Elements>
            </div>
          </div>

          {/* Right Column: Recent Donations Table */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 rounded-2xl h-full">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white">
                  Recent Supporters
                </h3>
                <Link to="/funding" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  View All
                </Link>
              </div>
              <FundingTable />
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-12 flex items-center justify-center gap-2">
          Thank you for considering supporting <span className="text-purple-400 font-semibold">BloodAid</span> <FaHeart className="text-red-500 animate-pulse" />
        </p>
      </div>
    </div>
  );
}