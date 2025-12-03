import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import { FaPaperPlane, FaEnvelope, FaUser, FaCommentAlt, FaTag } from "react-icons/fa";

const subjects = [
  "General Query",
  "Blood Request",
  "Feedback",
  "Technical Issue",
  "Other"
];

export default function ContactUs() {
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "You need to login to send a message.",
        confirmButtonColor: "#9333ea",
        confirmButtonText: "Go to Login",
        background: "#131320",
        color: "#fff"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    setLoading(true);
    try {
      await axiosPublic.post("/contacts", {
        name: user?.displayName || "",
        email: user?.email || "",
        subject: form.subject,
        message: form.message,
      });
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "We will get back to you soon.",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#9333ea"
      });
      setForm({ subject: "", message: "" });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to send message.",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#ef4444"
      });
    }
    setLoading(false);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0B0B15]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Let's Start a <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Conversation
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Have questions about blood donation? Need technical support? 
                Or just want to share your feedback? We are here to listen and help.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <FaEnvelope className="text-xl" />
                </div>
                <h3 className="text-white font-bold mb-1">Email Us</h3>
                <p className="text-gray-400 text-sm">support@bloodaid.com</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                  <FaCommentAlt className="text-xl" />
                </div>
                <h3 className="text-white font-bold mb-1">Live Chat</h3>
                <p className="text-gray-400 text-sm">Available 9am - 6pm</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 transform rotate-3"></div>
            <div className="relative bg-[#131320]/80 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* User Info (Read Only) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Your Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={user?.displayName || "Guest"}
                        readOnly
                        className="w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-gray-400 focus:outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Your Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        value={user?.email || "Please login"}
                        readOnly
                        className="w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-gray-400 focus:outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 ml-1">Subject</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaTag className="text-gray-500" />
                    </div>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none appearance-none transition-all cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#131320]">Select a topic</option>
                      {subjects.map((sub) => (
                        <option key={sub} value={sub} className="bg-[#131320]">
                          {sub}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-[#0B0B15] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none transition-all"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group overflow-hidden rounded-xl p-[1px] mt-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-[#131320] group-hover:bg-transparent transition-colors duration-300 rounded-xl px-6 py-3.5 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm text-white"></span>
                        <span className="font-bold text-white">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-white">Send Message</span>
                        <FaPaperPlane className="text-white group-hover:translate-x-1 transition-all" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}