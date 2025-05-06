// components/UserSettings.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiBell, FiTrash, FiSave } from 'react-icons/fi';
import UseAuth from '../hooks/useAuth';


const UserSettings = () => {
  const { user } = UseAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    notifications: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'security', label: 'Security', icon: FiLock },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'danger', label: 'Danger Zone', icon: FiTrash }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mt-24 md:mt-32"
      >
        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto border-b dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon className="text-lg" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-6">
                <img
                  src={user?.avaterUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-purple-100 dark:border-purple-800"
                />
                <div>
                  <h2 className="text-xl font-bold dark:text-white">{user?.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-600 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <FiSave /> Save Changes
                </button>
              </form>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="p-6 bg-purple-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Change Password</h3>
                <form className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full p-3 rounded-lg border dark:bg-gray-600 dark:border-gray-500"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full p-3 rounded-lg border dark:bg-gray-600 dark:border-gray-500"
                  />
                  <button className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <FiLock /> Update Password
                  </button>
                </form>
              </div>

              <div className="p-6 bg-purple-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Status: Disabled</span>
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-semibold dark:text-white">Email Notifications</h4>
                  <p className="text-gray-600 dark:text-gray-300">Receive important updates via email</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </motion.div>
          )}

          {/* Danger Zone Tab */}
          {activeTab === 'danger' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Delete Account</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
                <button className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <FiTrash /> Delete Account
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserSettings;