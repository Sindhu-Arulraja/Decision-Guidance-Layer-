# Claude UI Component Library

A comprehensive component library for building AI chatbot interfaces based on the Claude design system.

## Overview

This component library implements a complete design system with dark theme, consistent spacing, typography, and interaction patterns optimized for AI chat interfaces.

## Installation

All components use `lucide-react` for icons:

```bash
pnpm install lucide-react
```

## Core Components

### Layout Components

#### **Sidebar**
Full-featured navigation sidebar with collapsible functionality.

```tsx
import { Sidebar } from './components/Sidebar';

<Sidebar />
```

**Features:**
- Collapsible (260px → 60px)
- Chat history with timestamps
- Active state indicators
- Hover actions (edit, delete)
- New chat button
- Settings footer

---

#### **Header**
Sticky header with title and action buttons.

```tsx
import { Header } from './components/Header';

<Header title="Design System Analysis" />
```

**Props:**
- `title?: string` - Header title (default: "Design System Analysis")

---

#### **InputArea**
Auto-expanding textarea with attachment tools and send button.

```tsx
import { InputArea } from './components/InputArea';

<InputArea 
  onSend={(message) => console.log(message)}
  disabled={false}
/>
```

**Props:**
- `onSend: (message: string) => void` - Callback when message is sent
- `disabled?: boolean` - Disable input (default: false)

**Features:**
- Auto-resize (56px - 200px)
- Enter to send, Shift+Enter for new line
- Attachment buttons (file, image, voice)
- Focus state with accent border
- Character counter ready

---

### Message Components

#### **Message**
Chat message bubble with avatar, content, and actions.

```tsx
import { Message } from './components/Message';

<Message
  role="assistant"
  content="I'll help you with that..."
  timestamp="10:33 AM"
  showActions={true}
/>
```

**Props:**
- `role: 'user' | 'assistant'` - Message sender
- `content: string` - Message text (supports basic markdown)
- `timestamp?: string` - Display time
- `showActions?: boolean` - Show action buttons (default: true)

**Supported Markdown:**
- Bullet lists (`- item` or `* item`)
- Numbered lists (`1. item`)
- Headings (`## heading`)
- Basic paragraphs

---

#### **CodeBlock**
Syntax-highlighted code display with copy functionality.

```tsx
import { CodeBlock } from './components/CodeBlock';

<CodeBlock
  code="const greeting = 'Hello World';"
  language="javascript"
  filename="example.js"
/>
```

**Props:**
- `code: string` - Code content
- `language?: string` - Language label (default: "javascript")
- `filename?: string` - Optional filename display

**Features:**
- Copy to clipboard
- Dark theme background (#0D1117)
- Monospace font
- Optional header with filename

---

#### **EmptyState**
Welcome screen with suggestion cards.

```tsx
import { EmptyState } from './components/EmptyState';

<EmptyState onSuggestionClick={(prompt) => handleSend(prompt)} />
```

**Props:**
- `onSuggestionClick: (prompt: string) => void` - Handle suggestion click

**Built-in Suggestions:**
- Code Review
- Documentation
- Problem Solving
- Creative Ideas

---

### UI Components

#### **Button**
Versatile button with three variants.

```tsx
import { Button } from './components/Button';
import { Plus } from 'lucide-react';

<Button variant="primary" size="md" onClick={() => {}}>
  Click Me
</Button>

<Button variant="secondary" icon={<Plus />}>
  Add Item
</Button>

<Button variant="icon">
  <Settings />
</Button>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'icon'` - Button style
- `size?: 'sm' | 'md' | 'lg'` - Size (not applicable for icon variant)
- `disabled?: boolean` - Disabled state
- `onClick?: () => void` - Click handler
- `icon?: React.ReactNode` - Optional icon
- `className?: string` - Additional classes

**Variants:**
- **Primary**: Orange accent background, white text
- **Secondary**: Transparent with border, hover background
- **Icon**: Square icon button, no background

---

#### **Card**
Content container with optional hover effects.

```tsx
import { Card } from './components/Card';

<Card hoverable onClick={() => {}}>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Props:**
- `hoverable?: boolean` - Enable hover effects (default: false)
- `onClick?: () => void` - Click handler
- `className?: string` - Additional classes

**Hover Effects:**
- Border color change
- Translate up 2px
- Box shadow

---

#### **Badge**
Status indicator with color variants.

```tsx
import { Badge } from './components/Badge';

<Badge variant="active">Online</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="default">Idle</Badge>
```

**Props:**
- `variant?: 'default' | 'active' | 'warning' | 'error'`

**Colors:**
- **default**: Gray (#2D2D2D background)
- **active**: Green (#00C896)
- **warning**: Orange (#FFB84D)
- **error**: Red (#FF5757)

---

#### **Divider**
Horizontal or vertical separator.

```tsx
import { Divider } from './components/Divider';

<Divider orientation="horizontal" spacing="md" />
<Divider orientation="vertical" spacing="sm" />
```

**Props:**
- `orientation?: 'horizontal' | 'vertical'` - Direction (default: "horizontal")
- `spacing?: 'sm' | 'md' | 'lg'` - Margin spacing (default: "md")

---

#### **LoadingSpinner**
Animated loading indicator.

```tsx
import { LoadingSpinner } from './components/LoadingSpinner';

<LoadingSpinner size="md" text="Thinking..." />
```

**Props:**
- `size?: 'sm' | 'md' | 'lg'` - Spinner size (default: "md")
- `text?: string` - Optional loading text

---

## Design System Tokens

### Colors

Access via CSS custom properties:

```css
/* Backgrounds */
var(--bg-primary)    /* #1A1A1A */
var(--bg-secondary)  /* #242424 */
var(--bg-tertiary)   /* #2D2D2D */
var(--bg-elevated)   /* #333333 */

/* Text */
var(--text-primary)    /* #FFFFFF */
var(--text-secondary)  /* #A0A0A0 */
var(--text-tertiary)   /* #707070 */
var(--text-muted)      /* #4A4A4A */

/* Accent & Actions */
var(--accent-primary)  /* #FF6B35 */
var(--accent-hover)    /* #FF7D4D */
var(--accent-active)   /* #E65F2E */
var(--link-blue)       /* #4A9EFF */

/* Status */
var(--success)  /* #00C896 */
var(--warning)  /* #FFB84D */
var(--error)    /* #FF5757 */

/* Borders */
var(--border-subtle)   /* #2D2D2D */
var(--border-default)  /* #3A3A3A */
var(--border-hover)    /* #4A4A4A */
```

### Typography

```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace */
font-family: 'SF Mono', 'Consolas', 'Monaco', monospace;

/* Sizes */
12px  /* Caption, labels */
14px  /* Small text, metadata */
16px  /* Body text (base) */
18px  /* Subheadings */
20px  /* Headings */
24px  /* Section headers */

/* Weights */
400  /* Regular */
500  /* Medium */
600  /* Semibold */
700  /* Bold */
```

### Spacing

8px base unit system:

```
4px   (0.25rem)  - xs
8px   (0.5rem)   - sm
12px  (0.75rem)  - md
16px  (1rem)     - base
20px  (1.25rem)  - lg
24px  (1.5rem)   - xl
32px  (2rem)     - 2xl
40px  (2.5rem)   - 3xl
48px  (3rem)     - 4xl
64px  (4rem)     - 5xl
```

### Border Radius

```
4px   - Small elements
8px   - Buttons, badges
12px  - Cards, inputs, large containers
50%   - Circular (avatars)
```

### Transitions

```css
/* Duration */
150ms  /* Fast (hover, focus) */
200ms  /* Normal (most transitions) */
300ms  /* Slow (modals, drawers) */

/* Timing */
ease-in-out  /* Default */
cubic-bezier(0.4, 0.0, 0.2, 1)  /* Custom easing */
```

### Shadows

```css
/* Level 1 - Cards */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

/* Level 2 - Buttons, Hover */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

/* Level 3 - Dropdowns */
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);

/* Level 4 - Modals */
box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
```

---

## Usage Examples

### Complete Chat Interface

```tsx
import { useState } from 'react';
import {
  Sidebar,
  Header,
  Message,
  InputArea,
  EmptyState,
  LoadingSpinner,
} from './components';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a simulated response.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="My Chat" />
        <main className="flex-1 overflow-y-auto pb-32">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSend} />
          ) : (
            <div className="py-8">
              {messages.map((msg) => (
                <Message
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              ))}
              {isLoading && <LoadingSpinner text="Thinking..." />}
            </div>
          )}
        </main>
        <InputArea onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
```

### Custom Styling

All components accept inline styles via `style` prop or use Tailwind classes:

```tsx
<Button
  style={{ backgroundColor: 'var(--success)' }}
  className="font-bold"
>
  Custom Button
</Button>
```

---

## Best Practices

### 1. **Dark Theme Required**
Add `dark` class to root element:

```tsx
<div className="dark">
  {/* Your app */}
</div>
```

### 2. **Spacing Consistency**
Use 8px increments for margins/padding:

```tsx
<div className="p-4">  {/* 16px */}
<div className="mb-6"> {/* 24px */}
```

### 3. **Typography Hierarchy**
- Use font-size for hierarchy, not weight
- Body text: 16px
- Metadata: 14px
- Captions: 12px

### 4. **Color Usage**
- Primary text: Always white (#FFFFFF)
- Secondary text: Gray (#A0A0A0)
- Accent: Use sparingly for CTAs
- Links: Blue (#4A9EFF)

### 5. **Hover States**
All interactive elements should have:
- 150-200ms transitions
- Color/background changes
- Cursor pointer

### 6. **Accessibility**
- Minimum 44×44px touch targets
- WCAG AA contrast ratios
- Keyboard navigation support
- Focus indicators

---

## Component Checklist

When creating new components:

- [ ] Uses design system colors
- [ ] Follows 8px spacing scale
- [ ] Has hover/focus states
- [ ] Includes 150-200ms transitions
- [ ] Responsive on mobile
- [ ] TypeScript props defined
- [ ] Accessible (ARIA, keyboard)
- [ ] Dark theme compatible

---

## Related Documentation

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Complete design system specification
- [Figma Design File](#) - Visual design reference
- [Accessibility Guidelines](#) - WCAG compliance details

---

**Version**: 1.0  
**Last Updated**: April 27, 2026  
**Maintainer**: Design System Team
