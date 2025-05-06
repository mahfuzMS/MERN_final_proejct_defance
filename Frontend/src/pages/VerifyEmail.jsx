import { useEffect, useState } from 'react';
import { FiInbox, FiClock, FiMail, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const EmailVerification = () => {
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [isResent, setIsResent] = useState(false);
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    // Add your resend logic here
    setCountdown(300);
    setIsResent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <div className="text-center space-y-6">
          {/* Icon Animation */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <FiInbox className="w-16 h-16 text-blue-500 dark:text-blue-400" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Verify Your Email
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            We've sent a verification link to
            <span className="font-semibold text-blue-500"> {}</span>
          </p>

          {/* Countdown Timer */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
            <FiClock className="w-5 h-5 mr-2 text-blue-500" />
            <span className="font-medium">
              {formatTime(countdown)} remaining
            </span>
          </div>

          {/* Resend Button */}
          <button
            onClick={handleResend}
            disabled={countdown > 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              countdown > 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Resend Verification Email
          </button>

          {/* Success Message */}
          {isResent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center text-green-500 space-x-2"
            >
              <FiCheckCircle />
              <span>New email sent successfully!</span>
            </motion.div>
          )}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Didn't receive the email? Check your spam folder or{' '}
              <button className="text-blue-500 hover:underline">
                try another email address
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;