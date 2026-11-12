import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from './FadeIn';
import { CONTAINER, SECTION_X } from './layout';
import { cn } from '@/lib/utils';

const EMAIL = 'emigarciafuenzalida@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/emigarciafuenzalida';

// Certifications a recruiter recognises at a glance; the full list is below.
const CERTIFIED = ['Google UX Design', 'Google Project Management', 'Claude Code 101 — Anthropic'];

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Argentina/Mendoza',
});

/** Mendoza's local time, refreshed every 20 seconds. */
function useLocalTime() {
  const [now, setNow] = useState(() => timeFormat.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setNow(timeFormat.format(new Date())), 20_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

const Column: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
  <div className={cn('min-w-0 border-t border-white/15 pt-3', className)}>
    <p className="mb-2 font-mono text-label uppercase text-white/45">{label}</p>
    <div className="font-body text-sm leading-relaxed text-white/85">{children}</div>
  </div>
);

/**
 * A dense data band right after the hero: who, where (with the live local
 * time), focus, certifications, availability and contact.
 *
 * Recruiters scan for exactly these facts; putting them in one quiet row is
 * also one of the most consistent patterns across award-winning portfolios.
 */
export const InfoStrip: React.FC = () => {
  const { t } = useLanguage();
  const time = useLocalTime();

  return (
    <section aria-label={t('info.label')} className={cn(SECTION_X, 'py-12 md:py-16')}>
      <FadeIn className={CONTAINER}>
        {/* The one paragraph a visitor should leave with, set large. */}
        <p className="mb-10 max-w-5xl font-body text-h4 font-light text-white/90 md:mb-14 md:text-h3 md:leading-[1.2]">
          {t('info.statement')}
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          <Column label={t('info.designer')}>
            <p className="font-medium text-white">Emiliano García Fuenzalida</p>
            <p className="text-white/60">UX/UI &amp; Product Designer</p>
          </Column>

          <Column label={t('info.based')}>
            <p>Mendoza, Argentina</p>
            <p className="font-mono text-label normal-case tracking-normal text-white/60">
              {time} · GMT−3
            </p>
          </Column>

          <Column label={t('info.focus')}>
            <p>{t('info.focusValue')}</p>
          </Column>

          <Column label={t('info.certified')}>
            <ul>
              {CERTIFIED.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Column>

          <Column label={t('info.status')}>
            <p className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {t('landing.available')}
            </p>
            <p className="text-white/60">{t('info.mode')}</p>
          </Column>

          <Column label={t('info.connect')}>
            <a href={`mailto:${EMAIL}`} className="block truncate py-0.5 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white">
              Email
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="block py-0.5 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white">
              LinkedIn ↗
            </a>
          </Column>
        </div>
      </FadeIn>
    </section>
  );
};
