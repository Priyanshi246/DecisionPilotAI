import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function Card({
  children,
  className,
  hover = false,
  gradient = false,
  ...props
}) {
  const Component = hover ? motion.div : 'div';

  return (
    <Component
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      className={cn(
        'bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-2xl',
        hover && 'hover:border-white/20 hover:bg-dark-card/70 transition-all duration-300 cursor-pointer',
        gradient && 'bg-gradient-to-br from-dark-card/70 to-dark-card/30',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('px-6 py-4 border-b border-white/10', className)}>
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
  return (
    <div className={cn('px-6 py-4 border-t border-white/10', className)}>
      {children}
    </div>
  );
}
