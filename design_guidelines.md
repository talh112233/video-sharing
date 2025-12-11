# Video Sharing Platform Design Guidelines

## Design System Overview
The platform uses a **dark, modern aesthetic** with vibrant cyan accents, inspired by contemporary video platforms. The design emphasizes visual hierarchy, smooth interactions, and content-first presentation.

## Color Palette
Based on the provided design system (HSL values):
- **Background**: Dark blue-gray (220 18% 8%)
- **Primary/Accent**: Vibrant cyan (187 85% 55%)
- **Cards**: Slightly lighter than background (220 18% 10%)
- **Borders**: Subtle dark (220 18% 18%)
- **Text**: High contrast white (210 40% 98%)
- **Muted Text**: Medium gray (215 20.2% 65.1%)

**Special Effects**:
- Gradient Primary: Cyan gradient (135deg)
- Gradient Dark: Vertical dark gradient for backgrounds
- Shadow Glow: Cyan glow effect (0 0 40px with 30% opacity)
- Shadow Card: Elevated card shadow

## Typography Hierarchy
- **H1 (Page Titles)**: text-4xl sm:text-5xl, font-bold, tracking-tight
- **H2 (Section Headers)**: text-xl, font-semibold
- **Body Large**: text-lg for descriptions
- **Body**: text-base for general content
- **Small**: text-sm for metadata/captions
- **Muted Text**: Use muted-foreground color for secondary information

All headings use bold weight with tight tracking for modern, crisp appearance.

## Layout System
**Spacing Units**: Use Tailwind's spacing scale with emphasis on:
- Small gaps: gap-4, p-4
- Medium spacing: py-8, px-4, gap-6
- Large spacing: py-12, space-y-8
- Container padding: px-4 (mobile), px-6 (desktop)

**Container Strategy**:
- Max-width container: `container mx-auto`
- Centered content blocks: `max-w-2xl mx-auto` for forms
- Full-width backgrounds with contained content

**Border Radius**: Consistent 0.75rem (rounded-lg) for all cards, buttons, and inputs

## Component Library

### Header Navigation
- Fixed-width container with horizontal flex layout
- Logo/brand on left, navigation links on right
- Links to Home ("/") and Upload ("/upload")
- Subtle border-bottom for separation
- Sticky positioning for persistent access

### Video Feed Grid
- Responsive grid: 
  - Mobile: 1 column
  - Tablet: 2 columns (sm:grid-cols-2)
  - Desktop: 3 columns (lg:grid-cols-3)
  - Large: 4 columns (xl:grid-cols-4)
- Gap-6 between cards for breathing room

### Video Cards
- **Aspect Ratio**: 9:16 (portrait/mobile-first video format)
- **Structure**: Thumbnail image + title + metadata row
- **Hover State**: Scale/lift effect with transition-smooth
- **Shadow**: shadow-card for depth
- **Metadata**: Views count and upload date in muted-foreground
- Rounded corners matching design system

### Upload Form
- Centered layout with max-w-2xl
- Card-based form container with border and shadow
- Input fields with consistent border styling
- Primary button with shadow-glow effect
- File input styling matching theme

### Buttons
- **Primary CTA**: bg-primary, text-primary-foreground, shadow-glow, rounded-lg, px-6 py-3
- **Hover**: Slight opacity reduction (bg-primary/90)
- **Transition**: Use transition-smooth for all state changes
- Medium font-weight for readability

### Loading States
- Skeleton components matching card aspect ratios
- Animate with subtle pulse
- Match rounded corners of final content

### 404 Page
- Centered content with min-h-screen
- Large "404" display (text-6xl, font-extrabold)
- Descriptive message in text-xl, muted-foreground
- Primary CTA button to return home
- Full gradient-dark background

## Animations & Transitions
**Keep Minimal**: Only use where they enhance UX
- **Fade-in**: animate-fade-in class for page content entrance
- **Hover Effects**: Subtle scale/opacity changes on interactive elements
- **Transition Timing**: Use transition-smooth (cubic-bezier easing)
- **No Auto-play**: No animations on page load beyond fade-in

## Empty States
When no videos exist:
- Centered message with text-xl in muted-foreground
- Clear CTA to upload first video
- Maintain vertical spacing (py-20)

## Images
**Video Thumbnails**: 
- Placeholder or actual video frame captures
- 9:16 aspect ratio maintained
- Object-fit cover for consistent sizing
- Rounded corners matching design system

**No Hero Image**: This is a utility-focused platform; content IS the hero

## Accessibility
- High contrast text (white on dark)
- Clear focus states on interactive elements
- Semantic HTML structure
- Alt text for all images/thumbnails
- Keyboard navigation support

## Responsive Behavior
- Mobile-first approach
- Stack navigation on small screens if needed
- Grid columns adapt: 1→2→3→4 based on viewport
- Padding adjusts: px-4 (mobile) to px-6 (desktop)
- Text sizes scale: text-4xl to sm:text-5xl for headings