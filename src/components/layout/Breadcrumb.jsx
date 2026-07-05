import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
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
  const currentPath = location.pathname;
  const currentPageName = pageNames[currentPath] || 'Page';
  const isDashboard = currentPath === '/dashboard';

  return (
    <div className="flex items-center justify-between mb-4">
      <nav className="flex items-center gap-1 text-sm">
        {isDashboard ? (
          <div className="flex items-center gap-2 px-3 py-2 bg-primary-500/10 rounded-lg">
            <FiHome className="w-4 h-4 text-primary-400" />
            <span className="font-medium text-white">Dashboard</span>
          </div>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <FiHome className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-600" />
            <div className="px-3 py-2 bg-white/5 rounded-lg">
              <span className="font-medium text-white">{currentPageName}</span>
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
