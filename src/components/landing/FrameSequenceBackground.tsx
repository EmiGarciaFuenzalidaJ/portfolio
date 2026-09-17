import { useEffect, useRef } from 'react';
import { FRAME_COUNT, framesState, nearestLoadedFrame, preloadFrames } from './frames';

/**
 * Scroll distance (px) that advances the sequence by one frame. This keeps
 * frame density CONSTANT regardless of page length, so scrubbing never jumps.
 */
const PX_PER_FRAME = 18;

/**
 * The footage isn't a perfect loop, so the sequence ping-pongs:
 * 0 1 2 … N-1 N-2 … 1 0 1 2 … — always reversing at the ends.
 */
const pingpong = (v: number) => {
  const cycle = 2 * (FRAME_COUNT - 1);
  const m = ((v % cycle) + cycle) % cycle;
  return m <= FRAME_COUNT - 1 ? m : cycle - m;
};

/**
 * Fixed full-page background scrubbed by scroll, rendered from a preloaded
 * WebP frame sequence on a canvas — perfectly smooth, no video seeking.
 * Hidden behind the hero, fades in as the user scrolls past it.
 */
export const FrameSequenceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    preloadFrames();

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let target = 0;
    let smoothed = 0;
    let lastDrawn = -1;
    let rafId = 0;

    // Mobile browsers resize `window.innerHeight` by roughly 50–150px as
    // their address bar / toolbar collapse and expand DURING normal
    // scrolling (even scrolling a few px up and down in place toggles it
    // back and forth) — that's not a real resize, it's the same viewport.
    // Rather than trying to distinguish "real" from "chrome toggle" height
    // changes after the fact, the background is deliberately made taller
    // than the viewport on mobile by a safety margin that covers the
    // toolbar's full travel, anchored from the top. So when the toolbar
    // hides and more of the page becomes visible, that extra space was
    // already backed by the image — nothing needs to move or resize. Only
    // a WIDTH change (real device rotation or window resize) is treated as
    // a genuine resize; toolbar toggling never changes viewport width.
    const MOBILE_HEIGHT_BUFFER = 220;
    const isMobileViewport = () => window.innerWidth < 768;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight + (isMobileViewport() ? MOBILE_HEIGHT_BUFFER : 0);
    let resizeTimer = 0;

    /** Draw whatever frame is currently active — used by both the render
        loop and immediately after a real resize, so a genuine reallocation
        never leaves a blank canvas for even one frame. */
    const drawCurrent = () => {
      const v = pingpong(smoothed);
      const img = framesState.images[Math.round(v)] ?? nearestLoadedFrame(Math.round(v));
      if (img) {
        ctx.globalAlpha = 1;
        drawCover(img);
        lastDrawn = v;
      }
    };

    const resize = () => {
      // Pin the CSS box itself in px, decoupled from `100%`/`inset-0` (which
      // track the LIVE viewport and would otherwise keep resizing the
      // element's box on every chrome toggle even though the canvas buffer
      // no longer reallocates — the browser then stretches the already-drawn
      // frame to fit, which is what actually read as "the mountain moves".
      wrapper.style.width = `${lastWidth}px`;
      wrapper.style.height = `${lastHeight}px`;
      canvas.style.width = `${lastWidth}px`;
      canvas.style.height = `${lastHeight}px`;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(lastWidth * dpr);
      canvas.height = Math.round(lastHeight * dpr);
      ctx.imageSmoothingQuality = 'high';
      drawCurrent();
    };

    const scheduleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const w = window.innerWidth;
        if (w === lastWidth) return;
        lastWidth = w;
        lastHeight = window.innerHeight + (isMobileViewport() ? MOBILE_HEIGHT_BUFFER : 0);
        resize();
      }, 200);
    };

    // Stable reference for the fade threshold, captured once — reading a
    // live `window.innerHeight` here would make the fade flicker in step
    // with the same address-bar collapse/expand noise described above.
    const fadeReferenceHeight = window.innerHeight;

    const updateTarget = () => {
      // Virtual (unbounded) frame position — ping-pong mapping happens at draw.
      target = Math.max(0, window.scrollY) / PX_PER_FRAME;

      // Fade the backdrop in after the hero (~60% of a viewport of scroll).
      const fade = Math.min(1, window.scrollY / (fadeReferenceHeight * 0.6));
      wrapper.style.opacity = String(fade);
    };

    /** drawImage with object-fit: cover semantics. */
    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw = cw;
      let dh = ch;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
      } else {
        dw = cw;
        dh = cw / ir;
      }
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const tick = () => {
      // Lerp in virtual space (continuous), then fold with ping-pong so the
      // direction reversal at the ends stays glitch-free.
      smoothed += (target - smoothed) * (reduce ? 1 : 0.11);
      const v = pingpong(smoothed);

      // Sub-frame rendering: draw the lower frame, then cross-fade the next
      // one on top with alpha = fractional position. The transition between
      // frames becomes continuous instead of a discrete pop.
      if (Math.abs(v - lastDrawn) > 0.003) {
        const lo = Math.floor(v);
        const hi = Math.min(FRAME_COUNT - 1, lo + 1);
        const frac = v - lo;

        const imgLo = framesState.images[lo] ?? nearestLoadedFrame(lo);
        if (imgLo) {
          ctx.globalAlpha = 1;
          drawCover(imgLo);

          const imgHi = framesState.images[hi];
          if (imgHi && imgHi !== imgLo && frac > 0.01) {
            ctx.globalAlpha = frac;
            drawCover(imgHi);
            ctx.globalAlpha = 1;
          }
          lastDrawn = v;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => updateTarget();

    resize();
    updateTarget();
    smoothed = target;
    // The initial size is set synchronously above; ongoing resize events go
    // through the debounced, threshold-gated scheduler so mobile chrome
    // toggling can't trigger a reallocation.
    window.addEventListener('resize', scheduleResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', scheduleResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Dark overlays — the footage has bright sky/snow, content must stay readable */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
    </div>
  );
};
