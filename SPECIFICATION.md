# Portfolio Website - Frontend Specification

## 📋 Document Overview
- **Project Name**: Personal Portfolio Website
- **Tech Stack**: Astro, Tailwind CSS, TypeScript
- **Design Reference**: ranzhourobot.com (minimalist style)
- **Version**: 1.0
- **Last Updated**: 2025-11-25

---

## 🎯 Project Goals
Build a minimalist, bilingual (EN/ZH) portfolio website with:
- Clean, responsive design
- Dark/light theme support
- Multi-language content management
- Fast performance (Astro SSG)

---

## 🗂️ Project Structure

```
├── public/
│   ├── favicon/          # All favicon variants
│   └── cv/              # CV files (PDF, DOCX)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── ListItem.astro
│   │   ├── Card.astro
│   │   └── TableOfContents.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/           # File-based routing
│   │   ├── index.astro          # Home (featured projects)
│   │   ├── allWork.astro           # All Work (complete portfolio)
│   │   ├── research.astro       # Research projects
│   │   ├── about.astro          # About page
│   │   └── projects/
│   │       └── [slug].astro     # Individual project pages
│   │   └── zh
│   │       ├── index.astro
│   │       ├── allWork.astro
│   │       ├── research.astro
│   │       ├── about.astro
│   │       └── projects/
│   │           └── [slug].astro     # Individual project pages
│   ├── content/
│   │   └── projects/      # Markdown project files
│   └── config.ts          # Site configuration
└── astro.config.mjs
```

## Favicon

Favicon image place in `public/favicon`, it included:

* android-chrome-192x192.png
* android-chrome-512x512.png
* apple-touch-icon.png
* favicon-16x16.png
* favicon-32x32.png
* favicon.ico
* site.webmanifest

to make sure the compatability across platform.

Here is an example usage to included favicon in website header:

```html
// Example favicon html
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
```

## ⚙️ Configuration (`config.ts`)

```typescript
// Example structure - please define these configs
export const siteConfig = {
  // Site metadata
  title: "Lexi Yu Shin Liou",
  description: "Product designer & Developer",
  subdescription: "Interactive Media Technology @ KTH",

  // Home page
  heroBanner: "path/to/heroBanner.gif" // hero banner place in /assets/hero/heroBanner.gif

  // Avatar
  avatar: "/path/to/avatar.png", // avatar place in /assets/avatar/avatar.png
  
  // Languages
  defaultLanguage: "en",
  languages: ["en", "zh"] as const,
  
  // Footer
  footer: {
    head: "Thank you for stopping by!",
    description: "Made with a lots of iteration, experiment and love ❤️",
  },
  
  // Social links
  social: {
    github: "https://github.com/yushinliou",
    linkedin: "https://www.linkedin.com/in/yu-shin-liou-is-lexi/",
    email: "ysliou@kth.se"
  }
}
```

---

## 🎨 Design System

### Colors
- Use Tailwind's default color palette
- Light theme: white background, gray-900 text
- Dark theme: gray-900 background, white text
- Accent color: #2B5288

### Typography (Nunito Sans)
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Hero title | 50px | 600 | default |
| Hero subtitle | 30px | 500 | gray-500 |
| Body text | 17px | 400 | default |
| Card title | 18px | 600 | default |
| Card date | 17px | 400 | gray-500 |
| Card description | 17px | 400 | default |

### Spacing
- Use Tailwind's spacing scale (4px base unit)
- Container max-width: `max-w-7xl`

