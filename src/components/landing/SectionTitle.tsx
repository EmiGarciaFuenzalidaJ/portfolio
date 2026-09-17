import { FadeIn } from './FadeIn';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: string;
  /** 'gradient' = .hero-heading on dark, 'dark' = solid #0C0C0C (for white panels). */
  variant?: 'gradient' | 'dark';
  className?: string;
}

/** Massive section headline in the landing's display style. */
export const SectionTitle: React.FC<SectionTitleProps> = ({ children, variant = 'gradient', className }) => (
  <FadeIn>
    <h2
      className={cn(
        'font-black uppercase leading-none tracking-tight text-center',
        variant === 'gradient' ? 'hero-heading' : 'text-[#0C0C0C]',
        className
      )}
      style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
    >
      {children}
    </h2>
  </FadeIn>
);
