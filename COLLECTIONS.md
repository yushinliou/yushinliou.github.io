# Content Collections Guide

This guide explains how to manage projects using Astro Content Collections in this portfolio site.

## Overview

Projects are managed through Astro's Content Collections system, which provides:
- Type-safe content with Zod schema validation
- Markdown/MDX support for rich content
- Automatic routing via `[slug].astro` dynamic pages
- Multi-category filtering (projects can appear in multiple tabs)
- Bilingual support (English & Traditional Chinese)

## Project Schema

Projects are defined in `src/content/projects/*.md` with the following frontmatter:

```yaml
---
title: "Project Title"                          # Required
description: "Brief project description"        # Optional
categories: ["work", "research", "side"]        # Required - array of categories
image: "/images/project-image.jpg"             # Required
featured: true                                  # Optional - default: false
publishDate: 2024-01-15                        # Required - YYYY-MM-DD
updatedDate: 2024-02-01                        # Optional
tags: ["ux", "research", "design"]             # Optional
client: "Company Name"                         # Optional
year: 2024                                     # Optional
role: "UX Designer & Researcher"               # Optional
link: "https://project-url.com"                # Optional - must be valid URL
github: "https://github.com/user/repo"         # Optional - must be valid URL
lang: "en"                                     # Required - "en" or "zh"
---

# Project Content

Write your project content here using Markdown...
```

## Categories

Projects use a **multi-category system**. Each project can belong to multiple categories:

- `work` - Professional work projects
- `research` - Academic or research projects
- `side` - Personal/side projects
- `custom` - Custom category projects

**Example**: A project with `categories: ["work", "research"]` will appear in both the Work and Research tabs.

## File Structure

```
src/content/
└── projects/
    ├── project-1.md        # English version
    ├── project-1-zh.md     # Chinese version (same slug + "-zh")
    ├── project-2.md
    └── ...
```

## Adding a New Project

### Step 1: Create Project File

Create a new markdown file in `src/content/projects/`:

```bash
# For English
touch src/content/projects/my-new-project.md

# For Chinese (optional)
touch src/content/projects/my-new-project-zh.md
```

### Step 2: Add Frontmatter

```markdown
---
title: "My New Project"
description: "A brief description of what this project does"
categories: ["work", "side"]  # Choose relevant categories
image: "/images/my-project.jpg"
featured: false
publishDate: 2024-10-08
year: 2024
role: "Designer & Developer"
lang: "en"
tags: ["web", "design", "react"]
link: "https://myproject.com"
github: "https://github.com/username/myproject"
---

# My New Project

## Overview

Project content goes here...

## Key Features

- Feature 1
- Feature 2

## Built With

- Technology 1
- Technology 2
```

### Step 3: Add Project Image

Place your project image in the `public/images/` directory and reference it in the frontmatter:

```yaml
image: "/images/my-project.jpg"
```

### Step 4: Build and Verify

The project will automatically appear in the appropriate category tabs based on your `categories` array.

## Creating Bilingual Content

To create a Chinese version of your project:

1. Create a separate file with `-zh` suffix or use `lang: "zh"` in frontmatter
2. Translate all content and frontmatter
3. Use the same slug structure for consistency

**Example:**

```markdown
---
# English: project-1.md
title: "Feel The Way"
lang: "en"
categories: ["work", "research"]
---

---
# Chinese: project-1-zh.md
title: "觸摸地圖"
lang: "zh"
categories: ["work", "research"]
---
```

## How Pages Filter Projects

Each page filters projects by category and language:

```typescript
// Example: src/pages/research.astro
const allProjects = await getCollection('projects', ({ data }) => {
  return data.categories.includes('research') && data.lang === 'en';
});
```

This allows:
- **Work page** (`/`) shows projects with `categories: ["work"]`
- **Research page** (`/research`) shows projects with `categories: ["research"]`
- **Side page** (`/side`) shows projects with `categories: ["side"]`
- **Custom page** (`/custom`) shows projects with `categories: ["custom"]`

## Sorting Logic

Projects are automatically sorted by:
1. **Featured status** - Featured projects appear first
2. **Publish date** - Newest projects appear first

```typescript
const sortedProjects = allProjects.sort((a, b) => {
  if (a.data.featured && !b.data.featured) return -1;
  if (!a.data.featured && b.data.featured) return 1;
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
});
```

## Dynamic Routes

Individual project pages are generated automatically at `/projects/[slug]`:

- `/projects/feel-the-way` - English version
- `/projects/feel-the-way-zh` - Chinese version (if lang="zh")

The `[slug].astro` template handles:
- Rendering markdown content with proper typography
- Displaying project metadata (year, role, tags)
- Showing project links (external link, GitHub)
- Responsive images with aspect-ratio

## Best Practices

1. **Always include required fields**: title, categories, image, publishDate, lang
2. **Use descriptive slugs**: Filename becomes the URL slug (e.g., `my-project.md` → `/projects/my-project`)
3. **Optimize images**: Place images in `public/images/` and use web-optimized formats
4. **Keep consistent naming**: Use kebab-case for filenames (e.g., `my-new-project.md`)
5. **Test both languages**: If creating bilingual content, verify both EN and ZH versions
6. **Use featured sparingly**: Only mark truly important projects as featured
7. **Multiple categories**: Use when appropriate (e.g., research work that's also professional)

## Common Issues

### Project not showing up?

Check:
1. File is in `src/content/projects/` directory
2. Frontmatter includes correct `categories` array
3. `lang` field matches the page language ("en" or "zh")
4. `publishDate` is valid date format (YYYY-MM-DD)
5. Required fields are not missing

### Image not loading?

- Images must be in `public/` directory
- Use absolute path: `/images/project.jpg` (not `./images/project.jpg`)
- Verify file exists and filename matches exactly

### Wrong sort order?

- Check `publishDate` format (must be valid date)
- Use `featured: true` to pin projects to top
- Remember: Newer dates appear first

## Schema Reference

See `src/content/config.ts` for the complete schema definition:

```typescript
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    categories: z.array(z.enum(['work', 'research', 'side', 'custom'])),
    image: z.string(),
    featured: z.boolean().default(false),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
    client: z.string().optional(),
    year: z.number().optional(),
    role: z.string().optional(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    lang: z.enum(['en', 'zh']).default('en'),
  }),
});
```

## Related Documentation

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Typography and styling
- [TRANSLATIONS.md](./TRANSLATIONS.md) - Managing UI translations
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) - Official docs
