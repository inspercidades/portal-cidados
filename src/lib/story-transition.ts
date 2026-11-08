import { toInternalPath } from "@/i18n/routing";

/** A imagem clicada viaja até a primeira imagem da ficha. */
export const STORY_HERO_ATTR = "data-story-hero";
/** Cada card do carrossel da home, identificado pelo slug da história. */
export const HOME_STORY_ATTR = "data-home-story";
/** Cada card original da fileira de /historias. */
export const STORY_CARD_ATTR = "data-story-card";
/** As outras imagens da galeria, que entram depois da imagem clicada. */
export const STORY_REST_ATTR = "data-story-rest";

const HERO_NAME = "story-hero";
const IMAGE_CLASS = "story-image";
const ARRIVING = "hero-arriving";
const ARRIVED = "hero-arrived";
const LAST_KEY = "portal-cidados:last-story";
const MAX_WAIT_MS = 3000;

type SharedImage = { name: string; from: HTMLElement; to: string };

type ViewTransitionHandle = {
  ready: Promise<void>;
  finished: Promise<void>;
};

function viewTransitionStarter() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return null;
  const start = (
    document as Document & {
      startViewTransition?: (
        callback: () => void | Promise<void>,
      ) => ViewTransitionHandle;
    }
  ).startViewTransition;
  return typeof start === "function" ? start : null;
}

function waitForElement(selector: string) {
  return new Promise<void>((resolve) => {
    if (document.querySelector(selector)) {
      resolve();
      return;
    }
    const observer = new MutationObserver(() => {
      if (!document.querySelector(selector)) return;
      observer.disconnect();
      window.clearTimeout(timer);
      resolve();
    });
    const timer = window.setTimeout(() => {
      observer.disconnect();
      resolve();
    }, MAX_WAIT_MS);
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

function nameElement(element: HTMLElement, name: string) {
  element.style.viewTransitionName = name;
  element.style.setProperty("view-transition-class", name ? IMAGE_CLASS : "");
}

export function isPlainClick(event: {
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  button: number;
}) {
  return !(
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function rememberStory(slug: string) {
  try {
    sessionStorage.setItem(LAST_KEY, slug);
  } catch {
    // Sem storage a volta só perde a animação.
  }
}

export function readRememberedStory() {
  try {
    return sessionStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

function navigateWithImages(
  navigate: (href: string) => void,
  href: string,
  shared: SharedImage[],
  ready: string,
  options: {
    onlyVisible?: boolean;
    onStart?: () => void;
    onFinish?: () => void;
  } = {},
) {
  const images = options.onlyVisible
    ? shared.filter(({ from }) => {
        const rect = from.getBoundingClientRect();
        return rect.right > 0 && rect.left < window.innerWidth;
      })
    : shared;
  const start = viewTransitionStarter();
  if (!images.length || !start) return false;

  for (const { from, name } of images) nameElement(from, name);
  options.onStart?.();
  const targets: HTMLElement[] = [];

  const transition = start.call(document, async () => {
    navigate(href);
    await waitForElement(ready);
    for (const { to, name } of images) {
      const target = document.querySelector<HTMLElement>(to);
      if (!target) continue;
      nameElement(target, name);
      targets.push(target);
    }
  });
  if (!transition) {
    for (const { from } of images) nameElement(from, "");
    options.onFinish?.();
    return false;
  }

  transition.ready.catch(() => {});
  const reset = () => {
    for (const { from } of images) nameElement(from, "");
    for (const target of targets) nameElement(target, "");
    options.onFinish?.();
  };
  transition.finished.then(reset, reset);
  return true;
}

/** A imagem do card desliza até a primeira imagem da ficha. */
export function navigateWithHero(
  navigate: (href: string) => void,
  href: string,
  slug: string,
  from: HTMLElement | null,
) {
  if (!from) return false;
  rememberStory(slug);
  const target = `[${STORY_HERO_ATTR}="${slug}"]`;
  const root = document.documentElement;
  return navigateWithImages(
    navigate,
    href,
    [{ name: HERO_NAME, from, to: target }],
    target,
    {
      onStart: () => root.classList.add(ARRIVING),
      onFinish: () => {
        root.classList.remove(ARRIVING);
        root.classList.add(ARRIVED);
        window.setTimeout(() => root.classList.remove(ARRIVED), 1500);
      },
    },
  );
}

/** Os cards visíveis da home deslizam até a fileira de /historias. */
export function navigateToStories(
  navigate: (href: string) => void,
  href: string,
) {
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>(`[${HOME_STORY_ATTR}]`),
  );
  const second = cards[1]?.getAttribute(HOME_STORY_ATTR);
  if (second) rememberStory(second);
  const shared = cards.flatMap((from) => {
    const slug = from.getAttribute(HOME_STORY_ATTR);
    if (!slug) return [];
    return [
      {
        name: `story-${slug}`,
        from,
        to: `[${STORY_CARD_ATTR}="${slug}"]`,
      },
    ];
  });
  return navigateWithImages(navigate, href, shared, `[${STORY_CARD_ATTR}]`, {
    onlyVisible: true,
  });
}

/**
 * O botão voltar do navegador não passa pelos cliques. A URL já mudou, mas o
 * DOM antigo ainda está na tela: a transição fotografa esse DOM e espera a
 * página nova nomear o destino.
 */
export function startBackTransition(pathname: string) {
  const internal = toInternalPath(pathname);
  let shared: SharedImage[] = [];
  let ready = "";

  if (internal === "/historias") {
    const from = document.querySelector<HTMLElement>(`[${STORY_HERO_ATTR}]`);
    const slug = from?.getAttribute(STORY_HERO_ATTR);
    if (!from || !slug) return false;
    rememberStory(slug);
    ready = `[${STORY_CARD_ATTR}="${slug}"]`;
    shared = [{ name: HERO_NAME, from, to: ready }];
  } else if (internal === "/") {
    shared = Array.from(
      document.querySelectorAll<HTMLElement>(`[${STORY_CARD_ATTR}]`),
    ).flatMap((from) => {
      const slug = from.getAttribute(STORY_CARD_ATTR);
      if (!slug) return [];
      return [
        {
          name: `story-${slug}`,
          from,
          to: `[${HOME_STORY_ATTR}="${slug}"]`,
        },
      ];
    });
    ready = `[${HOME_STORY_ATTR}]`;
  } else {
    return false;
  }

  const start = viewTransitionStarter();
  if (!shared.length || !start) return false;
  for (const { from, name } of shared) nameElement(from, name);
  const targets: HTMLElement[] = [];

  const transition = start.call(document, async () => {
    await waitForElement(ready);
    for (const { to, name } of shared) {
      const target = document.querySelector<HTMLElement>(to);
      if (!target) continue;
      nameElement(target, name);
      targets.push(target);
    }
  });
  if (!transition) {
    for (const { from } of shared) nameElement(from, "");
    return false;
  }

  transition.ready.catch(() => {});
  const reset = () => {
    for (const { from } of shared) nameElement(from, "");
    for (const target of targets) nameElement(target, "");
  };
  transition.finished.then(reset, reset);
  return true;
}
