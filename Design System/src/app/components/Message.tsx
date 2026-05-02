import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  showActions?: boolean;
}

export function Message({ role, content, timestamp, showActions = true }: MessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <div
      className="max-w-[740px] mx-auto mb-5 px-6 py-5 rounded-xl group"
      style={{
        backgroundColor: isAssistant ? 'var(--bg-secondary)' : 'transparent',
      }}
    >
      {/* Message Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: isAssistant ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
          }}
        >
          {isAssistant ? (
            <Bot size={18} style={{ color: 'var(--text-primary)' }} />
          ) : (
            <User size={18} style={{ color: 'var(--text-secondary)' }} />
          )}
        </div>

        {/* Name and Timestamp */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              {isAssistant ? 'Claude' : 'You'}
            </span>
            {timestamp && (
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {timestamp}
              </span>
            )}
          </div>

          {/* Message Content */}
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: 'var(--text-primary)',
              fontSize: '16px',
              lineHeight: '1.6',
            }}
          >
            <MessageContent content={content} />
          </div>
        </div>
      </div>

      {/* Message Actions */}
      {isAssistant && showActions && (
        <div className="flex items-center gap-2 ml-11 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
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
            title="Copy"
          >
            <Copy size={16} />
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
            title="Good response"
          >
            <ThumbsUp size={16} />
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
            title="Bad response"
          >
            <ThumbsDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple parser for basic markdown-like formatting
  const lines = content.split('\n');

  return (
    <div>
      {lines.map((line, index) => {
        // Code block detection (simplified)
        if (line.startsWith('```')) {
          return null; // Handle separately
        }

        // Bullet list
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return (
            <li key={index} className="ml-5" style={{ color: 'var(--text-primary)' }}>
              {line.trim().substring(2)}
            </li>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(line.trim())) {
          return (
            <li key={index} className="ml-5" style={{ color: 'var(--text-primary)' }}>
              {line.trim().replace(/^\d+\.\s/, '')}
            </li>
          );
        }

        // Heading
        if (line.startsWith('## ')) {
          return (
            <h3 key={index} className="mt-4 mb-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
              {line.substring(3)}
            </h3>
          );
        }

        // Regular paragraph
        if (line.trim()) {
          return (
            <p key={index} className="mb-4" style={{ color: 'var(--text-primary)' }}>
              {line}
            </p>
          );
        }

        return <br key={index} />;
      })}
    </div>
  );
}
