import { motion, useReducedMotion } from 'framer-motion';
import { STAGGER, T } from './motion';

/**
 * Words rise into place from behind a mask, one after another — the line
 * reveal most award-winning sites use for headings, instead of a plain fade.
 *
 * Each word sits in its own overflow-hidden box, so the motion reads as type
 * being uncovered rather than sliding over the page. With reduced motion the
 * text is simply there.
 */
export const RevealWords: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  if (reduce) return <>{text}</>;

  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ ...T.slow, delay: delay + i * STAGGER.base }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </>
  );
};
