import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DUR, EASE } from './motion';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Horizontal entry offset in px. */
  x?: number;
  /** Vertical entry offset in px. Defaults to 30. */
  y?: number;
  as?: 'div' | 'section' | 'li' | 'span' | 'article';
}

/** Viewport-triggered fade/slide wrapper per the landing spec. */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  delay = 0,
  duration = DUR.base,
  x = 0,
  y = 30,
  as = 'div',
}) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: EASE.out }}
    >
      {children}
    </MotionTag>
  );
};
