import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { AlertCircle, ArrowRight, ExternalLink, Lightbulb, Quote, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { projects, processLabels, type Project } from '@/data/projects';
import { SectionHeader } from './SectionHeader';
import { SECTION, CONTAINER } from './layout';
import { SLOT_VH, DWELL_VH, stackWindow } from './stackMath';
import { cn } from '@/lib/utils';

/**
 * Only the featured cases get a sticky card. The rest live as text under the
 * job they were done for, in the experience section.
 */
const featuredProjects = projects.filter((p) => p.featured);
const TOTAL = featuredProjects.length;

const BLUE = '#89AACC';
const PINK = '#FF6B9D';

/** Icon tile used at the left of each labelled box, mockup-style. */
const IconTile: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <span
    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border"
    style={{ borderColor: `${color}55`, color }}
  >
    {children}
  </span>
);

interface ProjectCardBodyProps {
  project: Project;
  index: number;
  onOpenDetail: (project: Project) => void;
  /**
   * Compact mode skips the full problem/solution/impact/insight grid.
   * That grid, combined with the sticky slot's fixed viewport-relative
   * height, forced the card into its own `overflow-y-auto` on short
   * mobile screens — meaning a single touch-scroll gesture could land on
   * either the page's scroll (which drives the stacking effect) or the
   * card's own inner scroll, unpredictably. A compact card's content
   * always fits the slot, so it never needs internal scrolling — there
   * is only ever one scroll happening. The full detail (problem,
   * solution, all metrics, insight) still lives one tap away in the
   * "Full Case Study" modal, so nothing is lost, only relocated.
   */
  compact?: boolean;
}

/**
 * Shared card content: header, actions, and (outside compact mode) the
 * fixed problem/solution/impact/insight quadrant grid. Reused by every
 * sticky-stack card so desktop and mobile never visually drift apart.
 */
const ProjectCardBody: React.FC<ProjectCardBodyProps> = ({ project, index, onOpenDetail, compact = false }) => {
  const { t, language } = useLanguage();
  const en = language === 'en';
  const title = en ? project.title : project.titleEs;
  const star = project.metrics[0];

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full border px-3.5 py-1 text-label font-semibold uppercase tracking-widest"
          style={{ borderColor: `${PINK}55`, color: PINK }}
        >
          {en ? project.category : project.categoryEs}
        </span>
        <span className="rounded-full border border-white/15 px-3.5 py-1 text-label font-medium uppercase tracking-widest text-white/70">
          {String(index + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
      </div>

      <h3 className="text-h3 font-body font-bold text-white">
        {title}
      </h3>
      <p className="mt-2 max-w-2xl font-body text-base font-light leading-relaxed text-white/80">
        {en ? project.oneLiner : project.oneLinerEs}
      </p>

      {/* Compact mode: a single headline metric teases the impact, the
          rest is one tap away in the modal. */}
      {compact && (
        <div className="mt-5 flex items-baseline gap-2.5">
          <span
            className="text-metric font-body font-bold"
            style={{ color: PINK }}
          >
            {star.value}
          </span>
          <span className="font-body text-sm font-light text-white/60">
            {en ? star.label : star.labelEs}
          </span>
        </div>
      )}

      {/* Actions — left-aligned under the title, mockup-style */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white/5"
            style={{ borderColor: `${PINK}66` }}
          >
            <ExternalLink className="h-4 w-4" style={{ color: PINK }} />
            {t('landing.liveProject')}
            <ArrowRight className="h-4 w-4" style={{ color: PINK }} />
          </a>
        )}
        <button
          type="button"
          onClick={() => onOpenDetail(project)}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white/5"
        >
          {t('landing.fullCase')}
        </button>
      </div>

      {/* Content grid — fixed 4-quadrant layout, identical on every card:
          row 1: Problem | Impact  ·  row 2: Solution | Insight.
          Shared grid rows keep boxes aligned regardless of copy length.
          Skipped entirely in compact mode — see the compact prop doc. */}
      {!compact && (
      <div className="mt-7 grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[44%_1fr]">
        {/* Problem — row 1 left */}
        <div
          className="order-1 flex h-full gap-4 rounded-2xl lg:min-h-[150px] border border-white/10 bg-black/50 p-5 md:p-6"
          style={{ borderLeft: `2px solid ${PINK}` }}
        >
          <IconTile color={PINK}>
            <AlertCircle className="h-5 w-5" />
          </IconTile>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: PINK }}>
              {t('landing.problem')}
            </p>
            <p className="font-body text-sm font-light leading-relaxed text-white/85 md:text-base">
              {en ? project.problem : project.problemEs}
            </p>
          </div>
        </div>

        {/* Impact — row 1 right (metrics center in the shared row height) */}
        <div className="order-3 flex h-full flex-col rounded-2xl lg:min-h-[150px] border border-white/10 bg-black/50 p-5 md:p-6 lg:order-2">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/70">
            {t(project.metricsKind === 'scope' ? 'landing.scope' : 'landing.impact')}
          </p>
          <div className="flex flex-1 flex-col justify-center">
            <div
              className={cn(
                'grid w-full grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-0 sm:divide-x sm:divide-white/10',
                project.metrics.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
              )}
            >
              {project.metrics.map((metric, mi) => (
                <div key={metric.label} className={mi === 0 ? 'sm:pr-4' : 'sm:px-4'}>
                  <p
                    className="text-metric font-body font-bold"
                    style={{ color: mi === 0 ? PINK : '#fff' }}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-2 font-body text-xs font-light leading-snug text-white/70 sm:text-sm">
                    {en ? metric.label : metric.labelEs}
                  </p>
                </div>
              ))}
            </div>
            {project.metricsSource && (
              <p className="mt-4 font-body text-xs font-light leading-snug text-white/55">
                {en ? project.metricsSource : project.metricsSourceEs}
              </p>
            )}
          </div>
        </div>

        {/* Solution — row 2 left */}
        <div
          className="order-2 flex h-full gap-4 rounded-2xl lg:min-h-[130px] border border-white/10 bg-black/50 p-5 md:p-6 lg:order-3"
          style={{ borderLeft: `2px solid ${BLUE}` }}
        >
          <IconTile color={BLUE}>
            <Lightbulb className="h-5 w-5" />
          </IconTile>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BLUE }}>
              {t('landing.solution')}
            </p>
            <p className="font-body text-sm font-light leading-relaxed text-white/85 md:text-base">
              {en ? project.solution : project.solutionEs}
            </p>
          </div>
        </div>

        {/* Insight — row 2 right (vertically centered in the shared row) */}
        {project.insight && (
          <div
            className="order-4 flex h-full items-center gap-4 rounded-2xl lg:min-h-[130px] border border-white/10 bg-black/50 p-5 md:p-6"
            style={{ borderLeft: `2px solid ${BLUE}` }}
          >
            <IconTile color={BLUE}>
              <Quote className="h-5 w-5" />
            </IconTile>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BLUE }}>
                {t('landing.insight')}
              </p>
              <p className="font-body text-base font-medium leading-relaxed text-white md:text-lg">
                “{en ? project.insight : project.insightEs}”
              </p>
            </div>
          </div>
        )}
      </div>
      )}
    </>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  onOpenDetail: (project: Project) => void;
}

