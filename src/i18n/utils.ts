import { type Language, defaultLang } from './translations';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang === 'zh') return 'zh';
  return defaultLang;
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);

  // If first part is a language code, remove it
  if (parts[0] === 'zh' || parts[0] === 'en') {
    parts.shift();
  }

  return '/' + parts.join('/');
}

export function translatePath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}
