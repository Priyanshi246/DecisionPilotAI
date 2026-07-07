import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiBell, FiSearch, FiMoon, FiSun,
  FiUser, FiSettings, FiLogOut, FiChevronDown
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from '../ui';

export default function Header({ onMenuClick, notificationCount = 0 }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const paths = {
      '/dashboard': 'Dashboard',
      '/upload': 'Upload Data',
      '/datasets': 'Datasets',
      '/assistant': 'AI Assistant',
      '/forecast': 'Forecast',
      '/recommendations': 'Recommendations',
      '/reports': 'Reports',
      '/notifications': 'Notifications',
      '/profile': 'Profile',
      '/settings': 'Settings'
    };
    return paths[location.pathname] || 'Dashboard';
  };

  return (
    <header className="h-16 sticky top-0 z-30 border-b backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg transition-colors lg:hidden"
            style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              style={{
                backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 1)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                color: darkMode ? '#ffffff' : '#0f172a'
              }}
            />
          </div>

          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
          >
            <FiBell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger-500 rounded-full text-xs text-white flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
            style={{
              color: darkMode ? '#fbbf24' : '#2563eb',
              backgroundColor: darkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(37, 99, 235, 0.1)'
            }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.div>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-sm">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <FiChevronDown className="w-4 h-4 hidden sm:block"
                style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
              />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl overflow-hidden"
                  style={{
                    backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="p-4"
                    style={{ borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)' }}
                  >
                    <p className="font-semibold text-sm truncate"
                      style={{ color: darkMode ? '#ffffff' : '#0f172a' }}
                    >
                      {user?.email || 'user@example.com'}
                    </p>
                    <p className="text-xs mt-1"
                      style={{ color: darkMode ? '#64748b' : '#94a3b8' }}
                    >
                      Plan: Pro
                    </p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                      style={{ color: darkMode ? '#cbd5e1' : '#475569' }}
                    >
                      <FiUser className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => { navigate('/settings'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                      style={{ color: darkMode ? '#cbd5e1' : '#475569' }}
                    >
                      <FiSettings className="w-4 h-4" />
                      Settings
                    </button>
                    <div style={{
                      borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                      margin: '0.5rem 0'
                    }} />
                    <button
                      onClick={() => { signOut(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger-500 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
