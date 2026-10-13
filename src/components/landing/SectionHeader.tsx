import { FadeIn } from './FadeIn';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** Section number shown in the index row, e.g. "03". */
  index?: string;
  /** Short label in the index row. */
  eyebrow: string;
  /** Heading start. */
  title: string;
  /** Heading end — kept as a separate prop so translations stay untouched. */
  accent: string;
  subtext?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Index-style section header: a hairline rule carrying a section number and a
 * mono label, then a plain heading.
 *
 * It replaces the eyebrow + sans-heading + italic-serif-last-word formula that
 * every section repeated — the most recognisable template tell on the page.
 * The serif now only appears where it carries meaning: quotes and insights.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  eyebrow,
  title,
  accent,
  subtext,
  align = 'left',
  className,
}) => (
  <FadeIn className={cn(align === 'center' && 'text-center', className)}>
    <div
      className={cn(
        'mb-6 flex items-center gap-3 border-t border-white/15 pt-4 font-mono text-label uppercase',
        align === 'center' && 'justify-center'
      )}
    >
      {index && <span className="text-[#89AACC]">{index}</span>}
      <span className="text-white/55">{eyebrow}</span>
    </div>

    <h2 className="text-h2 font-semibold tracking-[-0.02em] text-white">
      {title} {accent}
    </h2>

    {subtext && (
      <p
        className={cn(
          'mt-4 max-w-xl text-sm md:text-base font-light leading-relaxed text-white/60',
          align === 'center' && 'mx-auto'
        )}
      >
        {subtext}
      </p>
    )}
  </FadeIn>
);
