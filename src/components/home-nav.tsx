"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { localeHref } from "@/i18n/routing";
import { useLocale } from "@/i18n/use-locale";
import { isPlainClick, navigateToStories } from "@/lib/story-transition";

const WORD_STEP_MS = 10;
const LINK_STEP_MS = 50;

type HomeLink = {
  label: string;
  href: "/historias" | "/mapas" | "/catalogo-de-dados";
};

export function HomeNav({
  links,
  delayMs,
}: {
  links: readonly HomeLink[];
  delayMs: number;
}) {
  const lang = useLocale();
  const router = useRouter();

  return (
    <nav className="flex flex-wrap items-start gap-x-6 gap-y-2 font-inter text-sm font-semibold [--rise-duration:550ms]">
      {links.map((link, index) => {
        const href = localeHref(lang, link.href);
        const label = (
          <span className="rise-mask">
            <span
              className="rise-item"
              style={{ animationDelay: `${delayMs + index * LINK_STEP_MS}ms` }}
            >
              <span className="inline-flex items-center gap-0.5">
                <span className="underline-offset-4 group-hover:underline">
                  {link.label}
                </span>
                <ArrowUpRight
                  className="size-3 md:size-3.5"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </span>
            </span>
          </span>
        );

        if (link.href === "/historias") {
          return (
            <Link
              key={link.href}
              href={href}
              className="group text-foreground"
              onClick={(event) => {
                if (!isPlainClick(event)) return;
                if (navigateToStories(router.push, href))
                  event.preventDefault();
              }}
            >
              {label}
            </Link>
          );
        }

        return (
          <Link key={link.href} href={href} className="group text-foreground">
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export const HOME_WORD_STEP_MS = WORD_STEP_MS;
