import { motion } from "framer-motion";
import { FiClock, FiHeart, FiBookOpen, FiArrowRight } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import PostCard from "../pages/Blog";

const FeaturedPosts = () => {
  const { isDark } = useTheme();

  const posts = [
    {
      title: "The Future of Web Development",
      excerpt:
        "Discover the latest trends shaping modern web development and how to stay ahead in 2024.",
      category: "Technology",
      readTime: "8 min",
      likes: "1.2K",
      comments: "45",
    },
    // Add more posts as needed
  ];

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

  return (
    <section className={`py-16 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-purple-400" : "text-purple-600"
            }`}
          >
            Featured Stories
          </motion.h2>
          <p
            className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Discover our most popular and trending articles
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`group relative rounded-2xl overflow-hidden shadow-xl ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              {/* Image with Gradient Overlay */}
              <div className="relative h-60">
                <img
                  src={`https://source.unsplash.com/random/800x600?sig=${index}`}
                  alt="Post cover"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isDark
                      ? "from-gray-900 via-gray-900/70"
                      : "from-gray-900 via-gray-900/50"
                  }`}
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark
                        ? "bg-purple-400/20 text-purple-400"
                        : "bg-purple-600/20 text-purple-600"
                    }`}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {post.title}
                </h3>
                <p
                  className={`mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div
                  className={`flex justify-between items-center text-sm ${
                    isDark ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiClock className="inline-block" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <FiHeart className="inline-block" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBookOpen className="inline-block" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`mt-4 flex items-center gap-2 ${
                    isDark
                      ? "text-purple-400 hover:text-purple-300"
                      : "text-purple-600 hover:text-purple-500"
                  }`}
                >
                  Read More
                  <FiArrowRight className="inline-block" />
                </motion.button>
              </div>
            </motion.article>
          ))}

          <PostCard
            post={{
              title: "My First Blog Post",
              content: "Lorem ipsum dolor sit amet...",
              catagory: "Technology",
              author: { name: "John Doe" },
              createdAt: new Date(),
              readTime: "5 min",
              tags: ["webdev", "react"],
              likes: [1, 2, 3],
              dislikes: [1],
              featureImage: "https://picsum.photos/400/250?ai-content",
            }}
          />
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-full font-semibold transition-colors ${
              isDark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            View All Articles
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
