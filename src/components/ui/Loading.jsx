import { motion } from 'framer-motion';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4'
  };

  return (
    <div
      className={`${sizes[size]} border-primary-500 border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
}

export function LoadingDots({ className = '' }) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary-500 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
}

export function Skeleton({ width, height, className = '', rounded = 'lg' }) {
  return (
    <div
      className={`bg-dark-card/50 animate-pulse rounded-${rounded} ${className}`}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-dark-card/50 border border-white/10 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-1/3" />
      <div className="h-8 bg-white/10 rounded w-2/3" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="bg-dark-card/50 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-white/10 rounded" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b border-white/5">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-white/5 rounded" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
