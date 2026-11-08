import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/i18n/config";
import { buildMetadata, type BuildMetadataOptions } from "@/lib/seo";

export async function metadataFor(
  params: Promise<{ lang: string }>,
  options: Omit<BuildMetadataOptions, "lang">,
): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "pt";
  return buildMetadata({ ...options, lang: locale });
}
