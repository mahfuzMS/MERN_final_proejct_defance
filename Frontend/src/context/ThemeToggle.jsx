// ThemeToggle.jsx
import { FiSun, FiMoon } from 'react-icons/fi';

import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const iconVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 rounded-full bg-opacity-10 backdrop-blur-lg shadow-lg dark:bg-gray-700 bg-gray-200"
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        variants={iconVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
      >
        {isDark ? (
          <FiSun className="w-6 h-6 text-yellow-400" />
        ) : (
          <FiMoon className="w-6 h-6 text-blue-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;