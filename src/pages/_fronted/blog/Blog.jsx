import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/axiosPublic";
import Loading from "../home/Loading";
import { Link } from "react-router";

const categories = ["All", "Blog", "Story", "Success"];

export default function Blog() {
  const axiosPublic = useAxiosPublic();
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Fetch all published blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/blogs?status=published");
      return data;
    },
  });

  // Filter by category
  const filteredBlogs =
    category === "All"
      ? blogs
      : blogs.filter((b) => b.category === category);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / pageSize);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (isLoading) return <Loading></Loading>

  return (
    <div className="min-h-screen w-full pt-28 pb-12 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Top Banner */} 
        <div className="glass-panel rounded-3xl p-8 md:p-12 mb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            BloodAid <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover stories, tips, and news from our amazing blood donation community. Stay informed and inspired!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                category === cat
                  ? "btn-primary-gradient shadow-lg shadow-purple-500/25"
                  : "glass-panel hover:bg-white/10 text-gray-300"
              }`}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="glass-panel rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {blog.category && (
                      <span className="px-2 py-1 rounded bg-purple-500/80 text-white text-xs font-bold backdrop-blur-sm">
                        {blog.category}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2 text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                    {blog.content.replace(/<[^>]*>?/gm, '').slice(0, 100)}...
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2">
                      {blog.authorPhoto ? (
                        <img
                          src={blog.authorPhoto}
                          alt="Author"
                          className="w-6 h-6 rounded-full border border-white/10"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-400">
                          {blog.author?.[0] || 'A'}
                        </div>
                      )}
                      <span className="text-xs text-gray-500 truncate max-w-[100px]">{blog.author}</span>
                    </div>
                    <span className="text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read More <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full glass-panel p-12 rounded-2xl text-center text-gray-400">
              No blogs found in this category.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-2 rounded-full glass-panel hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              &lt; Back
            </button>
            <span className="px-4 py-2 font-bold text-white flex items-center">
              {page} <span className="text-gray-500 mx-2">/</span> {totalPages}
            </span>
            <button
              className="px-6 py-2 rounded-full glass-panel hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}