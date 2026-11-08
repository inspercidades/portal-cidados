import Link from "next/link";
import { CookiePreferencesLink } from "@/components/cookie-consent";
import { ExternalLink } from "@/components/external-link";
import { Header } from "@/components/Header";
import { PageJsonLd } from "@/components/page-json-ld";
import { hasLocale } from "@/i18n/config";
import { privacyCopy } from "@/i18n/messages/privacy";
import { metadataFor } from "@/i18n/metadata";
import { localeHref } from "@/i18n/routing";
import { EXTERNAL_LINKS } from "@/lib/site";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const copy = privacyCopy[locale];
  return metadataFor(params, {
    path: "/privacidade",
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: copy.keywords,
  });
}

export default async function PrivacidadePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt";
  const copy = privacyCopy[locale];

  return (
    <div className="min-h-screen bg-background">
      <PageJsonLd
        locale={locale}
        breadcrumbs={[
          { name: copy.home, path: "/" },
          { name: copy.metaTitle, path: "/privacidade" },
        ]}
      />
      <Header />

      <article className="mx-auto max-w-3xl px-4 pt-16 pb-28 md:px-8 lg:px-12">
        <h1 className="font-gt-ultra-fine text-4xl font-bold text-foreground">
          {copy.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">{copy.updated}</p>

        <div className="mt-10 space-y-10 leading-relaxed text-foreground/80">
          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              {copy.responsibleTitle}
            </h2>
            <p>{copy.responsibleBody}</p>
            <p>
              {copy.questionsBefore}
              <Link
                href={localeHref(locale, "/sobre")}
                className="underline underline-offset-2 hover:text-foreground"
              >
                {copy.aboutLink}
              </Link>
              {copy.questionsAfter}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              {copy.cookiesTitle}
            </h2>
            <p>{copy.cookiesBody}</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              {copy.tableTitle}
            </h2>
            <div className="overflow-x-auto border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead className="bg-background-2 text-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">{copy.colCookie}</th>
                    <th className="px-4 py-3 font-medium">{copy.colCategory}</th>
                    <th className="px-4 py-3 font-medium">{copy.colPurpose}</th>
                    <th className="px-4 py-3 font-medium">{copy.colDuration}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 align-top">cookie-consent</td>
                    <td className="px-4 py-3 align-top">{copy.necessary}</td>
                    <td className="px-4 py-3 align-top">{copy.consentPurpose}</td>
                    <td className="px-4 py-3 align-top">{copy.consentDuration}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">_ga, _ga_*</td>
                    <td className="px-4 py-3 align-top">{copy.analytic}</td>
                    <td className="px-4 py-3 align-top">{copy.gaPurpose}</td>
                    <td className="px-4 py-3 align-top">{copy.gaDuration}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      {copy.clarityName}
                    </td>
                    <td className="px-4 py-3 align-top">{copy.analytic}</td>
                    <td className="px-4 py-3 align-top">{copy.clarityPurpose}</td>
                    <td className="px-4 py-3 align-top">{copy.clarityDuration}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>{copy.tableNote}</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              {copy.legalTitle}
            </h2>
            <p>{copy.legalBody}</p>
            <p>{copy.legalAbroad}</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              {copy.revokeTitle}
            </h2>
            <p>{copy.revokeBody}</p>
            <CookiePreferencesLink className="inline-flex h-9 items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90" />
          </section>

          <section className="space-y-3">
            <h2 className="font-gt-ultra-fine text-2xl font-medium text-foreground">
              {copy.rightsTitle}
            </h2>
            <p>
              {copy.rightsBefore}
              <ExternalLink
                href={EXTERNAL_LINKS.privacyPortal}
                className="underline underline-offset-2 hover:text-foreground"
              >
                {copy.rightsLink}
              </ExternalLink>
              {copy.rightsAfter}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
