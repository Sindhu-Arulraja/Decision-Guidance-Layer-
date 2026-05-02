import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'javascript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-lg overflow-hidden my-4"
      style={{
        backgroundColor: '#0D1117',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Header */}
      {(filename || language) && (
        <div
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{
            backgroundColor: '#161B22',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-150 text-sm"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre
          className="p-5 m-0"
          style={{
            fontFamily: "'SF Mono', 'Consolas', 'Monaco', monospace",
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          <code style={{ color: '#E6EDF3' }}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
