import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download } from 'lucide-react';
import { ContactButton, LiveProjectButton } from './Buttons';
import { CV_HREF } from '@/data/cv';
import { BlurText } from './BlurText';
import { SocialLinks } from './SocialLinks';
import { EasterEgg } from './EasterEgg';
import { T } from './motion';

const BASE_IMAGE =
  'https://res.cloudinary.com/drkpykb3l/image/upload/v1784206503/magnific_necesito-que-saques-el-ci_kLFpV3O16B_1_txhw7u.png';
const REVEAL_IMAGE =
  'https://res.cloudinary.com/drkpykb3l/image/upload/v1784206503/magnific_necesito-que-hagas-una-ve_XtV4GMOBfo_1_p0ljao.png';

const RADIUS = 260;
const STOPS =
  'rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%';

const maskAt = (x: number, y: number) =>
  `radial-gradient(circle ${RADIUS}px at ${x}px ${y}px, ${STOPS})`;

/**
 * Full-viewport hero with an interactive spotlight: the mouse reveals the top
 * image layer through a radial-gradient mask, smoothed with lerp on rAF.
 * Touch / reduced-motion environments get a static centered spotlight.
 */
export const HeroSpotlight: React.FC = () => {
  const { t, language } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reveal = revealRef.current;
    if (!section || !reveal) return;

    const setMask = (x: number, y: number) => {
      const value = maskAt(x, y);
      reveal.style.webkitMaskImage = value;
      reveal.style.maskImage = value;
    };

    // Static fallback: touch-only devices or reduced motion → centered spotlight.
    const isTouchOnly = window.matchMedia('(hover: none)').matches;
    const rect = section.getBoundingClientRect();
    setMask(rect.width / 2, rect.height / 2);
    if (isTouchOnly || reduce) return;

    const target = { x: rect.width / 2, y: rect.height / 2 };
    const current = { ...target };
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      const bounds = section.getBoundingClientRect();
      target.x = e.clientX - bounds.left;
      target.y = e.clientY - bounds.top;
    };

    const tick = () => {
      // Linear interpolation, factor 0.1
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      setMask(current.x, current.y);
      rafId = requestAnimationFrame(tick);
    };

    section.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-screen flex-col overflow-hidden"
    >
      {/* Massive background typography */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pointer-events-none"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...T.slow, delay: 1.1 }}
      >
        <span className="font-black uppercase leading-none tracking-tighter text-[#161616] text-[22vw] select-none">
          DESIGN
        </span>
      </motion.div>

      {/* Base layer (under) */}
      <div className="absolute inset-0 z-[15]">
        <img
          src={BASE_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>

      {/* Reveal layer (over) — masked by the spotlight */}
      <div ref={revealRef} className="absolute inset-0 z-20" style={{ willChange: 'mask-image' }}>
        <img
          src={REVEAL_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>

      <EasterEgg />

      {/* Legibility scrim over the lower half (above both image layers) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[22] h-[55%] bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      {/* Availability chip — top-left, below the navbar */}
      <motion.div
        className="pointer-events-none absolute left-5 top-20 sm:left-8 sm:top-24 z-[25]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...T.base, delay: 1 }}
      >
        <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-label uppercase tracking-[0.2em] text-white/90">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#89AACC]" />
          {t('landing.available')}
        </span>
      </motion.div>

      {/* Content overlay */}
      <div className="pointer-events-none relative z-[25] flex h-full flex-col px-6 md:px-10">
        {/* Main title */}
        <h1
          className="mt-auto font-body font-extrabold uppercase leading-[0.85] tracking-tight text-white whitespace-nowrap text-[10vw] sm:text-[12vw] md:text-[14vw] lg:text-[15vw]"
          style={{ filter: 'drop-shadow(0 6px 28px rgba(0,0,0,0.85))' }}
        >
          {/*
            The visible hero stays "Hi, i'm Emi". The full name and role ride
            along inside the same h1 so search engines and screen readers get
            the identity the page is actually about — the greeting alone told
            them nothing.
          */}
          <span className="sr-only">
            Emiliano García Fuenzalida — UX/UI &amp; Product Designer.{' '}
          </span>
          <span aria-hidden="true">
            <BlurText text="Hi, i'm Emi" delay={0.3} />
          </span>
        </h1>

        {/* Bottom footer row */}
        <motion.div
          className="mt-auto flex w-full items-end justify-between pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...T.base, delay: 0.8 }}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <p
              className="max-w-[160px] text-lead font-light uppercase tracking-wide text-white/90 sm:max-w-[220px] md:max-w-[260px]"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
            >
              {t('landing.heroTagline')}
            </p>
            <SocialLinks size="sm" className="pointer-events-auto" />
          </div>
          {/*
            The CV was only reachable from the experience and contact sections,
            both a long scroll away. A recruiter who wants the PDF wants it
            immediately, so it sits beside the primary CTA — secondary styling,
            so it supports the contact button rather than competing with it.
          */}
          <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-3">
            <LiveProjectButton
              href={CV_HREF[language]}
              download
              target="_self"
              rel=""
              className="px-5 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {t('contact.downloadCV')}
              </span>
            </LiveProjectButton>
            <ContactButton>{t('landing.contactMe')}</ContactButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
