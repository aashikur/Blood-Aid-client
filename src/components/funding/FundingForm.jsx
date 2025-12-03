import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/axiosPublic";
import { FaCreditCard, FaInfoCircle } from "react-icons/fa";

export default function FundingForm() {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Create payment intent
      const { data } = await axiosPublic.post("/create-payment-intent", { amount: Number(amount) });
      const clientSecret = data.clientSecret;

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || user?.email || "Anonymous",
            email: user?.email || "anonymous@bloodaid.com",
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent.status === "succeeded") {
        // 3. Save funding record
        await axiosPublic.post("/fundings", {
          userName: user?.displayName || user?.email || "Anonymous",
          userEmail: user?.email || "anonymous@bloodaid.com",
          amount: Number(amount),
          fundingDate: new Date(),
          paymentId: result.paymentIntent.id,
          status: "succeeded",
        });

        // Invalidate fundings query to refresh the table
        queryClient.invalidateQueries(["fundings"]);

        Swal.fire({
          title: "Thank You!",
          text: "Your generous donation has been received.",
          icon: "success",
          background: "#131320",
          color: "#fff",
          confirmButtonColor: "#9333ea",
        });

        setAmount("");
        elements.getElement(CardElement).clear();
      }
    } catch (error) {
      Swal.fire({
        title: "Payment Failed",
        text: error.message,
        icon: "error",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  // Custom styling for Stripe Element
  const cardStyle = {
    style: {
      base: {
        color: "#ffffff",
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#6b7280",
        },
        iconColor: "#a855f7",
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Donation Amount (BDT)</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400 font-bold">৳</span>
          </div>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (e.g. 500)"
            required
            className="w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Card Element */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Card Details</label>
        <div className="bg-[#0B0B15] border border-white/10 rounded-xl p-4 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full relative group overflow-hidden rounded-xl p-[1px]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-[#131320] group-hover:bg-transparent transition-colors duration-300 rounded-xl px-6 py-3 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm text-white"></span>
              <span className="font-bold text-white">Processing...</span>
            </>
          ) : (
            <>
              <FaCreditCard className="text-white" />
              <span className="font-bold text-white">Donate Now</span>
            </>
          )}
        </div>
      </button>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        Your payment is secured by Stripe. 100% of funds go directly to the cause.
      </p>

      {/* Demo Card Info */}
      <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
        <div className="flex items-center gap-2 mb-2 font-bold text-blue-400">
          <FaInfoCircle /> Demo Card No. for Testing
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono">
          <div><span className="text-white">4242 4242 4242 4242</span></div>
          <div>Date: <span className="text-white">12/30</span></div>
          <div>CVV: <span className="text-white">123</span></div>
          <div>ZIP: <span className="text-white">12345</span></div>
        </div>
      </div>
    </form>
  );
}