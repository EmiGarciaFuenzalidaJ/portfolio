/**
 * Scroll maths for the sticky project stack.
 *
 * Pulled out of the component so it can be tested: the window each card
 * recedes in has to be expressed against the *whole* scroll container, and the
 * container is not only card slots — there is a dwell block under the last
 * card that gives it a settled moment before the section leaves. Dividing by
 * the card count alone ignores that block, so the cards keep animating through
 * the run-out instead of coming to rest.
 *
 * With fourteen cards the dwell was 6% of the container and the error was
 * invisible. At six it is 12.7%, and it showed.
 */

/** Height of one sticky slot, in vh. */
export const SLOT_VH = 80;

/** Dwell block under the last card, in vh. */
export const DWELL_VH = 70;

/**
 * Slot height when the cards are compact (phones, short laptops). A compact
 * card is about a third of the screen tall; keeping the full 80vh slot made
 * the section a very long scroll of mostly empty space. The dwell scales by
 * the same factor, so the recede windows in `stackWindow` — which only depend
 * on the slot/dwell ratio — stay exactly the same.
 */
export const COMPACT_SLOT_VH = 50;
export const COMPACT_DWELL_VH = (DWELL_VH * COMPACT_SLOT_VH) / SLOT_VH;

/**
 * Floor for the compact slot, so the tallest compact card still fits on a
 * short screen. The dwell gets the same floor scaled by the same ratio.
 */
export const COMPACT_MIN_REM = 30;

/** Phones show the shortest card of all, so they get the shortest slot. */
export const MOBILE_SLOT_VH = 42;
export const MOBILE_MIN_REM = 24;

/** Slot and dwell CSS heights for a given card mode, keeping the dwell ratio. */
export function slotHeights(mode: 'full' | 'compact' | 'mobile') {
  if (mode === 'full') return { slot: `${SLOT_VH}vh`, dwell: `${DWELL_VH}vh` };
  const [vh, rem] = mode === 'mobile' ? [MOBILE_SLOT_VH, MOBILE_MIN_REM] : [COMPACT_SLOT_VH, COMPACT_MIN_REM];
  const ratio = DWELL_VH / SLOT_VH;
  return {
    slot: `max(${vh}vh, ${rem}rem)`,
    dwell: `max(${vh * ratio}vh, ${rem * ratio}rem)`,
  };
}

/**
 * How much the whole stack shrinks from back to front. Fixing the budget
 * rather than the per-card step keeps the stack looking the same at any card
 * count — with a fixed 0.012 step, six cards shrank to 0.94 and stopped
 * reading as a stack at all.
 */
export const STACK_SHRINK = 0.15;

export interface StackWindow {
  /** Progress at which this card starts receding. */
  recedeStart: number;
  /** Progress at which it reaches its final scale. */
  recedeEnd: number;
  /** That final scale. */
  targetScale: number;
}

export function stackWindow(index: number, total: number): StackWindow {
  const scrollSlots = total + DWELL_VH / SLOT_VH;
  const step = total > 1 ? STACK_SHRINK / (total - 1) : 0;
  const targetScale = 1 - (total - 1 - index) * step;

  // The last card never recedes — nothing comes over it. Framer needs a
  // non-degenerate input range and both offsets inside [0, 1], so the epsilon
  // is subtracted from the start rather than added past the end.
  if (index >= total - 1) {
    return { recedeStart: 1 - 0.0001, recedeEnd: 1, targetScale };
  }

  return {
    recedeStart: (index + 1) / scrollSlots,
    recedeEnd: (index + 2) / scrollSlots,
    targetScale,
  };
}