/**
 * Sticky stacking card, used on every device. It recedes (shrinks) once
 * the next card's slot begins, and holds once fully receded — the last
 * card has no "next" slot, so it never recedes.
 *
 * Deliberately SCALE-only, no opacity fade: an earlier version also faded
 * receding cards toward transparent so their text wouldn't show through
 * the current card. That fade is a continuous value driven by scroll
 * position, and on touch/momentum scrolling (phones) scroll position
 * updates in coarser bursts than mouse-wheel scrolling — so the fade
 * lagged behind, leaving several cards at some intermediate, partially
 * see-through opacity simultaneously (illegible overlapping text). Scale
 * has the same scroll-linked-lag exposure, but the worst case is a card
 * being briefly the "wrong" size — never illegible — and the solid
 * `bg-[#0A0D12]` background already fully hides whatever a card overlaps,
 * regardless of scale. Dropping opacity keeps the effect everywhere.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, progress, onOpenDetail }) => {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();


  const { recedeStart, recedeEnd, targetScale } = stackWindow(index, TOTAL);
  const scale = useTransform(progress, [recedeStart, recedeEnd], [1, targetScale]);

  return (
    <div
      className="sticky flex w-full items-start justify-center"
      style={{ height: `${SLOT_VH}vh`, top: `calc(6rem + ${index * 16}px)` }}
    >
      <motion.article
        style={reduce ? undefined : { scale }}
        className="w-full origin-top overflow-y-auto rounded-[28px] border border-white/10 bg-[#0A0D12] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:rounded-[32px] sm:p-8 md:p-10 max-h-full"
      >
        <ProjectCardBody project={project} index={index} onOpenDetail={onOpenDetail} compact={isMobile} />
      </motion.article>
    </div>
  );
};

/**
 * All 14 UX case studies as sticky stacking cards — same effect on every
 * device (see ProjectCard's comment for why this is safe on mobile too).
 */
