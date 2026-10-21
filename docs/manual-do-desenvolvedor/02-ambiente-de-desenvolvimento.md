# 02 — Ambiente de Desenvolvimento

[← Voltar ao índice](./README.md)

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Editor e ferramentas](#editor-e-ferramentas)
- [Problemas comuns](#problemas-comuns)

---

## Pré-requisitos

| Ferramenta | Versão recomendada | Observação |
|---|---|---|
| Node.js | **20 LTS** | Mesma versão usada no [`Dockerfile`](../../Dockerfile) (`node:20-alpine`) |
| npm | 10+ | O repositório usa `package-lock.json` (npm como gerenciador padrão) |
| Conta Mapbox | — | Necessária para obter um `NEXT_PUBLIC_MAPBOX_TOKEN` (geoportal e histórias com mapa) |

> O projeto usa **Turbopack** tanto em `dev` quanto em `build`. Não é necessário
> configurar Webpack manualmente.

## Instalação

```bash
# 1. Instale as dependências (usa package-lock.json)
npm install

# 2. Crie o arquivo de variáveis de ambiente local
#    (veja a seção "Variáveis de ambiente" abaixo)
cp .env.example .env.local

# 3. Suba o servidor de desenvolvimento
npm run dev
```

A aplicação sobe em **http://localhost:3000**.

> **Sobre o Mapbox:** sem um token válido, o geoportal e as histórias que usam
> mapa não renderizarão o mapa. Todo o resto da aplicação (home, catálogo,
> seções de texto/gráficos) funciona normalmente.

## Variáveis de ambiente

Todas as variáveis expostas ao cliente usam o prefixo obrigatório
`NEXT_PUBLIC_`. Defina-as em um arquivo **`.env.local`** na raiz (ignorado pelo
Git). Nunca faça commit de tokens ou IDs.

| Variável | Obrigatória | Usada em | Descrição |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sim (produção) | [`src/lib/seo.ts`](../../src/lib/seo.ts), sitemap, robots, canonicals | URL canônica do ambiente, sem barra final. Produção: `https://cidados.insper.edu.br` (único host indexado). Preview: `https://portal-cidados.vercel.app`. Local: `http://localhost:3000`. Vercel/local saem com `noindex`. Fallback: domínio institucional. |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Sim (para mapas) | Geoportal e histórias com Mapbox | Token público do Mapbox (`pk.eyJ1...`) |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Não | [`layout.tsx`](../../src/app/layout.tsx) | Measurement ID do GA4 (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_CLARITY_ID` | Não | [`clarity-init.tsx`](../../src/components/clarity-init.tsx) | Project ID do Microsoft Clarity |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Não | Metadata raiz (`verification.google`) | Código da meta tag do Google Search Console. Alias aceito: `NEXT_PUBLIC_GSC_VERIFICATION`. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Não | Metadata raiz (`verification.other`) | Código da meta tag do Bing Webmaster Tools (`msvalidate.01`). |
| `NEXT_PUBLIC_MAPBOX_STYLE_ADENSAMENTO` | Não | História `adensamento` | Style URL customizado do Mapbox para essa história |

Há um [`.env.example`](../../.env.example) na raiz com todas as chaves. Copie-o
para `.env.local` e preencha os valores.

Exemplo de `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1Ijoi...seu-token...
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

> As variáveis `NEXT_PUBLIC_*` são embutidas no bundle do cliente **em tempo de
> build**. Em Docker, o `NEXT_PUBLIC_MAPBOX_TOKEN` é passado como `ARG` no build
> (ver [capítulo 10](./10-deploy-e-operacao.md)). Analytics são detalhados em
> [`docs/ANALYTICS.md`](../ANALYTICS.md).

## Scripts disponíveis

Definidos em [`package.json`](../../package.json):

| Script | Comando | O que faz |
|---|---|---|
| `npm run dev` | `next dev --turbopack` | Servidor de desenvolvimento com hot reload |
| `npm run build` | `next build --turbopack` | Build de produção (saída `standalone`) |
| `npm run start` | `next start` | Sobe o build de produção |
| `npm run lint` | `biome check` | Verifica lint/format (Biome) |
| `npm run format` | `biome format --write` | Formata o código (Biome) |

> **Não há suíte de testes configurada** no `package.json` atual (não existem
> scripts `test`/`test:coverage`). Recomendações sobre testes estão no capítulo
> [09 — Boas Práticas](./09-boas-praticas.md).

## Estrutura de pastas

```
portal-cidados/
├── docs/                       # Documentação técnica (inclui este manual)
├── public/                     # Assets estáticos (imagens, vídeos, ícones)
│   ├── assets/vizN/            # Thumbnails das histórias (home)
│   └── historias/<slug>/       # Mídia por história (vídeos/imagens de capa)
├── src/
│   ├── middleware.ts           # CSP + headers de segurança (nonce por request)
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz: fontes, tema, analytics
│   │   ├── page.tsx            # Home (/)
│   │   ├── globals.css         # Tailwind v4 + tokens de tema
│   │   ├── assets/fonts/       # Fontes locais (GT Ultra)
│   │   ├── (app)/              # Route group (não afeta URL)
│   │   │   ├── catalogo-de-dados/
│   │   │   ├── geoportal/       # Módulo do mapa (components/ + lib/)
│   │   │   ├── historias/       # Histórias (índice + (stories)/<slug>)
│   │   │   └── sobre/
│   │   └── api/catalog/route.ts # API do catálogo
│   ├── components/             # Componentes compartilhados de app
│   │   └── ui/                 # Primitivos Shadcn/UI
│   ├── hooks/                  # Hooks compartilhados
│   ├── lib/                    # Utilitários e dados
│   │   ├── utils.ts            # cn() (clsx + tailwind-merge)
│   │   └── data/               # stories.ts, catalog.ts, collaborators.ts
│   └── types/                  # Declarações de tipos (*.mp4, *.css, plugins)
├── Dockerfile
├── biome.json
├── components.json             # Config do Shadcn/UI
├── next.config.ts
└── tsconfig.json               # Alias @/* → ./src/*
```

A camada de dados estática vive em `src/lib/data/`; módulos de feature (como o
geoportal) têm seus próprios `lib/` locais. Ver
[03 — Arquitetura e Convenções](./03-arquitetura-e-convencoes.md).

## Editor e ferramentas

- **Biome** ([`biome.json`](../../biome.json)) é o linter e formatter oficial
  (indentação de 2 espaços, regras recomendadas + domínios Next/React).
  Instale a extensão do Biome no seu editor para format-on-save.
- **Alias de importação:** use `@/` para caminhos absolutos a partir de `src/`
  (ex.: `import { Button } from "@/components/ui/button"`).
- **Shadcn/UI** ([`components.json`](../../components.json)) — ao adicionar
  novos primitivos, use a CLI do Shadcn para manter o padrão "new-york".

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Mapa não aparece (tela em branco/erro no console) | `NEXT_PUBLIC_MAPBOX_TOKEN` ausente ou inválido | Defina o token no `.env.local` e reinicie o `dev` |
| Variável `NEXT_PUBLIC_*` "não atualiza" | Variáveis são embutidas no build | Reinicie o servidor de desenvolvimento |
| Erros de CSP no console (scripts bloqueados) | Domínio não permitido na CSP | Ver [`src/middleware.ts`](../../src/middleware.ts) e capítulo [09](./09-boas-praticas.md) |
| Fonte "GT Ultra" não carrega | Arquivos `.otf` ausentes | Confirme `src/app/assets/fonts/GT_Ultra/` |

---

[← 01 — Visão Geral](./01-visao-geral.md) · [Voltar ao índice](./README.md) · [Próximo: 03 — Arquitetura e Convenções →](./03-arquitetura-e-convencoes.md)
