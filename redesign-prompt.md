# Prompt — Unified redesign of the EmiDesignType portfolio (paste into Claude Code)

Redesign every section of my portfolio so the whole page shares ONE normalized aesthetic. This is an EXISTING repo — do not rebuild from scratch. Study the codebase first, then restyle section by section.

---

## CONTEXT (existing repo — reuse, don't recreate)

- Stack: Vite + React 18 + TypeScript + Tailwind CSS 3 + shadcn/ui + framer-motion v12 (already installed). No GSAP, no hls.js — do not add them; use framer-motion and CSS.
- Bilingual EN/ES via `src/contexts/LanguageContext.tsx` (`t('key')` + `language`). Every visible string must go through `t()` or the `{en, es}` fields in the data files. Language persists in localStorage — keep that.
- **Data files are the single source of truth — NEVER trim, summarize or remove content from them:**
  - `src/data/projects.ts` — 14 UX case studies (problem/solution/insight/metrics/decisions/steps, EN+ES)
  - `src/data/resume.ts` — 9 experience items (with 26 nested sub-projects and links) + 14 education items
  - `src/data/courses.ts` — 20 certifications with images
  - `src/data/visualWorks.ts` — 20 visual pieces with images, tags, and detail (problem/role/process/outcome)
- Existing components to REUSE (in `src/components/landing/`): `HeroSpotlight` (the mouse-reveal hero), `FadingVideo` (rAF crossfade video), `AnimatedText` (scroll-linked character reveal), `WordsPullUp`, `FadeIn`, `Buttons.tsx`, plus shadcn `Dialog` for all modals and sonner `toast` for copy-email.
- Page sections in order: Hero · Services · Projects · Experience · Education · Courses · Visual Work · Contact/Footer.
- PDFs: `/EmiGarciaFuenzalida2026English.pdf` (EN) and `/EmiGarciaFuenzalida2026.pdf` (ES). Contact: emigarciafuenzalida@gmail.com · wa.me/5492612513302 · LinkedIn/GitHub/Behance/ArtStation.

## NON-NEGOTIABLES

1. **The hero spotlight hover effect stays EXACTLY as is** (`HeroSpotlight`: two Cloudinary image layers, 260px radial-gradient mask following the mouse with lerp 0.1 on rAF, touch fallback centered). Only restyle the TEXT on top for legibility — never touch the effect or the images.
2. **Zero content loss.** All 14 projects keep problem → solution → metrics visible on the card, plus a "Full Case Study" modal with insight, 4-step UX process and decisions. All experience sub-projects, all 20 courses, all 20 visual works stay.
3. **All 14 project cards are IDENTICAL in layout** — text-only cards, NO images inside them (GotApp included).
4. **Experience and Education are organized by DATES only** — the period is the visual anchor of each row. No index numbers anywhere in these two sections.
5. Fully responsive (375px / 768px / 1280px+, no horizontal scroll) and respects `prefers-reduced-motion` (static fallbacks everywhere).
6. Engineering guardrails: never put `overflow-hidden` on any ancestor of the sticky project cards (it kills `position: sticky`), and never combine heavy `backdrop-filter` blur with framer `scale` transforms on the same element (visual artifacts) — glass cards that scale must sit on a solid `#101010` background.

---

## NORMALIZED DESIGN SYSTEM (one aesthetic for the entire page)

### Fonts (replace Kanit everywhere)
Google Fonts in `index.html`: **Instrument Serif** (italic) + **Barlow** (300/400/500/600).
Tailwind: `fontFamily.heading: ["'Instrument Serif'", 'serif']` (always used italic, tight negative tracking), `fontFamily.body: ["'Barlow'", 'sans-serif']`. Body default = Barlow.

### Colors (CSS vars, forced dark, no theme toggle)
- Background `#000`, surface `#101010`, elevated `#151515`
- Text: white; muted `text-white/55`; strokes `rgba(255,255,255,0.12)`
- **Accent gradient (the ONLY accent):** `linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)` — utility `.accent-gradient`. Used for: hover border rings, progress bars, active nav state, featured badges, pulsing availability dot. Remove all cyan `#75C5DE` and cream `#E1E0CC`/`#DEDBC8` usages — normalize to white text + steel-blue accent.

### Liquid glass (already in `src/index.css` — keep exact)
`.liquid-glass` (blur 4px, gradient-stroke border via mask) and `.liquid-glass-strong` (blur 50px) are the unifying chrome for: navbar pill, chips/tags, cards, icon squares. Also keep `.noise-overlay`, `.bg-noise`, `.halftone` utilities.

### Motion language (consistent everywhere)
- Entrances: `{ filter: blur(10px), opacity: 0, y: 20 }` → `{ blur(0), 1, 0 }`, 0.8s easeOut, staggered.
- Headlines: `BlurText` word-by-word (blur 10px→0, y 50→0, 100ms stagger) — create it if missing, modeled on `WordsPullUp`.
- Hover ring pattern: absolute span `inset: -2px`, rounded-full, `.accent-gradient` with `gradient-shift` 6s animation, behind a solid-bg inner wrapper — appears on hover (used on every CTA).
- Section headers, one pattern for ALL sections: eyebrow (w-8 h-px rule + uppercase `tracking-[0.3em]` text-xs muted label) + heading `text-4xl→6xl` where the last word is `font-heading italic` (e.g. "Featured *projects*") + optional subtext. Left-aligned. Bilingual via new `t()` keys.

