# 11 — SEO e Monitoramento

[← Voltar ao índice](./README.md)

Este capítulo descreve o que o Portal Cidados já implementa para indexação e
como acompanhar o desempenho orgânico no Google Search Console e no Bing
Webmaster Tools.

## Sumário

- [O que já está implementado](#o-que-já-está-implementado)
- [Ambientes e URL canônica](#ambientes-e-url-canônica)
- [Metadados por rota](#metadados-por-rota)
- [Dados estruturados (Schema.org)](#dados-estruturados-schemaorg)
- [Sitemap e robots.txt](#sitemap-e-robotstxt)
- [Verificação de propriedade](#verificação-de-propriedade)
- [Submissão do sitemap](#submissão-do-sitemap)
- [Core Web Vitals](#core-web-vitals)
- [Rotina de monitoramento](#rotina-de-monitoramento)
- [Como adicionar SEO a uma página nova](#como-adicionar-seo-a-uma-página-nova)

---

## O que já está implementado

| Item | Onde |
|---|---|
| URL canônica, Open Graph, Twitter, robots | [`src/lib/seo.ts`](../../src/lib/seo.ts) + [`src/app/layout.tsx`](../../src/app/layout.tsx) |
| Metadados por rota | `export const metadata` em cada `page.tsx` via `buildMetadata()` |
| JSON-LD (Organization, WebSite, Article, BreadcrumbList, Dataset) | [`src/lib/structured-data.ts`](../../src/lib/structured-data.ts) |
| Sitemap XML | [`src/app/sitemap.ts`](../../src/app/sitemap.ts) → `/sitemap.xml` |
| robots.txt | [`src/app/robots.ts`](../../src/app/robots.ts) → `/robots.txt` |
| Verificação GSC / Bing | `verification` no layout, via env |
| Core Web Vitals de campo | [`src/components/web-vitals.tsx`](../../src/components/web-vitals.tsx) → GA4 |

## Ambientes e URL canônica

A variável `NEXT_PUBLIC_SITE_URL` define a origem usada em canonicals, Open
Graph, sitemap e robots. **Sem barra final.**

| Ambiente | Valor | Indexado? |
|---|---|---|
| Produção | `https://cidados.insper.edu.br` | Sim |
| Preview / Vercel | `https://portal-cidados.vercel.app` | Não |
| Local | `http://localhost:3000` | Não |

**Só o host `cidados.insper.edu.br` é indexável.** Em qualquer outro host
(incluindo `portal-cidados.vercel.app` e previews `*.vercel.app`):

- `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` com `Disallow: /` e sem sitemap
- `/sitemap.xml` vazio
- header `X-Robots-Tag: noindex, nofollow` (checa o `Host` do request, então
  vale mesmo se o `SITE_URL` do build estiver errado)

Não crie propriedade no Search Console / Bing para a URL da Vercel. Não envie
o sitemap do preview.

Se a variável não estiver definida, o fallback é o domínio institucional. Em
Docker, passe `--build-arg NEXT_PUBLIC_SITE_URL=...` (as `NEXT_PUBLIC_*` são
embutidas no bundle em tempo de build). Ver
[capítulo 10](./10-deploy-e-operacao.md).

## Metadados por rota

Use `buildMetadata()` em vez de um objeto `Metadata` solto. Páginas Client
Component **não** podem exportar `metadata`: extraia o UI para um `*-client.tsx`
e deixe o `page.tsx` como Server Component (padrão da Home e de
`desigualdades-em-saude-sp`).

```tsx
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Título curto da página",
  description: "Descrição de até ~155 caracteres.",
  path: "/minha-rota",
  image: "/assets/preview.png", // opcional; default é o OG institucional
  type: "article", // use em histórias
});
```

O template global é `%s | CIDADES@DADOS`. Não inclua o nome do portal no
`title` passado a `buildMetadata()`.

## Dados estruturados (Schema.org)

Scripts JSON-LD usam o **nonce do CSP** (`headers().get("x-nonce")`). Nunca
injete JSON-LD sem nonce — o navegador bloqueia.

| Tipo | Onde |
|---|---|
| `Organization` + `WebSite` (com `SearchAction` em `/catalogo-de-dados?q=`) | Layout raiz |
| `Article` + `BreadcrumbList` | Histórias (`StoryJsonLd`) |
| `CollectionPage` + `Dataset` + `BreadcrumbList` | Catálogo |
| `BreadcrumbList` | `/historias`, `/mapas`, `/sobre` (`PageJsonLd`) |

A ação de busca do `WebSite` aponta para `?q=`. O catálogo lê esse parâmetro e
pré-preenche a busca.

## Sitemap e robots.txt

- Em produção (`cidados.insper.edu.br`): sitemap com home, páginas estáticas e
  cada história de [`stories.ts`](../../src/lib/data/stories.ts); robots permite
  `/`, bloqueia `/api/` e declara o sitemap.
- Em Vercel/local: `Disallow: /`, sitemap vazio, sem `host`.

Ao publicar uma história nova, basta registrá-la em `getStoriesForHome()` com
`href`; o sitemap a inclui automaticamente.

## Verificação de propriedade

### Google Search Console

1. Acesse [Google Search Console](https://search.google.com/search-console) com
   a conta institucional do Insper.
2. Adicione a propriedade **Prefixo de URL** apenas para produção:
   `https://cidados.insper.edu.br/`
   (não adicione `portal-cidados.vercel.app`).
3. Escolha **tag HTML**. Copie o conteúdo do atributo `content`
   (ex.: `AbCdEf123...`).
4. Defina no ambiente de **produção** (e no build Docker/Vercel):

   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=AbCdEf123...
   ```

5. Faça o deploy e clique em **Verificar**. Alternativa: verificação por
   registro DNS (`TXT`) no domínio `insper.edu.br` — não exige redeploy.

### Bing Webmaster Tools

1. Acesse [Bing Webmaster](https://www.bing.com/webmasters).
2. Prefira **Importar do Google Search Console** (propaga a propriedade já
   verificada).
3. Se preferir meta tag, copie o valor de `msvalidate.01` e defina
   `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

## Submissão do sitemap

No Search Console (propriedade de produção):

1. Menu **Sitemaps**.
2. Envie `https://cidados.insper.edu.br/sitemap.xml`.
3. Confirme o status **Êxito**. A indexação das URLs pode levar dias.

No Bing: **Sitemaps** → enviar a mesma URL, ou aguarde o import do GSC.

## Core Web Vitals

### Campo (usuários reais)

[`WebVitals`](../../src/components/web-vitals.tsx) envia LCP, CLS, INP, FCP e
TTFB ao GA4 (eventos com o nome da métrica). No GA4: **Relatórios → Eventos**
(ou Explore) filtre por `LCP`, `INP`, `CLS`.

No Search Console: **Experiência → Principais métricas da Web**.

### Laboratório (Lighthouse / PageSpeed)

Rode nas rotas públicas após mudanças relevantes:

```bash
# Com o site em produção ou `npm run start`
npx lighthouse https://cidados.insper.edu.br/ --only-categories=performance,seo --view
```

Ou [PageSpeed Insights](https://pagespeed.web.dev/) colando cada URL.

### Checklist de baseline (preencher após o primeiro deploy com SEO)

| Rota | LCP (lab) | INP / TBT | CLS | SEO (Lighthouse) | Data |
|---|---|---|---|---|---|
| `/` | | | | | |
| `/historias` | | | | | |
| `/historias/faixa-azul` | | | | | |
| `/historias/adensamento` | | | | | |
| `/historias/ilhas-de-calor` | | | | | |
| `/historias/desigualdades-em-saude-sp` | | | | | |
| `/mapas` | | | | | |
| `/catalogo-de-dados` | | | | | |
| `/sobre` | | | | | |

Alvos de campo (Google): LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.

Otimizações já aplicadas no código:

- `next/image` com formatos **AVIF/WebP** (`next.config.ts`).
- Fontes via `next/font` com `display: "swap"`.
- Mapbox do geoportal e Three.js do adensamento carregados com `next/dynamic`
  (`ssr: false`).
- Histórias pesadas (desigualdades) usam `React.lazy` nas seções abaixo da capa.

Limitações conhecidas: páginas de scrollytelling e o geoportal carregam Mapbox
e GSAP; o LCP de laboratório nessas rotas tende a ser pior que o da Home. Não
pré-carregue o mapa na Home.

## Rotina de monitoramento

| Frequência | O quê |
|---|---|
| Após cada deploy de conteúdo | Pedir indexação da URL no GSC (Inspeção de URL) se for história nova |
| Semanal (primeiro mês) / mensal | Cobertura (páginas indexadas vs. excluídas), sitemap, erros de rastreamento |
| Mensal | Performance (consultas, CTR, posição média); Core Web Vitals |
| Trimestral | Lighthouse nas rotas da tabela acima; revisar titles/descriptions que CTR baixo |

Sinais de alerta:

- URL no sitemap com status **Excluída** / **Detectada, no momento não indexada**
  por tempo prolongado.
- Queda súbita de cliques sem mudança de conteúdo.
- CWV “Ruim” em URLs de história (imagens sem dimensão, fontes bloqueando).

## Como adicionar SEO a uma página nova

1. `page.tsx` como Server Component com `buildMetadata({ path, title, description })`.
2. Se o UI for client-only, extraia para `*-client.tsx`.
3. Inclua `PageJsonLd` (breadcrumb) ou `StoryJsonLd` (história).
4. Se for história, registre `href` em `getStoriesForHome()` — o sitemap atualiza
   sozinho.
5. Não altere a estrutura de URLs sem redirecionamento 301 (o canonical assume
   os paths atuais).

---

[← 10 — Deploy e Operação](./10-deploy-e-operacao.md) · [Voltar ao índice](./README.md)
