# Design System Documentation

This design system is built using **Tailwind CSS 4.1** with custom utility classes defined in `src/styles/global.css`.

## Typography

All typography is configured using custom CSS variables and utility classes. Use these semantic class names instead of raw Tailwind classes.

### Heading Levels

```html
<!-- Display - Extra large (60px, bold, Proxima Nova) -->
<h1 class="text-display">Hero Title</h1>

<!-- H1 - Page titles (36px, semibold, Futura PT) -->
<h1 class="text-h1">Page Title</h1>

<!-- H2 - Section headings (30px, semibold) -->
<h2 class="text-h2">Section Title</h2>

<!-- H3 - Subsection headings (24px, semibold) -->
<h3 class="text-h3">Subsection Title</h3>

<!-- H4 - Component headings (20px, semibold) -->
<h4 class="text-h4">Component Title</h4>

<!-- H5 - Small headings (18px, medium) -->
<h5 class="text-h5">Small Heading</h5>
```

### Body Text

```html
<!-- Body Large - Intro/lead text (18px, line-height 1.7) -->
<p class="text-body-lg">This is introductory or emphasized body text.</p>

<!-- Body - Default text (16px, line-height 1.6) -->
<p class="text-body">This is regular body text.</p>

<!-- Body Small - Secondary text (14px, line-height 1.5) -->
<p class="text-body-sm">This is smaller body text or captions.</p>

<!-- Caption - Metadata/timestamps (12px) -->
<p class="text-caption">Posted 2 hours ago</p>
```

### Special Typography

```html
<!-- Project Title - Yellow, uppercase, bold (24px, Proxima Nova) -->
<h3 class="text-project-title">Project Name</h3>

<!-- Navigation Links - Futura PT at H4 size (20px, semibold) -->
<a class="text-nav">Work</a>

<!-- Navigation Site Title - Futura PT at H4 size (20px, bold) -->
<div class="text-nav-title">Portfolio</div>
```

## Current Typography Hierarchy

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-display` | 60px | 700 (Bold) | 1.1 | Hero sections |
| `text-h1` | 36px | 600 (Semibold) | 1.2 | Page titles |
| `text-h2` | 30px | 600 (Semibold) | 1.3 | Section headings |
| `text-h3` | 24px | 600 (Semibold) | 1.4 | Subsections |
| `text-h4` | 20px | 600 (Semibold) | 1.4 | Site title, icons |
| `text-h5` | 18px | 500 (Medium) | 1.5 | Small headings |
| `text-body-lg` | 18px | 400 (Regular) | 1.7 | Lead text |
| `text-body` | 16px | 400 (Regular) | 1.6 | Body text |
| `text-body-sm` | 14px | 400 (Regular) | 1.5 | Captions, UI text |
| `text-caption` | 12px | 400 (Regular) | 1.4 | Metadata |
| `text-project-title` | 24px | 700 (Bold) | - | Project overlays |
| `text-nav` | 20px | 600 (Semibold) | 1.4 | Navigation links |
| `text-nav-title` | 20px | 700 (Bold) | 1.4 | Site title in nav |

## Colors

### Custom Color Variables

```css
/* Defined in @theme section */
--color-accent-yellow: #FFD700
--color-text-primary: #000000
--color-text-secondary: #6B7280
--color-text-tertiary: #9CA3AF
```

### Usage in Components

```html
<!-- Primary text (black) -->
<p class="text-black">Primary text</p>

<!-- Secondary text (gray) -->
<p class="text-gray-500">Secondary text</p>

<!-- Accent color (yellow) - automatically applied in text-project-title -->
<span class="text-[#FFD700]">Highlighted text</span>

