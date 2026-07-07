import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/helpers';

const variants = {
  primary: { bg: 'rgba(37, 99, 235, 0.15)', text: '#2563eb', border: 'rgba(37, 99, 235, 0.3)' },
  secondary: { bg: 'rgba(124, 58, 237, 0.15)', text: '#7c3aed', border: 'rgba(124, 58, 237, 0.3)' },
  success: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' },
  warning: { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' },
  danger: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
  neutral: { bg: 'rgba(100, 116, 139, 0.15)', text: '#64748b', border: 'rgba(100, 116, 139, 0.3)' }
};

const sizes = {
  sm: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
  md: { padding: '0.25rem 0.75rem', fontSize: '0.875rem' },
  lg: { padding: '0.375rem 1rem', fontSize: '1rem' }
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className
}) {
  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.md;

  const dotColors = {
    primary: '#2563eb',
    secondary: '#7c3aed',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    neutral: '#64748b'
  };

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 font-medium rounded-full border', className)}
      style={{
        backgroundColor: variantStyle.bg,
        color: variantStyle.text,
        borderColor: variantStyle.border,
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize
      }}
    >
      {dot && (
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: dotColors[variant] || dotColors.primary }}
        />
      )}
      {children}
    </span>
  );
}
