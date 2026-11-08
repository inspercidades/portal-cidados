"use client";

import Link from "next/link";
import { Suspense } from "react";
import { htmlLang, LOCALE_COOKIE, type Locale, locales } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { localeHref } from "@/i18n/routing";
import { useLocale, useSwitchLocaleHref } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * O middleware só consulta o cookie na home sem prefixo. Sem gravar antes do
 * clique, `/` ainda carrega NEXT_LOCALE=en e o 307 devolve o usuário para `/en`.
 */
function rememberLocale(code: Locale) {
  // biome-ignore lint/suspicious/noDocumentCookie: sync, so the next request already carries it
  document.cookie = `${LOCALE_COOKIE}=${code}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`;
}

function LocaleLink({ code, active }: { code: Locale; active: boolean }) {
  const href = useSwitchLocaleHref(code);

  return (
    <Link
      href={href}
      hrefLang={htmlLang[code]}
      prefetch={false}
      aria-current={active ? "true" : undefined}
      onClick={() => rememberLocale(code)}
      className={cn(
        "cursor-pointer font-gt-ultra text-xs font-light uppercase transition-colors duration-300 xl:text-sm",
        active ? "text-foreground" : "text-neutral-400 hover:text-foreground",
      )}
    >
      {code}
    </Link>
  );
}

function LanguageSwitchLinks({ className }: { className?: string }) {
  const lang = useLocale();

  return (
    <div
      role="group"
      aria-label={chrome[lang].nav.language}
      className={cn("flex items-center gap-2", className)}
    >
      {locales.map((code) => (
        <LocaleLink key={code} code={code} active={lang === code} />
      ))}
    </div>
  );
}

function LanguageSwitchFallback({ className }: { className?: string }) {
  const lang = useLocale();

  return (
    <div
      role="group"
      aria-label={chrome[lang].nav.language}
      className={cn("flex items-center gap-2", className)}
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={localeHref(code, "/")}
          hrefLang={htmlLang[code]}
          prefetch={false}
          onClick={() => rememberLocale(code)}
          className="font-gt-ultra text-xs font-light uppercase text-neutral-400 xl:text-sm"
        >
          {code}
        </Link>
      ))}
    </div>
  );
}

/** PT / EN, no mesmo caminho. O fallback evita a busca da query no SSR. */
export function LanguageSwitch({ className }: { className?: string }) {
  return (
    <Suspense fallback={<LanguageSwitchFallback className={className} />}>
      <LanguageSwitchLinks className={className} />
    </Suspense>
  );
}
