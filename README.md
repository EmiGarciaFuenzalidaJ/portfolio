# Portfolio — Emiliano García Fuenzalida

Source of [emigarciafuenzalidadesign.pages.dev](https://emigarciafuenzalidadesign.pages.dev).

A UX/UI portfolio built as a single page: React, TypeScript, Vite, Tailwind and
Framer Motion, bilingual throughout, with a scroll-driven frame sequence behind
the whole thing.

I'm a designer who codes, so this repo is part of the portfolio rather than
scaffolding underneath it. The notes below are about the decisions that were
actually hard.

---

## The background is 120 images, not a video

The hero background scrubs with the scroll. The obvious way to do that is a
`<video>` and `currentTime`, and it never worked — browsers will not seek a
compressed video smoothly enough to follow a scrollbar, so every scroll landed
on a keyframe and the motion stuttered.

It is a frame sequence instead. `scripts/optimize-frames.cjs` takes 500 raw 4K
PNGs and subsamples them to 120 WebP frames at 1600px wide, about 9.8 MB total.
`FrameSequenceBackground` preloads them and paints the right one to a canvas
with `object-cover` maths worked out by hand.

Two things that took several passes:

- **120 frames is not many for a page this tall.** Mapping frames to scroll
  position linearly meant visible jumps. The mapping is density-based instead —
  one frame every 18px of scroll — folded through a triangular ping-pong, since
  the footage is not a seamless loop. The interpolation happens in unbounded
  space and folds at draw time, so reversing direction never glitches.
- **Even then, frames popped.** The canvas now draws fractional positions:
  frame `floor(v)` at full alpha, then `floor(v)+1` on top at `alpha = frac(v)`.
  The transition between frames is continuous.

The loading screen tracks real preload progress, so when the counter hits 100
the scrub is genuinely ready.

## The hero spotlight

Two images stacked; the top one is revealed through a radial-gradient mask that
follows the cursor, smoothed with lerp on `requestAnimationFrame` rather than
set directly on `mousemove` — otherwise it tracks the pointer too literally and
feels mechanical. Touch-only devices and `prefers-reduced-motion` get a static
centred spotlight.

## The sticky project stack

Case studies stack as you scroll, each receding slightly behind the next. The
maths is in [`stackMath.ts`](src/components/landing/stackMath.ts), pulled out of
the component so it can be tested, and it is there because of a bug worth
recording:

`useScroll` measures the whole container — and the container is not only card
slots. There is a dwell block under the last card so it gets a settled moment
before the section leaves. Dividing each card's recede window by the card count
ignores that block, so the cards kept animating through the run-out instead of
coming to rest. With fourteen cards the dwell was 6% of the container and the
error was invisible. Cutting the stack to six made it 12.7%, and it showed.

The shrink budget is fixed across the stack rather than per card, so it looks
the same whether it holds three cards or fourteen.

## The CV is generated, not exported

`public/*.pdf` is built by [`scripts/build-cv.cjs`](scripts/build-cv.cjs) from a
single data file, and checked by
[`scripts/verify-cv.cjs`](scripts/verify-cv.cjs) — 27 assertions that run inside
`npm run build`, so a CV that a parser cannot read fails the build.

This exists because the previous CVs were Google Docs exports whose text layer
was unreadable. The contact icons had been exported as images, leaving invalid
UTF-8 where the email and phone should be; 39 zero-width spaces were welded
between skill keywords; and the employer's name was wrong in the text layer
while looking correct on screen.

The verifier caught one I had introduced myself: letter-spacing on the section
headings made extractors emit `E D U C AT I O N`, so a parser scanning for the
section by dictionary missed it entirely. There is no `characterSpacing`
anywhere in the generator now, and a test that fails if it comes back.

## Type scale and layout

Every heading used to carry its own hand-tuned `clamp()` inline — twelve of
them, no two alike — which is why a metric value could be three different sizes
depending on where it appeared. There is a named scale in `tailwind.config.ts`
now (`label` → `display`), and the section rhythm lives in
[`layout.ts`](src/components/landing/layout.ts) instead of being duplicated as
literal strings across six files.

---

## Running it

```bash
npm install
npm run dev          # vite, port 8080
npm run build        # builds the CVs, verifies them, then builds the site
npm test             # vitest
npm run build:cv     # regenerate the PDFs on their own
npm run verify:cv    # 27 ATS checks against the generated PDFs
```

`scripts/optimize-frames.cjs` regenerates `public/frames` from a local `frames/`
directory of raw exports. That directory is gitignored — it is 2.6 GB — so the
optimized frames are committed instead, and the site builds without it.

## Layout

```
src/
  components/landing/   the mounted page
  components/sections/  the previous version, kept as content history
  data/                 projects, resume, courses, visual work, skills
  contexts/             language (EN/ES)
scripts/                CV generator, verifier, frame optimiser
```

---

The code is here to be read. The writing, images, case studies and CV content
are mine and not licensed for reuse.
