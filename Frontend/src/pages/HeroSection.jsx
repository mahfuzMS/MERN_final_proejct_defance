import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiUsers, FiEdit } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import FeaturedPosts from "../components/BlogSection";

const HeroSection = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const stats = [
    { icon: FiBookOpen, value: "5K+", label: "Articles" },
    { icon: FiUsers, value: "10K+", label: "Readers" },
    { icon: FiEdit, value: "100+", label: "Writers" },
  ];

  return (
    <>
      {" "}
      <section
        className={`relative min-h-screen flex items-center pt-20 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text Content */}
            <div className="space-y-8">
              <motion.h1
                variants={itemVariants}
                className={`text-5xl md:text-6xl font-bold leading-tight ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              >
                Discover & Share
                <span
                  className={`block mt-3 ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Amazing Stories
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`text-xl md:text-2xl ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Explore thousands of thought-provoking articles from creative
                minds around the world.
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-8 py-4 rounded-full flex items-center gap-2 text-lg hover:bg-purple-700 transition-colors"
                >
                  Start Reading
                  <FiArrowRight className="mt-1" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full text-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Write Article
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 pt-8"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${
                      isDark ? "bg-gray-800" : "bg-white"
                    } shadow-lg`}
                  >
                    <stat.icon
                      className={`w-8 h-8 mb-2 ${
                        isDark ? "text-purple-400" : "text-purple-600"
                      }`}
                    />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Featured Posts */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 lg:gap-6"
            >
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -5 }}
                  className={`relative group ${
                    item === 1 ? "col-span-2" : "col-span-1"
                  } rounded-2xl overflow-hidden shadow-xl`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDark
                        ? "from-gray-900 via-gray-900/70"
                        : "from-gray-900 via-gray-900/50"
                    } z-10`}
                  />

                  <img
                    src={`https://picsum.photos/400/250?ai-content=${item}`}
                    alt="Featured post"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDark
                          ? "bg-purple-400/20 text-purple-400"
                          : "bg-purple-600/20 text-purple-600"
                      }`}
                    >
                      Category
                    </span>
                    <h3
                      className={`mt-2 text-xl font-semibold ${
                        isDark ? "text-gray-100" : "text-white"
                      }`}
                    >
                      Featured Post Title
                    </h3>
                    <div
                      className={`flex items-center mt-2 ${
                        isDark ? "text-gray-400" : "text-gray-200"
                      }`}
                    >
                      <span className="text-sm">John Doe</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">May 25, 2024</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div
          className={`absolute inset-0 -z-10 ${
            isDark ? "opacity-10" : "opacity-5"
          }`}
        >
          <div className="w-full h-full pattern-dots pattern-purple-500 pattern-size-6 pattern-opacity-20" />
        </div>
      </section>
      <FeaturedPosts />
    </>
  );
};

export default HeroSection;
