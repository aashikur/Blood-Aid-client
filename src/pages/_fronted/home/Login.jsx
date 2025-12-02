import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginAnimation from "@/assets/loginAnimation.json";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Welcome Back!",
          text: "Login Successful",
          icon: "success",
          background: "#1e1e2e",
          color: "#fff",
          confirmButtonColor: "#a855f7",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          background: "#1e1e2e",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Welcome Back!",
          text: "Google Login Successful",
          icon: "success",
          background: "#1e1e2e",
          color: "#fff",
          confirmButtonColor: "#a855f7",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          background: "#1e1e2e",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-28 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#0B0B15] -z-20" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl w-full mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Animation Side */}
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
          <h2 className="text-3xl font-bold mt-8 text-center">
            Welcome Back to <span className="text-gradient">BloodAid</span>
          </h2>
          <p className="text-gray-400 text-center mt-4 max-w-sm">
            Sign in to manage your donations, requests, and help save lives.
          </p>
        </div>

        {/* Form Side */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-md mx-auto relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
          
          <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
          <p className="text-gray-400 mb-8">Enter your details to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <span className="text-red-400 text-xs ml-1">Email is required</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all"
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && (
                <span className="text-red-400 text-xs ml-1">Password is required</span>
              )}
              <div className="flex justify-end">
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-primary-gradient font-bold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#131320] text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 rounded-xl bg-white text-gray-900 font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all transform hover:-translate-y-0.5"
          >
            <FaGoogle className="text-red-500" />
            Google
          </button>

          <p className="text-center mt-8 text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}