---

## SECTIONS — one by one

### 0. Loading Screen (replaces the cyan SplashLoader)
Fixed overlay `z-[9999] bg-black`, rAF counter 000→100 over ~2.7s. Top-left label "Portfolio" (uppercase tracking-[0.3em]). Center: rotating words ["Design", "Create", "Inspire"] cycling every 900ms with AnimatePresence (y 20→0→-20), `font-heading italic text-4xl→7xl text-white/80`. Bottom-right: counter `font-heading text-6xl→9xl tabular-nums`, `padStart(3,'0')`. Bottom: 3px progress bar, `.accent-gradient` fill scaled by count/100 with soft glow `0 0 8px rgba(137,170,204,0.35)`. On 100: 400ms delay → unmount. Reduced-motion: quick fade only.

### 1. Navbar (liquid-glass pill, floats top-center)
`fixed top-4 z-50`, centered. Inner: `liquid-glass rounded-full px-2 py-2` pill: logo circle (h-9 w-9, accent-gradient ring, inner black circle with "E" `font-heading italic`) · divider · links [Services, Projects, Experience, Courses, Visual, Contact] `text-xs sm:text-sm rounded-full px-3 py-1.5`, active = `bg-white/10`, inactive = muted → white on hover · divider · EN/ES toggle (active in accent blue `#89AACC`) · "Say hi ↗" button with accent-gradient hover ring. Mobile: collapse links into a hamburger sheet; keep logo + EN/ES visible. Smooth-scroll to anchors.

### 2. Hero (KEEP the spotlight effect — restyle text only)
Keep `HeroSpotlight` layers and the giant "DESIGN" backdrop word untouched. Fix legibility:
- Bottom 55% scrim `bg-gradient-to-t from-black/75 via-black/30 to-transparent` at z-index between images and text.
- Title "Hi, i'm Emi": pure white, `font-heading italic` (Instrument Serif) with tight tracking, `drop-shadow(0 6px 28px rgba(0,0,0,0.85))`, sizes `text-[10vw]→[15vw]`, entrance via BlurText.
- Tagline (`t('landing.heroTagline')`) bottom-left `text-white/90` with text-shadow; CTA bottom-right: white pill "Contact me" + accent-gradient hover ring.
- Availability chip top-left: liquid-glass pill with pulsing accent-blue dot.

