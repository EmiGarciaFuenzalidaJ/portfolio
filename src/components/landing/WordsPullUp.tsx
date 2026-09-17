import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpProps {
  /** Plain text, or styled segments (e.g. mixing sans and italic serif). */
  segments: TextSegment[];
  className?: string;
  /** Base delay before the first word, seconds. */
  delay?: number;
  justify?: 'center' | 'start';
}

/** Splits text into words that slide up into view with a staggered delay. */
export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  segments,
  className,
  delay = 0,
  justify = 'center',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  const words = segments.flatMap((segment) =>
    segment.text.split(' ').filter(Boolean).map((word) => ({ word, className: segment.className }))
  );

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex flex-wrap',
        justify === 'center' ? 'justify-center' : 'justify-start',
        className
      )}
    >
      {words.map((item, i) => (
        <span
          key={i}
          className="overflow-hidden inline-flex"
          style={{ marginRight: i < words.length - 1 ? '0.25em' : undefined }}
        >
          <motion.span
            className={cn('inline-block', item.className)}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: '60%' }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
