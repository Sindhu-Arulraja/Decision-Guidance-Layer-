import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Message } from './components/Message';
import { CodeBlock } from './components/CodeBlock';
import { InputArea } from './components/InputArea';
import { EmptyState } from './components/EmptyState';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'user',
      content: 'I need help creating a design system for an AI chatbot. Can you analyze this interface and provide recommendations?',
      timestamp: '10:32 AM',
    },
    {
      id: '2',
      role: 'assistant',
      content: `I'll help you create a comprehensive design system for your AI chatbot. Here are the key elements:

## Color Palette

For a professional dark theme interface, I recommend:

- Primary Background: #1A1A1A
- Secondary Background: #242424
- Accent Color: #FF6B35
- Text Primary: #FFFFFF
- Text Secondary: #A0A0A0

## Typography Scale

Use a consistent scale based on 16px base:

- Body: 16px (1rem)
- Small: 14px (0.875rem)
- Caption: 12px (0.75rem)
- Heading: 20px (1.25rem)

Line height should be 1.6 for body text to ensure readability.

## Spacing System

Use an 8px base unit for consistency:

- xs: 4px
- sm: 8px
- base: 16px
- lg: 24px
- xl: 32px

This creates a harmonious rhythm throughout your interface.`,
      timestamp: '10:33 AM',
    },
    {
      id: '3',
      role: 'user',
      content: 'Can you show me how to implement a button component following this design system?',
      timestamp: '10:35 AM',
    },
    {
      id: '4',
      role: 'assistant',
      content: `Here's a button component implementation following the design system:`,
      timestamp: '10:35 AM',
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a simulated response. In a real application, this would connect to an AI service.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="h-screen flex dark" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title="Design System Analysis" />

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto pb-32">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="py-8">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}

              {/* Example Code Block */}
              {messages.length >= 4 && (
                <div className="max-w-[740px] mx-auto px-6">
                  <CodeBlock
                    language="tsx"
                    filename="Button.tsx"
                    code={`export function Button({ children, variant = 'primary' }) {
  return (
    <button
      className="px-6 py-3 rounded-lg font-medium"
      style={{
        backgroundColor: variant === 'primary'
          ? 'var(--accent-primary)'
          : 'transparent',
        color: 'var(--text-primary)',
        border: variant === 'secondary'
          ? '1px solid var(--border-default)'
          : 'none',
      }}
    >
      {children}
    </button>
  );
}`}
                  />
                </div>
              )}
            </div>
          )}
        </main>

        {/* Input Area */}
        <InputArea onSend={handleSendMessage} />
      </div>
    </div>
  );
}