import { socialLinks } from '@/data/socials';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  /** `sm` is the hero row, `md` the contact footer. */
  size?: 'sm' | 'md';
  className?: string;
}

const SIZES = {
  sm: { button: 'h-9 w-9 sm:h-10 sm:w-10', icon: 'h-4 w-4 sm:h-[18px] sm:w-[18px]', gap: 'gap-2 sm:gap-2.5' },
  md: { button: 'h-11 w-11', icon: 'h-5 w-5', gap: 'gap-3' },
} as const;

/**
 * Liquid-glass row of social profile buttons. Shared by the hero and the
 * contact footer so the two never drift apart.
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  size = 'md',
  className,
}) => {
  const s = SIZES[size];

  return (
    <div className={cn('flex flex-wrap items-center', s.gap, className)}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
          aria-label={social.name}
          className={cn(
            'liquid-glass flex items-center justify-center rounded-full text-white/70 transition-colors duration-300 hover:text-[#89AACC] focus-visible:text-[#89AACC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#89AACC]',
            s.button
          )}
        >
          <svg className={s.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={social.path} />
          </svg>
        </a>
      ))}
    </div>
  );
};
