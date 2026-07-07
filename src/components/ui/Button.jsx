import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/helpers';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  ...props
}, ref) => {
  const { darkMode } = useTheme();

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: '0.75rem',
    transition: 'all 0.3s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      color: '#ffffff',
      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
    },
    secondary: {
      background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
      color: '#ffffff',
      boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)'
    },
    outline: {
      background: 'transparent',
      color: darkMode ? '#ffffff' : '#0f172a',
      border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)'
    },
    ghost: {
      background: 'transparent',
      color: darkMode ? '#94a3b8' : '#64748b'
    },
    danger: {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      color: '#ffffff'
    },
    success: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: '#ffffff'
    }
  };

  const sizes = {
    sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.625rem 1rem', fontSize: '0.875rem' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    xl: { padding: '1rem 2rem', fontSize: '1.125rem' }
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn('font-semibold', className)}
      style={{ ...baseStyles, ...variantStyle, ...sizeStyle }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
