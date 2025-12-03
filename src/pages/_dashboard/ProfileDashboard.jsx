import { useContext, useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaCamera, FaUser, FaEnvelope, FaTint, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDistrictUpazila from "@/hooks/useDistrictUpazila";
import useRole from "@/hooks/useRole";
import Loading from "@/pages/_fronted/home/Loading";

const ProfileDashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { bloodGroups, districts, getUpazilasByDistrict } = useDistrictUpazila();
  const { role, status } = useRole();

  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  useEffect(() => {
    if (user?.email && !edit) {
      axiosSecure.get(`/get-user-by-email?email=${user.email}`).then(res => {
        setProfile(res.data);
        setForm({
          name: res.data?.name || user.displayName || "",
          email: res.data?.email || user.email || "",
          avatar: res.data?.photoURL || user.photoURL || "",
          bloodGroup: res.data?.bloodGroup || "",
          district: res.data?.district || "",
          upazila: res.data?.upazila || "",
        });
      });
    }
  }, [user, axiosSecure, edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "district" ? { upazila: "" } : {}),
    }));
  };

  const handleFileChange = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY || "dff59569a81c30696775e74f040e20bb";
    const formData = new FormData();
    formData.append("image", imageFile);

    setLoading(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, avatar: data.data.url }));
        Swal.fire({
            title: "Uploaded!",
            text: "Image uploaded successfully.",
            icon: "success",
            background: "#131320",
            color: "#fff",
            confirmButtonColor: "#9333ea"
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Image upload failed!",
        icon: "error",
        background: "#131320",
        color: "#fff"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setEdit(true);

  const handleCancel = () => {
    setForm({
      name: profile?.name || user.displayName || "",
      email: profile?.email || user.email || "",
      avatar: profile?.photoURL || user.photoURL || "",
      bloodGroup: profile?.bloodGroup || "",
      district: profile?.district || "",
      upazila: profile?.upazila || "",
    });
    setEdit(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser({
        displayName: form.name,
        photoURL: form.avatar,
      });
      await axiosSecure.patch("/update-user", {
        name: form.name,
        photoURL: form.avatar,
        bloodGroup: form.bloodGroup,
        district: form.district,
        upazila: form.upazila,
      });
      setEdit(false);
      const res = await axiosSecure.get(`/get-user-by-email?email=${user.email}`);
      setProfile(res.data);
      setForm({
        name: res.data?.name || user.displayName || "",
        email: res.data?.email || user.email || "",
        avatar: res.data?.photoURL || user.photoURL || "",
        bloodGroup: res.data?.bloodGroup || "",
        district: res.data?.district || "",
        upazila: res.data?.upazila || "",
      });
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully.",
        icon: "success",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#9333ea"
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile.",
        icon: "error",
        background: "#131320",
        color: "#fff"
      });
    }
    setLoading(false);
  };

  const upazilaOptions = getUpazilasByDistrict(form.district);

  if (!profile) return <Loading />;

  // Styles
  const inputClasses = `w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all ${!edit ? 'opacity-60 cursor-not-allowed' : ''}`;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-gray-400 text-sm">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-[#131320]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-600/20 to-transparent -z-10"></div>

            {/* Avatar */}
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-purple-500 to-pink-500">
                <img
                  src={form?.avatar || "/logo/icon-2.png"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-[#131320]"
                />
              </div>
              {edit && (
                <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white cursor-pointer hover:bg-purple-700 transition-colors shadow-lg">
                  <FaCamera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{form.name || "User Name"}</h2>
            <p className="text-gray-400 text-sm mb-6">{form.email}</p>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                {role || "User"}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border uppercase ${status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {status || "Active"}
              </span>
            </div>

            {!edit ? (
              <button
                onClick={handleEdit}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-2"
              >
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <span className="loading loading-spinner loading-xs"></span> : <FaSave />} Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#131320]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full block"></span>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!edit}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    disabled
                    className={`${inputClasses} opacity-50`}
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 ml-1">Blood Group</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <FaTint />
                  </div>
                  <select
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    disabled={!edit}
                    className={inputClasses}
                  >
                    <option value="" className="bg-[#131320]">Select Group</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg} className="bg-[#131320]">{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 ml-1">District</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <FaMapMarkerAlt />
                  </div>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    disabled={!edit}
                    className={inputClasses}
                  >
                    <option value="" className="bg-[#131320]">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.name} className="bg-[#131320]">{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 ml-1">Upazila</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <FaMapMarkerAlt />
                  </div>
                  <select
                    name="upazila"
                    value={form.upazila}
                    onChange={handleChange}
                    disabled={!edit}
                    className={inputClasses}
                  >
                    <option value="" className="bg-[#131320]">Select Upazila</option>
                    {upazilaOptions.map((u) => (
                      <option key={u.id} value={u.name} className="bg-[#131320]">{u.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;