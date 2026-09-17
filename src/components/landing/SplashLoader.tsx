import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SHUTTER_EASE: [number, number, number, number] = [0.96, -0.02, 0.38, 1.01];
const BLOCKS = [0, 1, 2, 3, 4];

/**
 * Entrance overlay: two rows of 5 blocks that shutter open (top row up, bottom row down),
 * staggered left → right, then the whole overlay hides.
 */
export const SplashLoader: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setHidden(true), reduce ? 300 : 1350);
    return () => window.clearTimeout(timeout);
  }, [reduce]);

  if (hidden) return null;

  if (reduce) {
    return (
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none bg-[#75C5DE]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true">
      {/* Top row */}
      <div className="flex h-1/2 w-full">
        {BLOCKS.map((i) => (
          <motion.div
            key={`top-${i}`}
            className="h-full w-1/5 bg-[#75C5DE]"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 1, ease: SHUTTER_EASE, delay: i * 0.05 }}
          />
        ))}
      </div>
      {/* Bottom row */}
      <div className="flex h-1/2 w-full">
        {BLOCKS.map((i) => (
          <motion.div
            key={`bottom-${i}`}
            className="h-full w-1/5 bg-[#75C5DE]"
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 1, ease: SHUTTER_EASE, delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
};
