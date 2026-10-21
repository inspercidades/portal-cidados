# Portal Cidados

Plataforma de divulgação científica do **Centro de Estudos das Cidades –
Laboratório Arq.Futuro do Insper**. Apresenta estudos urbanos por meio de:

- **Histórias** — reportagens interativas de *scrollytelling* (mapas e gráficos
  que reagem à rolagem).
- **Geoportal** — mapa interativo (Mapbox GL JS) com camadas por cidade,
  comparação e estado compartilhável via URL.
- **Catálogo de Dados** — índice pesquisável dos datasets publicados.

Construído com **Next.js 15 (App Router)**, **React 19**, **TypeScript**,
**Tailwind CSS v4**, **Shadcn/UI** e **Mapbox GL JS**.

## Começando

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente em .env.local
#    (mínimo: NEXT_PUBLIC_MAPBOX_TOKEN para os mapas)

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção (`output: standalone`) |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | Lint/format check (Biome) |
| `npm run format` | Formata o código (Biome) |

## Documentação

- **[Manual do Desenvolvedor](./docs/manual-do-desenvolvedor/README.md)** —
  onboarding completo: arquitetura, histórias (scrollytelling), geoportal,
  catálogo, boas práticas e deploy. **Comece por aqui.**
- **[Índice geral da documentação](./docs/INDEX.md)**
- **[Figma — guia de estilo e protótipos](https://www.figma.com/design/OtdMzKBFGyp11J83d1CEZe/Insper?node-id=622-2&p=f&t=jMWSa84eSwBGp2ii-0)**

## Variáveis de ambiente

Defina em `.env.local` (ignorado pelo Git):

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...          # necessário para os mapas
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXX   # opcional (GA4)
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx            # opcional (Microsoft Clarity)
```

Detalhes em
[docs/manual-do-desenvolvedor/02-ambiente-de-desenvolvimento.md](./docs/manual-do-desenvolvedor/02-ambiente-de-desenvolvimento.md).

## Deploy

O projeto gera saída `standalone` e inclui um [`Dockerfile`](./Dockerfile)
multi-stage (`node:20-alpine`). Ver
[docs/manual-do-desenvolvedor/10-deploy-e-operacao.md](./docs/manual-do-desenvolvedor/10-deploy-e-operacao.md).

---

**Portal Cidados** — Centro de Estudos das Cidades / Laboratório Arq.Futuro do Insper.
