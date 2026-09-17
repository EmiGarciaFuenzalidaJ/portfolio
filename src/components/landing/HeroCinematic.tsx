import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadingVideo } from './FadingVideo';
import { WordsPullUp } from './WordsPullUp';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Cinematic hero: inset rounded container with a crossfading background video,
 * noise + gradient overlays for legibility, giant cream name bottom-left and
 * tagline + CTA bottom-right.
 */
export const HeroCinematic: React.FC = () => {
  const { t, language } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="h-screen p-3 sm:p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Background video */}
        <FadingVideo src={HERO_VIDEO} className="absolute inset-0 h-full w-full object-cover" />

        {/* Noise + gradient overlays for text legibility */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Hero content — bottom aligned */}
        <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-12 items-end gap-4 px-5 pb-8 sm:px-8 sm:pb-10 md:px-10">
          {/* Giant name */}
          <h1
            className="col-span-12 lg:col-span-8 font-semibold leading-[0.85] tracking-[-0.05em]"
            style={{ color: '#E1E0CC', fontSize: 'clamp(3.5rem, 13vw, 15rem)' }}
          >
            <WordsPullUp
              segments={[{ text: "Hi, i'm Emi" }]}
              justify="start"
              delay={1.2}
            />
          </h1>

          {/* Tagline + CTA */}
          <div className="col-span-12 lg:col-span-4 flex flex-col items-start gap-5 lg:pb-4">
            <motion.p
              className="max-w-sm text-xs sm:text-sm md:text-base uppercase tracking-wide text-[#E1E0CC]/75 font-light"
              style={{ lineHeight: 1.3 }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
            >
              {t('landing.heroTagline')}
            </motion.p>

            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#DEDBC8] py-1.5 pl-6 pr-1.5 text-sm sm:text-base font-medium text-black transition-all duration-300 hover:gap-3"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: EASE }}
            >
              {t('landing.contactMe')}
              <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="h-4 w-4 text-[#E1E0CC]" />
              </span>
            </motion.a>
          </div>
        </div>

        {/* Availability chip — top-left inside the frame */}
        <motion.div
          className="absolute left-5 top-20 sm:left-8 sm:top-24 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2, ease: EASE }}
        >
          <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[#75C5DE] animate-pulse" />
            {language === 'en' ? 'Open to UX/UI & Product Design roles' : 'Disponible para UX/UI y Product Design'}
          </span>
        </motion.div>
      </div>
    </section>
  );
};
