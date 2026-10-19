import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { skillCategories } from '@/data/skills';
import { TOOL_ICONS, type ToolIcon } from '@/data/toolIcons';
import { FadeIn } from './FadeIn';
import { SectionHeader } from './SectionHeader';
import { IndexRow } from './IndexRow';
import { SECTION, CONTAINER } from './layout';
import { cn } from '@/lib/utils';

interface Service {
  /** Translation key suffix under `services.*` (already bilingual). */
  key: string;
  tags: { en: string[]; es: string[] };
}

/**
 * Eleven services in three disciplines. Design leads — that is the job;
 * AI heads the second column as the strongest complement.
 */
const COLUMNS: { key: string; services: Service[] }[] = [
  {
    key: 'design',
    services: [
      { key: 'uxui', tags: { en: ['Figma', 'User Research', 'User Flows', 'Design Systems'], es: ['Figma', 'Investigación', 'Flujos de Usuario', 'Design Systems'] } },
      { key: 'interaction', tags: { en: ['Micro-interactions', 'Motion'], es: ['Micro-interacciones', 'Motion'] } },
      { key: 'prototype', tags: { en: ['Hi-Fi Prototypes', 'Testing'], es: ['Prototipos Hi-Fi', 'Testing'] } },
      { key: 'pm', tags: { en: ['Agile / Scrum', 'Planning', 'Team Leadership'], es: ['Agile / Scrum', 'Planificación', 'Liderazgo'] } },
    ],
  },
  {
    key: 'tech',
    services: [
      { key: 'ai', tags: { en: ['AI Chatbots', 'n8n Workflows', 'AI Agents', 'Conversational UX'], es: ['Chatbots IA', 'Workflows n8n', 'Agentes IA', 'UX Conversacional'] } },
      { key: 'webdev', tags: { en: ['React', 'Responsive'], es: ['React', 'Responsive'] } },
      { key: 'gamedev', tags: { en: ['Unity', 'C#'], es: ['Unity', 'C#'] } },
      { key: 'vrar', tags: { en: ['VR', 'AR', 'Simulation'], es: ['VR', 'AR', 'Simulación'] } },
    ],
  },
  {
    key: 'brand',
    services: [
      { key: 'brand', tags: { en: ['Identity', 'Logos'], es: ['Identidad', 'Logos'] } },
      { key: 'graphic', tags: { en: ['Illustration', 'Print'], es: ['Ilustración', 'Impreso'] } },
      { key: 'social', tags: { en: ['Content', 'Strategy'], es: ['Contenido', 'Estrategia'] } },
    ],
  },
];

// Design-led order for the toolkit too.
const ORDER = ['Product Design', 'AI & Workflow', 'Visual & Motion', 'Development', 'UX Research', 'Simulation & XR', 'Methodology'];
const TOOLKIT = [...skillCategories].sort((a, b) => ORDER.indexOf(a.title) - ORDER.indexOf(b.title));

/** One discipline: a label and its services as rows that open in place. */
const ServiceColumn: React.FC<{ column: (typeof COLUMNS)[number]; start: number }> = ({ column, start }) => {
  const { t, language } = useLanguage();
  // The first service of each column starts open, so the panel never reads empty.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-[#0A0D12] px-6 pb-2 pt-6 md:px-7">
      <p className="mb-4 font-mono text-label uppercase text-white/55">
        {String.fromCharCode(65 + COLUMNS.indexOf(column))} · {t(`services.col.${column.key}`)}
      </p>
      {column.services.map((service, i) => (
        <IndexRow
          key={service.key}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
          className={i === 0 ? 'border-t-white/15' : undefined}
          header={
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-label text-white/40">{String(start + i).padStart(2, '0')}</span>
              <span className="font-body text-lg font-semibold leading-snug text-white">{t(`services.${service.key}`)}</span>
            </span>
          }
        >
          <div className="pl-8">
            <p className="font-body text-sm font-light leading-relaxed text-white/70">
              {t(`services.${service.key}.desc`)}
            </p>
            <p className="mt-3 font-mono text-label uppercase leading-relaxed text-white/45">
              {(language === 'en' ? service.tags.en : service.tags.es).join(' · ')}
            </p>
          </div>
        </IndexRow>
      ))}
    </div>
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
 * Services as three discipline columns in one panel — the compact structure
 * Lama Lama uses — with each service opening in place. Then the toolkit,
 * where tools are icon tiles and methods stay as text.
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

        <FadeIn y={20}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {COLUMNS.map((column, ci) => (
              <ServiceColumn
                key={column.key}
                column={column}
                start={1 + COLUMNS.slice(0, ci).reduce((n, c) => n + c.services.length, 0)}
              />
            ))}
          </div>
        </FadeIn>

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
