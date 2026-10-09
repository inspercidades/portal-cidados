"use client";

import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "@/components/external-link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { isExternalHref, NAV_ITEMS } from "@/lib/navigation";

const navItemClass = cva(
  "h-auto w-max rounded-none bg-transparent p-0 font-gt-ultra text-xs font-light whitespace-nowrap transition-colors duration-300 hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground data-[active=true]:bg-transparent data-[active=true]:text-foreground data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent xl:text-sm",
  {
    variants: {
      active: {
        true: "text-foreground",
        false: "text-gray-400",
      },
      openable: {
        true: "flex items-center [&_svg]:top-0 data-[state=open]:bg-transparent data-[state=open]:text-foreground data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
      openable: false,
    },
  },
);

const navChildClass = cva(
  "block rounded-none bg-transparent p-0 font-gt-ultra text-xs font-light whitespace-nowrap text-gray-400 hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground",
);

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu
      viewport={false}
      aria-label="Menu principal"
      className="hidden max-w-none flex-none lg:flex"
    >
      <NavigationMenuList className="gap-6 xl:gap-8">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger
                className={navItemClass({ active: false, openable: true })}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="right-0 left-auto w-max rounded-none border-border bg-background-2 px-5 py-4 text-right shadow-xl group-data-[viewport=false]/navigation-menu:rounded-none md:w-max">
                {item.children.map((child) => (
                  <NavigationMenuLink key={child.href} asChild className={navChildClass()}>
                    {isExternalHref(child.href) ? (
                      <ExternalLink href={child.href}>{child.label}</ExternalLink>
                    ) : (
                      <Link href={child.href}>{child.label}</Link>
                    )}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink
                asChild
                active={pathname === item.href}
                className={navItemClass({ active: pathname === item.href })}
              >
                <Link href={item.href || "#"}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
