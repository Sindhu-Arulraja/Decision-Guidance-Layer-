interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
}

export function Divider({ orientation = 'horizontal', spacing = 'md' }: DividerProps) {
  const getSpacing = () => {
    switch (spacing) {
      case 'sm':
        return orientation === 'horizontal' ? 'my-3' : 'mx-2';
      case 'lg':
        return orientation === 'horizontal' ? 'my-8' : 'mx-4';
      default:
        return orientation === 'horizontal' ? 'my-6' : 'mx-3';
    }
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={`w-px ${getSpacing()}`}
        style={{ backgroundColor: 'var(--border-subtle)' }}
      />
    );
  }

  return (
    <div
      className={`h-px ${getSpacing()}`}
      style={{ backgroundColor: 'var(--border-subtle)' }}
    />
  );
}
