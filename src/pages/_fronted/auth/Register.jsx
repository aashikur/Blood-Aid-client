import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { toast } from "react-hot-toast";
import { UserPlus, Mail, Lock, User, MapPin, Droplet, Image as ImageIcon } from "lucide-react";
import bloodDonar from "../../../assets/lottie/blood-donar.json";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/axiosPublic";
import useDistrictUpazila from "../../../hooks/useDistrictUpazila";

const Register = () => {
  const { createUser, updateUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { districts, upazilas, handleDistrictChange } = useDistrictUpazila();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 1. Create User
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // 2. Update Profile
      await updateUser(data.name, data.photoURL);

      // 3. Save to Database
      const userInfo = {
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        status: "active",
        role: "donor", // Default role
        image: data.photoURL
      };

      await axiosPublic.post("/users", userInfo);
      
      toast.success("Registration Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen w-full pt-28 pb-12 relative flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Animation */}
          <div className="hidden lg:block relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10" />
            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <Lottie animationData={bloodDonar} loop={true} />
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-bl from-red-500/10 to-purple-500/10 rounded-3xl blur-xl -z-10" />
            
            <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Join Blood Aid
                </h2>
                <p className="text-gray-400">Become a donor and save lives</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                      </div>
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-100 placeholder-gray-500 transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                      </div>
                      <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-100 placeholder-gray-500 transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Blood Group Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                      </div>
                      <input
                        type="password"
                        {...register("password", { 
                          required: "Password is required",
                          minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-100 placeholder-gray-500 transition-all outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Blood Group</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Droplet className="h-5 w-5 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                      </div>
                      <select
                        {...register("bloodGroup", { required: "Blood Group is required" })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-100 transition-all outline-none appearance-none"
                      >
                        <option value="">Select Group</option>
                        {bloodGroups.map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* District & Upazila Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">District</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                      </div>
                      <select
                        {...register("district", { 
                          required: "District is required",
                          onChange: (e) => handleDistrictChange(e.target.value)
                        })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-100 transition-all outline-none appearance-none"
                      >
                        <option value="">Select District</option>
                        {districts.map(dist => (
                          <option key={dist.id} value={dist.id}>{dist.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Upazila</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                      </div>
                      <select
                        {...register("upazila", { required: "Upazila is required" })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-100 transition-all outline-none appearance-none"
                      >
                        <option value="">Select Upazila</option>
                        {upazilas.map(upz => (
                          <option key={upz.id} value={upz.id}>{upz.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Photo URL</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-5 w-5 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                    </div>
                    <input
                      {...register("photoURL", { required: "Photo URL is required" })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-100 placeholder-gray-500 transition-all outline-none"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
