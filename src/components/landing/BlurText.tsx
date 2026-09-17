import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { T, STAGGER } from './motion';

interface BlurTextProps {
  text: string;
  className?: string;
  /** Base delay before the first word, seconds. */
  delay?: number;
  justify?: 'center' | 'start';
}

/** Word-by-word blur-in headline: blur 10px→0, y 50→0, 100ms stagger. */
export const BlurText: React.FC<BlurTextProps> = ({ text, className, delay = 0, justify = 'start' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const reduce = useReducedMotion();

  const words = text.split(' ').filter(Boolean);

  return (
    <span
      ref={ref}
      className={cn('flex flex-wrap', justify === 'center' ? 'justify-center' : 'justify-start', className)}
      style={{ rowGap: '0.1em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: i < words.length - 1 ? '0.28em' : undefined }}
          initial={reduce ? { opacity: 0 } : { filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={
            inView
              ? reduce
                ? { opacity: 1 }
                : { filter: 'blur(0px)', opacity: 1, y: 0 }
              : undefined
          }
          transition={{ ...T.base, delay: delay + i * STAGGER.base }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
