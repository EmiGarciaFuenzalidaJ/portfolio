/**
 * Frame-sequence preloader (singleton) for the scroll-scrubbed background.
 * Frames live in /public/frames as frame-000.webp … frame-119.webp.
 * Preloading starts as soon as `preloadFrames` is first called (site start)
 * and progress can drive the loading screen.
 */

export const FRAME_COUNT = 120;

const frameSrc = (i: number) => `/frames/frame-${String(i).padStart(3, '0')}.webp`;

export interface FramesState {
  images: (HTMLImageElement | null)[];
  loaded: number;
}

export const framesState: FramesState = {
  images: Array.from({ length: FRAME_COUNT }, () => null),
  loaded: 0,
};

let started = false;
const progressListeners = new Set<(progress: number) => void>();

export const onFramesProgress = (fn: (progress: number) => void) => {
  progressListeners.add(fn);
  fn(framesState.loaded / FRAME_COUNT);
  return () => progressListeners.delete(fn);
};

/** Kick off (idempotent) parallel preloading of every frame. */
export const preloadFrames = () => {
  if (started || typeof window === 'undefined') return;
  started = true;

  // Load in a spread order (0, 60, 30, 90, …) so the sequence becomes usable
  // early at any scroll position, then fills in.
  const order: number[] = [];
  const step = [0, 60, 30, 90, 15, 45, 75, 105];
  const seen = new Set<number>();
  step.forEach((s) => {
    for (let i = s; i < FRAME_COUNT; i += 120) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  });
  for (let i = 0; i < FRAME_COUNT; i++) {
    if (!seen.has(i)) order.push(i);
  }

  const CONCURRENCY = 10;
  let cursor = 0;

  const next = () => {
    if (cursor >= order.length) return;
    const index = order[cursor++];
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      framesState.images[index] = img;
      framesState.loaded++;
      const p = framesState.loaded / FRAME_COUNT;
      progressListeners.forEach((fn) => fn(p));
      next();
    };
    img.onerror = () => {
      framesState.loaded++;
      const p = framesState.loaded / FRAME_COUNT;
      progressListeners.forEach((fn) => fn(p));
      next();
    };
    img.src = frameSrc(index);
  };

  for (let i = 0; i < CONCURRENCY; i++) next();
};

/** Nearest loaded frame to the requested index (falls back outward). */
export const nearestLoadedFrame = (index: number): HTMLImageElement | null => {
  const i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
  if (framesState.images[i]) return framesState.images[i];
  for (let d = 1; d < FRAME_COUNT; d++) {
    if (framesState.images[i - d]) return framesState.images[i - d];
    if (framesState.images[i + d]) return framesState.images[i + d];
  }
  return null;
};
