import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 32;
      default:
        return 24;
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <Loader2
        size={getSize()}
        className="animate-spin"
        style={{ color: 'var(--accent-primary)' }}
      />
      {text && (
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {text}
        </span>
      )}
    </div>
  );
}
