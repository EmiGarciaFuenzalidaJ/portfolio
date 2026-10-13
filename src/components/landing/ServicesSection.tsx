import { useLanguage } from '@/contexts/LanguageContext';
import { skillCategories } from '@/data/skills';
import { TOOL_ICONS, type ToolIcon } from '@/data/toolIcons';
import { FadeIn } from './FadeIn';
import { SectionHeader } from './SectionHeader';
import { SECTION, CONTAINER } from './layout';
import { cn } from '@/lib/utils';

const ACCENT = '#89AACC';

type Discipline = 'design' | 'ai' | 'build' | 'brand' | 'management';

interface Service {
  /** Translation key suffix under `services.*` (already bilingual). */
  key: string;
  discipline: Discipline;
  tags: { en: string[]; es: string[] };
}

/**
 * Design leads — that is the job. AI comes right after it as the strongest
 * complement, marked with the accent; everything else follows by discipline.
 */
const SERVICES: Service[] = [
  { key: 'uxui', discipline: 'design', tags: { en: ['Figma', 'User Research', 'User Flows', 'Design Systems'], es: ['Figma', 'Investigación', 'Flujos de Usuario', 'Design Systems'] } },
  { key: 'ai', discipline: 'ai', tags: { en: ['AI Chatbots', 'n8n Workflows', 'AI Agents', 'Conversational UX'], es: ['Chatbots IA', 'Workflows n8n', 'Agentes IA', 'UX Conversacional'] } },
  { key: 'interaction', discipline: 'design', tags: { en: ['Micro-interactions', 'Motion'], es: ['Micro-interacciones', 'Motion'] } },
  { key: 'prototype', discipline: 'design', tags: { en: ['Hi-Fi Prototypes', 'Testing'], es: ['Prototipos Hi-Fi', 'Testing'] } },
  { key: 'pm', discipline: 'management', tags: { en: ['Agile / Scrum', 'Planning', 'Team Leadership'], es: ['Agile / Scrum', 'Planificación', 'Liderazgo'] } },
  { key: 'webdev', discipline: 'build', tags: { en: ['React', 'Responsive'], es: ['React', 'Responsive'] } },
  { key: 'gamedev', discipline: 'build', tags: { en: ['Unity', 'C#'], es: ['Unity', 'C#'] } },
  { key: 'vrar', discipline: 'build', tags: { en: ['VR', 'AR', 'Simulation'], es: ['VR', 'AR', 'Simulación'] } },
  { key: 'brand', discipline: 'brand', tags: { en: ['Identity', 'Logos'], es: ['Identidad', 'Logos'] } },
  { key: 'graphic', discipline: 'brand', tags: { en: ['Illustration', 'Print'], es: ['Ilustración', 'Impreso'] } },
  { key: 'social', discipline: 'brand', tags: { en: ['Content', 'Strategy'], es: ['Contenido', 'Estrategia'] } },
];

// Design-led order for the toolkit too.
const ORDER = ['Product Design', 'AI & Workflow', 'Visual & Motion', 'Development', 'UX Research', 'Simulation & XR', 'Methodology'];
const TOOLKIT = [...skillCategories].sort((a, b) => ORDER.indexOf(a.title) - ORDER.indexOf(b.title));

/**
 * One service card. The design lives in the card itself rather than in
 * decoration around it: a mono header (number · discipline), the title, the
 * description, and a footer ruled off with the tools — so every card has the
 * same four parts in the same places and a row of cards lines up.
 */
