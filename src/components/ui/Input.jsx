import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className,
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-500" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-3 bg-dark-card/50 border border-white/10 rounded-xl',
            'text-white placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50',
            'transition-all duration-200',
            Icon && 'pl-10',
            error && 'border-danger-500 focus:ring-danger-500/50 focus:border-danger-500/50',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-danger-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
