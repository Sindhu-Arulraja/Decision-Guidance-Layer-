import { MoreVertical, Share2, Bookmark } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'Design System Analysis' }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-sm"
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Title */}
          <h1 className="font-semibold text-lg truncate" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h1>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg transition-all duration-150"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <button
              className="p-2 rounded-lg transition-all duration-150"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
              title="Bookmark"
            >
              <Bookmark size={18} />
            </button>
            <button
              className="p-2 rounded-lg transition-all duration-150"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
              title="More options"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