<!-- Background overlays -->
<div class="bg-white/90">White overlay 90% opacity</div>
<div class="bg-black/60">Black overlay 60% opacity</div>
```

### Color Palette

| Usage | Color | Tailwind Class |
|-------|-------|----------------|
| Primary text | #000000 | `text-black` |
| Active nav items | #000000 | `text-black` |
| Inactive nav items | #6B7280 | `text-gray-500` |
| Secondary text | #6B7280 | `text-gray-600` |
| Accent/Highlight | #FFD700 | `text-[#FFD700]` |
| Background | #FFFFFF | `bg-white` |
| Overlay (white) | rgba(255,255,255,0.9) | `bg-white/90` |

## Spacing

### Standard Spacing Scale

Use Tailwind's default spacing scale:

| Class | Value | Usage |
|-------|-------|-------|
| `gap-6` | 1.5rem (24px) | Small gaps |
| `gap-8` | 2rem (32px) | Medium gaps |
| `gap-12` | 3rem (48px) | **Project grid gap** |
| `py-8` | 2rem (32px) | Navigation padding |
| `py-12` | 3rem (48px) | Section padding |
| `px-8` | 2rem (32px) | Horizontal padding |

### Custom Spacing Variables

```css
--spacing-section: 6rem      /* 96px - Large section spacing */
--spacing-container: 8rem    /* 128px - Extra large spacing */
```

## Layout

### Container Widths

```html
<!-- Small container (672px) -->
<div class="max-w-2xl mx-auto px-8">Content</div>

<!-- Medium container (896px) - For About/Custom pages -->
<div class="max-w-4xl mx-auto px-8">Content</div>

<!-- Large container (1280px) - Default for most pages -->
<div class="max-w-7xl mx-auto px-8">Content</div>
```

## Components

### Navigation

```astro
<!-- Site title uses text-nav-title (Futura PT, bold) -->
<div class="text-nav-title">Site Title</div>

<!-- Navigation links use text-nav (Futura PT, semibold) -->
<!-- Active tab: black, Inactive tab: gray -->
<a class="text-nav text-black">Work</a>
<a class="text-nav text-gray-500 hover:text-black">About</a>

<!-- Language dropdown uses text-body-sm (Proxima Nova) -->
<button class="text-body-sm">EN</button>

<!-- Chevron icon uses text-caption -->
<i class="fas fa-chevron-down text-caption"></i>
```

### Project Grid

```astro
<!-- Grid with 3rem gap -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
  <!-- Project card -->
  <a class="group block">
    <div class="relative aspect-square">
      <img class="w-full h-full object-cover" />
      <!-- White overlay with project title -->
      <div class="bg-white/90">
        <h3 class="text-project-title">Project Name</h3>
      </div>
    </div>
  </a>
</div>
```

### Footer

```astro
<!-- Icons use text-h4 size -->
<a class="text-h4">
  <i class="fab fa-linkedin-in"></i>
</a>

<!-- Copyright uses text-body-sm -->
<p class="text-body-sm text-gray-600">© 2018-2025</p>
```

## Fonts

### Font Families

- **Headings (H1)**: Futura PT (Book 400, Medium 500, Demi 600, Bold 700)
- **Body Text**: Proxima Nova (Regular 400, Bold 700)
- **Fallback**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)

### Font Weights

| Weight | Value | Font Family | Usage |
|--------|-------|-------------|-------|
| Regular | 400 | Proxima Nova, Futura PT | Body text |
| Medium | 500 | Futura PT | H5 headings |
| Semibold/Demi | 600 | Futura PT, Proxima Nova | H1-H4 headings |
| Bold | 700 | Futura PT, Proxima Nova | Display text, project titles |

### Typography Font Assignment

- **H1**: Futura PT Demi (600) - Page titles use distinctive Futura PT
- **Navigation**: Futura PT (600/700) - Site title and nav links
- **H2-H5**: Proxima Nova - Other headings use Proxima Nova
- **Body**: Proxima Nova - All body text and UI elements
- **Project Titles**: Proxima Nova Bold - Uppercase overlay text

**Rationale**: Futura PT is used for primary branding elements (H1 page titles and navigation) to create visual hierarchy and brand consistency, while Proxima Nova handles readability-focused content (body text, descriptions).

## Transitions

Default transitions use Tailwind classes:

```html
<!-- Fast transition (150ms) -->
<div class="transition duration-150">Content</div>

<!-- Normal transition (200ms) -->
<div class="transition duration-200">Content</div>

<!-- Slow transition (300ms) -->
<div class="transition-opacity duration-300">Content</div>
```

## Best Practices

### ✅ Do

- Use semantic typography classes (`text-h1`, `text-body`, etc.)
- Use design system color variables
- Maintain consistent spacing with gap-12 for project grids
- Use hover states with opacity transitions

### ❌ Don't

- Use raw font sizes like `text-4xl` (use `text-h1` instead)
- Hardcode colors (use semantic classes)
- Mix spacing values (stick to 6, 8, 12 pattern)
- Override design system styles without updating the source

## Modifying the Design System

To change typography or colors globally:

1. Open `src/styles/global.css`
2. Update values in `@theme` section or `@layer utilities`
3. Changes will apply everywhere automatically

### Example: Change H1 Size

```css
/* In global.css */
--font-size-h1: 3rem;  /* Change from 2.25rem to 3rem */
```

This will update all `.text-h1` usage throughout the site.

## Icons

Using **Font Awesome 7.1**:

```html
<!-- Brand icons -->
<i class="fab fa-linkedin-in"></i>
<i class="fab fa-github"></i>

<!-- Solid icons -->
<i class="fas fa-envelope"></i>
<i class="fas fa-chevron-down"></i>
```

Icon sizes follow typography scale:
- Navigation icons: `text-caption` (12px)
- Footer icons: `text-h4` (20px)
