import { headers } from "next/headers";
import { JsonLd } from "@/components/json-ld";
import {
  type ArticleJsonLdOptions,
  articleJsonLd,
  breadcrumbJsonLd,
} from "@/lib/structured-data";

/**
 * Injeta os dados estruturados de uma história: Article + BreadcrumbList.
 * É um Server Component assíncrono para ler o nonce do CSP via headers().
 */
export async function StoryJsonLd(props: ArticleJsonLdOptions) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <>
      <JsonLd nonce={nonce} data={articleJsonLd(props)} />
      <JsonLd
        nonce={nonce}
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Histórias", path: "/historias" },
          { name: props.title, path: props.path },
        ])}
      />
    </>
  );
}
