import { FadeIn } from './FadeIn';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** Small uppercase eyebrow label next to a short rule. */
  eyebrow: string;
  /** Heading start, rendered in the body sans face. */
  title: string;
  /** Final word(s), rendered in italic Instrument Serif. */
  accent: string;
  subtext?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Shared editorial section header: eyebrow + mixed sans/serif heading + subtext. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  accent,
  subtext,
  align = 'left',
  className,
}) => (
  <FadeIn className={cn(align === 'center' && 'text-center', className)}>
    <div className={cn('mb-5 flex items-center gap-3', align === 'center' && 'justify-center')}>
      <span className="h-px w-8 bg-white/30" />
      <p className="text-label font-medium uppercase tracking-[0.3em] text-white/55">
        {eyebrow}
      </p>
    </div>

    <h2 className="text-h2 font-medium text-white">
      {title}{' '}
      <span className="font-heading italic font-normal tracking-[-1px]">{accent}</span>
    </h2>

    {subtext && (
      <p
        className={cn(
          'mt-4 max-w-xl text-sm md:text-base font-light leading-relaxed text-white/55',
          align === 'center' && 'mx-auto'
        )}
      >
        {subtext}
      </p>
    )}
  </FadeIn>
);
