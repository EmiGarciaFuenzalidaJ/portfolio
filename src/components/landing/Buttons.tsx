import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Normalized CTA system: pills that reveal an animated steel-blue gradient
 * ring on hover (absolute .gradient-ring behind a solid inner wrapper).
 */

const Ring: React.FC = () => (
  <span className="gradient-ring opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
);

interface ContactButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
}

/** Primary CTA: solid white pill, gradient ring on hover. */
export const ContactButton: React.FC<ContactButtonProps> = ({ children, className, href = '#contact', ...rest }) => (
  <a href={href} className={cn('group relative inline-block rounded-full', className)} {...rest}>
    <Ring />
    <span className="relative z-10 inline-block rounded-full bg-white px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-black transition-transform duration-300 group-hover:scale-[1.03]">
      {children}
    </span>
  </a>
);

interface LiveProjectButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
}

/** Secondary CTA: outline pill on dark, gradient ring on hover. */
export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ children, className, ...rest }) => (
  <a target="_blank" rel="noopener noreferrer" className="group relative inline-block rounded-full" {...rest}>
    <Ring />
    <span
      className={cn(
        'relative z-10 inline-block rounded-full border border-white/25 bg-black px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-white transition-colors duration-300 group-hover:border-transparent',
        className
      )}
    >
      {children}
    </span>
  </a>
);

interface OutlinePillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

/** Same visual language as LiveProjectButton but as a <button> (modals, toggles). */
export const OutlinePillButton: React.FC<OutlinePillButtonProps> = ({ children, className, ...rest }) => (
  <button type="button" className="group relative inline-block rounded-full" {...rest}>
    <Ring />
    <span
      className={cn(
        'relative z-10 inline-block rounded-full border border-white/25 bg-black px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-white transition-colors duration-300 group-hover:border-transparent',
        className
      )}
    >
      {children}
    </span>
  </button>
);
