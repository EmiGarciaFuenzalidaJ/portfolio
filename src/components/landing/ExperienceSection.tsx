import { ExternalLink, Download, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getEducation, getExperience, getResumeIntro, type ResumeItemData, type Lang } from '@/data/resume';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { SectionHeader } from './SectionHeader';
import { LiveProjectButton } from './Buttons';
import { CV_HREF } from '@/data/cv';
import { projects } from '@/data/projects';
import { SECTION, CONTAINER } from './layout';

const ACCENT = '#89AACC';

/** Case studies by id, so a resume entry can pull its own detail. */
const CASES = new Map(projects.map((p) => [p.id, p]));

/**
 * The detail a non-featured case used to show on its card: the insight it
 * left, its figures, and who measured them. Featured cases get a pointer to
 * the full study instead, so nothing is written out twice.
 */
const CaseDetail: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { language } = useLanguage();
  const project = CASES.get(projectId);
  if (!project) return null;
  const en = language === 'en';

  if (project.featured) {
    return (
      <a
        href="#projects"
        className="mt-3 inline-flex items-center gap-1.5 font-body text-xs font-medium transition-colors hover:text-white"
        style={{ color: ACCENT }}
      >
        {en ? 'See the full case study' : 'Ver el caso completo'}
        <ArrowUp className="h-3 w-3" />
      </a>
    );
  }

  const insight = en ? project.insight : project.insightEs;

  return (
    <div className="mt-3 border-t border-white/10 pt-3">
      {insight && (
        <p className="mb-3 font-heading text-sm italic leading-snug text-white/70">
          {insight}
        </p>
      )}
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
        {project.metrics.map((metric) => (
          <li key={metric.label} className="font-body text-xs text-white/60">
            <span className="font-semibold text-white">{metric.value}</span>{' '}
            {en ? metric.label : metric.labelEs}
          </li>
        ))}
      </ul>
      {project.metricsSource && (
        <p className="mt-2 font-body text-[0.7rem] font-light leading-snug text-white/55">
          {en ? project.metricsSource : project.metricsSourceEs}
        </p>
      )}
    </div>
  );
};

const Row: React.FC<{ item: ResumeItemData; index: number }> = ({ item, index }) => (
  <FadeIn delay={Math.min(index * 0.06, 0.4)} y={30}>
    <div className="group flex flex-col gap-4 border-b border-white/10 px-3 py-8 transition-colors duration-300 hover:bg-white/[0.03] sm:py-10 md:flex-row md:gap-10 rounded-2xl">
      {/* Period + location (date-led, no numbering) */}
      <div className="flex-shrink-0 md:w-[200px]">
        <p className="font-body font-semibold leading-tight text-white">
          {item.period}
        </p>
        <p className="mt-1 font-body text-xs font-light text-white/50 sm:text-sm">{item.location}</p>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h4 className="mb-2 font-body font-medium uppercase text-white">
          {item.title}
        </h4>
        <p className="max-w-3xl font-body text-base font-light leading-relaxed text-white/80 md:text-lg">
          {item.description}
        </p>

        {item.projects && item.projects.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {item.projects.map((project, pi) => (
              <div key={pi} className="rounded-2xl border border-white/10 bg-[#0A0D12] p-4" style={{ borderLeft: '2px solid #89AACC33' }}>
                <div className="mb-1 flex items-center gap-2">
                  <h5 className="font-body text-base font-medium" style={{ color: ACCENT }}>
                    {project.title}
                  </h5>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/55 transition-colors hover:text-white"
                      aria-label={project.title}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="font-body text-sm font-light leading-relaxed text-white/60">{project.description}</p>
                {project.projectId && <CaseDetail projectId={project.projectId} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </FadeIn>
);

/** Full professional background: date-led experience rows + education + CV download. */
export const ExperienceSection: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as Lang;
  const experience = getExperience(lang);
  const education = getEducation(lang);

  return (
    <>
      <section id="experience" className={SECTION}>
        <div className={CONTAINER}>
          <SectionHeader
            eyebrow={t('sh.exp.eyebrow')}
            title={t('sh.exp.title')}
            accent={t('sh.exp.accent')}
            className="mb-10"
          />

          <div className="mb-14 max-w-3xl sm:mb-16">
            <AnimatedText
              text={getResumeIntro(lang)}
              className="font-body text-sm font-light leading-relaxed text-white md:text-base"
            />
          </div>

          <div>
            {experience.map((item, i) => (
              <Row key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-24 md:px-10 md:pb-32">
        <div className={CONTAINER}>
          <SectionHeader
            eyebrow={t('sh.exp.eyebrow')}
            title={t('sh.edu.title')}
            accent={t('sh.edu.accent')}
            className="mb-10 sm:mb-14"
          />

          <div>
            {education.map((item, i) => (
              <Row key={i} item={item} index={i} />
            ))}
          </div>

          {/* CV download */}
          <FadeIn className="mt-14 flex flex-wrap items-center justify-center gap-4">
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
          </FadeIn>
        </div>
      </section>
    </>
  );
};
