import { useCallback, useEffect, useRef, useState } from 'react';

const TARGET_URL = 'https://presentdaypresenttime.pages.dev/';

/** Clicks needed, and the longest pause allowed between two of them. */
const CLICKS_REQUIRED = 4;
const MAX_GAP_MS = 700;

/**
 * Where to aim inside the hero photograph, as a fraction of the image's own
 * width and height — not of the viewport. Measured off the source file: the
 * summit tip sits at (0.444, 0.148). The target is a little below it, on the
 * rock rather than on the sky right above the peak, which gives the hotspot
 * solid mountain under it at every crop.
 */
const SUMMIT = { x: 0.442, y: 0.19 };
const IMAGE_W = 2752;
const IMAGE_H = 1536;

/**
 * The navbar is a fixed pill at top-4 whose box ends around y=80. On wide
 * viewports `object-cover` pushes the summit up behind it — on an ultrawide
 * it lands at y≈5, off the top of the screen entirely. Keep the hotspot below
 * that band; the massif extends far enough down that it is still the mountain.
 */
const NAVBAR_SAFE_Y = 92;

/** Replays `object-cover` + `object-center` to find where a point in the image ends up. */
function summitOnScreen(boxW: number, boxH: number) {
  const scale = Math.max(boxW / IMAGE_W, boxH / IMAGE_H);
  const drawW = IMAGE_W * scale;
  const drawH = IMAGE_H * scale;
  return {
    x: (boxW - drawW) / 2 + SUMMIT.x * drawW,
    y: (boxH - drawH) / 2 + SUMMIT.y * drawH,
  };
}

/**
 * Unmarked hotspot over the mountain: four quick clicks open a second site.
 * There is deliberately no cursor change, no hover state and nothing in the
 * accessibility tree — finding it is the whole point. A slower fourth click
 * just resets the count, so ordinary clicking on the hero does nothing.
 *
 * Append `?egg=debug` to the URL to outline the hotspot while checking placement.
 */
export const EasterEgg: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState<{ x: number; y: number; size: number } | null>(null);
  const [debug, setDebug] = useState(false);
  const clicks = useRef<number[]>([]);

  useEffect(() => {
    setDebug(new URLSearchParams(window.location.search).get('egg') === 'debug');
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      const { x, y } = summitOnScreen(width, height);
      // Big enough to hit on purpose, small enough to never hit by accident.
      const size = Math.min(140, Math.max(88, width * 0.1));
      setSpot({ x, y: Math.max(y, NAVBAR_SAFE_Y + size / 2), size });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const onClick = useCallback(() => {
    const now = Date.now();
    const recent = clicks.current;
    // A pause longer than MAX_GAP_MS starts the sequence over.
    if (recent.length && now - recent[recent.length - 1] > MAX_GAP_MS) {
      recent.length = 0;
    }
    recent.push(now);

    if (recent.length >= CLICKS_REQUIRED) {
      recent.length = 0;
      window.open(TARGET_URL, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <div ref={hostRef} className="pointer-events-none absolute inset-0 z-[26]">
      {spot && (
        <div
          onClick={onClick}
          aria-hidden="true"
          className="pointer-events-auto absolute rounded-full"
          style={{
            left: spot.x - spot.size / 2,
            top: spot.y - spot.size / 2,
            width: spot.size,
            height: spot.size,
            touchAction: 'manipulation',
            ...(debug
              ? { outline: '2px dashed #89AACC', background: 'rgba(137,170,204,0.25)' }
              : null),
          }}
        />
      )}
    </div>
  );
};
