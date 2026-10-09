"use client";

import { cva } from "class-variance-authority";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "@/components/external-link";
import { ThemeToggle } from "@/components/theme-toggle";
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
  return pathname === "/mapas";
}

function footerLabel(label: string) {
  return label.replace(/\n/g, " ");
}

function SitemapLink({ child }: { child: NavChild }) {
  const label = footerLabel(child.label);

  if (isExternalHref(child.href)) {
    return (
      <ExternalLink href={child.href} className={footerLink()}>
        {label}
      </ExternalLink>
    );
  }

  return (
    <Link href={child.href} className={footerLink()}>
      {label}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();

  if (hidesFooter(pathname)) return null;

  return (
    <footer className="border-t border-border bg-background font-gt-ultra-fine text-foreground">
      <div
        className={cn(
          "grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]",
          SITE_GUTTER,
        )}
      >
        <div>
          <p className="font-inter text-2xl tracking-wide">Portal Cidados</p>
          <p className="mt-2 text-sm text-foreground/50">
            <span className="block">Centro de Estudos das Cidades</span>
            <span className="block">Laboratório Arq.Futuro do Insper</span>
          </p>
          <ThemeToggle className="mt-6" />
        </div>

        <nav aria-label="Mapa do site">
          <h2 className={footerHeading()}>Mapa do site</h2>
          <ul className="space-y-2 text-sm text-foreground/70">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href} className={footerLink()}>
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {item.children ? (
                  <ul className="mt-2 space-y-2 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <SitemapLink child={child} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={footerHeading()}>Endereço</h2>
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
          <h2 className={footerHeading()}>Contato</h2>
          <a href={`mailto:${CONTACT_EMAIL}`} className={footerTextLink()}>
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <h2 className={footerHeading()}>Redes</h2>
          <div className="flex items-center gap-4 text-foreground/70">
            <ExternalLink href={EXTERNAL_LINKS.linkedin} className={footerLink()}>
              <Linkedin className="size-5" strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">
                LinkedIn do Centro de Estudos das Cidades
              </span>
            </ExternalLink>
            <ExternalLink href={EXTERNAL_LINKS.github} className={footerLink()}>
              <Github className="size-5" strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">GitHub do Insper Cidades</span>
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
            Centro de Estudos das Cidades
          </ExternalLink>
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <ExternalLink
            href={EXTERNAL_LINKS.privacyNotice}
            className={footerLink()}
          >
            Aviso de privacidade
          </ExternalLink>
          <ExternalLink
            href={EXTERNAL_LINKS.privacyPortal}
            className={footerLink()}
          >
            Portal da Privacidade do Insper
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}
