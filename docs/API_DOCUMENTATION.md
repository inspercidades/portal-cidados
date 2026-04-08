# API Documentation - Portal Cidados

## Visão Geral

A API do Portal Cidados fornece endpoints para buscar e filtrar dados do catálogo de informações públicas. A API é construída com Next.js 15 e utiliza cache nativo para otimizar performance.

## Base URL

```
/api
```

## Endpoints

### GET /api/catalog

Busca dados do catálogo com filtros opcionais.

#### Parâmetros de Query

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `search` | string | Não | Termo de busca que filtra por título, descrição e palavras-chave |
| `theme` | string | Não | Filtro por tema (ex: "Mobilidade", "Educação", "Saúde") |
| `region` | string | Não | Filtro por região (ex: "São Paulo", "Rio de Janeiro") |
| `accessMethod` | string | Não | Método de acesso ("Disponível para download" ou "Sala segura do Insper") |
| `sortBy` | string | Não | Ordenação ("newest" ou "oldest"). Padrão: "newest" |

#### Exemplo de Requisição

```bash
GET /api/catalog?search=mobilidade&theme=Mobilidade&region=São Paulo&sortBy=newest
```

#### Resposta de Sucesso

```json
{
  "data": [
    {
      "id": "1",
      "title": "Dados de Transporte Coletivo (Ônibus e Metrô)",
      "description": "Informações sobre linhas, horários, frota, acessibilidade e fluxo de passageiros.",
      "theme": "Mobilidade",
      "region": "São Paulo",
      "accessMethod": "Disponível para download",
      "keywords": ["transporte", "coletivo", "ônibus", "metrô"],
      "createdAt": "2024-01-15",
      "tags": ["Mobilidade", "São Paulo", "Download"]
    }
  ],
  "total": 8,
  "filters": {
    "themes": ["Mobilidade", "Educação", "Saúde", "Finanças", "Urbanismo"],
    "regions": ["Brasil", "Estado de São Paulo", "São Paulo", "Rio de Janeiro"],
    "accessMethods": ["Disponível para download", "Sala segura do Insper"]
  }
}
```

#### Resposta de Erro

```json
{
  "error": "Internal server error"
}
```

Status Code: `500`

## Modelos de Dados

### DataCatalogItem

```typescript
interface DataCatalogItem {
  id: string;                    // Identificador único
  title: string;                 // Título do dataset
  description: string;           // Descrição detalhada
  theme: string;                 // Categoria/tema
  region: string;                // Região geográfica
  accessMethod: string;          // Método de acesso
  keywords: string[];            // Palavras-chave para busca
  createdAt: string;             // Data de criação (ISO string)
  tags: string[];                // Tags formatadas para exibição
}
```

### CatalogFilters

```typescript
interface CatalogFilters {
  search?: string;               // Termo de busca
  theme?: string;                // Filtro por tema
  region?: string;               // Filtro por região
  accessMethod?: string;         // Filtro por método de acesso
  sortBy?: 'newest' | 'oldest'; // Ordenação
}
```

### CatalogResponse

```typescript
interface CatalogResponse {
  data: DataCatalogItem[];       // Array de itens filtrados
  total: number;                 // Total de resultados
  filters: {                     // Opções disponíveis para filtros
    themes: string[];
    regions: string[];
    accessMethods: string[];
  };
}
```

## Funcionalidades da API

### 1. Busca Textual

A busca é case-insensitive e procura em:
- **Título**: Busca no campo `title`
- **Descrição**: Busca no campo `description`
- **Palavras-chave**: Busca no array `keywords`

```bash
# Exemplo: busca por "transporte" encontrará itens com:
# - Título contendo "transporte"
# - Descrição contendo "transporte"
# - Keywords contendo "transporte"
GET /api/catalog?search=transporte
```

### 2. Filtros Combinados

Todos os filtros podem ser combinados:

```bash
# Busca por "saúde" na região "São Paulo" com acesso por download
GET /api/catalog?search=saúde&theme=Saúde&region=São Paulo&accessMethod=Disponível para download
```

### 3. Ordenação

- `newest`: Mais recentes primeiro (padrão)
- `oldest`: Mais antigos primeiro

```bash
GET /api/catalog?sortBy=oldest
```

## Cache e Performance

### Estratégia de Cache

A API utiliza cache nativo do Next.js:

```typescript
// Cache automático para GET requests
export async function GET(request: NextRequest) {
  // Dados são cacheados automaticamente pelo Next.js
  // Cache é invalidado apenas quando necessário
}
```

### Otimizações

1. **Filtros Eficientes**: Filtros são aplicados em memória para performance
2. **Busca Otimizada**: Algoritmo de busca otimizado para múltiplos campos
3. **Paginação Futura**: Estrutura preparada para paginação quando necessário

## Tratamento de Erros

### Códigos de Status

- `200`: Sucesso
- `400`: Parâmetros inválidos
- `500`: Erro interno do servidor

### Estrutura de Erro

```json
{
  "error": "Mensagem de erro descritiva"
}
```

## Limitações Atuais

1. **Dados Mock**: Atualmente utiliza dados simulados
2. **Sem Paginação**: Todos os resultados são retornados de uma vez
3. **Sem Autenticação**: API pública sem controle de acesso

## Roadmap

### Próximas Funcionalidades

1. **Paginação**: Implementar paginação para grandes volumes
2. **Rate Limiting**: Controle de taxa de requisições
3. **Cache Avançado**: Cache Redis para melhor performance
4. **Autenticação**: Sistema de autenticação para dados sensíveis
5. **Logs**: Sistema de logs para monitoramento
6. **Validação**: Validação robusta de parâmetros de entrada

## Exemplos de Uso

### Busca Simples

```javascript
const response = await fetch('/api/catalog?search=mobilidade');
const data = await response.json();
console.log(data.data); // Array de resultados
```

### Busca com Filtros

```javascript
const params = new URLSearchParams({
  search: 'transporte',
  theme: 'Mobilidade',
  region: 'São Paulo',
  sortBy: 'newest'
});

const response = await fetch(`/api/catalog?${params}`);
const data = await response.json();
```

### Tratamento de Erro

```javascript
try {
  const response = await fetch('/api/catalog');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Erro ao buscar dados:', error);
  return { data: [], total: 0, filters: { themes: [], regions: [], accessMethods: [] } };
}
```

## Versionamento

Atualmente na versão `1.0.0`. Mudanças futuras seguirão [Semantic Versioning](https://semver.org/).

## Suporte

Para dúvidas ou problemas com a API, consulte a documentação do frontend ou entre em contato com a equipe de desenvolvimento.

