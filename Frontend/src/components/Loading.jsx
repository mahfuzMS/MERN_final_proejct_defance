import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="text-[150px]  text-purple-600 dark:text-purple-400"
      >
        <FiLoader className='animate-spin duration-1000'/>
      </motion.div>
    </div>
  );
};

export default Loading;