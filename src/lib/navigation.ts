export type NavChild = {
  id: "observatory";
  href: string;
};

export type NavItem = {
  id: "home" | "stories" | "maps" | "catalog" | "projects" | "about";
  href?: string;
  children?: NavChild[];
};

export const NAV_ITEMS: NavItem[] = [
  { id: "home", href: "/" },
  { id: "stories", href: "/historias" },
  { id: "maps", href: "/mapas" },
  { id: "catalog", href: "/catalogo-de-dados" },
  {
    id: "projects",
    children: [
      {
        id: "observatory",
        href: "https://observatorio.insper.edu.br/",
      },
    ],
  },
  { id: "about", href: "/sobre" },
];

export function isExternalHref(href: string) {
  return href.startsWith("http");
}
