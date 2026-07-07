import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const colorStyles = {
  primary: { gradient: 'rgba(37, 99, 235, 0.15)', border: 'rgba(37, 99, 235, 0.3)', iconBg: 'rgba(37, 99, 235, 0.15)', iconColor: '#2563eb' },
  secondary: { gradient: 'rgba(124, 58, 237, 0.15)', border: 'rgba(124, 58, 237, 0.3)', iconBg: 'rgba(124, 58, 237, 0.15)', iconColor: '#7c3aed' },
  success: { gradient: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)', iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#10b981' },
  warning: { gradient: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', iconBg: 'rgba(245, 158, 11, 0.15)', iconColor: '#f59e0b' },
  danger: { gradient: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)', iconBg: 'rgba(239, 68, 68, 0.15)', iconColor: '#ef4444' }
};

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  color = 'primary',
  delay = 0
}) {
  const { darkMode } = useTheme();
  const style = colorStyles[color] || colorStyles.primary;

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.direction === 'up') return FiTrendingUp;
    if (trend.direction === 'down') return FiTrendingDown;
    return FiMinus;
  };

  const TrendIcon = getTrendIcon();

  const getTrendColor = () => {
    if (!trend) return darkMode ? '#94a3b8' : '#64748b';
    if (trend.direction === 'up') return '#10b981';
    if (trend.direction === 'down') return '#ef4444';
    return darkMode ? '#94a3b8' : '#64748b';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${style.gradient}, transparent)`,
        border: `1px solid ${style.border}`,
        backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{title}</p>
          <motion.p
            className="text-3xl font-bold mt-2"
            style={{ color: darkMode ? '#ffffff' : '#0f172a' }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
          >
            {value}
          </motion.p>
          {subtitle && (
            <p className="text-sm mt-1" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2" style={{ color: getTrendColor() }}>
              {TrendIcon && <TrendIcon className="w-4 h-4" />}
              <span className="text-sm font-medium">{trend.value}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: style.iconBg }}
          >
            <Icon className="w-6 h-6" style={{ color: style.iconColor }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
