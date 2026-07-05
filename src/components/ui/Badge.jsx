import { cn } from '../../utils/helpers';

const variants = {
  primary: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
  secondary: 'bg-secondary-500/20 text-secondary-400 border-secondary-500/30',
  success: 'bg-success-500/20 text-success-400 border-success-500/30',
  warning: 'bg-warning-500/20 text-warning-400 border-warning-500/30',
  danger: 'bg-danger-500/20 text-danger-400 border-danger-500/30',
  neutral: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base'
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span className={cn(
          'w-2 h-2 rounded-full',
          variant === 'primary' && 'bg-primary-400',
          variant === 'secondary' && 'bg-secondary-400',
          variant === 'success' && 'bg-success-400',
          variant === 'warning' && 'bg-warning-400',
          variant === 'danger' && 'bg-danger-400',
          variant === 'neutral' && 'bg-gray-400'
        )} />
      )}
      {children}
    </span>
  );
}
