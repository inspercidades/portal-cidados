# Portal CiDados

Plataforma de divulgação científica que transforma pesquisas acadêmicas em narrativas visuais acessíveis ao público, com foco em dados urbanos da cidade de São Paulo.

## Funcionalidades

- **Histórias de Dados** — narrativas visuais interativas sobre temas como ilhas de calor, adensamento habitacional e desigualdades em saúde
- **Geoportal** — mapa interativo com camadas geoespaciais por município, com comparação de layers e legendas dinâmicas (Mapbox GL)
- **Catálogo de Dados** — listagem e busca de datasets com filtros e ordenação
- **Sobre** — apresentação do projeto e seção de colaboradores

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19
- TypeScript + Tailwind CSS v4
- Radix UI + shadcn/ui
- Mapbox GL / react-map-gl
- GSAP + Three.js (animações nas histórias)
- Biome (lint/format)

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Token de acesso à API do Mapbox |

## Desenvolvimento

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build e lint

```bash
npm run build     # build de produção (Turbopack)
npm run lint      # lint com Biome
npm run format    # formata com Biome
```

## Deploy (Docker / Azure)

A imagem é construída via `Dockerfile` multi-stage e publicada no Azure Container Registry pelo pipeline `azure-pipelines.yml`. O token do Mapbox é injetado em build-time via `--build-arg NEXT_PUBLIC_MAPBOX_TOKEN`.
