/** Rota da história de transporte. Fica oculta até a flag ser ligada. */
export const HABITACAO_STORY_PATH = "/historias/habitacao";

/**
 * Só a string "true" publica a história. Ausente, vazia ou qualquer outro
 * valor mantém a rota, a home e o índice sem ela.
 *
 * O acesso é estático de propósito: o Next só embute `NEXT_PUBLIC_*` assim.
 */
export function isHabitacaoStoryEnabled() {
  return process.env.NEXT_PUBLIC_FEATURE_HABITACAO === "true";
}

export function isHabitacaoStoryPath(pathname: string) {
  return (
    pathname === HABITACAO_STORY_PATH ||
    pathname.startsWith(`${HABITACAO_STORY_PATH}/`)
  );
}
