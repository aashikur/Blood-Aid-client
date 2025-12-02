import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";

export default function BlogHighlights() {
  const [state, setState] = useState({
    loading: true,
    error: null,
    posts: [],
  });

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    let active = true;

    const fetchPosts = async () => {
      try {
        const { data } = await axiosPublic.get("/blogs");
        if (active) {
          const publishedPosts = (Array.isArray(data) ? data : [])
            .filter(post => post.status === 'published')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3); // Only show top 3 on home

          setState({
            loading: false,
            error: null,
            posts: publishedPosts,
          });
        }
      } catch (err) {
        if (active) {
          setState({
            loading: false,
            error: "Failed to load blog posts.",
            posts: [],
          });
        }
      }
    };

    fetchPosts();
    return () => { active = false; };
  }, [axiosPublic]);

  return (
    <section className="w-full py-20 relative">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider">
            Insights & Stories
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold">
            Latest from our <span className="text-gradient">Blog</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Education, community stories, and updates from the BloodAid team.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="w-full">
          {state.loading ? (
            <SkeletonGrid />
          ) : state.error ? (
            <div className="glass-panel p-6 rounded-xl text-center text-red-400 border border-red-500/30 bg-red-500/10">
              <span>{state.error}</span>
            </div>
          ) : state.posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl text-center text-gray-400">
              No blog posts have been published yet. Please check back soon!
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
            <Link to="/blog" className="btn-primary-gradient px-8 py-3 rounded-full font-bold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all">
                View All Posts
            </Link>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post._id}`}
      className="group glass-panel rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-800 relative">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50 text-white/20">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-4 left-4 right-4">
            <span className="px-2 py-1 rounded bg-purple-500/80 text-white text-xs font-bold backdrop-blur-sm">
                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {post.title}
        </h3>
        <div 
            className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow"
            dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 150) + "..." }} 
        />
        <div className="flex items-center text-purple-400 text-sm font-medium mt-auto">
            Read Article 
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </div>
      </div>
    </Link>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-panel rounded-2xl overflow-hidden h-96 animate-pulse">
          <div className="h-48 bg-white/5" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-white/5 rounded w-3/4" />
            <div className="space-y-2">
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}