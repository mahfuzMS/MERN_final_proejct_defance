// components/UserProfile.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiLock, FiUser, FiMail, FiX, FiCheck } from 'react-icons/fi';
import UseAuth from '../hooks/useAuth';

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    gender: user?.gender || 'male'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold dark:text-white">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400">
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave(formData)}
              className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ChangePasswordModal = ({ onClose, onSave }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (passwords.new !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }
    onSave(passwords);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold dark:text-white">Change Password</h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400">
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">New Password</label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Confirm Password</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UserProfile = () => {
  const { user } = UseAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveProfile = async (data) => {
    try {
      // API call to update profile
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowEditModal(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleChangePassword = async (passwords) => {
    try {
      // API call to change password
      setSuccessMessage('Password changed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowPasswordModal(false);
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl h-screen mx-auto p-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-24 md:mt-28">
        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 rounded-lg flex items-center gap-2"
            >
              <FiCheck />
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <motion.img 
            src={user?.avaterUrl} 
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-200 dark:border-purple-800"
            whileHover={{ scale: 1.05 }}
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold dark:text-white">{user?.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                user?.isVerified 
                  ? 'bg-green-100 text-green-600 dark:bg-green-800/30' 
                  : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-800/30'
              }`}>
                {user?.isVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <FiUser className="text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold dark:text-white">Personal Info</h3>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="text-gray-600 dark:text-gray-400">Name</dt>
                <dd className="dark:text-white">{user?.name}</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">Gender</dt>
                <dd className="dark:text-white capitalize">{user?.gender}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <FiMail className="text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold dark:text-white">Account Info</h3>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="text-gray-600 dark:text-gray-400">Email</dt>
                <dd className="dark:text-white">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-gray-600 dark:text-gray-400">Role</dt>
                <dd className="dark:text-white capitalize">{user?.role}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto justify-center"
          >
            <FiEdit /> Edit Profile
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg w-full sm:w-auto justify-center"
          >
            <FiLock /> Change Password
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showEditModal && (
          <EditProfileModal
            user={user}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveProfile}
          />
        )}
        {showPasswordModal && (
          <ChangePasswordModal
            onClose={() => setShowPasswordModal(false)}
            onSave={handleChangePassword}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserProfile;