# Wireframe Implementation Guide

This document explains how the wireframe designs have been implemented using the Claude Design System.

## Wireframe Analysis

Based on the provided wireframe sketches, the following UI patterns and components were identified:

### 1. **Main Layout Structure**
- **Left Sidebar** (260px width, collapsible to 60px)
- **Main Content Area** (flexible width, max 740px for readability)
- **Fixed Bottom Input** (sticky positioning)
- **Top Header** (sticky, with title and actions)

### 2. **Key Components Identified**

#### Sidebar Features
- Logo/branding area at top
- New chat button (prominent CTA)
- Chat history list with:
  - Individual chat items
  - Timestamps
  - Active state indicators
  - Hover actions (edit, delete)
- Settings button at bottom
- Collapse/expand toggle

#### Chat Message Area
- User messages (right-aligned, minimal styling)
- Assistant messages (left-aligned, background highlight)
- Avatar indicators
- Timestamp display
- Action buttons (copy, feedback)
- Code blocks with syntax highlighting
- Rich text formatting (lists, headings, paragraphs)

#### Input Area
- Auto-expanding textarea
- Attachment buttons (file, image, voice)
- Send button (accent color, disabled when empty)
- Focus state with accent border
- Helper text/disclaimer

#### Additional UI Elements
- Empty state with suggestions
- Loading indicators
- Status badges
- Card components
- Dividers for content separation

## Implementation Mapping

### Wireframe → Component Mapping

| Wireframe Element | Component | File Location |
|------------------|-----------|---------------|
| Left Navigation Panel | `<Sidebar />` | `src/app/components/Sidebar.tsx` |
| Top Title Bar | `<Header />` | `src/app/components/Header.tsx` |
| Chat Bubble | `<Message />` | `src/app/components/Message.tsx` |
| Code Display | `<CodeBlock />` | `src/app/components/CodeBlock.tsx` |
| Bottom Input | `<InputArea />` | `src/app/components/InputArea.tsx` |
| Welcome Screen | `<EmptyState />` | `src/app/components/EmptyState.tsx` |
| Waiting Indicator | `<LoadingSpinner />` | `src/app/components/LoadingSpinner.tsx` |
| Action Buttons | `<Button />` | `src/app/components/Button.tsx` |
| Content Cards | `<Card />` | `src/app/components/Card.tsx` |
| Status Labels | `<Badge />` | `src/app/components/Badge.tsx` |
| Separators | `<Divider />` | `src/app/components/Divider.tsx` |

## Design System Application

### Color Implementation

All components strictly follow the design system color palette:

```tsx
// Background hierarchy
--bg-primary: #1A1A1A      // Main canvas
--bg-secondary: #242424    // Sidebar, cards, message bubbles
--bg-tertiary: #2D2D2D     // Hover states, elevated surfaces
--bg-elevated: #333333     // Active states

// Text hierarchy
--text-primary: #FFFFFF    // Main content
--text-secondary: #A0A0A0  // Metadata, labels
--text-tertiary: #707070   // Subtle text
--text-muted: #4A4A4A      // Disabled, very subtle

// Interactive colors
--accent-primary: #FF6B35  // CTAs, focus states
--accent-hover: #FF7D4D    // Hover states
--link-blue: #4A9EFF       // Links
```

### Typography Scale

Consistent font sizing across all components:

- **Caption/Labels**: 12px (timestamps, helper text)
- **Small Text**: 14px (sidebar items, metadata)
- **Body Text**: 16px (message content, inputs)
- **Headings**: 18-20px (section headers, card titles)
- **Display**: 24px+ (page titles, empty state)

### Spacing System

All spacing uses 8px increments:

```tsx
// Component internal spacing
p-2  → 8px   (Icon buttons)
p-3  → 12px  (Compact elements)
p-4  → 16px  (Standard padding)
p-5  → 20px  (Cards, messages)

// Gap between elements
gap-2 → 8px   (Icon + text)
gap-3 → 12px  (Avatar + content)
gap-4 → 16px  (Section spacing)

// Margins
mb-3 → 12px  (Tight spacing)
mb-4 → 16px  (Standard spacing)
mb-5 → 20px  (Message spacing)
mb-8 → 32px  (Section spacing)
```

