import { motion } from 'framer-motion';
import { FiMail, FiLock} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

//   login submit handler
const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Handle successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };


  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className={`min-h-screen relative flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      >
        <div className={`absolute w-64 h-64 rounded-full blur-3xl ${
          isDark ? 'bg-purple-900' : 'bg-purple-200'
        } top-1/3 left-1/4`} />
        <div className={`absolute w-64 h-64 rounded-full blur-3xl ${
          isDark ? 'bg-blue-900' : 'bg-blue-200'
        } bottom-1/3 right-1/4`} />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md px-4 py-8"
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
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              Welcome Back
            </motion.h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign in to continue your journey
            </p>
          </div>

          {/* Login Form */}
          <motion.form variants={containerVariants} onSubmit={loginSubmitHandler} className="space-y-6">
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <div className={`flex items-center p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <FiMail className={`mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full bg-transparent outline-none ${
                    isDark ? 'text-white placeholder-gray-400' : 'text-gray-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`ml-3 text-lg ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {showPassword ? <FaEye />: <FaEyeSlash />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-between items-center"
            >
              <label className={`flex items-center space-x-2 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <input 
                  type="checkbox" 
                  className={`rounded ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-blue-500' 
                      : 'border-gray-300 text-blue-600'
                  }`}
                />
                <span>Remember me</span>
              </label>
              <a 
                href="/forgot-password" 
                className={`hover:underline ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                Forgot Password?
              </a>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center transition-colors ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}
            >
              {loading && <FaSpinner className="animate-spin mr-2" />} Sign In
            </motion.button>

          </motion.form>

          {/* Signup Link */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-6"
          >
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <a 
                href="/signup" 
                className={`font-semibold hover:underline ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                Create Account
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;