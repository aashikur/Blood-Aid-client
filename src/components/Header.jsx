import { Link, NavLink } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Donation Requests", path: "/donation-requests" },
  { name: "Blog", path: "/blog" },
  { name: "Urgent", path: "/urgent" },
  { name: "Funding", path: "/funding" },
];

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8">
             <img src="/logo/icon-2.png" alt="BloodAid" className="w-full h-full object-contain" />
             <div className="absolute inset-0 bg-purple-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Blood<span className="text-gradient">Aid</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 hover:text-purple-400 ${
                  isActive ? "text-purple-400" : "text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 group">
                <img 
                  src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                  alt="User" 
                  className="w-9 h-9 rounded-full border-2 border-purple-500/50 group-hover:border-purple-500 transition-all"
                />
              </Link>
              <button 
                onClick={logOut}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn-primary-gradient px-5 py-2 rounded-full text-sm font-semibold"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-nav border-t border-white/10 p-6 flex flex-col gap-4 md:hidden animate-fade-in">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? "text-purple-400" : "text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="h-px bg-white/10 my-2"></div>
          {user ? (
             <>
                <Link to="/dashboard" className="text-lg font-medium text-gray-300">Dashboard</Link>
                <button onClick={logOut} className="text-lg font-medium text-left text-gray-300">Logout</button>
             </>
          ) : (
            <>
              <Link to="/login" className="text-lg font-medium text-gray-300">Login</Link>
              <Link to="/register" className="btn-primary-gradient text-center py-2 rounded-lg">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;