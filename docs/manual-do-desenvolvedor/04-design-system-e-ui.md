# 04 — Design System e UI

[← Voltar ao índice](./README.md)

## Sumário

- [Figma: a fonte da verdade visual](#figma-a-fonte-da-verdade-visual)
- [Tailwind CSS v4 (CSS-first)](#tailwind-css-v4-css-first)
- [Tokens de tema e cores](#tokens-de-tema-e-cores)
- [Temas dark/light e `force-light-theme`](#temas-darklight-e-force-light-theme)
- [Tipografia](#tipografia)
- [Shadcn/UI e componentes base](#shadcnui-e-componentes-base)
- [Utilitários de CSS customizados](#utilitários-de-css-customizados)
- [Boas práticas de UI](#boas-práticas-de-ui)

---

## Figma: a fonte da verdade visual

O **guia de estilo, os protótipos de tela e os componentes** são mantidos no
Figma. Antes de implementar qualquer tela ou ajustar layout, consulte o arquivo
e siga as definições de cor, tipografia e espaçamento de lá.

- **[Figma — Insper / Portal Cidados](https://www.figma.com/design/OtdMzKBFGyp11J83d1CEZe/Insper?node-id=622-2&p=f&t=jMWSa84eSwBGp2ii-0)**

Quando o Figma e o código divergirem, alinhe com o time de design antes de
"corrigir" — o guia de estilo pode ter evoluído.

## Tailwind CSS v4 (CSS-first)

O projeto usa **Tailwind CSS v4**, que dispensa o arquivo `tailwind.config.js`.
Toda a configuração de tema vive em
[`src/app/globals.css`](../../src/app/globals.css), usando as diretivas
CSS-first do Tailwind v4:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "mapbox-gl-compare/dist/mapbox-gl-compare.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --breakpoint-3xl: 120rem;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-gt-ultra: var(--font-gt-ultra);
  /* ...tokens mapeados para utilitários Tailwind... */
}
```

O bloco `@theme inline` expõe as CSS variables como utilitários do Tailwind
(ex.: `bg-background`, `text-foreground`, `font-gt-ultra`, `bg-background-2`).
O PostCSS é configurado em [`postcss.config.mjs`](../../postcss.config.mjs).

> O Biome está configurado com `noUnknownAtRules: off` justamente para aceitar
> as at-rules do Tailwind v4 (`@theme`, `@custom-variant`, `@apply`).

## Tokens de tema e cores

As cores seguem o padrão Shadcn (base "neutral") em espaço **oklch**, com alguns
tokens customizados. Definidas em `:root` (claro) e `.dark` (escuro):

| Token | Claro (`:root`) | Escuro (`.dark`) | Uso |
|---|---|---|---|
| `--background` | `#ffffff` | `#0e161d` | Fundo principal |
| `--background-2` | `#f2f2f2` | `#151c22` | Overlay do menu / fundos secundários |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Texto principal |
| `--secondary` | `#e8e8e8` | `#172530` | Botões CTA da home |
| `--radius` | `0.625rem` | `0.625rem` | Raio base (deriva `sm/md/lg/xl`) |

Além destes, o conjunto completo do Shadcn está presente: `primary`, `muted`,
`accent`, `destructive`, `border`, `input`, `ring`, `chart-1..5` e a família
`sidebar-*`. Sempre prefira **tokens** a cores hardcoded, para respeitar o tema.

## Temas dark/light e `force-light-theme`

- O tema é controlado por **`next-themes`** (`attribute="class"`), alternando a
  classe `dark` no `<html>`. O toggle fica no `Header` (ver
  [capítulo 05](./05-home-e-navegacao.md)).
- **Páginas de história forçam o tema claro** por meio da classe
  `.force-light-theme`, aplicada no layout `(stories)`. Essa classe redefine
  todos os tokens para os valores claros e fixa `color-scheme: light`,
  garantindo que a narrativa sempre apareça em modo claro.

Ao criar UI que deve respeitar o tema, use os tokens (`bg-background`,
`text-foreground`, etc.). Ao criar UI que sempre deve ser clara (dentro de
histórias), você herda `force-light-theme` automaticamente.

## Tipografia

As fontes são carregadas no layout raiz e expostas como utilitários Tailwind:

| Utilitário | Fonte | Uso típico |
|---|---|---|
| `font-gt-ultra` | GT Ultra | Títulos de marca (ex.: `CIDADES@DADOS`, itens do menu) |
| `font-gt-ultra-fine` | GT Ultra Fine | Texto de destaque/lead (ex.: parágrafo da home) |
| `font-inter` | Inter | Texto corrido em histórias |
| `font-sans` | Geist Sans | Padrão de UI |
| `font-mono` | Geist Mono | Trechos monoespaçados |

Os arquivos `.otf` de GT Ultra ficam em `src/app/assets/fonts/GT_Ultra/` e são
declarados via `next/font/local` em [`layout.tsx`](../../src/app/layout.tsx).

## Shadcn/UI e componentes base

A configuração do Shadcn está em [`components.json`](../../components.json):
estilo **"new-york"**, `cssVariables: true`, ícones **lucide**, aliases
`@/components`, `@/lib/utils` e `@/hooks`.

Os primitivos ficam em [`src/components/ui/`](../../src/components/ui). Alguns
têm variantes específicas para tema claro (`slider-light.tsx`,
`switch-light.tsx`), usadas dentro do geoportal/histórias.

Utilitário central de composição de classes — sempre use-o ao combinar classes
condicionais:

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Para adicionar um novo primitivo, prefira a CLI do Shadcn (mantém o padrão e as
dependências Radix corretas) em vez de escrever do zero.

## Utilitários de CSS customizados

Em [`globals.css`](../../src/app/globals.css) existem utilitários próprios que
você pode reaproveitar:

| Classe | Função |
|---|---|
| `.responsive-title` | Título responsivo com `clamp()` (breakpoints em 640/1024px) |
| `.force-light-theme` | Redefine tokens para o tema claro (usada em histórias) |
| `.scrollbar-hide` | Esconde a scrollbar (Firefox/IE/WebKit) |
| `.slider-adensamento` | Slider verde customizado (história `adensamento`) |
| Regras `.mapboxgl-ctrl*` | Ocultam o logo/atribuição padrão do Mapbox |

## Boas práticas de UI

- **Responsividade primeiro:** use os breakpoints do Tailwind (`md:`, `lg:`,
  `xl:`, e o customizado `3xl`). O grid do catálogo, por exemplo, vai de 1 a 3
  colunas.
- **Acessibilidade:** botões com `aria-label`, foco visível, navegação por
  teclado (o `Header` fecha o menu com `Escape`). Ver
  [capítulo 09](./09-boas-praticas.md).
- **Ícones:** use `lucide-react` (já é a biblioteca padrão do Shadcn aqui).
- **Não hardcode cores** que existam como token — isso quebra o dark mode.
- **Imagens:** use `next/image` sempre que possível (ver `Header` como exemplo).

---

[← 03 — Arquitetura](./03-arquitetura-e-convencoes.md) · [Voltar ao índice](./README.md) · [Próximo: 05 — Home e Navegação →](./05-home-e-navegacao.md)
