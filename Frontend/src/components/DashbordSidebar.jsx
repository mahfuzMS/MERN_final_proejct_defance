import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiFileText,
  FiBarChart,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { motion } from 'framer-motion';
const DashbordSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const [activeTab, setActiveTab] = useState("dashboard");
  const { isDark } = useTheme();

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: -250 },
  };

  return (
    <div className="mt-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`md:hidden fixed top-20 left-4 z-50 p-2 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.nav
        variants={sidebarVariants}
        animate={isSidebarOpen ? "open" : "closed"}
        className={`fixed mt- h-full w-64 p-6 transform ${
          isDark ? "bg-gray-800" : "bg-white"
        } shadow-xl md:shadow-none md:relative rounded-r-md md:translate-x-0 z-40 md:mt-0 transition-transform duration-300 ease-in-out`}
      >


        <div className="space-y-4">
          {[
            { id: "dashboard", label: "Dashboard", icon: FiBarChart },
            { id: "posts", label: "My Posts", icon: FiFileText },
            { id: "analytics", label: "Analytics", icon: FiBarChart },
            { id: "settings", label: "Settings", icon: FiSettings },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? isDark
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-600"
                  : isDark
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <item.icon className="mr-3" />
              {item.label}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 5 }}
          className="w-full flex items-center p-3 rounded-lg mt-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <FiLogOut className="mr-3" />
          Logout
        </motion.button>
      </motion.nav>
    </div>
  );
};

export default DashbordSidebar;
