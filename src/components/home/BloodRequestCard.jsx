import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  inprogress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  done: "bg-green-500/20 text-green-400 border-green-500/30",
  canceled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const BloodRequestCard = ({ req, handleRespond }) => {
  const navigate = useNavigate();

  return (
    <div className="glass-panel rounded-2xl p-6 w-full max-w-md mx-auto hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -z-10 group-hover:bg-red-500/20 transition-colors" />

      {/* Blood Group Badge - Main Focus */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
          <p className="text-3xl font-black text-white drop-shadow-md">{req.bloodGroup}</p>
        </div>
      </div>

      {/* Header: Name & Status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white truncate pr-2">
          {req.recipientName}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
            statusColors[req.donationStatus] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
          }`}
        >
          {req.donationStatus}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-400 mb-2 text-sm">
        <FaMapMarkerAlt className="mr-2 text-red-400" />
        <p className="truncate">
          {req.recipientDistrict}, {req.recipientUpazila}
        </p>
      </div>

      {/* Date and Time */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-purple-400" />
          <p>{req.donationDate}</p>
        </div>
        <div className="flex items-center">
          <FaClock className="mr-2 text-pink-400" />
          <p>{req.donationTime}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          className="btn-secondary-outline py-2 rounded-lg text-sm font-medium"
          onClick={() =>
            navigate(`/dashboard/donation-request-details/${req._id}`)
          }
        >
          View Details
        </button>

        {req.donationStatus === "pending" ? (
          <button
            className="btn-primary-gradient py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            onClick={() => handleRespond(req._id)}
          >
            <FaCheckCircle /> Respond
          </button>
        ) : (
          <button
            className="bg-white/5 text-gray-500 py-2 rounded-lg text-sm font-medium cursor-not-allowed border border-white/5"
            disabled
          >
            Responded
          </button>
        )}
      </div>
    </div>
  );
};

export default BloodRequestCard;
