import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import UseAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Services",
      path: "/services",
      subLinks: ["Web Design", "Development", "SEO"],
    },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const { user } = UseAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const profileMenuVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav
      className={`fixed w-full h-[80px] z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-lg bg-white/90 dark:bg-gray-900/90"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <span
              className={`text-2xl font-bold ${
                isDark ? "text-purple-400" : "text-purple-600"
              }`}
            >
              BlogApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    activeLink === link.name.toLowerCase()
                      ? "bg-purple-500 text-white"
                      : isDark
                      ? "text-gray-300 hover:text-white hover:bg-violet-500"
                      : "text-gray-600 hover:bg-violet-300 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                  {link.subLinks && <FiChevronDown className="ml-1" />}
                </Link>

                {link.subLinks && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 mt-1 hidden group-hover:block"
                  >
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink}
                        to={`/services/${subLink
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        {subLink}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>

            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full p-2"
                >
                  <FiUser className="w-6 h-6" />
                  <span className="hidden lg:block">
                    {user?.name || "John Doe"}
                  </span>
                  <FiChevronDown className="hidden lg:block" />
                </motion.button>

                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      variants={profileMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={`absolute top-full right-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 mt-1 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {user?.role === "admin" ? (
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Admin Panel
                        </Link>
                      ) : (
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Profile
                        </Link>
                      )}
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to={"/login"}
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <FiUser className="mr-2" />
                Login
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden pb-4"
            >
              <div className="pt-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => {
                      setActiveLink(link.name.toLowerCase());
                      setIsOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-lg ${
                      activeLink === link.name.toLowerCase()
                        ? "bg-purple-500 text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
