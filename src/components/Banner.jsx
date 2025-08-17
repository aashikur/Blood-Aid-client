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
    <div  className="bg-red-700 dark:bg-transparent">
     <section className="w-full z-10  flex justify-center   bg-gradient-to-br sm:rounded-b-[100px] rounded-b-[50px] from-pink-200 via-white to-pink-200 sm:py-30 py-15
     dark:from-[#18122B] dark:via-[#393053] dark:to-[#18122B]
    bg-[#ffd8de]
    ">
      <div className="max-w-6xl  w-full flex flex-col md:flex-row items-center justify-between px-12 ">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-start justify-between ">
          {/* Lottie Icon */}
          <div className="max-w-[400px] mx-auto md:mx-0 -mt-15">
            <Lottie animationData={animation} loop={true} />
          </div>
          {/* Text & Buttons */}
          <div className="text-center md:text-left -mt-10 sm:-mt-13">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-2">
              Join as a <span className="text-[#c30027]">Donor</span>
            </h1>
            <p className="text-lg  text-[1rem]  sm:text-[1.125rem] text-gray-600/90 dark:text-gray-400 mb-8">
              Be a hero. Your blood can save lives today.
            </p>
          { !user?.email ? (<div className="flex flex-col sm:flex-row  gap-4 justify-center md:justify-start">
              <button
                className="flex justify-center items-center gap-2 bg-gradient-to-tr from-red-800   to-red-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-[#a80020] transition cursor-pointer"
                onClick={() => navigate("/registration")}
              >
                <FaUserPlus /> Join as Donor
              </button>
              <button
                className="flex justify-center items-center gap-2 border border-[#c30027] text-[#c30027] px-6 py-2 rounded-full hover:bg-[#FDEDF3] dark:bg-[#18122B] dark:text-white/70 dark:border-white dark:hover:bg-[#393053] transition cursor-pointer"
                onClick={() => navigate("/search")}
              >
                <FaSearch /> Search a Donar
              </button>
            </div >): (
              <div className="flex flex-col sm:flex-row  gap-4 justify-center md:justify-start">
              <button
                className="flex justify-center items-center gap-2 bg-gradient-to-tr from-red-800   to-red-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-[#a80020] transition cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <FaUserPlus /> Go to Dashboard
              </button>
              <button
                className="flex dark:border-white/80 justify-center items-center gap-2 border border-[#c30027] text-[#c30027] px-6 py-2 rounded-full font-semibold hover:bg-[#FDEDF3] dark:bg-[#18122B] dark:text-white  dark:hover:bg-[#393053] transition cursor-pointer"
                onClick={() => navigate("/search")}
              >
                <FaSearch /> Search a Donar
              </button>
            </div >
            )}
          </div>
        </div>
        {/* Right Side: Registration CTA Form */}
        <div className="flex-1 flex justify-center items-center md:justify-end md:mt-0 hidden md:flex">
          <div className="w-full max-w-md bg-white dark:bg-[#18122B] rounded-3xl shadow-lg p-8 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <FaUserPlus className="text-[#c30027] text-2xl" />
              <span className="text-lg text-gray-600">
                {user?.email ? "Registration Completed" : "Registration"}
              </span>
            </div>
            {/* <ShinyButton/> */}
            <button
            
              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-tr  from-red-800 to-red-400  text-white py-3 rounded-full font-semibold text-lg hover:bg-[#a80020] transition mb-4"
              onClick={() => navigate(`${user?.email ? "/dashboard" : "/registration"}`)}
            >
              <FaEnvelope /> 
              {
                user?.email ? "Go to Dashboard" : "Register with Email "
              }
              <FaArrowRight className="ml-2" />
            </button>
            <div className="flex items-center w-full my-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            <div className="flex gap-4 w-full justify-center mb-4">
              <button onClick={handleGoogle } className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 hover:bg-gray-100 transition">
                <FcGoogle className="text-2xl" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 hover:bg-gray-100 transition">
                <BsApple className="text-2xl" />
              </button>
            </div>
            <div className="w-full text-center mb-2">
              <span className="text-gray-500 text-sm">Already have an account?</span>
              <button
                className="block w-full text-[#c30027] dark:text-white/50 mt-1 "
              >
                Be a hero. Your blood can save lives today
              </button>
            </div>
            <button
            disabled={user?.email ? true : false}
              className="w-full mt-5 py-3 cursor-pointer flex items-center justify-center rounded-full dark:text-white/80 hover:dark:text-red-800 dark:border-white/60 border-2 border-[#c30027] text-[#c30027] font-semibold hover:bg-[#FDEDF3] transition"
              onClick={() => navigate(`${user?.email ? "/dashboard" : "/login"}`)}
            >
              {!user?.email && 'Continue with BloodAid Account'} <FaArrowRight className="ml-2" />  
            </button>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Banner;