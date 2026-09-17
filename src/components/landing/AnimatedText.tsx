import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const Char: React.FC<{ char: string; progress: MotionValue<number>; range: [number, number] }> = ({
  char,
  progress,
  range,
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      {/* Placeholder keeps layout stable while the overlay animates */}
      <span className="opacity-20">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
};

/**
 * Character-by-character scroll reveal (opacity 0.2 → 1).
 * Words are wrapped in inline-block spans so lines never break mid-word.
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(' ');
  const totalChars = text.length;
  let charCount = 0;

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        const wordStart = charCount;
        charCount += word.length + 1; // +1 for the following space
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split('').map((char, ci) => {
              const index = wordStart + ci;
              return (
                <Char
                  key={ci}
                  char={char}
                  progress={scrollYProgress}
                  range={[index / totalChars, Math.min(1, (index + 1) / totalChars)]}
                />
              );
            })}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </p>
  );
};