### Icons
- Source: [Font Awesome](https://fontawesome.com)
- Examples: 
  - GitHub: `<i class="fab fa-github"></i>`
  - LinkedIn: `<i class="fab fa-linkedin"></i>`
  - Email: `<i class="fas fa-envelope"></i>`

---

## 🧩 Components Specification

### 1. Navigation Bar (`Navigation.astro`)

**Layout:**
```
[Avatar]        Home  All Work  Research  About  CV [Languages ▾] [🌙/☀️]
←left           right→
```

**Requirements:**
- **Position**: Sticky top, always visible on scroll
- **Background**: Translucent with backdrop blur (`backdrop-blur-md bg-white/80 dark:bg-gray-900/80`)
- **Avatar**: 
  - Size: 40x40px (circle)
  - Click → Navigate to home (language-aware: `/` or `/zh`)
  - Image path from `config.ts`
- **Nav Links**: 
  - **Home** (`/` or `/zh`): Featured projects only
  - **All Work** (`/allwork`): Complete portfolio with filtering
  - **Research** (`/research`): Research projects only
  - **About** (`/about`): About page
  - **CV**: Link to PDF
  - Active state: bold
  - Hover: backgound color change to gray
- **Theme Toggle**:
  - Light mode shows: `<i class="fas fa-moon"></i>` (gray → black on hover)
  - Dark mode shows: `<i class="fas fa-sun"></i>` (gray → white on hover)
  - Toggle with smooth transition
- **Language Switcher**: See dedicated component below

**Responsive:**
- Mobile: hide text for language menu, keep icons

---

### 2. Language Switcher (`LanguageSwitcher.astro`)

**Layout:**
```
[🌐 Languages ▾]  ←Click to expand
  ├─ English ✓
  └─ 中文
```

**Requirements:**
- Dropdown menu (closed by default)
- Shows current language with checkmark
- Click or hover to expand (please specify which)
- On selection:
  - Change URL path: `/about` ↔ `/zh/about`
  - Persist user choice (localStorage?)
- Icon: `<i class="fas fa-globe"></i>` and `<i class="caret-down"></i>`

---

### 3. Footer (`Footer.astro`)

**Layout:**
```
[Footer Head]              [GitHub] [LinkedIn] [Email]
[Footer Description]                    ←right aligned
© 2025 Your Name
```

**Requirements:**
- Two-column layout (left: text, right: icons)
- Text from `config.ts`
- Social icons:
  - Size: 24x24px
  - Hover: color change (gray to black in light mode, or gray to white in dark mode)
  - Icons link to URLs in config
- Copyright text: auto-update year

**Responsive:**
- Mobile: Stack vertically, center align

---

### 4. List Item (`ListItem.astro`)

**Used in:** Home page, Research page

**Structure:**
- Cover image (aspect ratio 16:9, please confirm)
- Title (from markdown frontmatter)
- Description (truncate to 2-3 lines with `...`)
- Tags (pill-shaped badges): when click to it, will link to the allWork page with project filtered with selected tag
- "Read more" button, square with sm-round and accent color, change the color to deeper when hover in light mode (or change the color to brighter in dark mode), text with 20px and weight-600

**Interaction:**
- Hover: change the color of object
- Click: Navigate to project detail page

---

### 5. Card Component (`Card.astro`)

**Used in:** All Work page

**Structure:**
```
┌─────────────────┐
│  Cover Image    │
├─────────────────┤
│ Title           │
│ 2025-01-15      │ ←publishDate
│ Category badge  │
│ Description...  |
│ Tags            | -> (pill-shaped badges): when click to it, will link to the allWork page with project filtered with selected tag
└─────────────────┘
```

**Interaction:**
- Hover: gray background + shallow become bigger
- Click: Navigate to project page

**Responsive:**
- Wide Desktop: 4 columns grid
- Normal Desktop: 3 columns grid
- Tablet: 2 columns
- Mobile: 1 column

---

## 📄 Page Specifications

### Home Page (`index.astro`)

**Purpose:** Landing page showcasing curated/featured projects only

**Section 1: Hero**

- Two-column layout:
  - **Left**: Text content (title, subtitle, description from config)
  - **Right**: SVG icons with hover tooltips
    - Example icons: UC Berkeley, NTU, KTH logos
    - Tooltip example: "Currently studying in Stockholm"
- Center aligned on screen

- Full-width GIF banner above two-colum layout (using `assets/banner/walkduck500ms.gif`)

**Section 2: Featured Projects**
- **Filter logic**: Display ONLY projects where `tabs` array includes "home"
- Use `ListItem` component
- Sort by `publishDate` (newest first?)
- This is a curated selection, NOT all projects

**Example:**
```yaml
# This project WILL appear on Home page
tabs: ["home", "research"]

# This project will NOT appear on Home page
tabs: ["research"]
```

---

### All Work Page (`/allwork.astro`)

**Purpose:** Complete portfolio with filtering capability

**Tag Filter:**
- Top of page (in small screen): tag list, example:
```
        [tag1] [tag1] [tag1]
    [tag1] [tag1] [tag1] [tag1] [tag1]
        [tag1] [tag1] [tag1]
```
- In wide screen tag list should be in the left side of the screen
- Tags collected from all non-draft projects
- Initial state: "All Categories" (shows all projects)
- Click tag → filter projects by selected tag
- Only one tag selectable at a time
- Selected tag: color change to black in light mode, change to white in light mode
- Hover effect: background color change to gray

**Project Grid:**
- Use `Card` component
- Display **ALL projects** (regardless of `tabs` value)
- Exclude only drafts (`isDraft: true`)
- Sort by `publishDate` (newest first?)
- Exclude project not current language (using font matter `language` to distinguish project language)

**Difference from Home:**
- Home: Curated projects (only those with `tabs: ["home"]`)
- All Work: Complete portfolio (all published projects)

---

### Research Page (`research.astro`)

- Display projects where `tabs` includes "research"
- Use `ListItem`
- Same layout as Home page projects section?

---

### Individual Project Page (`/projects/[slug].astro`)

**Purpose:** Detailed view of a single project with markdown content

**Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│ [Navigation Bar - same as other pages]              │
├──────────────────────────┬──────────────────────────┤
│                          │  TABLE OF CONTENTS       │
│                          │  ┌──────────────────┐   │
│  PROJECT CONTENT         │  │ • Introduction   │   │
│                          │  │ • Design Process │←─ │
│  # Project Title         │  │ • Results        │   │
│                          │  │ • Conclusion     │   │
│  ## Introduction         │  └──────────────────┘   │
│  Content here...         │                          │
│                          │  Sticky/Fixed position   │
│  ## Design Process       │  Follows scroll          │
│  Content here...         │                          │
│                          │                          │
│  ## Results              │                          │
│  Content here...         │                          │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
     70% width                   30% width
```

**Table of Contents Component** (`TableOfContents.astro`)

**Requirements:**

1. **Position & Layout:**
   - Right sidebar, fixed/sticky position
   - Width: ~30% of content area
   - Top offset: Below main navigation bar
   - Desktop only (hide on mobile/tablet)

2. **Content Generation:**
   - Auto-generate from markdown `## headings` (h2 only, not h1)
   - Extract heading text and create anchor links
   - Maintain heading hierarchy if using h3 (optional, please specify)

3. **Visual States:**
   - Default text color: `text-gray-500`
   - Active/current section: `text-black dark:text-white`
   - Hover: `text-gray-700 dark:text-gray-300`
   - Font size: 14px or `text-sm`
   - Line height: comfortable spacing for readability

4. **Active Section Detection:**
   - Highlight current section based on scroll position
   - Use Intersection Observer API or scroll event
   - Smooth transition between active states (200ms)

5. **Click Behavior:**
   - Smooth scroll to corresponding section
   - Update URL hash (e.g., `#design-process`)
   - Maintain scroll position on page reload with hash

6. **Styling:**
   ```css
   /* Example structure */
   .toc-link {
     color: gray;
     transition: color 200ms;
   }
   
   .toc-link.active {
     color: black;
     font-weight: 600; /* optional, please specify */
   }
   
   .toc-link:hover {
     color: dark-gray;
   }
   ```

**Project Content Area:**

1. **Width & Spacing:**
   - Content max-width: 70% on desktop
   - Proper spacing from TOC sidebar
   - Full width on mobile (TOC hidden)

2. **Markdown Rendering:**
   - H1: Project title (from frontmatter or first h1)
   - H2: Section headings (used for TOC)
   - H3-H6: Sub-headings
   - Code blocks: Syntax highlighting
   - Images: Responsive, with captions
   - Links: Open external links in new tab

3. **Typography:**
   - Follow design system (Nunito Sans)
   - Proper line height for readability
   - Code font: Monospace (please specify font)

**Example Markdown Structure:**
```markdown
---
title: "My Project"
description: "Project description"
coverImage:
  src: "/images/cover.jpg"
  alt: "Cover"
tags: ["design", "research"]
tabs: ["home"]
category: "UX Research"
lang: "en"
publishDate: 2025-01-15
---

# My Project Title

Brief introduction paragraph...

## Introduction

Content about introduction...

## Design Process

Content about design process...

### Research Phase

Sub-section content... (h3, optional in TOC)

## Results

Content about results...

## Conclusion

Final thoughts...
```

**Responsive Behavior:**
- **Desktop (>1024px)**: Two-column layout with TOC
- **Tablet (768px-1024px)**: TOC hidden or collapsible menu
- **Mobile (<768px)**: TOC hidden, full-width content

**Technical Implementation Notes:**

```typescript
// Example: Extracting headings for TOC
const headings = await getHeadings(); // Astro provides this

// Example heading object:
// { depth: 2, text: "Design Process", slug: "design-process" }

// Generate TOC structure:
const toc = headings
  .filter(h => h.depth === 2) // Only h2
  .map(h => ({
    text: h.text,
    slug: h.slug,
    id: h.slug
  }));
```

```javascript
// Example: Active section detection
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Update active TOC link
      document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.remove('active');
      });
      document
        .querySelector(`a[href="#${entry.target.id}"]`)
        ?.classList.add('active');
    }
  });
}, {
  rootMargin: '-100px 0px -66%',
  threshold: 0
});

// Observe all h2 elements
document.querySelectorAll('h2').forEach(h2 => observer.observe(h2));
```

---

### About Page (`about.astro`)

**Structure:**
- Title + short description (text from config or markdown?)
- Photo gallery at bottom
  - Grid of images

**Photo Hover Interaction:**

**Stage 1: Cursor Changes**
- When cursor enters photo area, it changes to a custom icon
- Icon appears inside a circular badge
- Badge background: accent color `#2B5288`
- Badge size: ~20px diameter

**Stage 2: Animated Expansion**
- Circle badge animates into a pill-shaped badge (rounded rectangle)
- Animation duration: 300ms (please confirm)
- Easing: ease-out or cubic-bezier for smooth expansion

**Stage 3: Description Display**
- Left side: Icon (maintains original icon)
- Right side: Image description text
- Padding inside pill: ~12px vertical, ~16px horizontal
- Text color: white
- Font size: 14px
- Max width: ~200px (text wraps if needed)

**Visual Progression:**
```
Hover starts:           Animating:              Fully expanded:
    ┌─┐                  ┌───┐                ┌───────────────────────────────────────────┐
    │🎨│         →        │🎨 │      →         │🎨 Photo caption (using alt text of photo) │
    └─┘                  └───┘                └───────────────────────────────────────────┘
  (circle)            (expanding)            (pill-shaped)
```


---

### CV Link

- Clicking "CV" in nav → Open `/public/cv/cv.pdf` in new tab

---

## 📝 Content Collections

### Project Schema (`src/content/config.ts`)

```typescript
import { z, defineCollection } from 'astro:content';
import { languages } from '../config';

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    coverImage: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    tabs: z.array(z.string()), // e.g., ["home", "research"]
    category: z.string(),
    lang: z.enum(languages),
    isDraft: z.boolean().default(false),
    isCJKLanguage: z.boolean().default(false),
    publishDate: z.coerce.date(),
  }),
});

export const collections = {
  projects: projectCollection,
};
```

### Example Markdown Frontmatter

```yaml
---
coverImage:
  src: "/images/project-cover.jpg"
  alt: "Project screenshot"
title: "My Awesome Project"
description: "A brief description of the project"
tags:
  - "swift"
  - "case study"
  - "iOS"
tabs: ["home", "research"]
category: "Mobile App"
lang: "en"
isDraft: false
isCJKLanguage: false
publishDate: 2025-01-15
---
```

---

## 🎭 Theme System

### Requirements
- Toggle between light and dark mode
- Persist user preference (localStorage)
- Smooth transition between themes
- Tailwind dark mode: `class` strategy

### Implementation Notes
```javascript
// Example toggle logic
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', theme === 'dark');
```

---

## 🌐 Internationalization (i18n)

### URL Structure
- English: `/`, `/about`, `/research`
- Chinese: `/zh`, `/zh/about`, `/zh/research`

### Content Strategy
- Project markdown files filtered by `lang` field
- UI strings: from config or separate i18n file? (please specify)

### Language Switching
- Should maintain current page context (e.g., `/about` → `/zh/about`)
- What happens if content doesn't exist in target language?

---

## 📱 Responsive Design

### Breakpoints (Tailwind defaults)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Key Considerations
- Navigation: Hamburger menu on mobile?
- Grid layouts: Adjust columns per breakpoint
- Typography: Scale down on mobile
- Images: Responsive with `srcset` or Astro Image component

---

## ✨ Interactions & Animations

### Hover Effects
- Cards: scale(1.02) + shadow
- Buttons: color change
- Icons: color change + scale
- Tags: background color change

### Transitions
- Theme toggle: smooth color transition (300ms)
- Page navigation: fade in/out (optional)
- Dropdown menus: slide down (200ms)

### Custom Cursor
- About page photos: custom cursor icon (please provide)

---

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```


## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Font Awesome Icons](https://fontawesome.com/icons)

## 📝 Notes for Developer

- Prioritize semantic HTML for accessibility
- Add appropriate ARIA labels for interactive elements
- Test keyboard navigation (tab order, enter to activate)
- Ensure color contrast meets WCAG AA standards
- Test on multiple browsers (Chrome, Firefox, Safari)
- Validate responsive design on real devices

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-25 | Initial specification |

