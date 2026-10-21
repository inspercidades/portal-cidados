# 10 — Deploy e Operação

[← Voltar ao índice](./README.md)

## Sumário

- [Build de produção](#build-de-produção)
- [Docker (standalone)](#docker-standalone)
- [Variáveis de ambiente em produção](#variáveis-de-ambiente-em-produção)
- [Analytics e CSP em produção](#analytics-e-csp-em-produção)
- [Estado atual do CI](#estado-atual-do-ci)
- [Recomendações operacionais](#recomendações-operacionais)

---

## Build de produção

O projeto usa `output: "standalone"` em [`next.config.ts`](../../next.config.ts),
gerando um servidor Node autocontido em `.next/standalone` — ideal para Docker.

```bash
npm run build   # next build --turbopack
npm run start   # next start (serve o build)
```

> As variáveis `NEXT_PUBLIC_*` são embutidas no bundle **em tempo de build**.
> Portanto, o `NEXT_PUBLIC_MAPBOX_TOKEN` (e demais) precisa estar disponível
> durante o `build`, não apenas no runtime.

## Docker (standalone)

O [`Dockerfile`](../../Dockerfile) é multi-stage sobre `node:20-alpine`:

1. **deps** — `npm ci` a partir de `package.json` + `package-lock.json`.
2. **builder** — copia o código, recebe `NEXT_PUBLIC_MAPBOX_TOKEN` como `ARG` e
   roda `npm run build`.
3. **runner** — copia `public`, `.next/standalone` e `.next/static`, roda como
   usuário não-root (`nextjs`) na porta 3000.

```dockerfile
# trecho relevante
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
RUN npm run build
```

Build e execução:

```bash
docker build \
  --build-arg NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1... \
  --build-arg NEXT_PUBLIC_SITE_URL=https://cidados.insper.edu.br \
  -t portal-cidados .

docker run -p 3000:3000 portal-cidados
```

> Como o token do Mapbox é **build-time** (`ARG`), gere imagens distintas por
> ambiente ou passe o `--build-arg` correspondente. IDs de analytics também
> precisam estar presentes no build se quiser rastreamento naquele ambiente.

## Variáveis de ambiente em produção

| Variável | Momento | Observação |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Build | URL canônica (sem barra final). Produção: `https://cidados.insper.edu.br` (único host indexado). Preview Vercel: `https://portal-cidados.vercel.app` (`noindex`). |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Build | Passado como `--build-arg` no Docker |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Build | GA4 (opcional) |
| `NEXT_PUBLIC_CLARITY_ID` | Build | Clarity só inicializa se definido; use IDs distintos por ambiente |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Build | Meta tag do Google Search Console (opcional). Alias: `NEXT_PUBLIC_GSC_VERIFICATION`. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Build | Meta tag do Bing Webmaster Tools (opcional) |
| `NEXT_PUBLIC_MAPBOX_STYLE_ADENSAMENTO` | Build | Estilo custom da história `adensamento` (opcional) |

Configure cada ambiente com seu próprio conjunto de valores. Ver
[capítulo 02](./02-ambiente-de-desenvolvimento.md#variáveis-de-ambiente) e
[`docs/ANALYTICS.md`](../ANALYTICS.md).

## Analytics e CSP em produção

- **GA4** e **Microsoft Clarity** são carregados a partir do layout raiz. Em
  produção, defina os IDs correspondentes.
- A **CSP** em [`src/middleware.ts`](../../src/middleware.ts) já libera Mapbox,
  GA4 e Clarity. Se adicionar um novo provedor (CDN, fontes, iframe), atualize a
  CSP — caso contrário o recurso será bloqueado em produção (mesmo que funcione
  localmente sem HTTPS estrito).

## Estado atual do CI

- Em [`.github/`](../../.github) há apenas um `dependabot.yml` **incompleto**
  (`package-ecosystem: ""`), sem workflows de CI/CD.
- **Não há pipeline automatizado** de lint/build/test/deploy no repositório.

## Recomendações operacionais

Melhorias sugeridas para robustez (não implementadas):

- **CI:** adicionar um GitHub Actions que rode `npm ci`, `npm run lint` e
  `npm run build` em cada PR; completar o `dependabot.yml`
  (`package-ecosystem: "npm"`).
- **Observabilidade:** além de GA4/Clarity, considerar monitoramento de erros
  (ex.: Sentry) — lembrando de refletir os domínios na CSP.
- **App Router:** adicionar `error.tsx`, `not-found.tsx` e `loading.tsx` globais
  para melhor UX de erro/carregamento.
- **Healthcheck:** expor um endpoint simples de saúde para orquestradores.
- **Testes em CI:** ao introduzir a suíte de testes
  ([capítulo 09](./09-boas-praticas.md#testes-recomendação)), rodá-la no
  pipeline.

---

[← 09 — Boas Práticas](./09-boas-praticas.md) · [Próximo: 11 — SEO e Monitoramento →](./11-seo-e-monitoramento.md)
