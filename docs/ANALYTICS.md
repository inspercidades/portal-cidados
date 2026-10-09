# Analytics — Portal Cidados

O portal utiliza duas ferramentas de analytics em paralelo: **Google Analytics 4** para métricas de tráfego e **Microsoft Clarity** para análise de comportamento do usuário (heatmaps e gravações de sessão).

As duas só carregam depois que a pessoa clica em **Aceitar** no banner de cookies. O cookie que guarda essa escolha é necessário e funciona sem o banner. Recusar ou retirar o consentimento não impede o uso do site.

---

## Aviso de privacidade e canal do Insper

O Portal Cidados é uma iniciativa do Insper. Dois documentos coexistem e não se substituem.

| O quê | Onde | Para que serve |
| --- | --- | --- |
| **Aviso de privacidade** | Página local [`/privacidade`](../src/app/(app)/privacidade/page.tsx) | Descreve o tratamento deste site: cookie de consentimento, Google Analytics 4 e Microsoft Clarity, com finalidade, duração, controlador e com quem os dados são compartilhados |
| **Portal da Privacidade do Insper** | [`EXTERNAL_LINKS.privacyPortal`](../src/lib/site.ts) | Canal do controlador para pedidos de acesso, correção e eliminação, e onde o contato do encarregado fica publicado |

O aviso de `insper.edu.br` descreve o site da instituição. Ele não lista Analytics e Clarity deste portal, então o rótulo **Aviso de privacidade** não aponta para lá. A LGPD (art. 9º) pede informação do tratamento concreto. O guia da Controladoria Geral do Município de São Paulo separa o aviso do site do aviso institucional e recomenda aviso e política de cookies próprios em cada subdomínio, porque cookies e finalidades mudam de uma propriedade para outra.

O Portal da Privacidade do Insper permanece como link externo. É o canal de direitos do controlador (LGPD, art. 41), não um segundo aviso. No próprio site do Insper, o banner de cookies diz que o aviso institucional está dentro desse portal — por isso os dois links do rodapé não podem ir para o mesmo destino.

O Insper é o controlador dos dados tratados aqui. Dúvidas sobre o texto do aviso seguem os contatos da página `/sobre`. Pedidos sobre dados pessoais seguem o Portal da Privacidade.

### Onde isso aparece

- Rodapé ([`Footer.tsx`](../src/components/Footer.tsx)): **Aviso de privacidade** é link interno para `/privacidade`. **Portal da Privacidade do Insper** continua externo.
- Banner ([`cookie-consent.tsx`](../src/components/cookie-consent.tsx)): o mesmo nome, **Aviso de privacidade**, com o mesmo destino `/privacidade`.
- Página local, seção **Seus direitos**: link direto para `EXTERNAL_LINKS.privacyPortal`.

Não existe `privacyNotice` em [`src/lib/site.ts`](../src/lib/site.ts). Só `privacyPortal`.

Se uma ferramenta nova passar a gravar cookies ou identificadores, atualize a página `/privacidade` (tabela de cookies, finalidade e com quem os dados são compartilhados) junto com a integração técnica abaixo. O aviso institucional do Insper não substitui essa atualização.

---

## Google Analytics 4

Integrado via pacote oficial `@next/third-parties/google` com o componente `<GoogleAnalytics>`.

- Coleta pageviews, eventos e métricas de engajamento
- Suporta `debugMode` habilitado automaticamente em desenvolvimento
- O script é injetado com **nonce CSP** para segurança

**Variável de ambiente:**

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Microsoft Clarity

Integrado via pacote `@microsoft/clarity` com um componente client dedicado (`ClarityInit`).

### O que o Clarity coleta

- **Heatmaps** — onde os usuários clicam, movem o mouse e rolam a página
- **Gravações de sessão** — replay do comportamento completo de cada visita
- **Insights automáticos** — dead clicks, rage clicks, scroll depth, etc.

### Como funciona a integração

O Clarity é inicializado exclusivamente no cliente (browser), nunca no servidor:

```
layout.tsx (Server Component)
└── <head>
    └── <ClarityInit />  ← Client Component
            │
            └── useEffect(() => Clarity.init(id))
                    │
                    └── injeta <script src="https://www.clarity.ms/tag/{id}">
```

**Por que um componente separado?**

O `RootLayout` é um Server Component — adicionar `"use client"` nele quebraria o SSR de toda a aplicação. O `ClarityInit` isola a inicialização client-side sem impactar o layout raiz.

### Arquivo do componente

`src/components/clarity-init.tsx`

```tsx
"use client";

import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function ClarityInit() {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (clarityId) {
      Clarity.init(clarityId);
    }
  }, []);

  return null;
}
```

- Só inicializa se `NEXT_PUBLIC_CLARITY_ID` estiver definido — sem erros silenciosos em ambientes sem a variável configurada
- Executa uma única vez na montagem do componente (`[]`)

### Uso no layout

`src/app/layout.tsx`

```tsx
import ClarityInit from "@/components/clarity-init";

export default async function RootLayout({ children }) {
  return (
    <html>
      <head>
        <GoogleAnalytics ... />
        <ClarityInit />
      </head>
      <body>...</body>
    </html>
  );
}
```

---

## Content Security Policy (CSP)

O projeto usa uma CSP estrita com nonce em `src/middleware.ts`. O Clarity injeta dinamicamente um script externo e envia dados para seus servidores, portanto os seguintes domínios são necessários:

| Diretiva        | Domínio adicionado        | Motivo                                             |
| --------------- | -------------------------- | -------------------------------------------------- |
| `script-src`  | `https://www.clarity.ms`, `https://scripts.clarity.ms` | Script de tracking injetado pelo`Clarity.init()` |
| `connect-src` | `https://*.clarity.ms`   | Envio de eventos e dados de sessão (o Clarity usa vários subdomínios: `c.`, `m.`, `i.` etc.) |
| `img-src`     | `https://*.clarity.ms`   | Pixel de sincronização de cookies                |

---

## Variáveis de ambiente

O prefixo `NEXT_PUBLIC_` é obrigatório para que o Next.js exponha a variável ao bundle do cliente.

| Variável                           | Descrição                          |
| ----------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_CLARITY_ID`          | Project ID do Microsoft Clarity      |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Measurement ID do Google Analytics 4 |

### Configuração por ambiente

Cada ambiente tem seu próprio Project ID no painel do Clarity. Configure a variável na plataforma de deploy para cada ambiente:

| Ambiente              | Como configurar                                                      |
| --------------------- | -------------------------------------------------------------------- |
| Local / Homologação | `.env` na raiz do projeto                                          |
| Produção            | Variável de ambiente na plataforma de deploy (Vercel, Docker, etc.) |

```env
# .env (homologação)
NEXT_PUBLIC_CLARITY_ID=<id-homologacao>

# produção — definir na plataforma de deploy
NEXT_PUBLIC_CLARITY_ID=<id-producao>
```

> O arquivo `.env` está no `.gitignore` — os IDs nunca são commitados no repositório.

### Como obter o Project ID

1. Acesse [clarity.microsoft.com](https://clarity.microsoft.com)
2. Crie ou selecione um projeto
3. Vá em **Settings → Overview**
4. Copie o **Project ID**

---

## Verificando a integração

### No browser (DevTools)

1. Abra o DevTools → aba **Network**
2. Filtre por `clarity.ms`
3. Você verá requisições para `https://c.clarity.ms/collect` confirmando que os dados estão sendo enviados

### No painel do Clarity

Sessões aparecem no dashboard em até **2 horas** após o primeiro acesso. Em homologação, use o Project ID correspondente para isolar os dados dos ambientes.

---

## Referências

- [Microsoft Clarity — Documentação oficial](https://learn.microsoft.com/en-us/clarity/)
- [Pacote npm @microsoft/clarity](https://www.npmjs.com/package/@microsoft/clarity)
- [Next.js — Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Tutorial](https://dev.to/chamupathi_mendis_cdd19da/integrate-ms-clarity-to-nextjs-app-app-router--241o)
