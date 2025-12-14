// Site Configuration
export const siteConfig = {
  // Site metadata
  title: "Hi, I'm Lexi Yu Shin Liou.",
  description: "Product designer bridging social research and technology",
  subdescription: "I bridge social research and product design to build accessible, inclusive tools that work across cultures and communities.",
  

  // Home page
  heroBanner: "@/assets/hero/heroBanner.gif", // hero banner place in /assets/hero/heroBanner.gif

  // Avatar
  avatar: "@/assets/avatar/avatar.png", // avatar place in /assets/avatar/avatar.png

  // Languages
  defaultLanguage: "en" as const,
  languages: ["en", "zh"] as const,

  // Footer
  footer: {
    head: "Thank you for stopping by!",
    description: "Made with a lots of iteration, experiment and love ❤️",
    subDescription: "Lexi Yu Shin Liou",
  },

  // Social links
  social: {
    github: "https://github.com/yushinliou",
    linkedin: "https://www.linkedin.com/in/yu-shin-liou-is-lexi/",
    email: "ysliou@kth.se"
  }
} as const;

export type Language = typeof siteConfig.languages[number];
