import { defineCollection, z } from 'astro:content';
import { siteConfig } from '../config';


// Define the projects collection
const projectsCollection = defineCollection({
  type: 'content',
  schema: ({image}) => z.object({

    coverImage: z.object({
      src: image(),
      alt: z.string(),
    }),
    // Cover image (required)

    // Basic info
    title: z.string(),
    description: z.string(),

    // Tags for filtering
    tags: z.array(z.string()),

    // Tabs - where this project appears (e.g., ["home", "research"])
    tabs: z.array(z.string()),

    // Single category string
    category: z.string(),

    // Localization
    lang: z.enum(siteConfig.languages),

    // Draft status
    isDraft: z.boolean().default(false),

    // CJK language flag (for proper text rendering)
    isCJKLanguage: z.boolean().default(false),

    // Publish date
    publishDate: z.coerce.date(),

    // Optional fields
    updatedDate: z.date().optional(),
    client: z.string().optional(),
    year: z.number().optional(),
    role: z.string().optional(),
    link: z.string().url().optional(), // External project link
    github: z.string().url().optional(), // GitHub repository
  }),
});

export const collections = {
  projects: projectsCollection,
};
