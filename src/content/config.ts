import { defineCollection, z } from 'astro:content';

// Define the projects collection
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic info
    title: z.string(),
    description: z.string().optional(),

    // Categories - array of strings to support multiple tabs
    // Valid values: 'work', 'research', 'side', 'custom'
    categories: z.array(z.enum(['work', 'research', 'side', 'custom'])),

    // Project metadata
    image: z.string(), // Path to project image (relative to public/)
    featured: z.boolean().default(false), // Featured projects appear first

    // Dates
    publishDate: z.date(),
    updatedDate: z.date().optional(),

    // Optional fields
    tags: z.array(z.string()).optional(), // Additional tags beyond categories
    client: z.string().optional(),
    year: z.number().optional(),
    role: z.string().optional(),
    link: z.string().url().optional(), // External project link
    github: z.string().url().optional(), // GitHub repository

    // Localization
    lang: z.enum(['en', 'zh']).default('en'),
  }),
});

export const collections = {
  projects: projectsCollection,
};
