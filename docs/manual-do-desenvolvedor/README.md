# Manual do Desenvolvedor — Portal Cidados

Bem-vindo(a) ao **Manual do Desenvolvedor** do Portal Cidados, a plataforma de
divulgação científica do **Centro de Estudos das Cidades – Laboratório
Arq.Futuro do Insper**. Este manual é o ponto de entrada oficial para qualquer
pessoa que vá desenvolver, manter ou evoluir a plataforma.

O objetivo é duplo:

1. **Onboarding rápido** — permitir que um novo desenvolvedor entenda a
   arquitetura, rode o projeto e faça sua primeira contribuição com segurança.
2. **Padrão de qualidade** — documentar as convenções e os fluxos de trabalho
   para que a qualidade da plataforma se mantenha consistente ao longo do tempo,
   independentemente de quem esteja no time.

> Este manual descreve **como a plataforma é construída de fato** (não uma
> arquitetura idealizada). Sempre que houver divergência entre este documento e
> o código, o código é a fonte da verdade — reporte a divergência para que a
> documentação seja atualizada.

---

## Índice

| Capítulo | Conteúdo | Público-alvo |
|---|---|---|
| [01 — Visão Geral](./01-visao-geral.md) | O que é a plataforma, propósito, módulos, mapa de rotas, glossário | Todos |
| [02 — Ambiente de Desenvolvimento](./02-ambiente-de-desenvolvimento.md) | Pré-requisitos, instalação, variáveis de ambiente, scripts | Desenvolvedores |
| [03 — Arquitetura e Convenções](./03-arquitetura-e-convencoes.md) | Stack, App Router, route groups, layout raiz, middleware/CSP, camada de dados | Desenvolvedores / Arquitetos |
| [04 — Design System e UI](./04-design-system-e-ui.md) | Tailwind v4, tokens, temas, fontes, Shadcn/UI, Figma | Desenvolvedores / Design |
| [05 — Home e Navegação](./05-home-e-navegacao.md) | Página inicial, `Header`/menu, como adicionar página ao shell | Desenvolvedores |
| [06 — Histórias (Scrollytelling)](./06-historias-scrollytelling.md) | Fluxo completo de criação de histórias: capa, corpo, cards móveis, GSAP, Mapbox, dados | Desenvolvedores |
| [07 — Geoportal](./07-geoportal.md) | Mapa interativo, camadas, comparação, estado na URL, integração com o catálogo | Desenvolvedores |
| [08 — Catálogo de Dados](./08-catalogo-de-dados.md) | Busca, filtros, API, integração bidirecional com o geoportal | Desenvolvedores |
| [09 — Boas Práticas](./09-boas-praticas.md) | Convenções de código, Biome, performance, acessibilidade, segurança, commits/PRs | Desenvolvedores |
| [10 — Deploy e Operação](./10-deploy-e-operacao.md) | Build de produção, Docker, variáveis, analytics, CI | Desenvolvedores / DevOps |
| [11 — SEO e Monitoramento](./11-seo-e-monitoramento.md) | Metadados, Schema.org, sitemap, Core Web Vitals, Search Console / Bing | Desenvolvedores / Conteúdo |

---

## Artefatos de design (Figma)

A referência visual da plataforma — **protótipos, guia de estilo, componentes e
fluxos de tela** — vive no Figma do Insper. Consulte-o sempre antes de
implementar telas novas ou ajustar layouts, para garantir aderência ao guia de
estilo.

- **[Figma — Insper / Portal Cidados](https://www.figma.com/design/OtdMzKBFGyp11J83d1CEZe/Insper?node-id=622-2&p=f&t=jMWSa84eSwBGp2ii-0)**

---

## Documentação técnica complementar

Este manual referencia (e não duplica) a documentação técnica já existente no
repositório:

- [Índice geral da documentação](../INDEX.md)
- [Arquitetura do sistema](../ARCHITECTURE.md)
- [Analytics (GA4 + Clarity) e aviso de privacidade](../ANALYTICS.md)
- [Documentação da API](../API_DOCUMENTATION.md) · [Exemplos de API](../API_EXAMPLES.md)
- [Integração Frontend ↔ API](../FRONTEND_INTEGRATION.md)
- [Integração Catálogo ↔ Geoportal](../CATALOG_GEOPORTAL_INTEGRATION.md)
- Módulo Geoportal: [README](../../src/app/(app)/mapas/README.md) ·
  [Workflow de layers](../../src/app/(app)/mapas/WORKFLOW.md) ·
  [Guia de estilos de layer](../../src/app/(app)/mapas/LAYER_STYLES_GUIDE.md) ·
  [Proposta de workflow em R](../../src/app/(app)/mapas/PROPOSTA_WORKFLOW_R.md)

---

## Como usar este manual

- **Sou novo no projeto** → leia os capítulos [01](./01-visao-geral.md),
  [02](./02-ambiente-de-desenvolvimento.md) e
  [03](./03-arquitetura-e-convencoes.md) em ordem.
- **Vou publicar uma história nova** → capítulo [06](./06-historias-scrollytelling.md)
  e o checklist de SEO no [11](./11-seo-e-monitoramento.md).
- **Vou adicionar uma camada ao mapa** → capítulo [07](./07-geoportal.md).
- **Vou mexer no catálogo ou na API** → capítulo [08](./08-catalogo-de-dados.md).
- **Antes de abrir um PR** → revise o capítulo [09](./09-boas-praticas.md).
- **Vou configurar SEO / Search Console** → capítulo [11](./11-seo-e-monitoramento.md).

---

**Portal Cidados** — Centro de Estudos das Cidades / Laboratório Arq.Futuro do Insper.
