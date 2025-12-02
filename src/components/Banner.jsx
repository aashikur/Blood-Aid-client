import animation from "@/assets/lottie/blooddonner.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";
import { FaUserPlus, FaSignInAlt, FaEnvelope, FaArrowRight, FaSearch } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import ShinyButton from "./ui/ShinyButton";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from "sweetalert2";
import { BiPlus } from "react-icons/bi";

const Banner = () => {
  const navigate = useNavigate();
  const {err, setError} = useState("");
  const {user, googleSignIn }  = useContext(AuthContext)
 // Google login
  const handleGoogle = () => {
  googleSignIn()
    .then((result) => {
      const user = result.user;

      Swal.fire({
        icon: 'success',
        title: `Welcome, ${user.displayName}!`,
        text: 'You have successfully logged in with Google.',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    })
    .catch((err) => {
      setError(err.message);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
      });
    });
};
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-sm font-medium text-gray-300">AI-Powered Blood Donation Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight animate-fade-in-up delay-100">
          The Intelligent Platform for <br />
          <span className="text-gradient">Saving Lives</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 animate-fade-in-up delay-200">
          Elevate your donation experience with real-time matching, community insights, and seamless coordination.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300">
          <button
            onClick={() => navigate(user ? "/dashboard" : "/registration")}
            className="btn-primary-gradient px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 group"
          >
            Get Started <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate("/search")}
            className="btn-secondary-outline px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2"
          >
            <FaSearch /> Find Donors
          </button>
        </div>

        {/* Visual / Lottie */}
        <div className="mt-16 w-full max-w-4xl glass-panel rounded-2xl p-4 animate-fade-in-up delay-500 relative">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B15] via-transparent to-transparent z-10"></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-1 hidden md:block p-4">
                  <div className="glass-panel p-4 rounded-xl mb-4">
                      <div className="h-2 w-20 bg-gray-700 rounded mb-2"></div>
                      <div className="h-2 w-32 bg-gray-600 rounded"></div>
                  </div>
                  <div className="glass-panel p-4 rounded-xl">
                      <div className="h-2 w-24 bg-gray-700 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-gray-600 rounded"></div>
                  </div>
              </div>
              <div className="col-span-1 md:col-span-1 flex justify-center">
                  <div className="w-64 h-64">
                    <Lottie animationData={animation} loop={true} />
                  </div>
              </div>
              <div className="col-span-1 hidden md:block p-4">
                  <div className="glass-panel p-4 rounded-xl mb-4">
                      <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500/20"></div>
                          <div className="h-2 w-20 bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-2 w-full bg-gray-600 rounded"></div>
                  </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};
export default Banner;