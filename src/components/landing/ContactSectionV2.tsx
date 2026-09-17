import { Copy, Download, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/sonner';
import { FadeIn } from './FadeIn';
import { ContactButton, LiveProjectButton } from './Buttons';
import { SocialLinks } from './SocialLinks';
import { CV_HREF } from '@/data/cv';
import { cn } from '@/lib/utils';
import { CONTAINER, SECTION_X } from './layout';

const EMAIL = 'emigarciafuenzalida@gmail.com';

/** Closing contact block + footer with marquee and cinematic backdrop. */
export const ContactSectionV2: React.FC = () => {
  const { t, language } = useLanguage();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast('Email copied', { description: EMAIL });
    } catch {
      toast('Could not copy email', { description: EMAIL });
    }
  };

  const marqueeText = Array(8).fill(`${t('landing.marquee')} • `).join('');

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden pt-20 sm:pt-24 md:pt-32">
      <div className="relative z-10">
        {/* Marquee */}
        <div className="mb-14 overflow-hidden whitespace-nowrap sm:mb-20" aria-hidden="true">
          <div className="animate-marquee inline-block">
            <span className="font-heading italic text-6xl leading-none tracking-[-2px] text-white/10 sm:text-8xl md:text-9xl">
              {marqueeText}
              {marqueeText}
            </span>
          </div>
        </div>

        <div className={cn(CONTAINER, SECTION_X, "pb-8")}>
          <FadeIn>
            <p
              className="mb-8 max-w-2xl text-lead font-body font-light text-white/70"
             
            >
              {t('contact.subtitle')}
            </p>
          </FadeIn>

          {/* Email — click to copy */}
          <FadeIn delay={0.1}>
            <button
              type="button"
              onClick={copyEmail}
              className="group inline-flex items-center gap-3 break-all text-left text-h2 font-body font-semibold tracking-tight text-white transition-colors duration-300 hover:text-[#89AACC]"
             
            >
              {EMAIL}
              <Copy className="h-5 w-5 flex-shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ContactButton href="https://wa.me/5492612513302" target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {t('contact.call')}
                </span>
              </ContactButton>
              <LiveProjectButton
                href={CV_HREF[language]}
                download
                target="_self"
                rel=""
              >
                <span className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {t('contact.downloadCV')}
                </span>
              </LiveProjectButton>
            </div>
          </FadeIn>

          {/* Socials + address */}
          <FadeIn delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <SocialLinks size="md" />
              <span className="ml-2 inline-flex items-center gap-1.5 font-body text-sm font-light text-white/50">
                <MapPin className="h-4 w-4 text-[#89AACC]" />
                Godoy Cruz, Mendoza, Argentina
              </span>
            </div>
          </FadeIn>

          {/* Signature quote */}
          <FadeIn delay={0.25}>
            <p className="mt-16 text-center font-heading italic text-xl text-white/45 sm:text-2xl md:text-3xl">
              {t('contact.quote')}
            </p>
          </FadeIn>

          {/* Footer bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <p className="font-body text-xs font-light text-white/55">
              © {new Date().getFullYear()} Emiliano García Fuenzalida. All rights reserved.
            </p>
            <p className="inline-flex items-center gap-2 font-body text-xs font-light uppercase tracking-widest text-white/60">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {t('landing.available')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
