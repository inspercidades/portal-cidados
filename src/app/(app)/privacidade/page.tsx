import type { Metadata } from "next";
import Link from "next/link";
import { CookiePreferencesLink } from "@/components/cookie-consent";
import { ExternalLink } from "@/components/external-link";
import { Header } from "@/components/Header";
import { PageJsonLd } from "@/components/page-json-ld";
import { buildMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  path: "/privacidade",
  title: "Privacidade",
  description:
    "Como o Portal Cidados usa cookies e ferramentas de audiência, e como alterar essa escolha.",
  keywords: ["privacidade", "cookies", "LGPD"],
});

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageJsonLd
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Privacidade", path: "/privacidade" },
        ]}
      />
      <Header />

      <article className="mx-auto max-w-3xl px-4 pt-16 pb-28 md:px-8 lg:px-12">
        <h1 className="font-gt-ultra-fine text-4xl font-bold text-foreground">
          Privacidade e cookies
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Atualizado em 3 de outubro de 2026.
        </p>

        <div className="mt-10 space-y-10 leading-relaxed text-foreground/80">
          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              Quem é responsável
            </h2>
            <p>
              Este site é o Portal Cidados, plataforma do Centro de Estudos das
              Cidades — Laboratório Arq.Futuro do Insper. O Insper é o
              controlador dos dados pessoais tratados aqui.
            </p>
            <p>
              Dúvidas sobre este aviso podem ser encaminhadas pelos canais
              indicados na página{" "}
              <Link
                href="/sobre"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Sobre
              </Link>
              . Pedidos relacionados a dados pessoais seguem o caminho da seção
              Seus direitos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              O que são cookies
            </h2>
            <p>
              Cookies são pequenos arquivos gravados no navegador. Este site
              também usa identificadores semelhantes, definidos pelas
              ferramentas de audiência descritas abaixo. Há cookies
              indispensáveis para o funcionamento e cookies opcionais, usados só
              se você autorizar.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              Cookies que usamos
            </h2>
            <div className="overflow-x-auto border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead className="bg-background-2 text-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Cookie</th>
                    <th className="px-4 py-3 font-medium">Categoria</th>
                    <th className="px-4 py-3 font-medium">Finalidade</th>
                    <th className="px-4 py-3 font-medium">Duração</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 align-top">cookie-consent</td>
                    <td className="px-4 py-3 align-top">Necessário</td>
                    <td className="px-4 py-3 align-top">
                      Guarda a sua escolha de aceitar ou recusar os cookies de
                      audiência.
                    </td>
                    <td className="px-4 py-3 align-top">12 meses</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">_ga, _ga_*</td>
                    <td className="px-4 py-3 align-top">Analítico</td>
                    <td className="px-4 py-3 align-top">
                      Google Analytics 4. Mede visitas, páginas e eventos de
                      uso. Os dados são enviados ao Google.
                    </td>
                    <td className="px-4 py-3 align-top">Até 2 anos</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      _clck, _clsk e identificadores do Clarity
                    </td>
                    <td className="px-4 py-3 align-top">Analítico</td>
                    <td className="px-4 py-3 align-top">
                      Microsoft Clarity. Gera mapas de calor e gravações de
                      sessão (cliques, movimento e rolagem). Os dados são
                      enviados à Microsoft.
                    </td>
                    <td className="px-4 py-3 align-top">Até 12 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              O cookie necessário funciona sem o banner. Google Analytics e
              Microsoft Clarity só são carregados se você clicar em Aceitar. Não
              usamos cookies de publicidade.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              Base legal
            </h2>
            <p>
              O cookie necessário existe para lembrar a preferência de cookies.
              Os cookies analíticos e a gravação de sessão dependem do seu
              consentimento, que pode ser recusado ou retirado a qualquer
              momento.
            </p>
            <p>
              Google e Microsoft podem tratar esses dados fora do Brasil,
              conforme as políticas de cada serviço. O endereço IP e
              identificadores do navegador podem ser dados pessoais.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              Como alterar ou revogar
            </h2>
            <p>
              Você pode mudar a escolha quando quiser. Recusar ou retirar o
              consentimento não impede o uso do site.
            </p>
            <CookiePreferencesLink className="inline-flex h-9 items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90" />
          </section>

          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              Seus direitos
            </h2>
            <p>
              Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018),
              você pode pedir confirmação do tratamento, acesso, correção,
              anonimização, eliminação ou informação sobre o compartilhamento
              dos seus dados, além de revogar o consentimento. Esses pedidos são
              feitos no{" "}
              <ExternalLink
                href={EXTERNAL_LINKS.privacyPortal}
                className="underline underline-offset-2 hover:text-foreground"
              >
                Portal da Privacidade do Insper
              </ExternalLink>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
