# API Examples - Portal Cidados

## Exemplos Práticos de Uso da API

Este documento contém exemplos práticos de como usar a API do Portal Cidados em diferentes cenários.

## Exemplos Básicos

### 1. Buscar Todos os Dados

```bash
GET /api/catalog
```

**Resposta:**
```json
{
  "data": [
    {
      "id": "1",
      "title": "Imposto sobre Transmissão de Bens Imóveis (ITBI)",
      "description": "Dados sobre arrecadação, incidência e registros de transferências de imóveis no município.",
      "theme": "Mobilidade",
      "region": "São Paulo",
      "accessMethod": "Disponível para download",
      "keywords": ["imposto", "imóveis", "arrecadação", "transferência", "ITBI"],
      "createdAt": "2024-01-15",
      "tags": ["Mobilidade", "São Paulo", "Download"]
    }
  ],
  "total": 8,
  "filters": {
    "themes": ["Mobilidade", "Educação", "Saúde", "Finanças"],
    "regions": ["São Paulo", "Rio de Janeiro", "Recife"],
    "accessMethods": ["Disponível para download", "Sala segura do Insper"]
  }
}
```

### 2. Busca Simples

```bash
GET /api/catalog?search=transporte
```

**Resposta:**
```json
{
  "data": [
    {
      "id": "5",
      "title": "Dados de Transporte Coletivo (Ônibus e Metrô)",
      "description": "Informações sobre linhas, horários, frota, acessibilidade e fluxo de passageiros.",
      "theme": "Mobilidade",
      "region": "São Paulo",
      "accessMethod": "Disponível para download",
      "keywords": ["transporte", "coletivo", "ônibus", "metrô"],
      "createdAt": "2024-01-03",
      "tags": ["Mobilidade", "Transporte Coletivo", "Serviços Públicos"]
    }
  ],
  "total": 1,
  "filters": { /* ... */ }
}
```

## Exemplos de Filtros

### 3. Filtrar por Tema

```bash
GET /api/catalog?theme=Mobilidade
```

**Resultado:** Todos os datasets relacionados à mobilidade urbana.

### 4. Filtrar por Região

```bash
GET /api/catalog?region=São Paulo
```

**Resultado:** Todos os datasets da cidade de São Paulo.

### 5. Filtrar por Método de Acesso

```bash
GET /api/catalog?accessMethod=Disponível para download
```

**Resultado:** Apenas datasets disponíveis para download direto.

### 6. Combinação de Filtros

```bash
GET /api/catalog?theme=Saúde&region=São Paulo&accessMethod=Disponível para download
```

**Resposta:**
```json
{
  "data": [
    {
      "id": "4",
      "title": "Atendimentos nas Clínicas da Família",
      "description": "Indicadores de consultas médicas e acompanhamento de pacientes no SUS.",
      "theme": "Saúde",
      "region": "São Paulo",
      "accessMethod": "Disponível para download",
      "keywords": ["saúde", "clínicas", "SUS", "atendimento"],
      "createdAt": "2024-01-05",
      "tags": ["Saúde", "SUS", "Atendimento Primário"]
    }
  ],
  "total": 1,
  "filters": { /* ... */ }
}
```

## Exemplos de Ordenação

### 7. Ordenar por Mais Recentes (Padrão)

```bash
GET /api/catalog?sortBy=newest
```

### 8. Ordenar por Mais Antigos

```bash
GET /api/catalog?sortBy=oldest
```

## Exemplos Complexos

### 9. Busca Completa com Filtros e Ordenação

```bash
GET /api/catalog?search=mobilidade&theme=Mobilidade&region=São Paulo&sortBy=newest
```

**Resposta:**
```json
{
  "data": [
    {
      "id": "1",
      "title": "Imposto sobre Transmissão de Bens Imóveis (ITBI)",
      "description": "Dados sobre arrecadação, incidência e registros de transferências de imóveis no município.",
      "theme": "Mobilidade",
      "region": "São Paulo",
      "accessMethod": "Disponível para download",
      "keywords": ["imposto", "imóveis", "arrecadação", "mobilidade"],
      "createdAt": "2024-01-15",
      "tags": ["Mobilidade", "São Paulo", "Download"]
    },
    {
      "id": "5",
      "title": "Dados de Transporte Coletivo (Ônibus e Metrô)",
      "description": "Informações sobre linhas, horários, frota, acessibilidade e fluxo de passageiros.",
      "theme": "Mobilidade",
      "region": "São Paulo",
      "accessMethod": "Disponível para download",
      "keywords": ["transporte", "coletivo", "ônibus", "metrô", "mobilidade"],
      "createdAt": "2024-01-03",
      "tags": ["Mobilidade", "Transporte Coletivo", "Serviços Públicos"]
    }
  ],
  "total": 2,
  "filters": { /* ... */ }
}
```

### 10. Busca por Múltiplas Cidades

```bash
GET /api/catalog?region=Multiplas cidades
```

**Resultado:** Datasets que cobrem múltiplas cidades.

## Exemplos de Código JavaScript

### 11. Fetch Básico

```javascript
async function fetchCatalogData() {
  try {
    const response = await fetch('/api/catalog');
    const data = await response.json();
    
    console.log('Total de resultados:', data.total);
    console.log('Dados:', data.data);
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return null;
  }
}
```

### 12. Busca com Parâmetros

