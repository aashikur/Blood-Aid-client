import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/axiosPublic";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginAnimation from "@/assets/loginAnimation.json"; // Reusing login animation or use a new one
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage, FaTint, FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Register() {
  const { createUser, updateUser, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("district");

  useEffect(() => {
    fetch("/bd-districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  useEffect(() => {
    fetch("/bd-upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        if (selectedDistrict) {
          const filteredUpazilas = data.filter(
            (upazila) => upazila.district_id === selectedDistrict
          );
          setUpazilas(filteredUpazilas);
        }
      });
  }, [selectedDistrict]);

  const onSubmit = async (data) => {
    try {
      // Upload image
      const imageFile = { image: data.avatar[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const photoURL = res.data.data.display_url;
        
        // Create User
        const result = await createUser(data.email, data.password);
        const user = result.user;
        
        // Update Profile
        await updateUser({ displayName: data.name, photoURL: photoURL });

        // Save to DB
        const userInfo = {
          name: data.name,
          email: data.email,
          bloodGroup: data.bloodGroup,
          district: districts.find(d => d.id === data.district)?.name,
          upazila: upazilas.find(u => u.id === data.upazila)?.name,
          avatar: photoURL,
          role: "donor",
          status: "active",
        };

        const dbRes = await axiosPublic.post("/users", userInfo);
        
        if (dbRes.data.insertedId) {
          reset();
          Swal.fire({
            title: "Welcome!",
            text: "Registration Successful",
            icon: "success",
            background: "#1e1e2e",
            color: "#fff",
            confirmButtonColor: "#a855f7",
          });
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        background: "#1e1e2e",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          avatar: result.user?.photoURL,
          role: "donor",
          status: "active",
          bloodGroup: "Unknown", // Default for Google Sign In
          district: "Unknown",
          upazila: "Unknown",
        };
        
        await axiosPublic.post("/users", userInfo);
        
        Swal.fire({
          title: "Welcome!",
          text: "Google Registration Successful",
          icon: "success",
          background: "#1e1e2e",
          color: "#fff",
          confirmButtonColor: "#a855f7",
        });
        navigate("/");
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
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl w-full mx-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Form Side */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl w-full relative order-2 lg:order-1">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
          
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 mb-8">Join the community saving lives</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all"
                    {...register("name", { required: true })}
                  />
                </div>
                {errors.name && <span className="text-red-400 text-xs ml-1">Name is required</span>}
              </div>

              {/* Email */}
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
                {errors.email && <span className="text-red-400 text-xs ml-1">Email is required</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Blood Group</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaTint className="text-gray-500" />
                  </div>
                  <select
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all appearance-none"
                    {...register("bloodGroup", { required: true })}
                  >
                    <option value="" className="bg-[#1e1e2e]">Select Group</option>
                    <option value="A+" className="bg-[#1e1e2e]">A+</option>
                    <option value="A-" className="bg-[#1e1e2e]">A-</option>
                    <option value="B+" className="bg-[#1e1e2e]">B+</option>
                    <option value="B-" className="bg-[#1e1e2e]">B-</option>
                    <option value="AB+" className="bg-[#1e1e2e]">AB+</option>
                    <option value="AB-" className="bg-[#1e1e2e]">AB-</option>
                    <option value="O+" className="bg-[#1e1e2e]">O+</option>
                    <option value="O-" className="bg-[#1e1e2e]">O-</option>
                  </select>
                </div>
                {errors.bloodGroup && <span className="text-red-400 text-xs ml-1">Blood Group is required</span>}
              </div>

              {/* Avatar */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Profile Photo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaImage className="text-gray-500" />
                  </div>
                  <input
                    type="file"
                    className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-500/20 file:text-purple-400 hover:file:bg-purple-500/30"
                    {...register("avatar", { required: true })}
                  />
                </div>
                {errors.avatar && <span className="text-red-400 text-xs ml-1">Photo is required</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* District */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">District</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-500" />
                  </div>
                  <select
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all appearance-none"
                    {...register("district", { required: true })}
                  >
                    <option value="" className="bg-[#1e1e2e]">Select District</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id} className="bg-[#1e1e2e]">
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.district && <span className="text-red-400 text-xs ml-1">District is required</span>}
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Upazila</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-500" />
                  </div>
                  <select
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all appearance-none"
                    {...register("upazila", { required: true })}
                    disabled={!selectedDistrict}
                  >
                    <option value="" className="bg-[#1e1e2e]">Select Upazila</option>
                    {upazilas.map((upazila) => (
                      <option key={upazila.id} value={upazila.id} className="bg-[#1e1e2e]">
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.upazila && <span className="text-red-400 text-xs ml-1">Upazila is required</span>}
              </div>
            </div>

            {/* Password */}
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
                  {...register("password", { 
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                  })}
                />
              </div>
              {errors.password?.type === "required" && <span className="text-red-400 text-xs ml-1">Password is required</span>}
              {errors.password?.type === "minLength" && <span className="text-red-400 text-xs ml-1">Must be at least 6 characters</span>}
              {errors.password?.type === "pattern" && <span className="text-red-400 text-xs ml-1">Must contain uppercase, lowercase, number & special char</span>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all"
                  {...register("confirmPassword", { 
                    required: true,
                    validate: (val) => {
                      if (watch('password') != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
              </div>
              {errors.confirmPassword && <span className="text-red-400 text-xs ml-1">{errors.confirmPassword.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-primary-gradient font-bold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5 mt-4"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-6">
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

          <p className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
              Sign In
            </Link>
          </p>
        </div>

        {/* Animation Side */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8 order-1 lg:order-2">
          <div className="w-full max-w-md">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
          <h2 className="text-3xl font-bold mt-8 text-center">
            Join <span className="text-gradient">BloodAid</span>
          </h2>
          <p className="text-gray-400 text-center mt-4 max-w-sm">
            Become a part of our community. Donate blood, save lives, and make a difference today.
          </p>
        </div>
      </div>
    </div>
  );
}