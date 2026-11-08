import "server-only";
import type { Locale } from "@/i18n/config";
import { chrome, type Chrome } from "@/i18n/messages/chrome";

const dictionaries = {
  pt: () => Promise.resolve(chrome.pt),
  en: () => Promise.resolve(chrome.en),
} satisfies Record<Locale, () => Promise<Chrome>>;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
