# AI Chatbot Design System

## Overview
This design system is based on Claude's AI chat interface, featuring a sophisticated dark theme with a focus on readability, hierarchy, and professional aesthetics.

---

## Color Palette

### Background Colors
- **Primary Background**: `#1A1A1A` (Main canvas)
- **Secondary Background**: `#242424` (Sidebar, cards)
- **Tertiary Background**: `#2D2D2D` (Message bubbles, elevated surfaces)
- **Elevated Surface**: `#333333` (Hover states, active elements)

### Text Colors
- **Primary Text**: `#FFFFFF` (Main content, headings)
- **Secondary Text**: `#A0A0A0` (Metadata, timestamps, descriptions)
- **Tertiary Text**: `#707070` (Placeholder text, disabled states)
- **Muted Text**: `#4A4A4A` (Dividers, subtle text)

### Accent Colors
- **Primary Accent**: `#FF6B35` (Orange/Coral - highlights, CTAs)
- **Link Blue**: `#4A9EFF` (Interactive links, hyperlinks)
- **Success**: `#00C896` (Positive actions, confirmations)
- **Warning**: `#FFB84D` (Cautions, alerts)
- **Error**: `#FF5757` (Errors, destructive actions)

### Border Colors
- **Subtle Border**: `#2D2D2D`
- **Default Border**: `#3A3A3A`
- **Hover Border**: `#4A4A4A`
- **Focus Border**: `#FF6B35`

---

## Typography

### Font Families
- **Primary**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Monospace**: `'SF Mono', 'Consolas', 'Monaco', monospace`

### Font Sizes
- **Display Large**: `32px` / `2rem` (Page titles)
- **Display Medium**: `24px` / `1.5rem` (Section headers)
- **Heading 1**: `20px` / `1.25rem` (Message titles, card headers)
- **Heading 2**: `18px` / `1.125rem` (Subsections)
- **Body Large**: `16px` / `1rem` (Primary content)
- **Body Medium**: `14px` / `0.875rem` (Standard text)
- **Body Small**: `13px` / `0.8125rem` (Metadata, captions)
- **Caption**: `12px` / `0.75rem` (Timestamps, labels)
- **Tiny**: `11px` / `0.6875rem` (Fine print)

### Font Weights
- **Regular**: `400` (Body text)
- **Medium**: `500` (Navigation, emphasis)
- **Semibold**: `600` (Headings, buttons)
- **Bold**: `700` (Strong emphasis)

### Line Heights
- **Tight**: `1.2` (Headings, display text)
- **Normal**: `1.5` (Body text)
- **Relaxed**: `1.7` (Long-form content)
- **Loose**: `2.0` (Spacious layouts)

### Letter Spacing
- **Tight**: `-0.02em` (Large headings)
- **Normal**: `0em` (Body text)
- **Wide**: `0.02em` (Small caps, labels)

---

## Spacing System

### Scale (8px base unit)
- **xs**: `4px` (0.25rem)
- **sm**: `8px` (0.5rem)
- **md**: `12px` (0.75rem)
- **base**: `16px` (1rem)
- **lg**: `20px` (1.25rem)
- **xl**: `24px` (1.5rem)
- **2xl**: `32px` (2rem)
- **3xl**: `40px` (2.5rem)
- **4xl**: `48px` (3rem)
- **5xl**: `64px` (4rem)

### Component Spacing
- **Message vertical spacing**: `20px`
- **Paragraph spacing**: `16px`
- **List item spacing**: `8px`
- **Section spacing**: `32px`
- **Sidebar item spacing**: `4px`
- **Card padding**: `20px`
- **Button padding**: `12px 20px`

---

## Layout

### Grid System
- **Container max-width**: `1400px`
- **Sidebar width**: `260px` (collapsed: `60px`)
- **Main content max-width**: `740px`
- **Gutter**: `24px`

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`
- **Wide**: `> 1440px`

### Z-Index Scale
- **Base**: `0`
- **Dropdown**: `1000`
- **Sticky**: `1100`
- **Modal Backdrop**: `1200`
- **Modal**: `1300`
- **Popover**: `1400`
- **Tooltip**: `1500`

---

## Components

### 1. Sidebar Navigation

#### Structure
- Width: `260px`
- Background: `#242424`
- Padding: `16px`
- Border-right: `1px solid #2D2D2D`

#### Navigation Item
- Height: `40px`
- Padding: `8px 12px`
- Border-radius: `8px`
- Font: Medium 14px
- Color: `#A0A0A0`
- **Hover**: Background `#2D2D2D`, Color `#FFFFFF`
- **Active**: Background `#333333`, Color `#FFFFFF`, Border-left `3px solid #FF6B35`

#### Sections
- Section header: Uppercase, 11px, Medium, Color `#707070`, Padding `16px 12px 8px`
- Section spacing: `24px` between sections

---

### 2. Chat Message

#### Message Container
- Max-width: `740px`
- Margin: `20px auto`
- Padding: `20px 24px`
- Background: `#242424` (AI messages), `transparent` (User messages)
- Border-radius: `12px`