### 3. Services (the 9 real services from `t('services.*')` keys)
Liquid-glass capability cards, grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`, each `liquid-glass rounded-[1.25rem] p-6 min-h-[300px] flex flex-col`:
- Top row: lucide icon inside nested `liquid-glass h-11 w-11 rounded-[0.75rem]` square + 3–4 small liquid-glass pill tags right-aligned (derive tags from each service's domain, bilingual).
- `flex-1` spacer.
- Bottom: title `font-heading italic text-3xl md:text-4xl tracking-[-1px]` + body `text-sm text-white/90 font-light leading-snug max-w-[32ch]` (from `services.*.desc`).
- Staggered blur-in entrance on scroll. Remove the old white panel entirely — this section is black like everything else.

### 4. Projects (all 14 — sticky stacking cards, effect restored and kept)
Section on `bg-black` (NO overflow-hidden on the section or any wrapper). Header with the shared pattern ("Featured *projects*" / "Proyectos *destacados*").
- Sticky stack: each card wrapper `min-h-[85vh]`, card `sticky` at `top: calc(6rem + index*8px)`; scale via `useScroll` on the container + `useTransform`: `targetScale = 1 - (13 - index) * 0.012`, origin-top.
- Card: `liquid-glass rounded-[32px]→[48px]` on SOLID `!bg-[#101010]`, `p-5→9`, `max-h-[calc(100vh-7rem)] overflow-y-auto`.
- Header row: liquid-glass chips (category in accent blue + counter "01 / 14") · title `font-heading italic` large white · oneLiner `text-white/70` · buttons right: "Live Project" (outline pill, only if `url`) + "Full Case Study" (accent-gradient hover ring pill).
- Content grid `lg:grid-cols-[40%_1fr] gap-5`: LEFT = two liquid-glass boxes, Problem (label rose-300) and Solution (label accent blue), body `text-white/85`. RIGHT = Impact box with big metric numbers (`font-heading italic`, clamp 1.5–3rem, white) + labels `text-white/60`, and Insight box (lightbulb icon + quote in `font-heading italic`).
- Modal (existing Dialog): `bg-[#101010] border border-white/15 rounded-[32px]` with UX Process (4 steps with icons from `processLabels`) + UX Decisions list + Live Project link. Everything bilingual.

### 5. Experience (date-led rows, no numbers)
Shared header ("Professional *journey*"). Intro paragraph from `getResumeIntro(language)` rendered with `AnimatedText` (scroll-linked character reveal).
Rows from `getExperience(language)`: `flex flex-col md:flex-row gap-4 md:gap-10 py-8`, bottom border `white/10`:
- LEFT column (md:w-[200px]): **period** `font-heading italic text-xl→2xl text-white` (the anchor) + location `text-white/50 text-sm` below.
- RIGHT: title uppercase `font-medium text-white`, description `text-white/70 font-light`, then sub-projects as a 2-col grid of `liquid-glass rounded-2xl p-4` chips (title in accent blue + ExternalLink icon when `url` + description `text-white/60 text-xs`). Keep ALL 26 sub-projects.
- Interactivity: whole row hover → `bg-white/[0.03]` transition; entrance FadeIn staggered.

### 6. Education (same row pattern as Experience)
Header "Education & *learning*". Rows from `getEducation(language)` with the identical date-led layout. CV download buttons at the end (EN or ES PDF per current language) with accent-gradient hover ring.

### 7. Courses (journal-style horizontal pills — all 20)
Header "Courses & *certificates*". Each course = horizontal pill row: `flex items-center gap-5 p-4 rounded-[40px] sm:rounded-full liquid-glass hover:bg-white/[0.04] transition`:
- Left: certificate thumbnail `h-16 w-24 sm:h-20 sm:w-32 rounded-2xl object-cover bg-[#151515]`.
- Middle: title `font-medium text-white` (1 line) + one-line description `text-white/55 text-xs sm:text-sm line-clamp-1`.
- Right (desktop): "View certificate ↗" `text-white/55 group-hover:text-white` with arrow rotated -45° that straightens on hover.
- Click → existing certificate lightbox Dialog (image + full description).
- Entrance: staggered FadeIn. Two-column list on `lg` to keep the section compact.

### 8. Visual Work (bento grid — all 20)
Header "Visual *playground*". Bento: `grid grid-cols-1 md:grid-cols-12 gap-5`, column spans alternating 7/5/5/7 per row (aspect ratios ~16/10 on 7-span, ~4/3 on 5-span). Each card `bg-[#101010] border border-white/10 rounded-3xl overflow-hidden group`:
- Image `object-cover group-hover:scale-105 transition duration-700`.
- `.halftone` overlay `opacity-20 mix-blend-multiply`.
- Hover: `bg-black/70 backdrop-blur-lg opacity-0→100` overlay with a centered white pill: animated accent-gradient border, text `View — *Title*` (title `font-heading italic` black). Featured items: subtle accent ring + "Featured" chip.
- Mobile (no hover): title + tags always visible in a bottom gradient strip.
- Click → existing detail Dialog (description, tags, problem/role/process/outcome for featured, live link).

### 9. Contact / Footer
- CSS marquee (no GSAP): `t('landing.marquee')` ("LET'S WORK TOGETHER • " repeated) in `font-heading italic` huge white/10 outline-feel text, `animate-marquee` (translateX 0→-50%, 40s linear infinite, duplicate content for seamless loop, paused on reduced-motion).
- Big clickable email (copy-to-clipboard + sonner toast) `font-heading italic text-2xl→5xl`.
- CTA row: WhatsApp button + CV download (per language) — both white pills with accent-gradient hover rings.
- Social icons row (LinkedIn/GitHub/Behance/ArtStation) as liquid-glass circles.
- Footer bar: © line + green pulsing dot with "Available for projects" / "Disponible para proyectos".
- Optional atmosphere: reuse `FadingVideo` (already-used cloudfront space video) behind this section with heavy `from-black via-black/75` overlay.

---

## i18n
Add every new label in BOTH `en` and `es` in `LanguageContext.tsx` (section headers, "View certificate", marquee text, loading words can stay English as brand voice). Never hardcode a visible string in one language.

## CLEANUP
- Remove Kanit from `index.html`/Tailwind; global font = Barlow, headings = Instrument Serif italic.
- Delete/stop using cyan `#75C5DE` and cream `#E1E0CC`/`#DEDBC8` — white + accent gradient only.
- Old unused components (`sections/`, `HeroCinematic`, etc.) stay in the repo unmounted — do not delete.
- Update `<title>` if needed: "Emi García Fuenzalida — UX/UI Designer".

## VERIFICATION (run all)
1. `npx tsc -p tsconfig.app.json --noEmit` clean · `npm run build` OK · `npm run lint` no NEW errors (3 pre-existing in `ui/` + tailwind.config) · `npm test` green.
2. Anti-loss counts intact: 14 projects (problem+solution+metrics on card; insight+process+decisions in modal), 9 experience + 26 sub-projects + links, 14 education, 20 courses, 20 visual works, 9 services, both CV PDFs linked.
3. Hero spotlight follows the mouse with lerp; sticky stack scales correctly (no overflow-hidden ancestor).
4. EN/ES toggle switches every section and persists on reload.
5. Responsive at 375 / 768 / 1280+; `prefers-reduced-motion` gives static fallbacks; no horizontal scroll.
