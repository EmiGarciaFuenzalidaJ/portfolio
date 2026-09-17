import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { EasterEgg } from '@/components/landing/EasterEgg';

const TARGET_URL = 'https://presentdaypresenttime.pages.dev/';

// jsdom does no layout, so the component would measure a 0x0 box and never
// place the hotspot. Pretend we are on a 1440x900 screen.
const VIEWPORT = { width: 1440, height: 900 };

/** The navbar pill is fixed at top-4 and its box ends around here. */
const NAVBAR_BOTTOM = 80;

const setViewport = (width: number, height: number) => {
  rectSpy.mockReturnValue({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect);
};

let openSpy: ReturnType<typeof vi.fn>;
let rectSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  openSpy = vi.fn();
  vi.stubGlobal('open', openSpy);
  rectSpy = vi
    .spyOn(Element.prototype, 'getBoundingClientRect')
    .mockReturnValue({
      ...VIEWPORT,
      top: 0,
      left: 0,
      right: VIEWPORT.width,
      bottom: VIEWPORT.height,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
});

afterEach(() => {
  rectSpy.mockRestore();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

/** The hotspot is deliberately unlabelled, so reach for it by shape. */
const hotspot = (container: HTMLElement) => {
  const el = container.querySelector<HTMLElement>('[aria-hidden="true"].rounded-full');
  if (!el) throw new Error('hotspot was not rendered');
  return el;
};

const clickTimes = (el: HTMLElement, count: number, gapMs: number) => {
  for (let i = 0; i < count; i++) {
    if (i > 0) vi.advanceTimersByTime(gapMs);
    el.click();
  }
};

describe('easter egg', () => {
  it('stays out of the accessibility tree and carries no label', () => {
    const { container } = render(<EasterEgg />);
    const el = hotspot(container);
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el.getAttribute('title')).toBeNull();
    expect(el.textContent).toBe('');
  });

  it('sits over the summit, not in the middle of the hero', () => {
    const { container } = render(<EasterEgg />);
    const el = hotspot(container);
    const centerX = parseFloat(el.style.left) + parseFloat(el.style.width) / 2;
    const centerY = parseFloat(el.style.top) + parseFloat(el.style.height) / 2;
    // Left of centre and high up, which is where the peak is in the photo.
    expect(centerX).toBeLessThan(VIEWPORT.width / 2);
    expect(centerY).toBeLessThan(VIEWPORT.height / 2);
  });

  it('stays clear of the navbar on an ultrawide, where object-cover pushes the peak up', () => {
    setViewport(2560, 1080);
    const { container } = render(<EasterEgg />);
    const el = hotspot(container);
    // Unclamped, the summit lands at y≈97 here and the hotspot would sit
    // half-swallowed by the navbar pill.
    expect(parseFloat(el.style.top)).toBeGreaterThanOrEqual(NAVBAR_BOTTOM);
  });

  it('keeps the hotspot on screen on a phone', () => {
    setViewport(390, 844);
    const { container } = render(<EasterEgg />);
    const el = hotspot(container);
    const left = parseFloat(el.style.left);
    const top = parseFloat(el.style.top);
    const size = parseFloat(el.style.width);
    expect(left).toBeGreaterThanOrEqual(0);
    expect(left + size).toBeLessThanOrEqual(390);
    expect(top).toBeGreaterThanOrEqual(NAVBAR_BOTTOM);
    expect(top + size).toBeLessThanOrEqual(844);
  });

  it('opens the hidden site after four quick clicks', () => {
    vi.useFakeTimers();
    const { container } = render(<EasterEgg />);
    clickTimes(hotspot(container), 4, 100);
    expect(openSpy).toHaveBeenCalledWith(
      TARGET_URL,
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('ignores three clicks', () => {
    vi.useFakeTimers();
    const { container } = render(<EasterEgg />);
    clickTimes(hotspot(container), 3, 100);
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('ignores four clicks that are not consecutive', () => {
    vi.useFakeTimers();
    const { container } = render(<EasterEgg />);
    clickTimes(hotspot(container), 4, 900);
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('lets a stalled sequence start over', () => {
    vi.useFakeTimers();
    const { container } = render(<EasterEgg />);
    const el = hotspot(container);
    clickTimes(el, 2, 100);
    vi.advanceTimersByTime(2000);
    clickTimes(el, 4, 100);
    expect(openSpy).toHaveBeenCalledTimes(1);
  });
});
