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
    <header className="h-16 bg-dark-bg/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg lg:hidden transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-dark-card/50 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
            />
          </div>

          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-sm">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <FiChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-dark-card border border-white/10 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10">
                    <p className="font-semibold text-white text-sm truncate">
                      {user?.email || 'user@example.com'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Plan: Pro</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => { navigate('/settings'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <FiSettings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-white/10 my-2" />
                    <button
                      onClick={() => { signOut(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger-400 hover:text-danger-300 hover:bg-white/5 transition-colors"
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
