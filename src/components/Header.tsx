"use client";

import { Switch } from "@/components/ui/switch";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
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

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, closeMenu]);

  const menuItems = [
    {
      name: "HOME",
      href: "/",
    },
    {
      name: "HISTÓRIAS",
      href: "/historias",
    },
    {
      name: "MAPAS",
      href: "/geoportal",
    },
    {
      name: "CATÁLOGO DE DADOS",
      href: "/catalogo-de-dados",
    },
    {
      name: "PROJETOS",
      hasSubItems: true,
      subItems: [
        {
          name: "OBSERVATÓRIO NACIONAL",
          href: "https://observatorio.insper.edu.br/",
          description: "OBSERVATÓRIO NACIONAL DE MOBILIDADE SUSTENTÁVEL",
        },
      ],
    },
    {
      name: "SOBRE",
      href: "/sobre",
    },
  ];

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

            {/* Logo Arq Futuro - visível apenas no mobile (junto com Portal Cidados) */}
            <Link
              href="https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer md:hidden"
            >
              <div className="relative w-[120px] h-[40px] sm:w-[120px] sm:h-[46px]">
                <Image
                  src="/arq_futuro_icon.png"
                  alt="Arquitetura do Futuro"
                  fill
                  sizes="(max-width: 640px) 120px, 120px"
                  className="object-contain object-left dark:invert"
                  priority
                  quality={100}
                />
              </div>
            </Link>
          </div>

          {/* Centro - Logo Arq Futuro (visível apenas no desktop) */}
          <Link
            href="https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <div className="relative w-[160px] h-[48px] lg:w-[180px] lg:h-[60px]">
              <Image
                src="/arq_futuro_icon.png"
                alt="Arquitetura do Futuro"
                fill
                sizes="(max-width: 1024px) 160px, 180px"
                className="object-contain dark:invert"
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

      {/* Menu Full Screen */}
      <div
        className={`fixed inset-0 z-50 bg-background-2 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            type="button"
            onClick={closeMenu}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Fechar menu"
          >
            <X className="h-8 w-8 text-black dark:text-white" />
          </button>
        </div>

        <div className="flex flex-col items-end justify-center h-full px-8 pb-32 space-y-8">
          {menuItems.map((item, index) => {
            if (item.hasSubItems && item.subItems) {
              return (
                <div
                  key={item.name}
                  className={`group/parent text-right transition-all duration-500 ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <div className="font-gt-ultra transition-all duration-300 text-gray-500 dark:text-gray-400 font-medium text-3xl md:text-5xl cursor-pointer group-hover/parent:text-black dark:group-hover/parent:text-white">
                    {item.name}
                  </div>
                  <div className="mt-4 space-y-4 max-h-0 opacity-0 overflow-hidden group-hover/parent:max-h-[500px] group-hover/parent:opacity-100 transition-all duration-500 ease-in-out">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={closeMenu}
                        className="group/sub block"
                      >
                        <div className="font-gt-ultra text-2xl md:text-3xl font-medium text-gray-500 dark:text-gray-400 group-hover/sub:text-black dark:group-hover/sub:text-white transition-all duration-300">
                          {subItem.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href || "#"}
                onClick={closeMenu}
                className={`group block text-right transition-all duration-500 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                }}
              >
                <div
                  className={`font-gt-ultra transition-all duration-300 group-hover:text-black dark:group-hover:text-white ${
                    pathname === item.href
                      ? "text-black dark:text-white font-medium text-3xl md:text-5xl"
                      : "text-gray-500 dark:text-gray-400 font-medium text-3xl md:text-5xl"
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
