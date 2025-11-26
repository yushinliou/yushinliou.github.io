export const languages = {
  en: 'English',
  zh: '繁體中文'
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    // Site
    site: {
      title: 'Lexi Yushin Liou',
      description: 'Portfolio website'
    },

    // Navigation
    nav: {
      home: 'Home',
      allWork: 'All Work',
      work: 'Work',
      research: 'Research',
      side: 'Side',
      custom: 'Custom',
      about: 'About',
      cv: 'CV'
    },

    // Page titles
    pageTitle: {
      home: 'Portfolio - Home',
      work: 'Portfolio - Work',
      research: 'Portfolio - Research',
      side: 'Portfolio - Side Projects',
      custom: 'Portfolio - Custom',
      about: 'Portfolio - About'
    },

    // About page
    about: {
      heading: 'About',
      bio1: 'I’m a Taiwanese student pursuing a Master’s degree in Interactive Media Technology at KTH. Before moving to Stockholm, I spent one year at UC Berkeley and three years at National Taiwan University. During my time at NTU, my main research interest centered on computational social science using social media data. Later in California, I shifted my focus toward LLM-based agent simulations of social behavior. In my current master’s program, I’m broadly exploring human–machine interaction, with a focus on enhancing the quality of user experience in interactive systems. My most recent project is Pastedown, an iOS app born from my frustration with converting rich text into clean, Markdown-formatted blog posts.',
      bio2: '🍄‍🟫 Outside of coding, I’m exploring the best mushroom-picking spots around Stockholm.'
    },

    // Custom page
    custom: {
      heading: 'Custom Section',
      text1: 'This is your customizable section. You can add any content here that doesn\'t fit into the other categories.',
      text2: 'Use this space for special projects, collections, or any other content you\'d like to showcase.'
    },

    // Project categories (for sample data)
    category: {
      design: 'Design',
      development: 'Development',
      research: 'Research',
      interactive: 'Interactive',
      art: 'Art',
      academic: 'Academic',
      publication: 'Publication',
      personal: 'Personal',
      experimental: 'Experimental'
    }
  },
  zh: {
    // Site
    site: {
      title: '作品集',
      description: '作品集網站'
    },

    // Navigation
    nav: {
      home: '首頁',
      allWork: '所有作品',
      work: '作品',
      research: '研究',
      side: '其他',
      custom: '客製',
      about: '關於',
      cv: '履歷'
    },

    // Page titles
    pageTitle: {
      home: '作品集 - 首頁',
      work: '作品集 - 作品',
      research: '作品集 - 研究',
      side: '作品集 - 其他',
      custom: '作品集 - 客製',
      about: '作品集 - 關於'
    },

    // About page
    about: {
      heading: '關於',
      bio1: '這是您的關於頁面。在此添加您的簡介、背景和興趣。',
      bio2: '您可以自訂此部分，包含有關您的工作、教育、獎項或任何您想分享的內容。'
    },

    // Custom page
    custom: {
      heading: '客製內容',
      text1: '這是您的客製化內容區域。您可以在此添加任何不屬於其他類別的內容。',
      text2: '使用此空間展示特殊專案、收藏品或任何您想展示的其他內容。'
    },

    // Project categories (for sample data)
    category: {
      design: '設計',
      development: '開發',
      research: '研究',
      interactive: '互動',
      art: '藝術',
      academic: '學術',
      publication: '出版',
      personal: '個人',
      experimental: '實驗'
    }
  }
} as const;

export function useTranslations(lang: Language) {
  return translations[lang];
}

export const defaultLang: Language = 'en';