#### Avatar
- Size: `32px × 32px`
- Border-radius: `50%`
- Margin-right: `12px`
- Background: `#333333` (for icons)

#### Message Header
- Display: Flex, align-items: center
- Margin-bottom: `8px`
- **Name**: Bold 14px, Color `#FFFFFF`
- **Timestamp**: Regular 12px, Color `#707070`, Margin-left `8px`

#### Message Content
- Font: Regular 16px
- Line-height: `1.6`
- Color: `#FFFFFF`
- **Paragraphs**: Margin-bottom `16px`
- **Links**: Color `#4A9EFF`, Hover underline
- **Code inline**: Background `#2D2D2D`, Padding `2px 6px`, Border-radius `4px`, Font monospace 14px

---

### 3. Input Area

#### Container
- Position: Fixed bottom
- Width: `100%`
- Background: `#1A1A1A`
- Border-top: `1px solid #2D2D2D`
- Padding: `20px 24px`

#### Text Input
- Width: `100%`
- Max-width: `740px`
- Min-height: `56px`
- Padding: `16px 48px 16px 16px`
- Background: `#242424`
- Border: `1px solid #3A3A3A`
- Border-radius: `12px`
- Font: Regular 16px
- Color: `#FFFFFF`
- **Focus**: Border `1px solid #FF6B35`, Box-shadow `0 0 0 3px rgba(255, 107, 53, 0.1)`
- **Placeholder**: Color `#707070`

#### Send Button
- Position: Absolute right `12px` bottom `12px`
- Size: `36px × 36px`
- Background: `#FF6B35`
- Border-radius: `8px`
- Color: `#FFFFFF`
- **Hover**: Background `#FF7D4D`
- **Active**: Background `#E65F2E`
- **Disabled**: Background `#3A3A3A`, Color `#707070`

---

### 4. Buttons

#### Primary Button
- Padding: `12px 24px`
- Background: `#FF6B35`
- Border-radius: `8px`
- Font: Semibold 14px
- Color: `#FFFFFF`
- **Hover**: Background `#FF7D4D`
- **Active**: Background `#E65F2E`, Transform `scale(0.98)`
- **Disabled**: Background `#3A3A3A`, Color `#707070`

#### Secondary Button
- Padding: `12px 24px`
- Background: `transparent`
- Border: `1px solid #3A3A3A`
- Border-radius: `8px`
- Font: Semibold 14px
- Color: `#FFFFFF`
- **Hover**: Background `#2D2D2D`
- **Active**: Background `#333333`

#### Icon Button
- Size: `36px × 36px`
- Background: `transparent`
- Border-radius: `8px`
- Color: `#A0A0A0`
- **Hover**: Background `#2D2D2D`, Color `#FFFFFF`
- **Active**: Background `#333333`

---

### 5. Code Block

#### Container
- Background: `#0D1117`
- Border: `1px solid #2D2D2D`
- Border-radius: `8px`
- Padding: `16px 20px`
- Margin: `16px 0`
- Overflow-x: auto

#### Code Text
- Font: Monospace 14px
- Line-height: `1.6`
- Color: `#E6EDF3`

#### Header (Optional)
- Background: `#161B22`
- Padding: `8px 16px`
- Border-bottom: `1px solid #2D2D2D`
- Font: Medium 13px
- Color: `#A0A0A0`

---

### 6. Lists

#### Bullet List
- Margin-left: `20px`
- **Item spacing**: `8px`
- **Bullet color**: `#FF6B35`
- **Text**: Regular 16px, Line-height `1.6`

#### Numbered List
- Margin-left: `20px`
- **Item spacing**: `8px`
- **Number color**: `#A0A0A0`
- **Text**: Regular 16px, Line-height `1.6`

---

### 7. Cards

#### Standard Card
- Background: `#242424`
- Border: `1px solid #2D2D2D`
- Border-radius: `12px`
- Padding: `20px`
- **Hover**: Border `1px solid #3A3A3A`, Transform `translateY(-2px)`
- **Shadow on hover**: `0 8px 16px rgba(0, 0, 0, 0.3)`

---

### 8. Tooltips

#### Container
- Background: `#2D2D2D`
- Border: `1px solid #3A3A3A`
- Border-radius: `6px`
- Padding: `6px 10px`
- Font: Regular 12px
- Color: `#FFFFFF`
- Box-shadow: `0 4px 12px rgba(0, 0, 0, 0.4)`
- Arrow: `6px`, Same colors

---

### 9. Badges

#### Default Badge
- Padding: `4px 8px`
- Background: `#2D2D2D`
- Border-radius: `4px`
- Font: Medium 11px
- Color: `#A0A0A0`
- Text-transform: uppercase
- Letter-spacing: `0.02em`

#### Status Badges
- **Active**: Background `#00C896`, Color `#FFFFFF`
- **Warning**: Background `#FFB84D`, Color `#000000`
- **Error**: Background `#FF5757`, Color `#FFFFFF`

---

### 10. Dividers

