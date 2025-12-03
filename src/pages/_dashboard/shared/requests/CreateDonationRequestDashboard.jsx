import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/providers/AuthProvider";
import useDistrictUpazila from "@/hooks/useDistrictUpazila";
import useRole from "@/hooks/useRole";
import { useNavigate } from "react-router";
import Loading from "@/pages/_fronted/home/Loading";
import { 
  FaUser, FaEnvelope, FaMapMarkerAlt, FaHospital, 
  FaTint, FaCalendarAlt, FaClock, FaCommentAlt, FaPaperPlane 
} from "react-icons/fa";

const CreateDonationRequestDashboard = () => {
  const { bloodGroups, districts, getUpazilasByDistrict } = useDistrictUpazila();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { status } = useRole();

  const [form, setForm] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    addressLine: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "recipientDistrict" ? { recipientUpazila: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "blocked") {
      Swal.fire({
        title: "Access Denied",
        text: "You are blocked and cannot create requests.",
        icon: "error",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#ef4444"
      });
      return;
    }

    const requestData = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      ...form,
      donationStatus: "pending",
    };

    try {
      await axiosSecure.post("/donation-request", requestData);
      Swal.fire({
        title: "Success!",
        text: "Donation request created successfully.",
        icon: "success",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#9333ea"
      });
      setForm({
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        addressLine: "",
        bloodGroup: "",
        donationDate: "",
        donationTime: "",
        requestMessage: "",
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to create request.",
        icon: "error",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#ef4444"
      });
    }
  };

  if (!status) return <Loading />;
  
  if (status === "blocked") {
    Swal.fire({
        title: "Blocked!", 
        text: "You are blocked and cannot create requests.", 
        icon: "error",
        background: "#131320",
        color: "#fff"
    }).then(() => navigate("/"));
    return null;
  }

  // Reusable Input Wrapper
  const InputGroup = ({ label, icon, children }) => (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-400 ml-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
          {icon}
        </div>
        {children}
      </div>
    </div>
  );

  const inputClasses = "w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all appearance-none";

  return (
    <div className="p-4 mx-auto pb-12">
      {/* Header */}
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-white mb-2">Create Donation Request</h1>
        <p className="text-gray-400">Fill in the details to request blood for a patient.</p>
      </div>

      <div className="bg-[#131320]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Requester Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Requester Name" icon={<FaUser />}>
              <input
                type="text"
                value={user.displayName}
                readOnly
                className={`${inputClasses} opacity-60 cursor-not-allowed`}
              />
            </InputGroup>
            <InputGroup label="Requester Email" icon={<FaEnvelope />}>
              <input
                type="email"
                value={user.email}
                readOnly
                className={`${inputClasses} opacity-60 cursor-not-allowed`}
              />
            </InputGroup>
          </div>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#131320] px-4 text-sm text-gray-500 uppercase tracking-wider font-medium">Patient Details</span>
            </div>
          </div>

          {/* Section 2: Patient & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Recipient Name" icon={<FaUser />}>
              <input
                type="text"
                name="recipientName"
                value={form.recipientName}
                onChange={handleChange}
                required
                placeholder="Enter patient's name"
                className={inputClasses}
              />
            </InputGroup>

            <InputGroup label="Blood Group" icon={<FaTint />}>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                required
                className={inputClasses}
              >
                <option value="" className="bg-[#131320]">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg} className="bg-[#131320]">{bg}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
            </InputGroup>

            <InputGroup label="District" icon={<FaMapMarkerAlt />}>
              <select
                name="recipientDistrict"
                value={form.recipientDistrict}
                onChange={handleChange}
                required
                className={inputClasses}
              >
                <option value="" className="bg-[#131320]">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name} className="bg-[#131320]">{d.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
            </InputGroup>

            <InputGroup label="Upazila" icon={<FaMapMarkerAlt />}>
              <select
                name="recipientUpazila"
                value={form.recipientUpazila}
                onChange={handleChange}
                required
                className={inputClasses}
                disabled={!form.recipientDistrict}
              >
                <option value="" className="bg-[#131320]">Select Upazila</option>
                {getUpazilasByDistrict(form.recipientDistrict).map((u) => (
                  <option key={u.id} value={u.name} className="bg-[#131320]">{u.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
            </InputGroup>

            <div className="md:col-span-2">
               <InputGroup label="Hospital Name" icon={<FaHospital />}>
                <input
                    type="text"
                    name="hospitalName"
                    value={form.hospitalName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className={inputClasses}
                />
               </InputGroup>
            </div>

            <div className="md:col-span-2">
               <InputGroup label="Full Address" icon={<FaMapMarkerAlt />}>
                <input
                    type="text"
                    name="addressLine"
                    value={form.addressLine}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Ward 5, Room 302, Zahir Raihan Rd"
                    className={inputClasses}
                />
               </InputGroup>
            </div>
          </div>

          {/* Section 3: Timing & Message */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Donation Date" icon={<FaCalendarAlt />}>
              <input
                type="date"
                name="donationDate"
                value={form.donationDate}
                onChange={handleChange}
                required
                className={`${inputClasses} [color-scheme:dark]`}
              />
            </InputGroup>

            <InputGroup label="Donation Time" icon={<FaClock />}>
              <input
                type="time"
                name="donationTime"
                value={form.donationTime}
                onChange={handleChange}
                required
                className={`${inputClasses} [color-scheme:dark]`}
              />
            </InputGroup>

            <div className="md:col-span-2">
              <InputGroup label="Request Message" icon={<FaCommentAlt />}>
                <textarea
                  name="requestMessage"
                  value={form.requestMessage}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Please describe why blood is needed urgently..."
                  className="w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                />
              </InputGroup>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full relative group overflow-hidden rounded-xl p-[1px] mt-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-[#131320] group-hover:bg-transparent transition-colors duration-300 rounded-xl px-6 py-4 flex items-center justify-center gap-2">
              <span className="font-bold text-white text-lg">Submit Request</span>
              <FaPaperPlane className="text-white group-hover:translate-x-2 transition-all duration-300" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequestDashboard;