# Font Configuration

## Font Files Location

```
public/fonts/
├── futura-pt/              # Futura PT font files
│   ├── FuturaCyrillicBook.ttf       (400)
│   ├── FuturaCyrillicMedium.ttf     (500)
│   ├── FuturaCyrillicDemi.ttf       (600) ← Used for H1
│   ├── FuturaCyrillicBold.ttf       (700)
│   ├── FuturaCyrillicLight.ttf
│   ├── FuturaCyrillicHeavy.ttf
│   └── FuturaCyrillicExtraBold.ttf
│
└── proxima-nova/           # Proxima Nova font files
    ├── Fontspring-DEMO-proximanova-regular.otf  (400) ← Body text
    ├── Fontspring-DEMO-proximanova-bold.otf     (700) ← Bold text
    └── ... (other weights)
```

## Font Usage

### Futura PT
**Purpose**: Page title headings (H1 only)
- **Weight 600 (Demi)**: Used for H1 headings
- **Files loaded**: Book (400), Medium (500), Demi (600), Bold (700)

**Where used**:
- About page title: "About" / "關於"
- Custom page title: "Custom Section" / "客製內容"
- Any page using `.text-h1` class

### Proxima Nova
**Purpose**: All other text (body, navigation, other headings)
- **Weight 400 (Regular)**: Body text, navigation
- **Weight 700 (Bold)**: Project titles, emphasis

**Where used**:
- All body paragraphs (`.text-body`, `.text-body-lg`)
- Navigation items
- Site title
- Footer text
- H2-H5 headings
- Project overlay titles (uppercase, bold)

## CSS Configuration

Fonts are configured in `src/styles/global.css`:

```css
/* Futura PT for H1 */
--font-family-heading: 'Futura PT', 'Proxima Nova', ...;

/* Proxima Nova for everything else */
--font-family: 'Proxima Nova', -apple-system, ...;
```

## Typography Classes

| Class | Font Family | Weight | Size | Usage |
|-------|-------------|--------|------|-------|
| `.text-h1` | **Futura PT** | 600 | 36px | Page titles |
| `.text-h2` | Proxima Nova | 600 | 30px | Section headings |
| `.text-h3` | Proxima Nova | 600 | 24px | Subsections |
| `.text-h4` | Proxima Nova | 600 | 20px | Component titles |
| `.text-h5` | Proxima Nova | 500 | 18px | Small headings |
| `.text-body-lg` | Proxima Nova | 400 | 18px | Lead text |
| `.text-body` | Proxima Nova | 400 | 16px | Body text |
| `.text-body-sm` | Proxima Nova | 400 | 14px | Small text |
| `.text-project-title` | Proxima Nova | 700 | 24px | Project overlays |

## Examples

### H1 Heading (Futura PT)
```astro
<h1 class="text-h1">About</h1>
<!-- Renders with Futura PT Demi (600) at 36px -->
```

### Body Text (Proxima Nova)
```astro
<p class="text-body-lg">This is your about section.</p>
<!-- Renders with Proxima Nova Regular (400) at 18px -->
```

### Project Title (Proxima Nova Bold)
```astro
<h3 class="text-project-title">PROJECT NAME</h3>
<!-- Renders with Proxima Nova Bold (700), uppercase, yellow -->
```

## Adding More Font Weights

To add additional Futura PT or Proxima Nova weights:

1. Add `@font-face` declaration in `src/styles/global.css`
2. Specify the font file path and weight
3. Update typography classes if needed

Example:
```css
@font-face {
  font-family: 'Futura PT';
  src: url('/fonts/futura-pt/FuturaCyrillicLight.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
```

## Font Fallback Stack

If custom fonts fail to load, the system falls back to:
1. `-apple-system` (macOS/iOS system font)
2. `BlinkMacSystemFont` (macOS/iOS)
3. `'Segoe UI'` (Windows)
4. `Roboto` (Android)
5. Generic `sans-serif`

This ensures readable text even without custom fonts.
