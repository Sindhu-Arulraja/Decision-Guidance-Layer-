import { useState } from 'react';
import { MessageSquare, Plus, Settings, Menu, ChevronLeft, Trash2, Edit3 } from 'lucide-react';

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeChat, setActiveChat] = useState('1');

  const chatHistory: ChatHistoryItem[] = [
    { id: '1', title: 'Design System Analysis', timestamp: 'Today' },
    { id: '2', title: 'React Component Help', timestamp: 'Yesterday' },
    { id: '3', title: 'API Integration Guide', timestamp: '2 days ago' },
    { id: '4', title: 'Database Schema Design', timestamp: '1 week ago' },
    { id: '5', title: 'TypeScript Best Practices', timestamp: '1 week ago' },
  ];

  return (
    <aside
      className="h-full transition-all duration-200 flex flex-col border-r"
      style={{
        width: collapsed ? '60px' : '260px',
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent-primary)' }}>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>C</span>
            </div>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Claude</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg transition-all duration-150 hover:bg-[var(--bg-tertiary)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-150"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--text-primary)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary)'}
        >
          <Plus size={20} />
          {!collapsed && <span className="font-medium">New Chat</span>}
        </button>
      </div>

      {/* Chat History */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-2">
          <div className="mb-4">
            <div className="px-3 py-2 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
              Recent
            </div>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className="group relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150"
                  style={{
                    backgroundColor: activeChat === chat.id ? 'var(--bg-tertiary)' : 'transparent',
                    color: activeChat === chat.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (activeChat !== chat.id) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeChat !== chat.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {activeChat === chat.id && (
                    <div
                      className="absolute left-0 w-1 h-6 rounded-r"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    />
                  )}
                  <MessageSquare size={16} className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{chat.title}</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{chat.timestamp}</div>
                  </div>
                  <div className="hidden group-hover:flex items-center gap-1">
                    <button
                      className="p-1 rounded hover:bg-[var(--bg-elevated)] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-[var(--bg-elevated)] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t p-2" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150"
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
          <Settings size={20} />
          {!collapsed && <span className="text-sm">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