#### Horizontal Divider
- Height: `1px`
- Background: `#2D2D2D`
- Margin: `24px 0`

#### Vertical Divider
- Width: `1px`
- Background: `#2D2D2D`
- Margin: `0 16px`

---

## Design Principles

### 1. **Hierarchy Through Contrast**
- Use color contrast (white on dark) for primary content
- Size differences create clear hierarchy
- Weight variations (regular to bold) establish importance

### 2. **Generous Whitespace**
- 20px between messages prevents visual clutter
- 32px section spacing creates breathing room
- Cards have consistent 20px padding

### 3. **Rounded, Friendly Forms**
- 8-12px border-radius on most elements
- Circular avatars add personality
- Soft shadows on hover states

### 4. **Restrained Color Usage**
- Dark theme minimizes eye strain
- Orange accent used sparingly for CTAs
- Blue links for interactivity
- Grayscale for hierarchy

### 5. **Consistent Interaction Patterns**
- Hover states use lighter backgrounds
- Active states slightly darker + scale effect
- 200ms transitions for smoothness
- Focus states with orange border

### 6. **Typography Scale**
- Clear size jumps (12px, 14px, 16px, 18px, 20px, 24px)
- Limited weights (400, 500, 600, 700)
- Consistent line-heights by content type

### 7. **Accessibility First**
- WCAG AA contrast ratios minimum
- Clear focus indicators
- Semantic HTML structure
- Keyboard navigation support

### 8. **Responsive Behavior**
- Sidebar collapses to icons on mobile
- Content stays within 740px for readability
- Touch targets minimum 44×44px
- Flexible padding adjusts by viewport

---

## Animation & Motion

### Timing Functions
- **Ease-out**: `cubic-bezier(0.0, 0.0, 0.2, 1)` (Entering)
- **Ease-in**: `cubic-bezier(0.4, 0.0, 1, 1)` (Exiting)
- **Ease-in-out**: `cubic-bezier(0.4, 0.0, 0.2, 1)` (Transitioning)

### Durations
- **Fast**: `150ms` (Hover, focus states)
- **Normal**: `200ms` (Most transitions)
- **Slow**: `300ms` (Modal, drawer)

### Transitions
- **Background-color**: `200ms ease-in-out`
- **Transform**: `200ms ease-in-out`
- **Opacity**: `150ms ease-in-out`
- **Border-color**: `150ms ease-in-out`

---

## Elevation (Shadows)

### Levels
- **Level 0**: `none` (Flat surfaces)
- **Level 1**: `0 2px 4px rgba(0, 0, 0, 0.2)` (Cards at rest)
- **Level 2**: `0 4px 8px rgba(0, 0, 0, 0.25)` (Buttons, hover states)
- **Level 3**: `0 8px 16px rgba(0, 0, 0, 0.3)` (Dropdowns, popovers)
- **Level 4**: `0 16px 32px rgba(0, 0, 0, 0.4)` (Modals)

---

## Iconography

### Style
- Line-based, 2px stroke width
- 24×24px default size
- Rounded line caps
- Consistent visual weight

### Sizes
- **Small**: `16px`
- **Medium**: `24px` (default)
- **Large**: `32px`
- **XLarge**: `48px`

### Colors
- Default: `#A0A0A0`
- Hover: `#FFFFFF`
- Active: `#FF6B35`
- Disabled: `#4A4A4A`

---

## Content Guidelines

### Message Formatting
- **Line length**: Max 65-75 characters for readability
- **Paragraphs**: One idea per paragraph
- **Lists**: Use bullets for unordered, numbers for sequential
- **Emphasis**: Bold for strong, italic for subtle
- **Code**: Inline for short snippets, blocks for examples

### Tone & Voice
- Professional yet approachable
- Clear and concise
- Helpful without being patronizing
- Uses active voice

---

## Implementation Notes

### CSS Custom Properties Structure
```css
:root {
  /* Colors */
  --color-bg-primary: #1A1A1A;
  --color-bg-secondary: #242424;
  --color-text-primary: #FFFFFF;
  --color-accent: #FF6B35;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-base: 16px;
  --space-lg: 24px;
  
  /* Typography */
  --font-size-base: 16px;
  --line-height-normal: 1.5;
  
  /* Borders */
  --radius-sm: 8px;
  --radius-base: 12px;
}
```

### Component Composition
- Build from atomic components up
- Use composition over inheritance
- Keep components focused and reusable
- Separate presentational from container components

---

## Quality Checklist

Before shipping any UI component, verify:
- [ ] Meets WCAG AA contrast requirements
- [ ] Has hover/focus/active states
- [ ] Works on mobile viewports
- [ ] Includes proper spacing from design system
- [ ] Uses design tokens (no hard-coded values)
- [ ] Has smooth transitions
- [ ] Keyboard accessible
- [ ] Proper semantic HTML
- [ ] Consistent with existing patterns
- [ ] Tested in dark theme

---

**Design System Version**: 1.0  
**Last Updated**: April 27, 2026  
**Based on**: Claude AI Chat Interface
