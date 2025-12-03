import { useState, useContext, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaPlus, FaEdit, FaTrash, FaBook, FaEllipsisV, FaRegEdit, FaUser, FaEye } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";
import FilterBar from "@/components/dashboard/shared/FilterBar";
import Pagination from "@/components/dashboard/shared/Pagination";

export default function ManageBlogs() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { role } = useRole();
  const { user } = useContext(AuthContext);

  // --- State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Data Fetching ---
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/blogs");
      return data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/get-users");
      return data;
    },
  });

  // --- Filtering Logic ---
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const term = searchTerm.toLowerCase();
        return (
          blog.title?.toLowerCase().includes(term) ||
          blog.author?.toLowerCase().includes(term)
        );
      })
      .filter((blog) =>
        statusFilter === "all" ? true : blog.status === statusFilter
      );
  }, [blogs, searchTerm, statusFilter]);

  // --- Pagination Logic ---
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  // --- Handlers ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this blog?",
      icon: "warning",
      background: "#131320",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/blogs/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Blog deleted.",
            icon: "success",
            background: "#131320",
            color: "#fff",
            confirmButtonColor: "#9333ea"
          });
          queryClient.invalidateQueries(["all-blogs"]);
        });
      }
    });
  };

  const handlePublish = (id, status) => {
    Swal.fire({
      title: status === "published" ? "Unpublish this blog?" : "Publish this blog?",
      icon: "question",
      background: "#131320",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      confirmButtonText: status === "published" ? "Unpublish" : "Publish",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/blogs/${id}/publish`, { status: status === "published" ? "draft" : "published" })
          .then(() => {
            queryClient.invalidateQueries(["all-blogs"]);
            Swal.fire({
              title: "Success!",
              text: `Blog ${status === "published" ? "unpublished" : "published"}!`,
              icon: "success",
              background: "#131320",
              color: "#fff",
              confirmButtonColor: "#9333ea"
            });
          });
      }
    });
  };

  // --- Stats ---
  const myBlogsCount = blogs.filter((b) => b.authorEmail === user?.email).length;
  const totalBlogs = blogs.length;
  const totalUsers = users.length;

  const filterOptions = [
    {
      value: statusFilter,
      onChange: (e) => setStatusFilter(e.target.value),
      options: [
        { value: "all", label: "All Status" },
        { value: "draft", label: "Draft" },
        { value: "published", label: "Published" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Manage Blogs</h1>
        <p className="text-gray-400 text-sm">Create, edit, and manage blog posts.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          icon={<FaBook className="text-2xl" />}
          label="My Blogs"
          value={myBlogsCount}
          gradient="from-pink-500 to-rose-600"
        />
        <SummaryCard
          icon={<FaBook className="text-2xl" />}
          label="Total Blogs"
          value={totalBlogs}
          gradient="from-blue-500 to-purple-600"
        />
        <SummaryCard
          icon={<FaUser className="text-2xl" />}
          label="Total Users"
          value={totalUsers}
          gradient="from-emerald-400 to-teal-600"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/dashboard/add-blog")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          <FaPlus /> Add New Blog
        </button>
      </div>

      {/* Filters */}
      <FilterBar 
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
        filters={filterOptions}
      />

      {/* Table Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-purple-500"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th className="p-4 font-medium">#</th>
                  <th className="p-4 font-medium">Blog Info</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedBlogs.length > 0 ? (
                  paginatedBlogs.map((blog, idx) => (
                    <tr key={blog._id} className="group border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-gray-500 font-mono text-xs">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={blog.thumbnail}
                            alt="Thumbnail"
                            className="w-16 h-12 object-cover rounded-lg border border-white/10"
                          />
                          <div className="max-w-xs">
                            <p className="font-medium text-white truncate">{blog.title}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {blog.authorPhoto ? (
                            <img
                              src={blog.authorPhoto}
                              alt="Author"
                              className="w-6 h-6 rounded-full border border-white/10"
                            />
                          ) : (
                            <FaUser className="text-gray-500" />
                          )}
                          <span className="text-gray-300 text-xs">{blog.author}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                              ${blog.status === "published"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              }`}
                          >
                            {blog.status}
                          </span>
                          
                          {role === "admin" && (
                            <button
                              onClick={() => handlePublish(blog._id, blog.status)}
                              className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                              title={blog.status === "published" ? "Unpublish" : "Publish"}
                            >
                              <FaRegEdit size={12} />
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="dropdown dropdown-end dropdown-left">
                          <button tabIndex={0} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <FaEllipsisV size={14} />
                          </button>
                          <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow-xl shadow-black/50 bg-[#1A1A2E] border border-white/10 rounded-xl w-40 text-sm mt-2">
                            <li>
                              <button 
                                onClick={() => navigate(`/blogs/${blog._id}`)}
                                className="text-gray-300 hover:text-white hover:bg-white/5 rounded-lg py-2"
                              >
                                <FaEye className="mr-2" /> View
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => Swal.fire("Coming soon!", "Edit Blog feature coming soon.", "info")}
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg py-2"
                              >
                                <FaEdit className="mr-2" /> Edit
                              </button>
                            </li>
                            <div className="h-px bg-white/5 my-1"></div>
                            <li>
                              <button 
                                onClick={() => handleDelete(blog._id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg py-2"
                              >
                                <FaTrash className="mr-2" /> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No blogs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

// Summary Card Component
function SummaryCard({ icon, label, value, gradient }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
      {/* Decorative Gradient Blob */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-black/20 text-white`}>
          {icon}
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-gray-400 text-sm font-medium mb-1">{label}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}