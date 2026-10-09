/**
 * Clique curto tocado quando a história ativa muda.
 *
 * É sintetizado (não há arquivo para servir): ~12ms de ruído branco decaindo,
 * passado por um passa-alta e gravado uma vez num WAV em data URI. Toca por
 * elementos <audio>, e não por Web Audio, porque no iOS a chave do silencioso
 * cala um grafo de Web Audio mas não a reprodução de mídia.
 */

const VOLUME = 0.1;
const POOL_SIZE = 4;

let pool: HTMLAudioElement[] | null = null;
let cursor = 0;
let unlocked = false;

function buildClickUri() {
  const rate = 44100;
  const length = Math.floor(rate * 0.012);
  const headerSize = 44;
  const buffer = new ArrayBuffer(headerSize + length * 2);
  const view = new DataView(buffer);
  const tag = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  };

  tag(0, "RIFF");
  view.setUint32(4, 36 + length * 2, true);
  tag(8, "WAVEfmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  tag(36, "data");
  view.setUint32(40, length * 2, true);

  let previousIn = 0;
  let previousOut = 0;
  const alpha = 0.63;
  for (let i = 0; i < length; i++) {
    const input = (Math.random() * 2 - 1) * (1 - i / length);
    const output = alpha * (previousOut + input - previousIn);
    previousIn = input;
    previousOut = output;
    view.setInt16(
      headerSize + i * 2,
      Math.max(-1, Math.min(1, output)) * 32767,
      true,
    );
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
}

function getPool() {
  if (!pool) {
    const uri = buildClickUri();
    pool = Array.from({ length: POOL_SIZE }, () => {
      const element = new Audio(uri);
      element.preload = "auto";
      element.volume = VOLUME;
      return element;
    });
  }
  return pool;
}

/**
 * Libera o áudio a partir de um gesto do usuário. O iOS só deixa um elemento
 * tocar depois se ele já tocou uma vez dentro de um gesto.
 */
export function unlockClickSound() {
  if (unlocked) return;
  unlocked = true;

  for (const element of getPool()) {
    try {
      element.muted = true;
      const playing = element.play();
      element.muted = false;
      const reset = () => {
        element.pause();
        element.currentTime = 0;
      };
      playing.then(reset, () => {});
    } catch {
      element.muted = false;
    }
  }
}

export function playClickSound() {
  if (!unlocked) return;

  const element = getPool()[cursor % POOL_SIZE];
  cursor += 1;
  try {
    element.currentTime = 0;
    element.play().catch(() => {});
  } catch {
    // Sem áudio disponível: o clique é só um detalhe.
  }
}
