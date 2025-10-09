# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal portfolio website for yushinliou.github.io, built with **Astro** static site generator and **Tailwind CSS**.

**Branch Structure:**
- `main`: Previous Jekyll-based Academic Pages template (legacy content)
- `portfolio`: Current Astro-based portfolio site (active development)

**Deployment:** GitHub Pages at yushinliou.github.io

**Key Technologies:**
- Astro 5.14
- Tailwind CSS 4.1
- TypeScript (strictest mode)
- Font Awesome icons
- **Fonts**: Futura PT (headings), Proxima Nova (body)

## Astro Development Commands

```bash
# Start local development server (runs at http://localhost:4321)
npm run dev

# Build the site for production (output to dist/ directory)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- <command>
```

## Architecture

### Site Structure

```
src/
├── components/       # Reusable Astro components
│   ├── Navigation.astro    # Main navigation bar
│   ├── Footer.astro        # Site footer with social links
│   └── ProjectGrid.astro   # Grid layout for project cards
├── layouts/          # Page layout templates
│   └── BaseLayout.astro    # Base HTML structure
├── pages/            # File-based routing (each .astro file = route)
│   ├── index.astro         # Homepage (Work section)
│   ├── research.astro      # Research projects
│   ├── side.astro          # Side projects
│   ├── custom.astro        # Customizable section
│   └── about.astro         # About page
└── styles/           # Global CSS (optional)

public/               # Static assets (served as-is)
└── placeholder.svg   # Placeholder image for projects
```

### Navigation Tabs

The site has 6 navigation tabs (configured in `src/components/Navigation.astro`):
1. **Work** - Main portfolio (homepage)
2. **Research** - Research projects
3. **SIDE** - Side projects
4. **Custom** - Customizable section (replaces "LEGO" from reference site)
5. **About** - About page
6. **CV** - Direct link to CV PDF

**Navigation Features:**
- Active tab: Black text
- Inactive tabs: Gray text with hover to black
- No underline styling
- Language dropdown (EN/繁中) with hover menu
- Site title on left, navigation on right

### Design System

The site replicates the minimalist design from ranzhourobot.com:
- **Layout:** Centered content, max-width 1200px (7xl)
- **Grid:** Responsive project grid with 3rem (gap-12) spacing
- **Colors:** Neutral palette (black/gray text on white background)
- **Typography:**
  - H1 headings: Futura PT (Demi 600)
  - Body text: Proxima Nova (Regular 400, Bold 700)
  - Custom classes: `text-h1`, `text-body`, etc.
- **Spacing:** Consistent padding and gaps using Tailwind spacing scale
- **Icons:** Font Awesome 7.1

**Project Grid:**
- White overlay (bg-white/90) on hover
- Yellow (#FFD700) bold uppercase titles on overlay
- Image scale effect on hover
- No visible title until hover

**Footer:**
- No top border
- Icons right-aligned: LinkedIn, GitHub, Email
- Font Awesome icons with hover opacity effect

### Component Patterns

**ProjectGrid Component:**
- Accepts array of project objects: `{ title, image, link, category }`
- Responsive grid layout
- Hover animations on cards and images
- Used on Work, Research, and SIDE pages

**Navigation Component:**
- Auto-highlights active page
- Supports external links (CV)
- Fully responsive with flexbox

## Configuration

**astro.config.mjs:**
- `site`: Set to 'https://yushinliou.github.io'
- `base`: Currently commented out (deploy to root)

**GitHub Pages Deployment:**
- Configured via `.github/workflows/deploy.yml`
- Triggers on push to `portfolio` branch
- Builds and deploys to GitHub Pages automatically

## Adding Content

### Add a New Project

Edit the projects array in the relevant page (index.astro, research.astro, or side.astro):

```javascript
{
  title: 'Project Name',
  image: '/path/to/image.jpg',  // Place images in public/ folder
  link: '/work/project-slug',
  category: 'Category Name'
}
```

### Add a New Page

1. Create `src/pages/newpage.astro`
2. Add navigation link in `src/components/Navigation.astro`
3. Use BaseLayout and include Navigation/Footer components

### Update Social Links

Edit the `socialLinks` array in `src/components/Footer.astro`

## Migration Notes

Previous Jekyll content locations (on `main` branch):
- Portfolio items: `_portfolio/`
- Blog posts: `_posts/`
- Publications: `_publications/`
- Images: `images/` (organized by date/project)
- Files: `files/` (PDFs, documents)

To migrate content, copy images to `public/` and convert Markdown frontmatter to Astro project objects.

## Internationalization (i18n)

The site supports English and Traditional Chinese (繁體中文).

**Translation Management:**
- All translations centralized in `src/i18n/translations.ts`
- See `TRANSLATIONS.md` for detailed guide
- URL structure: `/` (English), `/zh/` (Traditional Chinese)
- Language detection automatic from URL path
- Dropdown language selector in navigation

**Adding Translations:**
```typescript
// In src/i18n/translations.ts
en: {
  newSection: {
    text: 'English text'
  }
},
zh: {
  newSection: {
    text: '中文文字'
  }
}
```

## TypeScript

The project uses TypeScript with "strictest" settings. Component props should be typed with interfaces.
