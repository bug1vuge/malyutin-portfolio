import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ui, type Dictionary } from './ui';

export type Lang = 'ru' | 'en';
export const LANGS: Lang[] = ['ru', 'en'];

/** A value that exists in both languages. */
export type Localized<T = string> = Record<Lang, T>;

/** Content fields may be a plain value (same in both languages) or a localized pair. */
export type MaybeLocalized<T = string> = T | Localized<T>;

const isLocalized = <T,>(v: MaybeLocalized<T>): v is Localized<T> =>
  typeof v === 'object' && v !== null && !Array.isArray(v) && 'ru' in v && 'en' in v;

const STORAGE_KEY = 'lang';

/** ?lang=en in the URL wins, then the saved choice, then the browser language. */
function detectLang(): Lang {
  if (typeof window === 'undefined') return 'ru';
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'ru' || fromUrl === 'en') return fromUrl;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  const browser = (navigator.languages?.[0] ?? navigator.language ?? 'ru').toLowerCase();
  return /^(ru|uk|be|kk)\b/.test(browser) ? 'ru' : 'en';
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** UI dictionary for the current language. */
  t: Dictionary;
  /** Resolve a content field for the current language. */
  tr: <T>(value: MaybeLocalized<T>) => T;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const t = ui[lang];

  // Keep <html lang>, the title and meta description in sync for screen readers and sharing.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.ogTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.meta.ogDescription);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'ru' ? 'ru_RU' : 'en_US');
  }, [lang, t]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t,
      tr: <T,>(v: MaybeLocalized<T>) => (isLocalized(v) ? v[lang] : v),
    }),
    [lang, setLang, t],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
