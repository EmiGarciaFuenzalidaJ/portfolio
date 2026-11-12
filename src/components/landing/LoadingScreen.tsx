import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { preloadFrames } from './frames';
import { heroReady } from './heroImages';
import { T } from './motion';

const WORDS = ['Research', 'Design', 'Build'];
const WORD_MS = 520;
const MIN_TIME_MS = 1500; // minimum showtime so the intro reads
const MAX_WAIT_MS = 4500; // failsafe: never block longer than this

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Entrance overlay: rotating words + 000→100 counter + accent progress bar.
 *
 * It waits for the one thing the visitor sees first — the two hero layers —
 * and nothing else. It used to wait for all 120 background frames (9.8 MB),
 * which kept a phone on this screen for eleven seconds; the backdrop only
 * shows after scrolling past the hero, so it now loads afterwards.
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduce = useReducedMotion();
  const doneRef = useRef(false);

  useEffect(() => {
    let heroDone = false;
    heroReady().then(() => {
      heroDone = true;
      // The hero is in: the connection is free for the backdrop.
      preloadFrames();
    });

    if (reduce) {
      const id = window.setTimeout(() => {
        preloadFrames();
        onComplete();
      }, 300);
      return () => window.clearTimeout(id);
    }

    let rafId = 0;
    const start = performance.now();

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      preloadFrames();
      window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(onComplete, 500);
      }, 350);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const timeProgress = Math.min(1, elapsed / MIN_TIME_MS);
      // Time alone stops at 85: the last stretch belongs to the hero images.
      setCount(Math.round((heroDone ? 1 : 0.85) * timeProgress * 100));

      if ((timeProgress >= 1 && heroDone) || elapsed >= MAX_WAIT_MS) {
        setCount(100);
        finish();
        return;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const wordTimer = window.setInterval(() => {
      setWordIndex((i) => Math.min(i + 1, WORDS.length - 1));
    }, WORD_MS);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearInterval(wordTimer);
    };
  }, [onComplete, reduce]);

  if (reduce) {
    return <div className="fixed inset-0 z-[9999] bg-black" aria-hidden="true" />;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black"
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={T.base}
      aria-hidden="true"
    >
      {/* Top-left label */}
      <motion.p
        className="absolute left-6 top-6 md:left-10 md:top-8 text-xs uppercase tracking-[0.3em] text-white/55"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={T.base}
      >
        Portfolio
      </motion.p>

      {/* Center rotating words */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="font-heading italic text-4xl md:text-6xl lg:text-7xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={T.fast}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <p className="absolute bottom-8 right-6 md:right-10 font-body font-semibold text-6xl md:text-8xl lg:text-9xl text-white tabular-nums leading-none">
        {String(count).padStart(3, '0')}
      </p>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <div
          className="accent-gradient h-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </motion.div>
  );
};
