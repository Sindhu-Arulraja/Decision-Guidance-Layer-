import { Sparkles, Code, FileText, Lightbulb } from 'lucide-react';

interface SuggestionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function SuggestionCard({ icon, title, description, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group p-5 rounded-xl border text-left transition-all duration-200 hover:translate-y-[-2px]"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-default)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-default)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--accent-primary)' }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

interface EmptyStateProps {
  onSuggestionClick: (prompt: string) => void;
}

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  const suggestions = [
    {
      icon: <Code size={20} />,
      title: 'Code Review',
      description: 'Help me review and improve my React component',
      prompt: 'Can you help me review my React component for best practices?',
    },
    {
      icon: <FileText size={20} />,
      title: 'Documentation',
      description: 'Generate documentation for my API endpoints',
      prompt: 'I need help creating documentation for my REST API endpoints.',
    },
    {
      icon: <Lightbulb size={20} />,
      title: 'Problem Solving',
      description: 'Debug an issue in my application',
      prompt: "I'm having trouble with a bug in my application. Can you help?",
    },
    {
      icon: <Sparkles size={20} />,
      title: 'Creative Ideas',
      description: 'Brainstorm features for my project',
      prompt: 'Can you help me brainstorm new features for my web application?',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        >
          <Sparkles size={32} style={{ color: 'var(--text-primary)' }} />
        </div>
        <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          How can I help you today?
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Start a conversation or choose a suggestion below
        </p>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[800px] w-full">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            icon={suggestion.icon}
            title={suggestion.title}
            description={suggestion.description}
            onClick={() => onSuggestionClick(suggestion.prompt)}
          />
        ))}
      </div>
    </div>
  );
}
