import { chrome } from "@/i18n/messages/chrome";
import { metadataFor } from "@/i18n/metadata";
import Home from "./home-client";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const copy = chrome[locale].home;
  return metadataFor(params, {
    path: "/",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

export default function Page() {
  return <Home />;
}
