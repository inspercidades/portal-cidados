"use client";

import { useCallback } from "react";
import { toast } from "sonner";

export interface ShareContent {
  title: string;
  text: string;
  url: string;
}

export interface ShareMessages {
  /** Toast quando o navegador não tem Web Share e o link vai para a área de transferência. */
  copied: string;
  /** Toast quando nem compartilhar nem copiar funcionou. */
  failed: string;
}

export type ShareOutcome = "shared" | "copied" | "cancelled" | "failed";

/**
 * Compartilha pela API nativa do navegador (a mesma das histórias). Sem ela,
 * como no Firefox de desktop, copia o link e avisa com um toast.
 */
export function useShare(messages: ShareMessages) {
  const { copied, failed } = messages;

  return useCallback(
    async (content: ShareContent): Promise<ShareOutcome> => {
      if (typeof navigator.share === "function") {
        const canShare =
          typeof navigator.canShare !== "function" ||
          navigator.canShare(content);
        if (canShare) {
          try {
            await navigator.share(content);
            return "shared";
          } catch (error) {
            // Fechar a folha de compartilhamento não é erro.
            if ((error as Error)?.name === "AbortError") return "cancelled";
          }
        }
      }

      try {
        if (!navigator.clipboard) throw new Error("Clipboard indisponível");
        await navigator.clipboard.writeText(content.url);
        toast.success(copied);
        return "copied";
      } catch (error) {
        console.error(failed, error);
        toast.error(failed);
        return "failed";
      }
    },
    [copied, failed],
  );
}