export const ProjectsSectionV2: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const en = language === 'en';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={t('sh.projects.eyebrow')}
          title={t('sh.projects.title')}
          accent={t('sh.projects.accent')}
          subtext={t('projects.subtitle')}
          className="mb-12 sm:mb-16 md:mb-24"
        />

        <div ref={containerRef}>
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              progress={scrollYProgress}
              onOpenDetail={setSelected}
            />
          ))}
          {/* Dwell room: without it, the container ends exactly where the
              last card's own slot ends, so it never gets a settled moment
              before the section scrolls away. */}
          <div aria-hidden="true" style={{ height: `${DWELL_VH}vh` }} />
        </div>
      </div>

      {/* Full case study modal: process + decisions */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto rounded-[28px] border border-white/15 bg-[#0A0D12] p-6 sm:p-10">
          <VisuallyHidden>
            <DialogTitle>{selected && (en ? selected.title : selected.titleEs)}</DialogTitle>
            <DialogDescription>
              {selected && (en ? selected.oneLiner : selected.oneLinerEs)}
            </DialogDescription>
          </VisuallyHidden>

          {selected && (
            <div>
              <span
                className="mb-3 inline-block rounded-full border px-3.5 py-1 text-label font-semibold uppercase tracking-widest"
                style={{ borderColor: `${PINK}55`, color: PINK }}
              >
                {en ? selected.category : selected.categoryEs}
              </span>
              <h3 className="mb-2 font-body text-2xl font-bold leading-tight text-white sm:text-3xl">
                {en ? selected.title : selected.titleEs}
              </h3>
              <p className="mb-8 font-body text-base font-light text-white/80">
                {en ? selected.oneLiner : selected.oneLinerEs}
              </p>

              {/* Problem */}
              <div className="mb-6 flex gap-4">
                <IconTile color={PINK}>
                  <AlertCircle className="h-5 w-5" />
                </IconTile>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: PINK }}>
                    {t('landing.problem')}
                  </p>
                  <p className="font-body text-sm font-light leading-relaxed text-white/85 sm:text-base">
                    {en ? selected.problem : selected.problemEs}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="mb-6 flex gap-4">
                <IconTile color={BLUE}>
                  <Lightbulb className="h-5 w-5" />
                </IconTile>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BLUE }}>
                    {t('landing.solution')}
                  </p>
                  <p className="font-body text-sm font-light leading-relaxed text-white/85 sm:text-base">
                    {en ? selected.solution : selected.solutionEs}
                  </p>
                </div>
              </div>

              {/* Impact — all metrics */}
              <div className="mb-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                  {t('landing.impact')}
                </p>
                <div
                  className={
                    selected.metrics.length === 4 ? 'grid grid-cols-2 gap-4 sm:grid-cols-4' : 'grid grid-cols-3 gap-4'
                  }
                >
                  {selected.metrics.map((metric, mi) => (
                    <div key={metric.label}>
                      <p
                        className="text-metric font-body font-bold"
                        style={{ color: mi === 0 ? PINK : '#fff' }}
                      >
                        {metric.value}
                      </p>
                      <p className="mt-1.5 font-body text-xs font-light leading-snug text-white/70">
                        {en ? metric.label : metric.labelEs}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insight */}
              {selected.insight && (
                <div className="mb-8 flex gap-4">
                  <IconTile color={BLUE}>
                    <Quote className="h-5 w-5" />
                  </IconTile>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BLUE }}>
                      {t('landing.insight')}
                    </p>
                    <p className="font-body text-base font-medium leading-relaxed text-white">
                      “{en ? selected.insight : selected.insightEs}”
                    </p>
                  </div>
                </div>
              )}

              {/* UX Process */}
              <p className="mb-4 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-widest text-white/70">
                {t('landing.process')}
              </p>
              <div className="mb-8 space-y-4">
                {selected.steps.map((step, i) => {
                  const StepIcon = processLabels[i].icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <IconTile color={BLUE}>
                        <StepIcon className="h-5 w-5" />
                      </IconTile>
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: BLUE }}>
                          {en ? processLabels[i].en : processLabels[i].es}
                        </p>
                        <p className="font-body text-sm font-light leading-relaxed text-white/85 sm:text-base">
                          {en ? step.en : step.es}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* UX Decisions */}
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/70">
                {t('landing.decisions')}
              </p>
              <ul className="mb-8 space-y-2.5">
                {(en ? selected.decisions : selected.decisionsEs).map((d, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-sm font-light text-white/85 sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: BLUE }} />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white/5"
                    style={{ borderColor: `${PINK}66` }}
                  >
                    <ExternalLink className="h-4 w-4" style={{ color: PINK }} />
                    {t('landing.liveProject')}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white/5"
                >
                  <X className="h-4 w-4" />
                  {t('landing.close')}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
