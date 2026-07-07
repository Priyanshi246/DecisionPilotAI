import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui';

const pageNames = {
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

export default function Breadcrumb({ showBackButton = true }) {
  const location = useLocation();
  const { darkMode } = useTheme();
  const currentPath = location.pathname;
  const currentPageName = pageNames[currentPath] || 'Page';
  const isDashboard = currentPath === '/dashboard';

  const linkStyle = {
    color: darkMode ? '#94a3b8' : '#64748b',
    textDecoration: 'none'
  };

  const activeStyle = {
    color: darkMode ? '#ffffff' : '#0f172a',
    fontWeight: 600
  };

  const containerStyle = {
    backgroundColor: darkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(37, 99, 235, 0.08)',
    border: darkMode ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid rgba(37, 99, 235, 0.15)'
  };

  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
      <nav className="flex items-center gap-1 text-sm">
        {isDashboard ? (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={containerStyle}>
            <FiHome className="w-4 h-4" style={{ color: '#2563eb' }} />
            <span className="font-medium" style={activeStyle}>Dashboard</span>
          </div>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-gray-500/10"
              style={linkStyle}
            >
              <FiHome className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <FiChevronRight className="w-4 h-4" style={{ color: darkMode ? '#475569' : '#94a3b8' }} />
            <div
              className="px-3 py-2 rounded-lg"
              style={{
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
              }}
            >
              <span className="font-medium" style={activeStyle}>{currentPageName}</span>
            </div>
          </>
        )}
      </nav>

      {showBackButton && !isDashboard && (
        <Link to="/dashboard">
          <motion.div
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="ghost" size="sm">
              <FiArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
          </motion.div>
        </Link>
      )}
    </div>
  );
}
