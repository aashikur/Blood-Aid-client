import { useState, useContext } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import { FaHeading, FaImage, FaPen, FaCloudUploadAlt, FaPaperPlane } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function AddBlogs() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    content: "",
    thumbnailFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnailFile") {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        thumbnailFile: file,
        thumbnail: "", // reset url input if file selected
      }));
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else if (name === "thumbnail") {
        setForm((prev) => ({ ...prev, [name]: value, thumbnailFile: null }));
        setPreviewUrl(value);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // imgbb upload function
  async function uploadImageToImgbb(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await fetch(image_hosting_api, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let thumbnailUrl = form.thumbnail;
    // If file selected, upload to imgbb
    if (form.thumbnailFile) {
      try {
        thumbnailUrl = await uploadImageToImgbb(form.thumbnailFile);
      } catch {
        Swal.fire({
            title: "Error!",
            text: "Image upload failed. Please check your API key.",
            icon: "error",
            background: "#131320",
            color: "#fff"
        });
        setLoading(false);
        return;
      }
    }

    const blogData = {
      title: form.title,
      thumbnail: thumbnailUrl,
      content: form.content,
      author: user?.displayName || user?.email || "Unknown",
      authorEmail: user?.email,
      authorPhoto: user?.photoURL || "",
      status: "draft",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/blogs", blogData);
      Swal.fire({
        title: "Success!",
        text: "Blog added as draft.",
        icon: "success",
        background: "#131320",
        color: "#fff",
        confirmButtonColor: "#9333ea"
      });
      setForm({ title: "", thumbnail: "", content: "", thumbnailFile: null });
      setPreviewUrl("");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add blog.",
        icon: "error",
        background: "#131320",
        color: "#fff"
      });
    }
    setLoading(false);
  };

  // Styles
  const inputClasses = "w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all";

  return (
    <div className="max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Blog</h1>
            <p className="text-gray-400">Share your thoughts and updates with the community.</p>
        </div>

        <div className="bg-[#131320]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
             {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Blog Title</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                            <FaHeading />
                        </div>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter an engaging title..."
                            className={inputClasses}
                        />
                    </div>
                </div>

                {/* Thumbnail Section */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Thumbnail Image</label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* File Upload */}
                        <div className="relative group">
                            <input
                                type="file"
                                name="thumbnailFile"
                                accept="image/*"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="bg-[#0B0B15] border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 group-hover:border-purple-500 group-hover:text-purple-400 transition-all h-full">
                                <FaCloudUploadAlt className="text-3xl mb-2" />
                                <span className="text-sm font-medium">Click to upload image</span>
                                <span className="text-xs text-gray-600 mt-1">JPG, PNG up to 5MB</span>
                            </div>
                        </div>

                        {/* URL Input */}
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                    <FaImage />
                                </div>
                                <input
                                    type="text"
                                    name="thumbnail"
                                    value={form.thumbnail}
                                    onChange={handleChange}
                                    placeholder="Or paste image URL..."
                                    className={inputClasses}
                                />
                            </div>
                            
                            {/* Preview Area */}
                            <div className="flex-1 bg-[#0B0B15] border border-white/10 rounded-xl overflow-hidden relative min-h-[120px] flex items-center justify-center">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                                ) : (
                                    <span className="text-xs text-gray-600">Image preview</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Content</label>
                    <div className="relative">
                        <div className="absolute top-4 left-4 pointer-events-none text-gray-500">
                            <FaPen />
                        </div>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            required
                            rows={8}
                            placeholder="Write your story here..."
                            className="w-full bg-[#0B0B15] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/40"}
                        alt="Author"
                        className="w-10 h-10 rounded-full border border-white/10"
                    />
                    <div>
                        <p className="text-sm font-bold text-white">Posting as</p>
                        <p className="text-xs text-gray-400">{user?.displayName || user?.email}</p>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative group overflow-hidden rounded-xl p-[1px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-[#131320] group-hover:bg-transparent transition-colors duration-300 rounded-xl px-6 py-3 flex items-center justify-center gap-2">
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm text-white"></span>
                                <span className="font-bold text-white">Publishing...</span>
                            </>
                        ) : (
                            <>
                                <span className="font-bold text-white">Create Blog Post</span>
                                <FaPaperPlane className="text-white group-hover:translate-x-1 transition-all" />
                            </>
                        )}
                    </div>
                </button>
            </form>
        </div>
    </div>
  );
}