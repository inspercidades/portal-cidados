interface JsonLdProps {
  data: Record<string, unknown>;
  /** Nonce do CSP para permitir o script inline (ver src/middleware.ts). */
  nonce?: string;
}

/**
 * Renderiza dados estruturados (JSON-LD) de forma segura. O JSON é serializado
 * no servidor e injetado num <script type="application/ld+json">. O nonce é
 * necessário porque o CSP do projeto usa nonce em scripts inline.
 */
export function JsonLd({ data, nonce }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD precisa ser injetado como texto no script.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
