# Portal Cidados - Documentação Técnica

## Visão Geral

O Portal Cidados é uma aplicação web construída com Next.js 15 que permite aos usuários explorar e filtrar dados públicos através de um catálogo interativo. A aplicação combina uma interface moderna com funcionalidades avançadas de busca e filtros.

## Estrutura da Documentação

### 📚 Documentação Disponível

1. **[API Documentation](./API_DOCUMENTATION.md)** - Documentação completa da API REST
2. **[Frontend Integration](./FRONTEND_INTEGRATION.md)** - Como o frontend se integra com a API
3. **[README](./README.md)** - Este arquivo com visão geral

## Tecnologias Utilizadas

### Frontend

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de CSS utilitário
- **Shadcn/UI** - Componentes de interface
- **Lucide React** - Ícones

### Backend

- **Next.js API Routes** - Endpoints REST
- **Node.js** - Runtime JavaScript

### Ferramentas de Desenvolvimento

- **Biome** - Linter e formatter
- **ESLint** - Análise estática de código

## Funcionalidades Principais

### 🔍 Busca Avançada

- Busca textual em tempo real com debounce de 300ms
- Busca em títulos, descrições e palavras-chave
- Interface responsiva e intuitiva

### 🎯 Sistema de Filtros

- Filtros por tema (Mobilidade, Educação, Saúde, etc.)
- Filtros por região geográfica
- Filtros por método de acesso (Download, Sala segura)
- Filtros combináveis com remoção individual

### 📊 Visualização de Dados

- Cards informativos com tags categorizadas
- Grid responsivo (1-3 colunas conforme dispositivo)
- Estados de loading com skeleton animations
- Tratamento de estados vazios

### 🔄 Ordenação

- Ordenação por data (mais recentes/mais antigos)
- Interface dropdown intuitiva

## Arquitetura da Aplicação

### Estrutura de Pastas

```
src/
├── app/                    # App Router do Next.js
│   ├── (app)/             # Grupo de rotas
│   │   └── catalogo-de-dados/
│   │       ├── page.tsx   # Página principal
│   │       └── loading.tsx # Skeleton de loading
│   └── api/               # API Routes
│       └── catalog/       # Endpoint do catálogo
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Shadcn)
│   ├── CatalogPage.tsx   # Componente principal
│   ├── SearchBar.tsx     # Barra de busca
│   ├── CatalogFilters.tsx # Filtros
│   ├── DataCard.tsx      # Card de dados
│   └── ...
├── hooks/                # Hooks customizados
│   └── useDebounce.ts    # Hook de debounce
└── lib/                  # Utilitários e dados
    └── data/            # Dados mock
        └── catalog.ts   # Dados do catálogo
```

### Fluxo de Dados

```mermaid
graph TD
    A[Usuário] --> B[Interface]
    B --> C[Estados Locais]
    C --> D[API Routes]
    D --> E[Dados Mock]
    E --> D
    D --> C
    C --> B
    B --> A
```

## Configuração e Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [repository-url]
cd portal-cidados

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Executa o linter
npm run format       # Formata o código
```

## Desenvolvimento

### Convenções de Código

- **TypeScript**: Tipagem obrigatória
- **ESLint**: Configurado com regras do Next.js
- **Biome**: Formatação automática
- **Imports**: Ordenação automática (absolute paths)

### Estrutura de Componentes

```typescript
// Exemplo de componente
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Implementação
}
```

### Hooks Customizados

```typescript
// Exemplo de hook
export function useCustomHook<T>(value: T, delay: number): T {
  // Implementação
}
```

## Performance

### Otimizações Implementadas

1. **Debounce na Busca**: 300ms de delay para reduzir requisições
2. **Loading States**: Skeleton animations para melhor UX
3. **Memoização**: useCallback para funções pesadas
4. **Cache**: Cache nativo do Next.js para API routes
5. **Componentes Server/Client**: Separação adequada

### Métricas de Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Bundle Size**: Otimizado com tree shaking

## Testes

### Estrutura de Testes

```bash
# Executar testes
npm run test

# Testes com coverage
npm run test:coverage
```

### Tipos de Testes

- **Unit Tests**: Componentes individuais
- **Integration Tests**: Fluxos completos
- **E2E Tests**: Cenários de usuário

## Deploy

### Ambiente de Desenvolvimento

```bash
npm run dev
# Acesse http://localhost:3000
```

### Ambiente de Produção

```bash
npm run build
npm run start
```

### Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=production
```

## Monitoramento

### Logs

- **Console Logs**: Para debugging
- **Error Tracking**: Implementação futura
- **Performance Monitoring**: Implementação futura

### Métricas

- **Page Views**: Tracking de páginas
- **User Interactions**: Cliques e filtros
- **API Performance**: Tempo de resposta

## Segurança

### Implementações Atuais

- **XSS Protection**: Sanitização automática do React
- **CSRF Protection**: Tokens nativos do Next.js
- **Input Validation**: Validação de tipos TypeScript

### Próximas Implementações

- **Rate Limiting**: Controle de requisições
- **Authentication**: Sistema de login
- **Authorization**: Controle de acesso

## Roadmap

### Versão 1.1.0

- [ ] Paginação na API
- [ ] Filtros avançados
- [ ] Exportação de dados

### Versão 1.2.0

- [ ] Sistema de autenticação
- [ ] Dashboard administrativo
- [ ] API de upload de dados

### Versão 2.0.0

- [ ] Integração com banco de dados real
- [ ] Sistema de notificações
- [ ] Mobile app

## Contribuição

### Como Contribuir

1. Fork o repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

### Padrões de Commit

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção
```

## Suporte

### Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Contato

Para dúvidas ou suporte técnico, entre em contato com a equipe de desenvolvimento.

---

**Portal Cidados** - Desenvolvido com ❤️ para transparência e acesso à informação pública.

