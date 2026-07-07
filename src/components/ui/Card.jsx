import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/helpers';

export default function Card({
  children,
  className,
  hover = false,
  gradient = false,
  ...props
}) {
  const { darkMode } = useTheme();
  const Component = hover ? motion.div : 'div';

  const baseStyle = {
    backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '1rem',
    transition: 'all 0.3s ease'
  };

  return (
    <Component
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        'rounded-2xl',
        hover && 'cursor-pointer',
        className
      )}
      style={baseStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={cn('px-6 py-4', className)}
      style={{
        borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'
      }}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className }) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={cn('px-6 py-4', className)}
      style={{
        borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'
      }}
    >
      {children}
    </div>
  );
}
