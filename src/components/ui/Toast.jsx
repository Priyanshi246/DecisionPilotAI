import { FiAlertCircle, FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';
import { cn } from '../../utils/helpers';

export default function Toast({ type = 'info', title, message, onClose }) {
  const icons = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    warning: FiAlertTriangle,
    info: FiInfo
  };

  const styles = {
    success: 'border-success-500/30 bg-success-500/10',
    error: 'border-danger-500/30 bg-danger-500/10',
    warning: 'border-warning-500/30 bg-warning-500/10',
    info: 'border-primary-500/30 bg-primary-500/10'
  };

  const iconColors = {
    success: 'text-success-400',
    error: 'text-danger-400',
    warning: 'text-warning-400',
    info: 'text-primary-400'
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl',
      styles[type]
    )}>
      <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', iconColors[type])} />
      <div className="flex-1">
        {title && <p className="font-semibold text-white">{title}</p>}
        {message && <p className="text-sm text-gray-300 mt-1">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function ToastContainer() {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2" />
  );
}
