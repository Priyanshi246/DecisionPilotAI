import Button from './Button';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-dark-card border border-white/10 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-gray-500" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-400 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
