export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export const ogLocale: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
};

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
