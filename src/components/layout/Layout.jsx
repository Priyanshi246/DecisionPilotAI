import { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: darkMode ? '#0F172A' : '#ffffff' }}
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex transition-colors duration-300"
      style={{ backgroundColor: darkMode ? '#0F172A' : '#f8fafc' }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} notificationCount={3} />
        <main className="flex-1 overflow-auto p-4 md:p-6"
          style={{ backgroundColor: darkMode ? '#0F172A' : '#f8fafc' }}
        >
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
