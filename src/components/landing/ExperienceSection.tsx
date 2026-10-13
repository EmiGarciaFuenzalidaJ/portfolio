import { ArrowUpRight, Download, ArrowUp } from 'lucide-react';
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
    <div className="mt-3">
      {insight && (
        <p className="mb-3 font-heading text-base italic leading-snug text-white/80">
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

const Row: React.FC<{ item: ResumeItemData; index: number }> = ({ item, index }) => {
  const { t } = useLanguage();
  return (
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
        {/* The role is the heading of the row; its projects sit one level
            down, inside their own labelled block, so the two never compete. */}
        <h4 className="mb-3 text-h4 font-body font-semibold text-white">
          {item.title}
        </h4>
        <p className="max-w-3xl font-body text-base font-light leading-relaxed text-white/80 md:text-lg">
          {item.description}
        </p>

        {item.projects && item.projects.length > 0 && (
          <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.025] px-5 pt-4 md:px-6">
            <p className="font-mono text-label uppercase text-white/55">
              {t('resume.projectsInRole')} · {item.projects.length}
            </p>
          <ol className="mt-1 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {item.projects.map((project, pi) => (
              <li key={pi} className="border-t border-white/10 py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                <div className="mb-1.5 flex items-baseline gap-3">
                  <span className="font-mono text-label text-white/40">{String(pi + 1).padStart(2, '0')}</span>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-baseline gap-1.5 font-body text-sm font-semibold text-white/90 transition-colors hover:text-[#89AACC]"
                    >
                      {project.title}
                      <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-white/45 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-[#89AACC]" />
                    </a>
                  ) : (
                    <h5 className="font-body text-sm font-semibold text-white/90">{project.title}</h5>
                  )}
                </div>
                <p className="pl-9 font-body text-sm font-light leading-relaxed text-white/65">{project.description}</p>
                {project.projectId && (
                  <div className="pl-9">
                    <CaseDetail projectId={project.projectId} />
                  </div>
                )}
              </li>
            ))}
          </ol>
          </div>
        )}
      </div>
    </div>
  </FadeIn>
  );
};

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
            index="04"
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
            index="05"
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
