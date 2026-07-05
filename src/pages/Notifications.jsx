import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiBell, FiAlertTriangle, FiCheck, FiInfo,
  FiClock, FiCheckCircle, FiTrash2
} from 'react-icons/fi';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';

const mockNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'High Churn Risk Detected',
    message: '12 customers have cancelled subscriptions in the last 24 hours',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Inventory Running Low',
    message: '3 products are below minimum stock level',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'info',
    title: 'New AI Insights Available',
    message: 'Weekly analysis report is ready for review',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    priority: 'low'
  },
  {
    id: 4,
    type: 'success',
    title: 'Forecast Accuracy Improved',
    message: 'Prediction accuracy increased to 94% this month',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    priority: 'low'
  },
  {
    id: 5,
    type: 'alert',
    title: 'Anomaly Detected',
    message: 'Unusual spike in API calls detected, potential security risk',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    priority: 'high'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = filter === 'all'
    ? notifications
    : filter === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'alert': return FiAlertTriangle;
      case 'warning': return FiAlertTriangle;
      case 'success': return FiCheck;
      default: return FiInfo;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'alert': return 'text-danger-400 bg-danger-500/20';
      case 'warning': return 'text-warning-400 bg-warning-500/20';
      case 'success': return 'text-success-400 bg-success-500/20';
      default: return 'text-primary-400 bg-primary-500/20';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-gray-400 mt-1">
            {notifications.filter(n => !n.read).length} unread notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <FiCheckCircle className="w-4 h-4" /> Mark all read
          </Button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: 'Unread' },
          { id: 'alert', label: 'Alerts' },
          { id: 'warning', label: 'Warnings' },
          { id: 'success', label: 'Success' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              filter === tab.id
                ? 'bg-primary-500/20 text-primary-400 border-primary-500/30'
                : 'bg-white/5 text-gray-400 hover:text-white'
            } border border-white/10`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="text-center py-12">
            <CardBody>
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <FiBell className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400">No notifications to display</p>
            </CardBody>
          </Card>
        ) : (
          filteredNotifications.map((notification, index) => {
            const Icon = getIcon(notification.type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`relative ${!notification.read ? 'border-l-4 border-l-primary-500' : ''}`}>
                  <CardBody className="p-4">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white">{notification.title}</h3>
                              {!notification.read && (
                                <span className="w-2 h-2 rounded-full bg-primary-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-400">{notification.message}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              {formatTime(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-success-400 transition-colors"
                              >
                                <FiCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-danger-400 transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
