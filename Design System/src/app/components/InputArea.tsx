import { Send, Paperclip, Mic, Image } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function InputArea({ onSend, disabled = false }: InputAreaProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-[740px] mx-auto px-6 py-5">
        {/* Input Container */}
        <div
          className="relative rounded-xl border transition-all duration-150"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-default)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-default)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Claude..."
            disabled={disabled}
            className="w-full px-4 py-4 pr-28 bg-transparent resize-none outline-none"
            style={{
              color: 'var(--text-primary)',
              fontSize: '16px',
              lineHeight: '1.5',
              minHeight: '56px',
              maxHeight: '200px',
            }}
          />

          {/* Action Buttons */}
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {/* Attachment Tools */}
            <div className="flex items-center gap-1 mr-2">
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
                title="Attach file"
              >
                <Paperclip size={18} />
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
                title="Add image"
              >
                <Image size={18} />
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
                title="Voice input"
              >
                <Mic size={18} />
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              className="p-2 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: message.trim() && !disabled ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: message.trim() && !disabled ? 'var(--text-primary)' : 'var(--text-tertiary)',
              }}
              onMouseEnter={(e) => {
                if (message.trim() && !disabled) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (message.trim() && !disabled) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                }
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-2 text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Claude can make mistakes. Please double-check responses.
        </div>
      </div>
    </div>
  );
}
