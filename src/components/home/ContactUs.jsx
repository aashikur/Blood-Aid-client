import { useState, useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import { FaPaperPlane } from "react-icons/fa";

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
        confirmButtonColor: "#8B5CF6",
        confirmButtonText: "Go to Login",
        background: "#1A103C",
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
        background: "#1A103C",
        color: "#fff",
        confirmButtonColor: "#8B5CF6"
      });
      setForm({ subject: "", message: "" });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to send message.",
        background: "#1A103C",
        color: "#fff",
        confirmButtonColor: "#8B5CF6"
      });
    }
    setLoading(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left Side: Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Have questions or feedback? We'd love to hear from you. Reach out to us and we'll respond as soon as possible.
            </p>
            
            <div className="hidden md:block relative h-64 w-full">
               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
               <div className="absolute inset-0 glass-panel rounded-2xl flex items-center justify-center">
                  <FaPaperPlane className="text-6xl text-white/20" />
               </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name (read-only) */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 ml-4">Name</label>
                <input
                  type="text"
                  value={user?.displayName || "Please login to continue"}
                  readOnly
                  className="w-full px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Email (read-only) */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 ml-4">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 ml-4">Subject</label>
                <div className="relative">
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none appearance-none"
                  >
                    <option value="" disabled className="bg-[#1A103C]">Select a subject</option>
                    {subjects.map((sub) => (
                      <option key={sub} value={sub} className="bg-[#1A103C] text-white">
                        {sub}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 ml-4">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 btn-primary-gradient w-full py-3 rounded-full font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    Send Message <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}