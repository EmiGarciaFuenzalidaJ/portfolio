import {
  Bot,
  Box,
  BrainCircuit,
  Boxes,
  Code2,
  Flag,
  Fingerprint,
  Gamepad2,
  Glasses,
  KanbanSquare,
  Layers,
  MousePointerClick,
  Palette,
  PenTool,
  Share2,
  Sparkles,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { skillCategories } from '@/data/skills';
import { FadeIn } from './FadeIn';
import { SectionHeader } from './SectionHeader';
import { SECTION, CONTAINER } from './layout';

// Short accent palette from the reference mockup, rotated across cards.
const ACCENTS = ['#89AACC', '#8F7BFF', '#35D0BA'];
const PINK = '#FF6B9D';

interface ServiceCard {
  /** Translation key suffix under `services.*` (already bilingual). */
  key: string;
  icon: LucideIcon;
  tags: { en: string[]; es: string[] };
  featured?: boolean;
}

// The user's real services; copy comes from existing services.* translation keys.
// AI & Automation leads, highlighted — it's the differentiating capability.
const SERVICES: ServiceCard[] = [
  { key: 'ai', icon: Bot, featured: true, tags: { en: ['AI Chatbots', 'n8n Workflows', 'AI Agents', 'Conversational UX'], es: ['Chatbots IA', 'Workflows n8n', 'Agentes IA', 'UX Conversacional'] } },
  { key: 'pm', icon: KanbanSquare, tags: { en: ['Agile / Scrum', 'Planning', 'Team Leadership'], es: ['Agile / Scrum', 'Planificación', 'Liderazgo'] } },
  { key: 'uxui', icon: Palette, tags: { en: ['Figma', 'User Flows'], es: ['Figma', 'Flujos de Usuario'] } },
  { key: 'interaction', icon: MousePointerClick, tags: { en: ['Micro-interactions', 'Motion'], es: ['Micro-interacciones', 'Motion'] } },
  { key: 'prototype', icon: Layers, tags: { en: ['Hi-Fi Prototypes', 'Testing'], es: ['Prototipos Hi-Fi', 'Testing'] } },
  { key: 'webdev', icon: Code2, tags: { en: ['React', 'Responsive'], es: ['React', 'Responsive'] } },
  { key: 'gamedev', icon: Gamepad2, tags: { en: ['Unity', 'C#'], es: ['Unity', 'C#'] } },
  { key: 'vrar', icon: Glasses, tags: { en: ['VR', 'AR', 'Simulation'], es: ['VR', 'AR', 'Simulación'] } },
  { key: 'brand', icon: Fingerprint, tags: { en: ['Identity', 'Logos'], es: ['Identidad', 'Logos'] } },
  { key: 'graphic', icon: PenTool, tags: { en: ['Illustration', 'Print'], es: ['Ilustración', 'Impreso'] } },
  { key: 'social', icon: Share2, tags: { en: ['Content', 'Strategy'], es: ['Contenido', 'Estrategia'] } },
];

// Toolkit: AI & Workflow leads (highlighted), then the rest as in v1.
const TOOLKIT = [
  ...skillCategories.filter((c) => c.title === 'AI & Workflow'),
  ...skillCategories.filter((c) => c.title !== 'AI & Workflow'),
];

const TOOLKIT_ICONS: Record<string, LucideIcon> = {
  'AI & Workflow': BrainCircuit,
  'Product Design': Box,
  'Visual & Motion': PenTool,
  'Development': Code2,
  'UX Research': UserRound,
  'Simulation & XR': Boxes,
  'Methodology': Flag,
};

/** Large icon tile with the card's accent color, mockup-style. */
const IconSquare: React.FC<{ color: string; icon: LucideIcon }> = ({ color, icon: Icon }) => (
  <span
    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border sm:h-16 sm:w-16"
    style={{ borderColor: `${color}55`, background: `${color}14`, color }}
  >
    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
  </span>
);

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-body text-sm font-medium text-white/90">
    {children}
  </span>
);

const AiBadge: React.FC = () => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-label font-semibold uppercase tracking-widest"
    style={{ borderColor: '#89AACC66', color: '#89AACC', background: '#89AACC14' }}
  >
    <Sparkles className="h-3 w-3" />
    AI
  </span>
);

/** Services (AI-led) + the full technology toolkit — mockup-style accent cards. */
export const ServicesSection: React.FC = () => {
  const { t, language } = useLanguage();
  const en = language === 'en';

  return (
    <section id="services" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={t('sh.services.eyebrow')}
          title={t('sh.services.title')}
          accent={t('sh.services.accent')}
          subtext={t('services.description')}
          className="mb-12 md:mb-16"
        />

        {/* Services grid — AI card spans wide and carries the pink accent */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const featured = service.featured;
            const color = featured ? PINK : ACCENTS[i % ACCENTS.length];
            return (
              <FadeIn
                key={service.key}
                delay={Math.min((i % 3) * 0.1, 0.3)}
                y={24}
                className={featured ? 'md:col-span-2' : undefined}
              >
                <div
                  className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0D12] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-1"
                  style={{ borderLeft: `2px solid ${color}` }}
                >
                  {featured && (
                    <span className="absolute right-5 top-5">
                      <AiBadge />
                    </span>
                  )}

                  {/* Icon + title centered together; tags run full-width below
                      so long titles (Social Media, VR/AR, ES copy) never break
                      the layout. */}
                  <div className="flex items-center gap-4">
                    <IconSquare color={color} icon={service.icon} />
                    <h3 className={`min-w-0 flex-1 font-body text-xl font-semibold leading-tight text-white md:text-2xl ${featured ? 'pr-16' : ''}`}>
                      {t(`services.${service.key}`)}
                    </h3>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(en ? service.tags.en : service.tags.es).map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>

                  <p className="mt-3 font-body text-sm font-light leading-relaxed text-white/80 md:text-base">
                    {t(`services.${service.key}.desc`)}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Toolkit — every technology, AI & Workflow leading */}
        <div className="mt-24 md:mt-32">
          <SectionHeader
            eyebrow={t('skills.title')}
            title={t('sh.toolkit.title')}
            accent={t('sh.toolkit.accent')}
            subtext={t('skills.subtitle')}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {TOOLKIT.map((category, i) => {
              const isAI = category.title === 'AI & Workflow';
              const color = ACCENTS[i % ACCENTS.length];
              const Icon = TOOLKIT_ICONS[category.title] ?? Box;
              return (
                <FadeIn
                  key={category.title}
                  delay={Math.min((i % 2) * 0.08, 0.16)}
                  y={20}
                  className={i === TOOLKIT.length - 1 && TOOLKIT.length % 2 !== 0 ? 'md:col-span-2' : undefined}
                >
                  <div
                    className="flex h-full gap-5 rounded-2xl border border-white/10 bg-[#0A0D12] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                    style={{ borderLeft: `2px solid ${color}` }}
                  >
                    <IconSquare color={color} icon={Icon} />
                    <div className="min-w-0 flex-1">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h3 className="font-body text-base font-semibold uppercase tracking-[0.18em] text-white md:text-lg">
                          {en ? category.title : category.titleEs}
                        </h3>
                        {isAI && <AiBadge />}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Chip key={skill}>{skill}</Chip>
                        ))}
                      </div>
                    </div>
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