### Interaction States

Every interactive element includes:

1. **Default State**
   - Defined colors from design system
   - Clear visual hierarchy

2. **Hover State**
   - Background color lightens
   - Transition: 150-200ms
   - Cursor: pointer

3. **Active State**
   - Scale transform (0.98)
   - Darker background
   - Immediate feedback

4. **Focus State**
   - Accent border color
   - Box shadow glow
   - High contrast outline

5. **Disabled State**
   - Reduced opacity (50%)
   - Cursor: not-allowed
   - No interaction

## Responsive Behavior

### Breakpoints (from wireframe analysis)

```tsx
// Mobile: < 768px
- Sidebar collapses to 60px (icon-only)
- Content padding reduces to 16px
- Message max-width adjusts
- Touch targets increase to 44px minimum

// Tablet: 768px - 1024px
- Sidebar at 260px
- Content centered with padding
- Full feature set visible

// Desktop: > 1024px
- Sidebar at 260px
- Content max-width 740px
- Optimal reading experience

// Wide: > 1440px
- Container max-width 1400px
- Additional whitespace
- Same content constraints
```

### Mobile-First Considerations

From wireframe annotations:
- Input area always visible (fixed bottom)
- Sidebar toggleable on mobile
- Messages stack vertically
- Horizontal scrolling for code blocks
- Touch-friendly 44×44px minimum targets

## Component Extensions

Based on wireframe elements not yet implemented:

### 1. **Attachment Preview**

```tsx
// File attachment display
<AttachmentPreview
  file={{ name: 'document.pdf', size: '2.4 MB' }}
  onRemove={() => {}}
/>
```

**Specifications:**
- Background: `var(--bg-secondary)`
- Border: `var(--border-default)`
- Height: 48px
- Icon + filename + size + remove button
- Hover: Show remove button

### 2. **Message Thread**

```tsx
// Threaded conversation view
<MessageThread
  parentMessage={message}
  replies={[...]}
  onReply={() => {}}
/>
```

**Specifications:**
- Indentation: 40px left margin
- Connecting line: 1px, `var(--border-subtle)`
- Collapsed by default
- "N replies" button to expand

### 3. **Settings Panel**

```tsx
// Side panel for preferences
<SettingsPanel
  isOpen={true}
  onClose={() => {}}
  sections={['Appearance', 'Behavior', 'Privacy']}
/>
```

**Specifications:**
- Width: 360px
- Slide-in from right
- Backdrop blur
- Section dividers
- Toggle switches, dropdowns

### 4. **Context Menu**

```tsx
// Right-click menu for messages
<ContextMenu
  items={[
    { label: 'Copy', icon: <Copy /> },
    { label: 'Edit', icon: <Edit /> },
    { label: 'Delete', icon: <Trash /> },
  ]}
  onItemClick={(item) => {}}
/>
```

**Specifications:**
- Background: `var(--bg-tertiary)`
- Border: `var(--border-default)`
- Shadow: Level 3
- Item height: 40px
- Hover: `var(--bg-elevated)`

### 5. **Search Bar**

```tsx
// Search conversations
<SearchBar
  placeholder="Search conversations..."
  onSearch={(query) => {}}
  results={[...]}
/>
```

**Specifications:**
- Position: Top of sidebar (below header)
- Height: 40px
- Icon: Search (16px)
- Background: `var(--bg-tertiary)`
- Focus: Accent border

### 6. **Model Selector**

```tsx
// Choose AI model
<ModelSelector
  models={['Claude 4.5 Sonnet', 'Claude 4 Opus']}
  selected="Claude 4.5 Sonnet"
  onChange={(model) => {}}
/>
```

**Specifications:**
- Dropdown in header
- Badge showing model name
- Tooltip with descriptions
- Keyboard navigable

### 7. **Export Dialog**

```tsx
// Export conversation
<ExportDialog
  isOpen={true}
  formats={['PDF', 'Markdown', 'JSON']}
  onExport={(format) => {}}
  onClose={() => {}}
/>
```

