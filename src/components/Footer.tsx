"use client";

import { cva } from "class-variance-authority";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "@/components/external-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { chrome } from "@/i18n/messages/chrome";
import { localeHref, toInternalPath } from "@/i18n/routing";
import { useLocale } from "@/i18n/use-locale";
import { isExternalHref, NAV_ITEMS, type NavChild } from "@/lib/navigation";
import {
  CONTACT_EMAIL,
  EXTERNAL_LINKS,
  INSPER_ADDRESS,
  SITE_GUTTER,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const footerHeading = cva(
  "mb-4 font-gt-ultra text-xs font-light uppercase tracking-wide text-foreground/50",
);

const footerLink = cva("transition-colors duration-300 hover:text-foreground");

const footerTextLink = cva(
  "text-sm text-foreground/70 transition-colors duration-300 hover:text-foreground",
);

function hidesFooter(pathname: string) {
  const path = toInternalPath(pathname);
  return path === "/mapas" || path === "/historias";
}

function SitemapLink({ child, label }: { child: NavChild; label: string }) {
  const className = cn(footerLink(), "whitespace-pre-line");

  if (isExternalHref(child.href)) {
    return (
      <ExternalLink href={child.href} className={className}>
        {label}
      </ExternalLink>
    );
  }

  return (
    <Link href={child.href} className={className}>
      {label}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();
  const lang = useLocale();
  const copy = chrome[lang];
  const projectsItem = NAV_ITEMS.find((item) => item.id === "projects");
  const sitemapItems = NAV_ITEMS.filter((item) => item !== projectsItem);

  if (hidesFooter(pathname)) return null;

  return (
    <footer className="border-t border-border bg-background font-gt-ultra-fine text-foreground">
      <div
        className={cn(
          "grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))]",
          SITE_GUTTER,
        )}
      >
        <div>
          <p className="font-inter text-2xl tracking-wide">Portal Cidados</p>
          <p className="mt-2 text-sm text-foreground/50">
            <span className="block">{copy.footer.centerLine1}</span>
            <span className="block">{copy.footer.centerLine2}</span>
          </p>
          <ThemeToggle className="mt-6" />
        </div>

        <nav aria-label={copy.footer.sitemap}>
          <h2 className={footerHeading()}>{copy.footer.sitemap}</h2>
          <ul className="space-y-2 text-sm text-foreground/70">
            {sitemapItems.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    href={localeHref(lang, item.href)}
                    className={footerLink()}
                  >
                    {copy.nav[item.id]}
                  </Link>
                ) : (
                  <span>{copy.nav[item.id]}</span>
                )}
                {item.children ? (
                  <ul className="mt-2 space-y-2 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <SitemapLink child={child} label={copy.nav[child.id]} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {projectsItem?.children ? (
          <nav aria-label={copy.nav.projects}>
            <h2 className={footerHeading()}>{copy.nav.projects}</h2>
            <ul className="space-y-2 text-sm text-foreground/70">
              {projectsItem.children.map((child) => (
                <li key={child.href}>
                  <SitemapLink child={child} label={copy.nav[child.id]} />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div>
          <h2 className={footerHeading()}>{copy.footer.address}</h2>
          <ExternalLink
            href={EXTERNAL_LINKS.insperMap}
            className={footerTextLink({ className: "block not-italic" })}
          >
            <address className="not-italic">
              {INSPER_ADDRESS.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </ExternalLink>
        </div>

        <div>
          <h2 className={footerHeading()}>{copy.footer.contact}</h2>
          <a href={`mailto:${CONTACT_EMAIL}`} className={footerTextLink()}>
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <h2 className={footerHeading()}>{copy.footer.social}</h2>
          <div className="flex items-center gap-4 text-foreground/70">
            <ExternalLink
              href={EXTERNAL_LINKS.linkedin}
              className={footerLink()}
            >
              <Linkedin
                className="size-5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="sr-only">
                {copy.footer.linkedin}
              </span>
            </ExternalLink>
            <ExternalLink href={EXTERNAL_LINKS.github} className={footerLink()}>
              <Github className="size-5" strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">{copy.footer.github}</span>
            </ExternalLink>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center gap-x-6 gap-y-2 py-6 text-xs text-foreground/50",
          SITE_GUTTER,
        )}
      >
        <p>
          © {new Date().getFullYear()} Insper ·{" "}
          <ExternalLink href={EXTERNAL_LINKS.centro} className={footerLink()}>
            {copy.footer.center}
          </ExternalLink>
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href={localeHref(lang, "/privacidade")} className={footerLink()}>
            {copy.footer.privacy}
          </Link>
          <ExternalLink
            href={EXTERNAL_LINKS.privacyPortal}
            className={footerLink()}
          >
            {copy.footer.insperPrivacy}
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}
