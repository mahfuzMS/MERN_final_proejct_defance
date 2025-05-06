import { FiClock, FiUser, FiHeart, FiThumbsDown, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PostCard = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
                 hover:shadow-xl transition-shadow duration-300 group"
    >
      {/* Feature Image */}
      {post.featureImage && (
        <img 
          src={post.featureImage} 
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <div className="p-6">
        {/* Category Badge */}
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                         text-sm px-3 py-1 rounded-full mb-4">
          {post.catagory}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 
                      dark:hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        {/* Content Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.content}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FiUser className="flex-shrink-0" />
            <span>{post.author.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <FiClock />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <FiClock />
            <span>{post.readTime} read</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-sm"
              >
                <FiTag className="text-xs" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Like/Dislike Section */}
        <div className="mt-4 flex items-center gap-4 border-t pt-4 border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <button className="hover:text-red-500 transition-colors">
              <FiHeart className="w-5 h-5" />
            </button>
            <span>{post.likes.length}</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <button className="hover:text-blue-500 transition-colors">
              <FiThumbsDown className="w-5 h-5" />
            </button>
            <span>{post.dislikes.length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;