/* eslint-disable no-undef */
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock , FiLoader, FiUserPlus } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { FaFemale, FaMale } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, gender }) // Properly merge objects
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }
      navigate('/verify-email');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} relative overflow-hidden`}>
      {/* Decorative Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        <div className={`absolute w-72 h-72 rounded-full blur-3xl ${
          isDark ? 'bg-purple-900' : 'bg-purple-200'
        } top-20 left-20`} />
        <div className={`absolute w-72 h-72 rounded-full blur-3xl ${
          isDark ? 'bg-blue-900' : 'bg-blue-200'
        } bottom-20 right-20`} />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md mt-10 px-4 py-8"
      >
        <motion.div
          variants={itemVariants}
          className={`rounded-3xl shadow-xl p-8 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <motion.h1 
              className={`text-4xl font-bold mb-2 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}
            >
              Join Us
            </motion.h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Create your free account
            </p>
          </div>

          {/* Form */}
          <motion.form variants={containerVariants} onSubmit={handleSubmit} className="space-y-6 ">
            {/* Name Input */}
            <motion.div variants={itemVariants}>
              <div className={`flex items-center p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <FiUser className={`mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-transparent outline-none ${
                    isDark ? 'text-white placeholder-gray-400' : 'text-gray-900'
                  }`}
                />
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <div className={`flex items-center p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <FiMail className={`mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email Address"
                  className={`w-full bg-transparent outline-none ${
                    isDark ? 'text-white placeholder-gray-400' : 'text-gray-900'
                  }`}
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <div className={`flex items-center p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <FiLock className={`mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password"
                  className={`w-full bg-transparent outline-none ${
                    isDark ? 'text-white placeholder-gray-400' : 'text-gray-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`ml-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </motion.div>

            {/* Gender input checkbox */}
            <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 gap-4"
        >
          <label
            className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors
              ${gender === 'male' ? 'bg-blue-500 text-white border-blue-500' : 
                'dark:bg-gray-700 dark:border-gray-600 dark:text-white'}`}
          >
            <input
              type="radio"
              name="gender"
              value="male"
              className="hidden"
              onChange={(e) => setGender(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <FaMale className="inline-block" />
              <span>Male</span>
            </div>
          </label>

          <label
            className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors
              ${gender === 'female' ? 'bg-pink-500 text-white border-pink-500' : 
                'dark:bg-gray-700 dark:border-gray-600 dark:text-white'}`}
          >
            <input
              type="radio"
              name="gender"
              value="female"
              className="hidden"
              onChange={(e) => setGender(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <FaFemale className="inline-block" />
              <span>Female</span>
            </div>
          </label>
        </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 flex items-center justify-center rounded-xl font-semibold transition-colors ${
                isDark 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
              }`}
            >
              {loading ? <FiLoader className="animate-spin" /> : <FiUserPlus />}Create Account
            </motion.button>
          </motion.form>

          {/* Login Link */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-6"
          >
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <a 
                href="/login" 
                className={`font-semibold hover:underline ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}
              >
                Log in
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;