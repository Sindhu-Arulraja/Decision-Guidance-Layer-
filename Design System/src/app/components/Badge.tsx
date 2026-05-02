interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'active' | 'warning' | 'error';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case 'active':
        return {
          backgroundColor: '#00C896',
          color: '#FFFFFF',
        };
      case 'warning':
        return {
          backgroundColor: '#FFB84D',
          color: '#000000',
        };
      case 'error':
        return {
          backgroundColor: '#FF5757',
          color: '#FFFFFF',
        };
      default:
        return {
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-secondary)',
        };
    }
  };

  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium uppercase tracking-wide"
      style={getStyles()}
    >
      {children}
    </span>
  );
}
