import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';
import { cn } from '../../utils/helpers';

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  color = 'primary',
  delay = 0
}) {
  const colorClasses = {
    primary: 'from-primary-500/20 to-primary-500/5 border-primary-500/20',
    secondary: 'from-secondary-500/20 to-secondary-500/5 border-secondary-500/20',
    success: 'from-success-500/20 to-success-500/5 border-success-500/20',
    warning: 'from-warning-500/20 to-warning-500/5 border-warning-500/20',
    danger: 'from-danger-500/20 to-danger-500/5 border-danger-500/20'
  };

  const iconColorClasses = {
    primary: 'text-primary-400 bg-primary-500/20',
    secondary: 'text-secondary-400 bg-secondary-500/20',
    success: 'text-success-400 bg-success-500/20',
    warning: 'text-warning-400 bg-warning-500/20',
    danger: 'text-danger-400 bg-danger-500/20'
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.direction === 'up') return FiTrendingUp;
    if (trend.direction === 'down') return FiTrendingDown;
    return FiMinus;
  };

  const TrendIcon = getTrendIcon();

  const getTrendColor = () => {
    if (!trend) return 'text-gray-400';
    if (trend.direction === 'up') return 'text-success-400';
    if (trend.direction === 'down') return 'text-danger-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br backdrop-blur-xl transition-all duration-300',
        colorClasses[color]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <motion.p
            className="text-3xl font-bold text-white mt-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
          >
            {value}
          </motion.p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={cn('flex items-center gap-1 mt-2', getTrendColor())}>
              {TrendIcon && <TrendIcon className="w-4 h-4" />}
              <span className="text-sm font-medium">{trend.value}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-xl', iconColorClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-current opacity-5" />
    </motion.div>
  );
}
