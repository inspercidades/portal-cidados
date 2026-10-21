"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { DesktopNav } from "@/components/desktop-nav";
import { ExternalLink } from "@/components/external-link";
import { SiteMenu } from "@/components/SiteMenu";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS, SITE_GUTTER } from "@/lib/site";
import { cn } from "@/lib/utils";

const DESKTOP_QUERY = "(min-width: 1024px)";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = () => {
      if (query.matches) setIsMenuOpen(false);
    };

    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <header className="relative z-40 shrink-0 border-gray-200 bg-background py-6 transition-colors">
        <div
          className={cn(
            "relative mx-auto flex max-w-[1920px] items-center justify-between gap-6",
            SITE_GUTTER,
          )}
        >
          <div className="z-10 flex shrink-0 items-center gap-3 md:gap-6 lg:gap-8">
            <Link href="/" className="cursor-pointer">
              <div className="relative h-[40px] w-[100px] sm:h-[46px] sm:w-[140px] md:h-[50px] md:w-[130px] lg:h-[57px] lg:w-[140px]">
                <Image
                  src="/portal_cidados_icon.png"
                  alt="Portal Cidados"
                  fill
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 130px, 140px"
                  className="object-contain object-left dark:invert"
                  priority
                  quality={100}
                />
              </div>
            </Link>

            <ExternalLink
              href={EXTERNAL_LINKS.centro}
              className="cursor-pointer"
            >
              <div className="relative h-[47px] w-[120px] md:h-[59px] md:w-[150px] lg:h-[66px] lg:w-[170px]">
                <Image
                  src="/centro_estudos_cidades.png"
                  alt="Centro de Estudos das Cidades"
                  fill
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 170px"
                  className="object-contain object-left brightness-0 dark:brightness-100"
                  priority
                  quality={100}
                />
              </div>
            </ExternalLink>
          </div>

          <div className="z-10 flex items-center gap-2 md:gap-4 lg:gap-6">
            <DesktopNav />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
      </header>

      <SiteMenu isOpen={isMenuOpen} onClose={closeMenu} className="lg:hidden" />
    </>
  );
}
