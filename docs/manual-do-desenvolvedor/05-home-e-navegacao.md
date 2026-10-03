# 05 — Home e Navegação

[← Voltar ao índice](./README.md)

## Sumário

- [Página inicial (Home)](#página-inicial-home)
- [Vitrine de histórias](#vitrine-de-histórias)
- [Navegação: o componente `Header`](#navegação-o-componente-header)
- [Toggle de tema](#toggle-de-tema)
- [Como adicionar uma página ao shell](#como-adicionar-uma-página-ao-shell)
- [Como adicionar um item ao menu](#como-adicionar-um-item-ao-menu)

---

## Página inicial (Home)

A Home fica em [`src/app/page.tsx`](../../src/app/page.tsx) (fora do route group
`(app)`) e é um **Client Component** (`"use client"`). Estrutura:

```
<div min-h-screen bg-background>
  <Header />                     ← navegação global
  <main>
    <h1> CIDADES@DADOS </h1>      ← título com tamanho de fonte auto-ajustável
    <p> parágrafo de apresentação </p>
    <Link> Histórias | Mapas | Catálogo de dados </Link>  ← CTAs
  </main>
  <StoriesSection />             ← vitrine de histórias com hover animado
</div>
```

O detalhe técnico mais notável é o **auto-ajuste do tamanho do título**: um
`useEffect` faz uma busca binária para achar o maior `font-size` que mantém
`CIDADES@DADOS` em uma única linha, recalculando no `resize`. O título só aparece
(`opacity`) depois de calculado, evitando "salto" visual.

```tsx
// src/app/page.tsx (resumo)
useEffect(() => {
  const adjustFontSize = () => {
    // busca binária entre 1px e 200px pelo maior tamanho que cabe em 1 linha
  };
  adjustFontSize();
  window.addEventListener("resize", adjustFontSize);
  return () => window.removeEventListener("resize", adjustFontSize);
}, []);
```

> A Home **não** usa GSAP nem Three.js. Essas bibliotecas aparecem apenas dentro
> das páginas de história. As animações da home são CSS/JS simples (transições e
> `setInterval` no hover dos cards).

## Vitrine de histórias

A vitrine na home é o componente
[`StoriesSection`](../../src/components/StoriesSection.tsx), que lê os metadados
de [`src/lib/data/stories.ts`](../../src/lib/data/stories.ts) via
`getStoriesForHome()`. Cada história tem `title`, `description`, uma `image`
principal e um array `images` usado para ciclar imagens no hover.

```ts
// src/lib/data/stories.ts
export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[]; // Array de imagens para animação no hover
  href?: string;
}
```

O índice completo em `/historias` é renderizado por
[`StoriesList`](../../src/components/StoriesList.tsx). **Ao publicar uma nova
história, atualize os dois lugares** (ver
[capítulo 06](./06-historias-scrollytelling.md#9-registre-a-história)).

## Navegação: o componente `Header`

Não existe navbar no layout raiz. A navegação é feita pelo
[`Header`](../../src/components/Header.tsx) (`"use client"`), **importado
manualmente em cada página principal** (Home, `/historias`, `/catalogo-de-dados`,
`/sobre`).

> **Exceção:** o `/mapas` tem sua própria UI de tela cheia com sidebar e
> **não** usa o `Header`.

Comportamento do `Header`:

- Logo do Portal (esquerda) + logo do Arq.Futuro (centro no desktop, ao lado no
  mobile), ambos com `dark:invert`.
- Toggle de tema (`Switch`) + botão de menu (hambúrguer) à direita.
- **Menu full-screen** que desliza da direita com transições escalonadas
  (`transitionDelay` por índice).
- Rota ativa destacada via `usePathname()`.
- Fecha com **`Escape`**; trava o scroll do body enquanto aberto.
- Item "PROJETOS" tem subitem externo (Observatório Nacional).

```tsx
// src/components/Header.tsx (itens do menu)
const menuItems = [
  { name: "HOME", href: "/" },
  { name: "HISTÓRIAS", href: "/historias" },
  { name: "MAPAS", href: "/mapas" },
  { name: "CATÁLOGO DE DADOS", href: "/catalogo-de-dados" },
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
  { name: "SOBRE", href: "/sobre" },
];
```

## Toggle de tema

O `Switch` do `Header` alterna entre claro/escuro via `next-themes`. Para evitar
mismatch de hidratação, o toggle só renderiza após `mounted`:

```tsx
{mounted && (
  <Switch
    checked={theme === "dark"}
    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
  />
)}
```

Lembre-se: nas páginas de história o tema é forçado para claro (ver
[capítulo 04](./04-design-system-e-ui.md#temas-darklight-e-force-light-theme)).

## Como adicionar uma página ao shell

1. Crie a rota sob o route group `(app)`:
   `src/app/(app)/minha-pagina/page.tsx`.
2. Se a página deve ter a navegação padrão, **importe e renderize `<Header />`**
   no topo (siga o padrão da Home/`/sobre`).
3. Use tokens de tema (`bg-background`, `text-foreground`) para respeitar
   dark/light.
4. Se a página tiver estado/efeitos/mapas, marque-a como `"use client"`.
5. Adicione o item de menu correspondente (próxima seção).

## Como adicionar um item ao menu

Edite `menuItems` em [`src/components/Header.tsx`](../../src/components/Header.tsx):

```tsx
const menuItems = [
  // ...itens existentes...
  { name: "MINHA PÁGINA", href: "/minha-pagina" },
];
```

- Itens simples: objeto com `name` + `href`.
- Item com submenu: use `hasSubItems: true` e um array `subItems`.
- Links externos abrem normalmente; use `href` absoluto.
- O destaque de rota ativa é automático (via `usePathname()`), desde que o
  `href` corresponda ao pathname.

---

[← 04 — Design System](./04-design-system-e-ui.md) · [Voltar ao índice](./README.md) · [Próximo: 06 — Histórias (Scrollytelling) →](./06-historias-scrollytelling.md)
