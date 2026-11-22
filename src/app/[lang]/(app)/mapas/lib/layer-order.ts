// Ordem das camadas ativas.
//
// O estado guarda a ordem de desenho: a primeira camada fica embaixo e a
// última por cima, como o Mapbox empilha. A lista da sidebar mostra o inverso:
// a camada do topo do mapa aparece primeiro.
//
// Sem imports: os testes carregam o arquivo por transpile.

export function toDisplayOrder(drawOrder: readonly string[]): string[] {
  return [...drawOrder].reverse();
}

/**
 * Move `activeId` para a posição de `overId` na lista exibida e devolve a nova
 * ordem de desenho. Ids desconhecidos deixam a ordem como está.
 */
export function moveInDisplayOrder(
  drawOrder: readonly string[],
  activeId: string,
  overId: string,
): string[] {
  const display = toDisplayOrder(drawOrder);
  const from = display.indexOf(activeId);
  const to = display.indexOf(overId);
  if (from < 0 || to < 0 || from === to) return [...drawOrder];

  const [moved] = display.splice(from, 1);
  display.splice(to, 0, moved);
  return display.reverse();
}
