/**
 * Motion scale for the landing page.
 *
 * Durations were picked one at a time — 0.3, 0.35, 0.5, 0.6, 0.7, 0.8, 1 —
 * with no two components agreeing, and easing was split between `easeOut`, a
 * one-off cubic-bezier and a local constant. That is the same problem the type
 * had before it got a scale: everything nearly matches and nothing actually
 * does.
 *
 * These are the named steps. Nothing on the landing page should hard-code a
 * duration or an easing curve.
 */

/** Durations, in seconds. */
export const DUR = {
  /** Hovers, colour changes, anything that has to feel instant. */
  fast: 0.25,
  /** The default: entrances, fades, most things that reveal. */
  base: 0.6,
  /** Deliberate reveals — a section header, a hero element arriving. */
  slow: 0.9,
} as const;

/**
 * Easings. `out` carries almost everything: it starts fast and settles, which
 * is what makes an entrance feel like it arrived rather than drifted in.
 * `inOut` is for anything that moves and then stops somewhere new.
 */
export const EASE = {
  /** Standard decelerate. */
  out: [0.25, 0.1, 0.25, 1],
  /** A longer tail, for larger travel. */
  outLong: [0.16, 1, 0.3, 1],
  /** Symmetric, for movement between two resting states. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** Stagger between siblings in a list or grid. */
export const STAGGER = {
  tight: 0.04,
  base: 0.08,
} as const;

/** Cap on cumulative stagger delay, so long lists do not crawl. */
export const MAX_DELAY = 0.4;

/**
 * Transition presets, ready to spread into a Framer `transition` prop.
 *
 *   <motion.div transition={{ ...T.base, delay }} />
 */
export const T = {
  fast: { duration: DUR.fast, ease: EASE.out },
  base: { duration: DUR.base, ease: EASE.out },
  slow: { duration: DUR.slow, ease: EASE.outLong },
} as const;
