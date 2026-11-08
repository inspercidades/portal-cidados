import type { ReactNode } from "react";

/** Quantas palavras entram na animação — serve para encadear o bloco seguinte. */
export function countWords(text: string) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

const CHAR_STEP_MS = 35;

/**
 * Texto que sobe de dentro de uma máscara, palavra por palavra ou letra por
 * letra. Só CSS, então pode ser renderizado no servidor. O texto inteiro fica
 * disponível para leitores de tela.
 */
export function RisingText({
  text,
  by = "word",
  delayMs = 0,
  stepMs = by === "char" ? CHAR_STEP_MS : 22,
}: {
  text: string;
  by?: "word" | "char";
  delayMs?: number;
  stepMs?: number;
}) {
  let order = 0;
  const piece = (content: string, key: string) => (
    <span key={key} className="rise-mask">
      <span
        className="rise-item"
        style={{ animationDelay: `${delayMs + order++ * stepMs}ms` }}
      >
        {content}
      </span>
    </span>
  );

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {
          text
            .trim()
            .split(/\s+/)
            .reduce<{ nodes: ReactNode[]; cursor: number }>(
              (acc, word) => {
                const key = `${acc.cursor}-${word}`;
                const node = (
                  <span key={key}>
                    {acc.cursor ? " " : null}
                    {by === "char" ? (
                      <span className="rise-word">
                        {Array.from(word, (char, charIndex) =>
                          piece(char, `${key}-${charIndex}`),
                        )}
                      </span>
                    ) : (
                      piece(word, key)
                    )}
                  </span>
                );
                acc.nodes.push(node);
                acc.cursor += word.length + 1;
                return acc;
              },
              { nodes: [], cursor: 0 },
            ).nodes
        }
      </span>
    </>
  );
}

/** Títulos longos não passam de um segundo na entrada letra a letra. */
export function titleStepMs(title: string) {
  const letters = title.replace(/\s/g, "").length || 1;
  return Math.min(CHAR_STEP_MS, 1000 / letters);
}
