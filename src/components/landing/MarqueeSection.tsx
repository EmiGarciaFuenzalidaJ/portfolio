import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Own portfolio pieces (local assets) instead of third-party template GIFs.
import appleWatch from '@/assets/portfolio/AppleWatch.png';
import bala from '@/assets/portfolio/Bala.jpg';
import coEmissions from '@/assets/portfolio/COemissions.jpg';
import cruelDestiny from '@/assets/portfolio/CruelDestiny.jpg';
import flimer from '@/assets/portfolio/Flimer.png';
import galacticMadness from '@/assets/portfolio/GalacticMadness.png';
import goodVibrations from '@/assets/portfolio/GoodVibrations.png';
import gotApp from '@/assets/portfolio/GotApp.png';
import instagramClone from '@/assets/portfolio/InstagramClone.png';
import linkedBanner from '@/assets/portfolio/LinkedBanner.jpg';
import maskACrime from '@/assets/portfolio/MaskACrime.png';
import miAmorBosque from '@/assets/portfolio/MiAmorBosque.jpg';
import peakMobile from '@/assets/portfolio/PeakMobile.png';
import peakPC from '@/assets/portfolio/PeakPC.png';
import peakTablet from '@/assets/portfolio/PeakTablet.png';
import plastic from '@/assets/portfolio/Plastic.png';
import simpleApp from '@/assets/portfolio/SimpleApp.png';
import spaceCowboy from '@/assets/portfolio/SpaceCowboy.jpg';
import theSilence from '@/assets/portfolio/TheSilence.jpg';
import trainIllustration from '@/assets/portfolio/TrainIllustration.jpg';

const ROW_1 = [gotApp, peakPC, maskACrime, plastic, appleWatch, flimer, instagramClone, peakMobile, simpleApp, peakTablet];
const ROW_2 = [miAmorBosque, spaceCowboy, goodVibrations, galacticMadness, theSilence, cruelDestiny, trainIllustration, bala, coEmissions, linkedBanner];

const Tile: React.FC<{ src: string }> = ({ src }) => (
  <img
    src={src}
    alt=""
    loading="lazy"
    draggable={false}
    className="h-[180px] w-[280px] sm:h-[220px] sm:w-[340px] md:h-[270px] md:w-[420px] flex-shrink-0 rounded-2xl object-cover"
  />
);

/**
 * Two rows of tiles that slide horizontally in opposite directions,
 * driven by the vertical scroll position of the page.
 */
export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!section || !row1 || !row2) return;

    let rafId = 0;
    let ticking = false;

    const update = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      row1.style.transform = `translateX(${offset - 200}px)`;
      row2.style.transform = `translateX(${-(offset - 200)}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  // Tripled arrays for continuous wrap coverage while sliding.
  const row1Items = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2Items = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {row1Items.map((src, i) => (
            <Tile key={`r1-${i}`} src={src} />
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-3 -ml-[600px]" style={{ willChange: 'transform' }}>
          {row2Items.map((src, i) => (
            <Tile key={`r2-${i}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
};
