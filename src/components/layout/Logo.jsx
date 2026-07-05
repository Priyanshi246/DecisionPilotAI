import { Link } from 'react-router-dom';

export function Logo({ className = '', size = 'md' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`${size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} text-white`}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
            />
          </svg>
        </div>
      </div>
      <span className={`font-display font-bold text-white ${sizes[size]}`}>
        DecisionPilot<span className="text-primary-400">AI</span>
      </span>
    </Link>
  );
}

export function LogoIcon({ className = '' }) {
  return (
    <div className={`relative w-10 h-10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6 text-white"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
          />
        </svg>
      </div>
    </div>
  );
}
