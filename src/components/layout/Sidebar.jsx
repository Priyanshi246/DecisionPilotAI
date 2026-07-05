import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome, FiUpload, FiDatabase, FiMessageSquare, FiTrendingUp,
  FiStar, FiFileText, FiBell, FiUser, FiSettings, FiLogOut
} from 'react-icons/fi';
import { Logo } from './Logo';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/dashboard' },
  { id: 'upload', label: 'Upload Data', icon: FiUpload, path: '/upload' },
  { id: 'datasets', label: 'Datasets', icon: FiDatabase, path: '/datasets' },
  { id: 'assistant', label: 'AI Assistant', icon: FiMessageSquare, path: '/assistant' },
  { id: 'forecast', label: 'Forecast', icon: FiTrendingUp, path: '/forecast' },
  { id: 'recommendations', label: 'Recommendations', icon: FiStar, path: '/recommendations' },
  { id: 'reports', label: 'Reports', icon: FiFileText, path: '/reports' },
  { id: 'notifications', label: 'Notifications', icon: FiBell, path: '/notifications' }
];

const bottomItems = [
  { id: 'profile', label: 'Profile', icon: FiUser, path: '/profile' },
  { id: 'settings', label: 'Settings', icon: FiSettings, path: '/settings' }
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-72 bg-dark-bg border-r border-white/10 flex flex-col lg:translate-x-0"
      >
        <div className="p-6 border-b border-white/10">
          <Logo />
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white border-l-2 border-primary-500'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          {bottomItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </motion.aside>
    </>
  );
}
