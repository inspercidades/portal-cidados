# 09 — Boas Práticas

[← Voltar ao índice](./README.md)

Este capítulo consolida as convenções que mantêm o padrão de qualidade da
plataforma. **Revise-o antes de abrir um Pull Request.**

## Sumário

- [Lint e formatação (Biome)](#lint-e-formatação-biome)
- [TypeScript e React](#typescript-e-react)
- [Client vs Server Components](#client-vs-server-components)
- [Estilo e UI](#estilo-e-ui)
- [Performance](#performance)
- [Acessibilidade e i18n](#acessibilidade-e-i18n)
- [Segurança e CSP](#segurança-e-csp)
- [GSAP e Mapbox: higiene](#gsap-e-mapbox-higiene)
- [Testes (recomendação)](#testes-recomendação)
- [Git: commits e Pull Requests](#git-commits-e-pull-requests)
- [Checklist de PR](#checklist-de-pr)

---

## Lint e formatação (Biome)

O projeto usa **Biome** (não ESLint/Prettier) — configurado em
[`biome.json`](../../biome.json) com indentação de 2 espaços e regras
recomendadas + domínios Next/React.

```bash
npm run lint     # biome check
npm run format   # biome format --write
```

- Rode `npm run lint` antes de commitar.
- Instale a extensão do Biome no editor para format-on-save.
- `noUnknownAtRules` está desligado para aceitar as at-rules do Tailwind v4.

## TypeScript e React

- **TypeScript strict** — não use `any` sem justificativa (quando inevitável em
  refs de terceiros, documente com um comentário).
- Tipar props com `interface` nomeada:

```tsx
interface DataCardProps {
  item: DataCatalogItem;
  initialOpen?: boolean;
}

export function DataCard({ item, initialOpen = false }: DataCardProps) { /* ... */ }
```

- Prefira nomes descritivos e em inglês para código; textos de UI em Português.
- Use o alias `@/` para imports absolutos a partir de `src/`.

## Client vs Server Components

- Marque `"use client"` **apenas** quando o componente usar estado, efeitos,
  `next-themes`, `useSearchParams`, GSAP ou Mapbox.
- Mantenha páginas como Server Components sempre que possível (ex.: a `page.tsx`
  de uma história compõe seções client, mas ela mesma pode ser server).
- Componentes que usam `useSearchParams()` devem ficar dentro de `<Suspense>`
  (padrão já usado no catálogo e no geoportal).

## Estilo e UI

- **Use tokens de tema** (`bg-background`, `text-foreground`, etc.) em vez de
  cores hardcoded — hardcode quebra o dark mode. Ver
  [capítulo 04](./04-design-system-e-ui.md).
- Componha classes com `cn()` (`@/lib/utils`).
- Reaproveite primitivos de `src/components/ui` (Shadcn) antes de criar novos.
- Siga o guia de estilo do
  [Figma](https://www.figma.com/design/OtdMzKBFGyp11J83d1CEZe/Insper?node-id=622-2&p=f&t=jMWSa84eSwBGp2ii-0).

## Performance

- **Debounce** de entradas de busca (`useDebounce`, 300ms).
- **Preload** de mídia pesada em histórias (`PreloadWrapper`,
  `useImagePreloader`).
- **Lazy loading** de seções muito grandes (`React.lazy`, ver
  `desigualdades-em-saude-sp`).
- `useCallback`/`useMemo` para funções e listas passadas a componentes
  filhos/efeitos.
- Use `next/image` para imagens (otimização automática; AVIF/WebP em
  [`next.config.ts`](../../next.config.ts)).
- Carregue JS pesado (Mapbox, Three.js) com `next/dynamic` / `ssr: false` para
  não bloquear o LCP — já feito no geoportal e no prédio 3D do adensamento.
- As métricas de Core Web Vitals de campo são enviadas ao GA4 via
  [`WebVitals`](../../src/components/web-vitals.tsx). Ver
  [capítulo 11](./11-seo-e-monitoramento.md).
- Em Mapbox, **remova sources/handlers** ao desmontar/trocar camadas para evitar
  vazamentos.

## Acessibilidade e i18n

- `aria-label` em botões de ícone (ex.: abrir/fechar menu).
- Foco visível e navegação por teclado (o `Header` fecha com `Escape`).
- Idioma da UI em Português (`<html lang="pt-BR">`).
- Textos alternativos (`alt`) em imagens significativas.

## Segurança e CSP

- A CSP estrita vive em [`src/middleware.ts`](../../src/middleware.ts). **Ao
  integrar qualquer serviço externo** (script, fetch, imagem, fonte, iframe),
  adicione o domínio na diretiva correta — senão o recurso será bloqueado.
- Scripts inline precisam do **nonce** (já propagado pelo middleware e usado no
  GA4 e no JSON-LD). Evite inline scripts sem nonce.
- **Nunca commite segredos.** Tokens/IDs vão em `.env.local` (gitignored) ou nas
  variáveis da plataforma de deploy.
- Variáveis expostas ao cliente exigem prefixo `NEXT_PUBLIC_` — não coloque
  segredos server-side atrás desse prefixo.

## GSAP e Mapbox: higiene

Regras específicas para o scrollytelling (ver
[capítulo 06](./06-historias-scrollytelling.md)):

- `gsap.registerPlugin(ScrollTrigger)` uma vez por módulo que usa scroll.
- Crie os `ScrollTrigger` em `useLayoutEffect`, **mate-os no cleanup** e recrie
  no `resize`.
- Chame `ScrollTrigger.refresh()` após o mapa carregar e no `resize`.
- Desative a interação do usuário no mapa de história (`dragPan={false}`,
  `scrollZoom={false}`, etc.) — a câmera é controlada pelo scroll.
- Sempre trate o caso de `NEXT_PUBLIC_MAPBOX_TOKEN` ausente (libere o preload e
  logue um aviso, como faz a `map-section` da faixa-azul).

## Testes (recomendação)

Atualmente **não há suíte de testes** configurada no `package.json`. Ao
introduzir testes, recomenda-se:

- Testes unitários/componentes com Vitest + Testing Library.
- Testes end-to-end com Playwright (fluxos: busca no catálogo, deep-link
  `?item=`, toggle de camada no geoportal, navegação de história).
- Adicione os scripts (`test`, `test:coverage`) ao `package.json` e documente-os
  no [capítulo 02](./02-ambiente-de-desenvolvimento.md).

## Git: commits e Pull Requests

Use mensagens de commit no padrão convencional (já sugerido nos docs do projeto):

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

Fluxo:

1. Crie uma branch a partir da principal.
2. Faça commits pequenos e descritivos.
3. Rode `npm run lint` e `npm run build` localmente.
4. Abra um PR com descrição do que muda e por quê; inclua screenshots/vídeos
   quando afetar UI.

## Checklist de PR

- [ ] `npm run lint` sem erros.
- [ ] `npm run build` conclui com sucesso.
- [ ] Sem cores hardcoded onde há token de tema; dark/light verificados.
- [ ] Componentes interativos com `"use client"` e `Suspense` onde necessário.
- [ ] Recursos externos novos refletidos na CSP (`middleware.ts`).
- [ ] Nenhum segredo commitado (`.env.local` fora do controle de versão).
- [ ] Histórias novas registradas em `stories.ts` **e** `StoriesList.tsx`.
- [ ] Páginas novas com `buildMetadata()` e JSON-LD ([capítulo 11](./11-seo-e-monitoramento.md)).
- [ ] Camadas novas com `sourceLayer` batendo entre `city-layers.ts` e
      `layer-styles.ts`.
- [ ] Documentação atualizada quando o comportamento muda.

---

[← 08 — Catálogo de Dados](./08-catalogo-de-dados.md) · [Voltar ao índice](./README.md) · [Próximo: 10 — Deploy e Operação →](./10-deploy-e-operacao.md)
