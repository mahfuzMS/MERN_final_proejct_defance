import { motion } from "framer-motion";
import {
  FiFileText,
  FiBarChart,
  FiUsers,
  FiEdit,
  FiEye,
  FiTrash,
  FiGitCommit,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import DashbordSidebar from "../components/DashbordSidebar";
import { useState } from "react";
import { FaComments } from "react-icons/fa";

const Dashboard = () => {
  const { isDark } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats = [
    {
      title: "Total Posts",
      value: "45",
      icon: FiFileText,
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Total Like",
      value: "12.3K",
      icon: FiBarChart,
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Total Comments",
      value: "2.1K",
      icon: FaComments,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
  ];

  const recentPosts = [
    {
      title: "The Future of Web Development",
      views: "1.2K",
      comments: "45",
      status: "Published",
    },
    {
      title: "Mastering React Hooks",
      views: "890",
      comments: "32",
      status: "Draft",
    },
    {
      title: "UI Design Principles",
      views: "2.3K",
      comments: "89",
      status: "Published",
    },
  ];

  const activities = [
    { time: "10 min ago", action: "You published a new post" },
    { time: "2 hours ago", action: "John commented on your post" },
    { time: "4 hours ago", action: "You updated profile settings" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen  ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="flex">
        {/* Sidebar */}
        <DashbordSidebar  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        <div className="w-full p-6 mt-16">
          {" "}
          {/* Stats Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-8 mt-22"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-xl ${stat.color} ${
                  isDark ? "dark:bg-gray-700" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-sm ${stat.textColor}`}>{stat.title}</p>
                    <p
                      className={`text-3xl font-bold ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon
                    className={`w-12 h-12 ${stat.textColor} opacity-50`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Recent Posts Table */}
          <motion.div
            className={`rounded-xl shadow-sm ${
              isDark ? "bg-gray-800" : "bg-white"
            } p-6 mb-8`}
            variants={itemVariants}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Recent Posts
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`text-left ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <th className="pb-4">Title</th>
                    <th className="pb-4">Views</th>
                    <th className="pb-4">Comments</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post, index) => (
                    <tr
                      key={index}
                      className={`border-t ${
                        isDark ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <td
                        className={`py-4 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {post.title}
                      </td>
                      <td
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {post.views}
                      </td>
                      <td
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {post.comments}
                      </td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            post.status === "Published"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <FiEdit
                              className={`${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <FiEye
                              className={`${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <FiTrash className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          {/* Recent Activity */}
          <motion.div
            className={`rounded-xl shadow-sm ${
              isDark ? "bg-gray-800" : "bg-white"
            } p-6`}
            variants={itemVariants}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Recent Activity
            </h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg ${
                    isDark ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full mr-4 ${
                      isDark ? "bg-purple-400" : "bg-purple-600"
                    }`}
                  />
                  <div>
                    <p
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {activity.action}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