```javascript
async function searchCatalog(searchTerm, filters = {}) {
  const params = new URLSearchParams();
  
  if (searchTerm) params.append('search', searchTerm);
  if (filters.theme) params.append('theme', filters.theme);
  if (filters.region) params.append('region', filters.region);
  if (filters.accessMethod) params.append('accessMethod', filters.accessMethod);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  
  try {
    const response = await fetch(`/api/catalog?${params.toString()}`);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Erro na busca:', error);
    return { data: [], total: 0, filters: { themes: [], regions: [], accessMethods: [] } };
  }
}

// Uso
const results = await searchCatalog('transporte', {
  theme: 'Mobilidade',
  region: 'São Paulo',
  sortBy: 'newest'
});
```

### 13. Hook React Personalizado

```javascript
import { useState, useEffect, useCallback } from 'react';

function useCatalogAPI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/catalog?${params.toString()}`);
      const result = await response.json();
      
      setData(result.data);
      return result;
    } catch (err) {
      setError(err.message);
      return { data: [], total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { data, loading, error, fetchData };
}

// Uso no componente
function CatalogComponent() {
  const { data, loading, error, fetchData } = useCatalogAPI();
  
  useEffect(() => {
    fetchData({ theme: 'Mobilidade' });
  }, [fetchData]);
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

### 14. Busca com Debounce

```javascript
import { useState, useEffect, useRef } from 'react';

function useSearchWithDebounce(delay = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, delay]);
  
  return { searchTerm, debouncedSearchTerm, setSearchTerm };
}

// Uso
function SearchComponent() {
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useSearchWithDebounce();
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(`/api/catalog?search=${debouncedSearchTerm}`)
        .then(res => res.json())
        .then(data => setResults(data.data));
    }
  }, [debouncedSearchTerm]);
  
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar..."
      />
      {results.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

## Exemplos de Tratamento de Erros

### 15. Tratamento Robusto de Erros

```javascript
async function fetchCatalogWithErrorHandling(filters = {}) {
  try {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/catalog?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validar estrutura da resposta
    if (!data || typeof data !== 'object') {
      throw new Error('Resposta inválida da API');
    }
    
    if (!Array.isArray(data.data)) {
      throw new Error('Dados não estão no formato esperado');
    }
    
    return {
      success: true,
      data: data.data,
      total: data.total,
      filters: data.filters
    };
    
  } catch (error) {
    console.error('Erro na requisição:', error);
    
    return {
      success: false,
      error: error.message,
      data: [],
      total: 0,
      filters: { themes: [], regions: [], accessMethods: [] }
    };
  }
}
```

## Exemplos de Testes

### 16. Teste Unitário

```javascript
// teste-api.test.js
import { fetchCatalogData } from './api';

describe('API Catalog', () => {
  test('deve retornar dados válidos', async () => {
    const result = await fetchCatalogData();
    
    expect(result).toBeDefined();
    expect(result.data).toBeInstanceOf(Array);
    expect(result.total).toBeGreaterThanOrEqual(0);
    expect(result.filters).toBeDefined();
  });
  
  test('deve filtrar por tema', async () => {
    const result = await fetchCatalogData({ theme: 'Mobilidade' });
    
    result.data.forEach(item => {
      expect(item.theme).toBe('Mobilidade');
    });
  });
});
```

### 17. Teste de Integração

```javascript
// teste-integracao.test.js
describe('Integração API', () => {
  test('deve buscar dados com filtros combinados', async () => {
    const filters = {
      search: 'transporte',
      theme: 'Mobilidade',
      region: 'São Paulo'
    };
    
    const result = await fetchCatalogData(filters);
    
    expect(result.data.length).toBeGreaterThan(0);
    result.data.forEach(item => {
      expect(item.theme).toBe('Mobilidade');
      expect(item.region).toBe('São Paulo');
    });
  });
});
```

## Casos de Uso Reais

### 18. Dashboard de Estatísticas

```javascript
async function getDashboardStats() {
  const [mobilidade, saude, educacao] = await Promise.all([
    fetch('/api/catalog?theme=Mobilidade').then(r => r.json()),
    fetch('/api/catalog?theme=Saúde').then(r => r.json()),
    fetch('/api/catalog?theme=Educação').then(r => r.json())
  ]);
  
  return {
    mobilidade: mobilidade.total,
    saude: saude.total,
    educacao: educacao.total,
    total: mobilidade.total + saude.total + educacao.total
  };
}
```

### 19. Sugestões de Busca

```javascript
async function getSearchSuggestions(term) {
  if (term.length < 2) return [];
  
  const result = await fetch(`/api/catalog?search=${term}`);
  const data = await result.json();
  
  // Extrair palavras-chave únicas dos resultados
  const suggestions = [...new Set(
    data.data.flatMap(item => item.keywords)
  )].filter(keyword => 
    keyword.toLowerCase().includes(term.toLowerCase())
  );
  
  return suggestions.slice(0, 5); // Top 5 sugestões
}
```

### 20. Exportação de Dados

```javascript
async function exportCatalogData(filters = {}, format = 'json') {
  const data = await fetchCatalogData(filters);
  
  if (format === 'json') {
    return JSON.stringify(data.data, null, 2);
  }
  
  if (format === 'csv') {
    const headers = ['ID', 'Título', 'Descrição', 'Tema', 'Região', 'Método de Acesso'];
    const rows = data.data.map(item => [
      item.id,
      item.title,
      item.description,
      item.theme,
      item.region,
      item.accessMethod
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
  
  throw new Error('Formato não suportado');
}
```

Estes exemplos cobrem desde casos de uso básicos até implementações avançadas, fornecendo uma base sólida para integração com a API do Portal Cidados.

