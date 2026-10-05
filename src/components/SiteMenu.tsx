"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

interface SiteMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    href: "/mapas",
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
        name: "OBSERVATÓRIO NACIONAL DE MOBILIDADE SUSTENTÁVEL",
        href: "https://observatorio.insper.edu.br/",
        description: "OBSERVATÓRIO NACIONAL DE MOBILIDADE SUSTENTÁVEL",
        label: (
          <>
            OBSERVATÓRIO NACIONAL DE
            <br />
            MOBILIDADE SUSTENTÁVEL
          </>
        ),
      },
    ],
  },
  {
    name: "SOBRE",
    href: "/sobre",
  },
];

export function SiteMenu({ isOpen, onClose }: SiteMenuProps) {
  const pathname = usePathname();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-background-2 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex justify-end p-6">
        <button
          type="button"
          onClick={handleClose}
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
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
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
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClose}
                      className="group/sub block"
                    >
                      <div className="font-gt-ultra text-2xl md:text-3xl font-medium text-gray-500 dark:text-gray-400 group-hover/sub:text-black dark:group-hover/sub:text-white transition-all duration-300">
                        {subItem.label ?? subItem.name}
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
              onClick={handleClose}
              className={`group block text-right transition-all duration-500 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
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
  );
}
