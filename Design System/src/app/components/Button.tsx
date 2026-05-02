interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  icon,
}: ButtonProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-6 py-4 text-base';
      default:
        return 'px-6 py-3 text-sm';
    }
  };

  const getVariantStyles = () => {
    if (variant === 'icon') {
      return {
        base: {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: 'none',
        },
        hover: {
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
        },
      };
    }

    if (variant === 'secondary') {
      return {
        base: {
          backgroundColor: 'transparent',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-default)',
        },
        hover: {
          backgroundColor: 'var(--bg-tertiary)',
        },
      };
    }

    return {
      base: {
        backgroundColor: 'var(--accent-primary)',
        color: 'var(--text-primary)',
        border: 'none',
      },
      hover: {
        backgroundColor: 'var(--accent-hover)',
      },
    };
  };

  const variantStyles = getVariantStyles();
  const isIconButton = variant === 'icon';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${isIconButton ? 'p-2' : getSizeStyles()}
        rounded-lg font-medium
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
        flex items-center justify-center gap-2
        ${className}
      `}
      style={variantStyles.base}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, variantStyles.hover);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, variantStyles.base);
        }
      }}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