**Specifications:**
- Modal overlay
- Centered dialog (480px width)
- Format selection cards
- Cancel + Export buttons

## Accessibility Features

Implemented from wireframe requirements:

### Keyboard Navigation
- Tab order follows visual flow
- Sidebar → Header → Messages → Input
- Enter to send message
- Escape to close modals
- Arrow keys for history navigation

### Screen Reader Support
- Semantic HTML (`<nav>`, `<main>`, `<aside>`)
- ARIA labels on icon buttons
- Role attributes on custom components
- Live regions for new messages

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Primary text on dark: 15.3:1
- Secondary text on dark: 6.2:1
- Accent on dark: 4.8:1

### Focus Management
- Visible focus indicators (2px accent border)
- Focus trap in modals
- Return focus on close
- Skip links for main content

## State Management Patterns

### Message Flow

```tsx
// State structure from wireframe
interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  activeChat: string;
  chatHistory: ChatHistoryItem[];
}

// Message lifecycle
1. User types in InputArea
2. onSend callback triggered
3. Add user message to state
4. Show LoadingSpinner
5. API call (or simulation)
6. Add assistant response
7. Hide LoadingSpinner
8. Auto-scroll to bottom
```

### Sidebar State

```tsx
// Collapsible sidebar
const [collapsed, setCollapsed] = useState(false);

// Active chat tracking
const [activeChat, setActiveChat] = useState('chat-id');

// History management
const [chatHistory, setChatHistory] = useState([]);
```

### Input State

```tsx
// Auto-resize textarea
const [message, setMessage] = useState('');
useEffect(() => {
  // Resize based on scrollHeight
  textareaRef.current.style.height = 'auto';
  textareaRef.current.style.height = 
    `${Math.min(scrollHeight, 200)}px`;
}, [message]);

// Attachment handling
const [attachments, setAttachments] = useState([]);
```

## Performance Optimizations

Based on wireframe scale expectations:

### 1. **Virtual Scrolling**
For long conversation histories:
```tsx
// Use react-window for large lists
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={messages.length}
  itemSize={100}
>
  {({ index, style }) => (
    <div style={style}>
      <Message {...messages[index]} />
    </div>
  )}
</FixedSizeList>
```

### 2. **Message Caching**
Prevent re-renders:
```tsx
const MemoizedMessage = React.memo(Message);
```

### 3. **Code Splitting**
Lazy load heavy components:
```tsx
const SettingsPanel = lazy(() => 
  import('./components/SettingsPanel')
);
```

### 4. **Debounced Search**
In search bar implementation:
```tsx
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  []
);
```

## Testing Checklist

Verify wireframe requirements:

- [ ] Sidebar collapses/expands smoothly
- [ ] Messages display correctly (user vs assistant)
- [ ] Code blocks have copy functionality
- [ ] Input area auto-resizes (56px - 200px)
- [ ] Empty state shows on first load
- [ ] Loading spinner appears during "thinking"
- [ ] All buttons have hover states
- [ ] Focus indicators visible on tab
- [ ] Mobile: sidebar becomes icon-only
- [ ] Mobile: touch targets ≥ 44px
- [ ] Dark theme applied throughout
- [ ] Colors match design system
- [ ] Typography scale consistent
- [ ] Spacing uses 8px increments
- [ ] Transitions smooth (150-200ms)

## Future Enhancements

Potential additions from wireframe iterations:

1. **Multi-modal Support**
   - Image uploads in messages
   - File attachments display
   - Voice message playback

2. **Collaboration Features**
   - Share conversation link
   - Export to various formats
   - Collaborative editing

3. **Advanced AI Features**
   - Model switching mid-conversation
   - Temperature/parameter controls
   - Prompt templates library

4. **Personalization**
   - Theme customization
   - Font size preferences
   - Layout adjustments

5. **Analytics Dashboard**
   - Usage statistics
   - Token consumption
   - Conversation insights

---

**Document Version**: 1.0  
**Last Updated**: April 27, 2026  
**Based On**: Claude Wireframe Specifications
