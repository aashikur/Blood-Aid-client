import { Link, NavLink } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { FaTachometerAlt, FaSignOutAlt, FaUserCircle, FaRegListAlt, FaBlog, FaDonate, FaSignInAlt, FaUserPlus, FaUser, FaTimes, FaSms } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import ToggleLightDark from "./ui/ToggleLightDark";
import TopNotice from "./home/TopNotice";
import { CiMenuFries } from "react-icons/ci";
import Swal from "sweetalert2";
import { FaDownLeftAndUpRightToCenter, FaPersonRifle } from "react-icons/fa6";
import { BiBell, BiNotificationOff, BiParty } from "react-icons/bi";
import { BsPersonFillExclamation } from "react-icons/bs";

const navItems = [
  { name: "Home", path: "/", icon: <HiHome /> },
  { name: "Donation Requests", path: "/donation-requests", icon: <FaRegListAlt /> },
  { name: "Blog", path: "/blog", icon: <FaBlog /> },
  { name: "Urgent", path: "/urgent", icon: <FaDownLeftAndUpRightToCenter /> },
  { name: "Drive", path: "/drives", icon: <BiParty /> },
  { name: "About", path: "/about", icon: <BiParty /> },
  { name: "Hospitals", path: "/hospitals", icon: <BiParty /> },
];

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close dropdown on outside click (for mobile)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest("#mobileMenu") && !e.target.closest("#mobileMenuBtn")) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  return (
    <>
      <TopNotice />
      <nav className="sticky top-0 z-[9999] w-full flex justify-center bg-white/80 dark:bg-[#18122B]/80 backdrop-blur-md border-b border-white/30 dark:border-gray-500/30 shadow-lg">
        <div className="max-w-[1500px] w-full flex items-center px-6 py-2 ">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-6 ">
            <img src="/logo/icon-2.png" alt="BloodAid Logo" className="h-8" /> <span className="-ml-1.5 mt-1 text-lg">Blood<span className="font-bold text-red-700">Aid</span></span>
          </Link>
          {/* Mobile Menu Icon */}
          <span className="sm:hidden inline-block w-10 mx-auto ">
                {user?.photoURL ? (
            <img onClick={() => setMobileMenuOpen(true)} className="opacity-80 w-7 h-7 border-red-700  rounded-full" src={user.photoURL} alt="" />
          ) : (
            <FaUserCircle  onClick={() => setMobileMenuOpen(true)}  className="text-2xl" />
          )}
          </span>

          {/* Nav Items (Desktop) */}
          <div className="hidden flex-1 sm:flex items-center gap-2 relative sm:ml-20">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative z-10 flex items-center gap-2 px-4 py-2 font-medium transition ${isActive
                    ? "bg-[#FDEDF3] dark:bg-red-700/90 rounded-full text-red-800 dark:text-white"
                    : "text-gray-700 dark:text-gray-200"
                  }`
                }
              >
                {item.icon}
                <span className="hidden lg:inline"> {item.name}</span>
              </NavLink>
            ))}
          
              <NavLink
                to="/funding"
         className={({ isActive }) =>
                  `relative z-10 flex items-center gap-2 px-4 py-2 font-medium transition ${isActive
                    ? "bg-[#FDEDF3] dark:bg-red-700/90 rounded-full text-red-800 dark:text-white"
                    : "text-gray-700 dark:text-gray-200"
                  }`
                }
              >
                <FaDonate />
                Funding
              </NavLink>
           
          </div>
          {/* Right side: Auth (Desktop) */}
          <div className="flex items-center gap-3 sm:ml-4 ml-auto ">
            <ToggleLightDark />
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hidden dark:text-white dark:hover:text-red-800 dark:border-white dark:border- sm:flex items-center gap-2 px-4 py-2 font-semibold rounded-full border-2 border-[#c30027] text-[#c30027] hover:bg-[#FDEDF3] transition ${isActive ? "bg-[#FDEDF3]" : ""
                    }`
                  }
                >
                  <FaSignInAlt />
                  Login
                </NavLink>
                <NavLink
                  to="/registration"
                  className={({ isActive }) =>
                    `hidden sm:flex items-center gap-2 px-4 py-2 font-semibold rounded-full bg-gradient-to-r from-red-700   to-red-500  text-white hover:bg-[#a80020] transition ${isActive ? "bg-[#a80020]" : ""
                    }`
                  }
                >
                  <FaUserPlus />
                  Register
                </NavLink>
              </>
            ) : (
              <div className="relative group hidden sm:block">
                <button
                  className="flex items-center gap-2 font-semibold rounded-full bg-[#FDEDF3] text-[#c30027] shadow hover:bg-[#c30027] hover:text-white transition"
                >
                  {user?.photoURL ? (
                    <img className="w-9 h-9  border-2 rounded-full" src={user.photoURL} alt="" />
                  ) : (
                    <FaUserCircle className="text-2xl" />
                  )}
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#393053] rounded-xl shadow-lg py-2 z-50 opacity-0 group-hover:opacity-100 pointer-events-auto transition">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-[#18122B] dark:text-white hover:bg-[#FDEDF3] dark:hover:bg-[#18122B] transition"
                  >
                    <FaTachometerAlt className="inline mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-[#18122B] dark:text-white hover:bg-[#FDEDF3] dark:hover:bg-[#18122B] transition"
                  >
                    <FaPersonRifle className="inline mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-[#18122B] dark:text-white hover:bg-[#FDEDF3] dark:hover:bg-[#18122B] transition"
                  >
                    <BiBell className="inline mr-2" />
                    Notifications
                  </Link>
                  <Link
                    to="/dashboard/contacts"
                    className="block px-4 py-2 text-[#18122B] dark:text-white hover:bg-[#FDEDF3] dark:hover:bg-[#18122B] transition"
                  >
                    <FaSms className="inline mr-2" />
                    Message
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-[#FDEDF3] dark:hover:bg-[#18122B] transition"
                    onClick={()=> {
                      logOut().then(() => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Logout Successful',
                          text: 'You have successfully logged out.',
                        })
                      })
                    }}
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}

          <button
            id="mobileMenuBtn"
            className="sm:hidden text-2xl ml-4"
            onClick={() => setMobileMenuOpen(true)}
          >
            <CiMenuFries />
          </button>
        </div>
      </nav>
      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div
          id="mobileMenu"
          className="fixed inset-0 z-[99999] bg-white dark:bg-[#18122B] flex flex-col items-center pt-10 px-4"
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-3xl text-[#c30027] font-bold"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          {/* Top: Profile or Login/Register */}
          <div className="flex flex-col items-center gap-2 mb-6">
            {user ? (
              <>
                {user?.photoURL ? (
                  <img className="w-16 h-16 border-2 rounded-full" src={user.photoURL} alt="" />
                ) : (
                  <FaUser className="w-16 h-16 text-[#c30027]" />
                )}
                <div className="text-lg font-bold text-[#c30027]">{user?.displayName || user?.email}</div>
              </>
            ) : (
              <div className="flex  gap-2">
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 font-semibold rounded-full border-2 border-[#c30027] text-[#c30027] hover:bg-[#FDEDF3] transition w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaSignInAlt />
                  Login
                </NavLink>
                <NavLink
                  to="/registration"
                  className="flex items-center gap-2 px-4 py-2 font-semibold rounded-full bg-[#c30027] text-white hover:bg-[#a80020] transition w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUserPlus />
                  Register
                </NavLink>
              </div>
            )}
          </div>
          {/* Dashboard/Profile (if logged in) */}
          {user && (
            <div className="flex flex-col gap-2 w-full max-w-xs mb-6">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-3 rounded-full font-medium text-[#c30027] hover:bg-[#FDEDF3] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaTachometerAlt /> Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-3 rounded-full font-medium text-[#c30027] hover:bg-[#FDEDF3] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser /> Profile
              </NavLink>
            </div>
          )}
          {/* Main Nav Links */}
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 px-4 py-3 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:bg-[#FDEDF3] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/funding"
                className="flex items-center gap-2 px-4 py-3 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:bg-[#FDEDF3] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaDonate />
                Funding
              </NavLink>
            )}
          </div>
          {/* Bottom: Logout */}
          {user && (
            <button
              className="mt-8 w-full max-w-xs flex items-center gap-2 px-4 py-3 rounded-full font-medium text-red-500 hover:bg-[#FDEDF3] transition"
              onClick={() => {
                logOut();
                Swal.fire({
                  icon: "success",
                  title: "Logout Successful",
                  text: "You have successfully logged out.",
                })
                setMobileMenuOpen(false);
              }}
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;