# Translation Management Guide

All translations are managed in a single file: `src/i18n/translations.ts`

## How to Add/Edit Translations

### 1. Edit the translations file

Open `src/i18n/translations.ts` and add or modify text in both the `en` and `zh` sections:

```typescript
export const translations = {
  en: {
    site: {
      title: 'Portfolio',  // Change this to update site title
      description: 'Portfolio website'
    },
    nav: {
      work: 'Work',
      // Add more nav items...
    },
    // Add new sections as needed
  },
  zh: {
    site: {
      title: '作品集',  // Chinese version
      description: '作品集網站'
    },
    nav: {
      work: '作品',
      // Add corresponding Chinese translations...
    },
  }
}
```

### 2. Use translations in your pages

In any Astro page, import and use translations:

```astro
---
import { useTranslations } from '../i18n/translations';

const t = useTranslations('en');  // or 'zh' for Chinese
---

<h1>{t.site.title}</h1>
<p>{t.about.bio1}</p>
```

### 3. Available Translation Keys

Current structure:
- `site.title` - Site title (shown in navigation)
- `site.description` - Site description
- `nav.*` - All navigation items
- `pageTitle.*` - Page titles for browser tab
- `about.*` - About page content
- `custom.*` - Custom page content
- `category.*` - Project category labels

## Benefits of This Approach

✅ **Centralized** - All translations in one file
✅ **Type-safe** - TypeScript ensures you use valid keys
✅ **Easy maintenance** - Change text once, updates everywhere
✅ **Consistent** - No duplicate translations across pages
✅ **Organized** - Grouped by section/feature

## Adding a New Page with Translations

1. Add translations to `translations.ts`:
```typescript
// In both en and zh sections
newPage: {
  heading: 'New Page' / '新頁面',
  content: 'Some text' / '一些文字'
}
```

2. Use in your page:
```astro
---
import { useTranslations } from '../i18n/translations';
const t = useTranslations('en');
---

<h1>{t.newPage.heading}</h1>
<p>{t.newPage.content}</p>
```

## Language Detection

The system automatically detects language from the URL:
- `/` = English
- `/zh/` = Traditional Chinese

Navigation links and language switcher update automatically.
