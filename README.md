# Portfolio Website

A minimalist portfolio website built with [Astro](https://astro.build), inspired by the clean design of ranzhourobot.com.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:4321`

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── ProjectGrid.astro
│   ├── layouts/         # Page layouts
│   │   └── BaseLayout.astro
│   └── pages/           # File-based routing
│       ├── index.astro      # Work (homepage)
│       ├── research.astro   # Research projects
│       ├── side.astro       # Side projects
│       ├── custom.astro     # Custom section
│       └── about.astro      # About page
└── package.json
```

## 🎨 Customization

### Add Projects

Edit the projects array in the relevant page file:

```javascript
const projects = [
  {
    title: 'Project Name',
    image: '/project-image.jpg',
    link: '/work/project-slug',
    category: 'Category'
  },
  // Add more projects...
];
```

### Update Navigation

Edit `src/components/Navigation.astro` to modify tabs:

```javascript
const navItems = [
  { name: 'Work', href: '/' },
  { name: 'Research', href: '/research' },
  // Add or modify tabs...
];
```

### Change Social Links

Edit `src/components/Footer.astro` to update social media links.

### Update Site Info

Edit `astro.config.mjs` to change site URL and other configuration.

## 📦 Deployment

This site is configured to deploy to GitHub Pages automatically via GitHub Actions.

### Setup GitHub Pages

1. Go to Settings → Pages in your GitHub repository
2. Set Source to "GitHub Actions"
3. Push to the `portfolio` branch to trigger deployment

The workflow file is located at `.github/workflows/deploy.yml`

## 🧰 Tech Stack

- **Framework:** [Astro](https://astro.build) v5.14
- **Language:** TypeScript (strictest mode)
- **Styling:** Scoped CSS in components
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions

## 📝 Features

- ✨ Minimalist, clean design
- 🎯 File-based routing
- 📱 Fully responsive
- 🚀 Optimized static output
- ♿ Semantic HTML
- 🎨 Project grid layout
- 🔗 Easy navigation

## 📄 License

This project structure is open source and available for personal use.
