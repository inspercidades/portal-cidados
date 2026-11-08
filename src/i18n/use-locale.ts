"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Locale } from "@/i18n/config";
import { localeFromPathname, localeHref, switchLocaleHref } from "@/i18n/routing";

export function useLocale(): Locale {
  return localeFromPathname(usePathname());
}

export function useLocaleHref() {
  const lang = useLocale();
  return useCallback((href: string) => localeHref(lang, href), [lang]);
}

export function useSwitchLocaleHref(next: Locale) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.size > 0 ? `?${searchParams.toString()}` : "";
  return switchLocaleHref(pathname, search, next);
}
