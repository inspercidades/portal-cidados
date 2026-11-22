import type mapboxgl from "mapbox-gl";

/**
 * Faz dois mapas andarem juntos (modo lado a lado). O modo deslizante usa a
 * sincronização do próprio `mapbox-gl-compare`. Devolve a função que desliga.
 */
export function syncCameras(a: mapboxgl.Map, b: mapboxgl.Map): () => void {
  let syncing = false;

  const follow = (from: mapboxgl.Map, to: mapboxgl.Map) => () => {
    // `jumpTo` dispara `move` no outro mapa; sem a trava, um seguiria o outro sem fim.
    if (syncing) return;
    syncing = true;
    to.jumpTo({
      center: from.getCenter(),
      zoom: from.getZoom(),
      bearing: from.getBearing(),
      pitch: from.getPitch(),
    });
    syncing = false;
  };

  const aToB = follow(a, b);
  const bToA = follow(b, a);
  a.on("move", aToB);
  b.on("move", bToA);
  aToB();

  return () => {
    a.off("move", aToB);
    b.off("move", bToA);
  };
}