const ServiceCard: React.FC<{ service: Service; index: number; lead?: boolean }> = ({ service, index, lead }) => {
  const { t, language } = useLanguage();
  const isAI = service.discipline === 'ai';
  const tags = language === 'en' ? service.tags.en : service.tags.es;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#0A0D12]/90 transition-colors duration-300',
        isAI ? 'border-[#89AACC]/35 hover:border-[#89AACC]/70' : 'border-white/10 hover:border-white/30'
      )}
    >
      {/* Machined top edge: a 1px highlight that brightens on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />

      <header className="flex items-center justify-between px-6 pt-6 font-mono text-label uppercase md:px-7 md:pt-7">
        <span className="text-white/45">{String(index + 1).padStart(2, '0')}</span>
        <span style={{ color: isAI ? ACCENT : 'rgba(255,255,255,0.55)' }}>
          {t(`services.cat.${service.discipline}`)}
        </span>
      </header>

      <div className={cn('flex-1 px-6 md:px-7', lead ? 'pb-8 pt-10 md:pt-14' : 'pb-6 pt-8')}>
        <h3
          className={cn(
            'font-body font-semibold leading-tight tracking-[-0.01em] text-white',
            lead ? 'text-h2' : 'text-xl md:text-2xl'
          )}
        >
          {t(`services.${service.key}`)}
        </h3>
        <p
          className={cn(
            'mt-3 font-body font-light leading-relaxed text-white/70',
            lead ? 'max-w-xl text-lead' : 'text-sm md:text-base'
          )}
        >
          {t(`services.${service.key}.desc`)}
        </p>
      </div>

      <footer className="border-t border-white/10 px-6 py-4 font-mono text-label uppercase leading-relaxed text-white/50 md:px-7">
        {tags.join(' · ')}
      </footer>
    </article>
  );
};

/** A tool tile: brand glyph or monogram, identical size and colour. */
const ToolTile: React.FC<{ name: string; icon: ToolIcon }> = ({ name, icon }) => (
  <li className="group/tool relative flex flex-col items-center [@media(hover:none)]:w-[5rem]">
    <span
      tabIndex={0}
      aria-label={name}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/85 transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:border-white/30"
    >
      {'path' in icon ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d={icon.path} />
        </svg>
      ) : (
        // Static, first-party SVG markup from src/data/toolIcons.ts — never user input.
        <svg
          viewBox={`0 0 ${icon.size} ${icon.size}`}
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: icon.body }}
        />
      )}
    </span>
    {/* Name on hover/focus for pointers; always shown on touch screens. */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-[#0A0D12] px-2 py-1 font-mono text-label normal-case tracking-normal text-white opacity-0 transition-opacity duration-150 group-hover/tool:opacity-100 group-focus-within/tool:opacity-100 [@media(hover:none)]:hidden"
    >
      {name}
    </span>
    <span
      aria-hidden="true"
      className="mt-1.5 hidden w-full text-center font-mono text-label normal-case leading-tight tracking-normal text-white/50 [@media(hover:none)]:line-clamp-2"
    >
      {name}
    </span>
  </li>
);

/**
 * Services as designed cards — UX/UI leading, AI beside it — then the toolkit,
 * where tools are icon tiles and methods stay as text, kept apart.
 */
export const ServicesSection: React.FC = () => {
  const { t, language } = useLanguage();
  const en = language === 'en';

  return (
    <section id="services" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeader
          index="01"
          eyebrow={t('sh.services.eyebrow')}
          title={t('sh.services.title')}
          accent={t('sh.services.accent')}
          subtext={t('services.description')}
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <FadeIn
              key={service.key}
              delay={Math.min((i % 3) * 0.06, 0.18)}
              y={20}
              className={i === 0 ? 'md:col-span-2' : undefined}
            >
              <ServiceCard service={service} index={i} lead={i === 0} />
            </FadeIn>
          ))}
        </div>

        {/* Toolkit — two-column index; tools as icons, methods as text */}
        <div className="mt-24 md:mt-32">
          <SectionHeader
            index="02"
            eyebrow={t('skills.title')}
            title={t('sh.toolkit.title')}
            accent={t('sh.toolkit.accent')}
            subtext={t('skills.subtitle')}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {TOOLKIT.map((category, i) => {
              const tools = category.skills.filter((s) => s in TOOL_ICONS);
              const methods = category.skills.filter((s) => !(s in TOOL_ICONS));
              return (
                <FadeIn key={category.title} delay={Math.min(i * 0.04, 0.2)} y={12}>
                  <div className="border-t border-white/15 py-5">
                    <h3 className="mb-3.5 font-mono text-label uppercase text-white/55">
                      {en ? category.title : category.titleEs}
                    </h3>

                    {tools.length > 0 && (
                      <ul className="flex flex-wrap gap-2.5 [@media(hover:none)]:gap-x-1 [@media(hover:none)]:gap-y-3" aria-label={en ? 'Tools' : 'Herramientas'}>
                        {tools.map((tool) => (
                          <ToolTile key={tool} name={tool} icon={TOOL_ICONS[tool]} />
                        ))}
                      </ul>
                    )}

                    {methods.length > 0 && (
                      <p className={cn('font-body text-base leading-relaxed text-white/80', tools.length > 0 && 'mt-4')}>
                        {methods.join(' / ')}
                      </p>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
