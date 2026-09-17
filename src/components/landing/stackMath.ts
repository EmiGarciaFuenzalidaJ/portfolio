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
