"use client";

import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { ExternalLink } from "@/components/external-link";
import { isExternalHref, NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface SiteMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const mobileItemClass = cva(
  "font-gt-ultra text-3xl font-medium uppercase transition-all duration-300 md:text-5xl",
  {
    variants: {
      active: {
        true: "text-black group-hover:text-black dark:text-white dark:group-hover:text-white",
        false:
          "text-gray-500 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white",
      },
    },
  },
);

const mobileChildClass = cva(
  "whitespace-pre-line font-gt-ultra text-2xl font-medium uppercase text-gray-500 transition-all duration-300 group-hover/sub:text-black md:text-3xl dark:text-gray-400 dark:group-hover/sub:text-white",
);

export function SiteMenu({ isOpen, onClose, className }: SiteMenuProps) {
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
      className={cn(
        "fixed inset-0 z-50 bg-background-2 transition-all duration-300 ease-in-out",
        isOpen ? "visible opacity-100" : "invisible opacity-0",
        className,
      )}
    >
      <div className="flex justify-end p-6">
        <button
          type="button"
          onClick={handleClose}
          className="p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Fechar menu"
        >
          <X className="size-8 text-black dark:text-white" />
        </button>
      </div>

      <div className="flex h-full flex-col items-end justify-center space-y-8 px-8 pb-32">
        {NAV_ITEMS.map((item, index) => {
          const motion = cn(
            "text-right transition-all duration-500",
            isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
          );

          if (item.children) {
            return (
              <div
                key={item.label}
                className={cn("group/parent", motion)}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                }}
              >
                <div
                  className={cn(
                    mobileItemClass({ active: false }),
                    "cursor-pointer group-hover/parent:text-black dark:group-hover/parent:text-white",
                  )}
                >
                  {item.label}
                </div>
                <div className="mt-4 max-h-0 space-y-4 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover/parent:max-h-[500px] group-hover/parent:opacity-100">
                  {item.children.map((child) => {
                    const className = "group/sub block";
                    const label = (
                      <div className={mobileChildClass()}>{child.label}</div>
                    );

                    if (isExternalHref(child.href)) {
                      return (
                        <ExternalLink
                          key={child.href}
                          href={child.href}
                          onClick={handleClose}
                          className={className}
                        >
                          {label}
                        </ExternalLink>
                      );
                    }

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleClose}
                        className={className}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href || "#"}
              onClick={handleClose}
              className={cn("group block", motion)}
              style={{
                transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className={mobileItemClass({ active: pathname === item.href })}>
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
