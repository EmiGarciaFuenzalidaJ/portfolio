import { describe, it, expect } from 'vitest';
import {
  stackWindow,
  SLOT_VH,
  DWELL_VH,
  STACK_SHRINK,
} from '@/components/landing/stackMath';
import { projects } from '@/data/projects';

const FEATURED = projects.filter((p) => p.featured).length;

/** The fraction of the scroll container taken up by the dwell block. */
const dwellFraction = DWELL_VH / SLOT_VH / (FEATURED + DWELL_VH / SLOT_VH);

describe('sticky stack maths', () => {
  it('has a featured set to stack', () => {
    expect(FEATURED).toBeGreaterThan(1);
  });

  it('keeps every window inside [0, 1] and non-degenerate', () => {
    for (let i = 0; i < FEATURED; i++) {
      const { recedeStart, recedeEnd } = stackWindow(i, FEATURED);
      expect(recedeStart).toBeGreaterThanOrEqual(0);
      expect(recedeEnd).toBeLessThanOrEqual(1);
      expect(recedeStart).toBeLessThan(recedeEnd);
    }
  });

  it('hands each card off to the next without a gap or an overlap', () => {
    for (let i = 0; i < FEATURED - 2; i++) {
      const a = stackWindow(i, FEATURED);
      const b = stackWindow(i + 1, FEATURED);
      expect(b.recedeStart).toBeCloseTo(a.recedeEnd, 6);
    }
  });

  it('leaves the last card alone — nothing comes over it', () => {
    const last = stackWindow(FEATURED - 1, FEATURED);
    expect(last.targetScale).toBe(1);
  });

  it('stops animating before the dwell, so the stack settles', () => {
    // This is the bug that showed at six cards: the windows were divided by
    // the card count, ignoring the dwell, so cards were still scaling through
    // the run-out instead of coming to rest.
    const lastMoving = stackWindow(FEATURED - 2, FEATURED).recedeEnd;
    expect(lastMoving).toBeLessThan(1);
    expect(1 - lastMoving).toBeCloseTo(dwellFraction, 6);
  });

  it('shrinks the stack by the same amount at any card count', () => {
    for (const total of [3, 6, 14]) {
      const back = stackWindow(0, total).targetScale;
      expect(back).toBeCloseTo(1 - STACK_SHRINK, 6);
    }
  });
});
