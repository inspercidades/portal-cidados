export const COOKIE_CONSENT_NAME = "cookie-consent";
export const OPEN_COOKIE_PREFERENCES_EVENT = "cidados:open-cookie-preferences";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export type CookieConsentChoice = "granted" | "denied";

export function readCookieConsent(): CookieConsentChoice | null {
  const prefix = `${COOKIE_CONSENT_NAME}=`;
  const entry = document.cookie
    .split("; ")
    .find((part) => part.startsWith(prefix));

  if (!entry) return null;

  const value = entry.slice(prefix.length);
  if (value === "granted" || value === "denied") return value;
  return null;
}

export function writeCookieConsent(choice: CookieConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  // biome-ignore lint/suspicious/noDocumentCookie: grava Max-Age, Path, SameSite e Secure de forma compatível com o banner
  document.cookie = `${COOKIE_CONSENT_NAME}=${choice}; Path=/; Max-Age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax${secure}`;
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
}
