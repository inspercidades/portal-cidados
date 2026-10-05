"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { SiteMenu } from "@/components/SiteMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <header className="bg-background border-gray-200 py-6 transition-colors">
        <div className="relative flex items-center justify-between px-4 md:px-8 lg:px-12 mx-auto max-w-[1920px]">
          {/* Lado esquerdo - Logo Portal Cidados (desktop e mobile juntos) */}
          <div className="flex items-center gap-3 md:gap-0 z-10">
            <Link href="/" className="cursor-pointer">
              <div className="relative w-[100px] h-[40px] sm:w-[140px] sm:h-[46px] md:w-[130px] md:h-[50px] lg:w-[140px] lg:h-[57px]">
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

            {/* Logo Centro de Estudos das Cidades - visível apenas no mobile (junto com Portal Cidados) */}
            <Link
              href="https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer md:hidden"
            >
              <div className="relative w-[120px] h-[40px] sm:w-[120px] sm:h-[46px]">
                <Image
                  src="/centro_estudos_cidades.png"
                  alt="Centro de Estudos das Cidades"
                  fill
                  sizes="(max-width: 640px) 120px, 120px"
                  className="object-contain object-left brightness-0 dark:brightness-100"
                  priority
                  quality={100}
                />
              </div>
            </Link>
          </div>

          {/* Centro - Logo Centro de Estudos das Cidades (visível apenas no desktop) */}
          <Link
            href="https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <div className="relative w-[160px] h-[48px] lg:w-[180px] lg:h-[60px]">
              <Image
                src="/centro_estudos_cidades.png"
                alt="Centro de Estudos das Cidades"
                fill
                sizes="(max-width: 1024px) 160px, 180px"
                className="object-contain brightness-0 dark:brightness-100"
                priority
                quality={100}
              />
            </div>
          </Link>

          {/* Lado direito - Switch e Menu */}
          <div className="flex items-center gap-2 md:gap-4 z-10">
            {mounted && (
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            )}
            <button
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleMenu}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <SiteMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
