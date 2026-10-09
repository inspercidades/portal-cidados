export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Histórias", href: "/historias" },
  { label: "Mapas", href: "/mapas" },
  { label: "Catálogo de dados", href: "/catalogo-de-dados" },
  {
    label: "Projetos",
    children: [
      {
        label: "Observatório Nacional de\nMobilidade Sustentável",
        href: "https://observatorio.insper.edu.br/",
      },
    ],
  },
  { label: "Sobre", href: "/sobre" },
];

export function isExternalHref(href: string) {
  return href.startsWith("http");
}
