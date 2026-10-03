# 08 — Catálogo de Dados

[← Voltar ao índice](./README.md)

O Catálogo de Dados (`/catalogo-de-dados`) é o índice pesquisável dos datasets
publicados, com busca textual, filtros combináveis e links diretos para o
Geoportal.

## Sumário

- [Visão geral](#visão-geral)
- [Arquivos principais](#arquivos-principais)
- [Modelo de dados](#modelo-de-dados)
- [A API `/api/catalog`](#a-api-apicatalog)
- [Busca com debounce e filtros](#busca-com-debounce-e-filtros)
- [Deep-link e integração com o Geoportal](#deep-link-e-integração-com-o-geoportal)
- [Como adicionar um dataset ao catálogo](#como-adicionar-um-dataset-ao-catálogo)
- [Documentação de API relacionada](#documentação-de-api-relacionada)

---

## Visão geral

O catálogo oferece:

- Busca textual (com debounce de 300ms) em título, descrição e palavras-chave.
- Filtros combináveis por tema, região e método de acesso.
- Ordenação por data (mais recentes / mais antigos).
- Modal de detalhes por item, abrível via URL (`?item=ID`).
- Link direto para o Geoportal quando o dataset tem camadas correspondentes.

## Arquivos principais

| Arquivo | Papel |
|---|---|
| [`src/components/CatalogPage.tsx`](../../src/components/CatalogPage.tsx) | Orquestrador (estado, filtros, sync com URL) |
| [`src/components/SearchBar.tsx`](../../src/components/SearchBar.tsx) | Campo de busca |
| [`src/components/CatalogFilters.tsx`](../../src/components/CatalogFilters.tsx) | Controles de filtro |
| [`src/components/SelectedFilters.tsx`](../../src/components/SelectedFilters.tsx) | Chips de filtros ativos |
| [`src/components/SortDropdown.tsx`](../../src/components/SortDropdown.tsx) | Ordenação |
| [`src/components/DataCard.tsx`](../../src/components/DataCard.tsx) | Card + modal de detalhes + link p/ geoportal |
| [`src/components/CardSkeleton.tsx`](../../src/components/CardSkeleton.tsx) | Skeleton de loading |
| [`src/lib/data/catalog.ts`](../../src/lib/data/catalog.ts) | Fonte de dados dos registros + opções de filtro |
| [`src/app/api/catalog/route.ts`](../../src/app/api/catalog/route.ts) | Route Handler `GET /api/catalog` |

## Modelo de dados

```ts
// src/lib/data/catalog.ts
interface DataCatalogItem {
  id: string;            // identificador único (usado no deep-link e no vínculo com o geoportal)
  title: string;
  description: string;
  theme: string;         // ex.: "Mobilidade", "Saúde"
  region: string;        // ex.: "São Paulo"
  accessMethod: string;  // "Disponível para download" | "Sala segura do Insper"
  keywords: string[];    // usadas na busca
  createdAt: string;     // ISO date
  tags: string[];        // exibição
}
```

## A API `/api/catalog`

`GET /api/catalog` filtra e ordena os dados estáticos de `catalog.ts`. É um
Route Handler do Next.js com revalidação (cache) de 600 segundos.

Parâmetros de query: `search`, `theme`, `region`, `accessMethod`, `sortBy`
(`newest` | `oldest`).

```bash
GET /api/catalog?search=mobilidade&theme=Mobilidade&region=São Paulo&sortBy=newest
```

A especificação completa (resposta, modelos, exemplos) está em
[`docs/API_DOCUMENTATION.md`](../API_DOCUMENTATION.md) e
[`docs/API_EXAMPLES.md`](../API_EXAMPLES.md).

> Não há geoportal-specific API — os dados de mapa vêm de tilesets do Mapbox no
> cliente. `/api/catalog` é o único endpoint da aplicação.

## Busca com debounce e filtros

O `CatalogPage` mantém o estado local e chama a API a cada mudança de filtro. A
busca usa o hook [`useDebounce`](../../src/hooks/useDebounce.ts) (300ms) para
evitar requisições a cada tecla:

```tsx
const debouncedSearchTerm = useDebounce(searchTerm, 300);
useEffect(() => {
  setFilters(prev => ({ ...prev, search: debouncedSearchTerm }));
}, [debouncedSearchTerm]);
```

O detalhamento do fluxo de estado e loading está em
[`docs/FRONTEND_INTEGRATION.md`](../FRONTEND_INTEGRATION.md).

## Deep-link e integração com o Geoportal

- **Deep-link do modal:** `CatalogPage` lê `?item=ID` via `useSearchParams()` e
  passa `initialOpen` ao `DataCard` correspondente, abrindo o modal
  automaticamente. Por isso a página é envolta em `<Suspense>`.
- **Catálogo → Geoportal:** o `DataCard` chama `getLayersForCatalogItem(item.id)`
  e renderiza um link "Ver dados no mapa" por cidade
  (`/mapas?city=...&layers=...`).
- **Geoportal → Catálogo:** camadas com `catalogItemId` mostram "Acessar base de
  dados" (`/catalogo-de-dados?item=ID`).

Mapeamento completo e diagramas em
[CATALOG_GEOPORTAL_INTEGRATION.md](../CATALOG_GEOPORTAL_INTEGRATION.md) e no
[capítulo 07](./07-geoportal.md#integração-com-o-catálogo).

## Como adicionar um dataset ao catálogo

1. Adicione um objeto `DataCatalogItem` em
   [`src/lib/data/catalog.ts`](../../src/lib/data/catalog.ts) com um `id` único.
2. Preencha `theme`, `region`, `accessMethod` usando valores consistentes com as
   opções de filtro existentes (senão o item não aparecerá nos filtros).
3. Adicione `keywords` relevantes (alimentam a busca).
4. Se o dataset tiver camada no mapa, use o mesmo `id` como `catalogItemId` na
   camada em `geoportal/lib/city-layers.ts` para habilitar os links bidirecionais.
5. Teste busca, filtros, o modal (`?item=ID`) e os links para o geoportal.

## Documentação de API relacionada

- [API Documentation](../API_DOCUMENTATION.md) — especificação do endpoint.
- [API Examples](../API_EXAMPLES.md) — exemplos práticos de chamada.
- [Frontend Integration](../FRONTEND_INTEGRATION.md) — fluxo de dados frontend ↔ API.

---

[← 07 — Geoportal](./07-geoportal.md) · [Voltar ao índice](./README.md) · [Próximo: 09 — Boas Práticas →](./09-boas-praticas.md)
