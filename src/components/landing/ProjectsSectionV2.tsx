import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { projects, processLabels, type Project } from '@/data/projects';
import { SectionHeader } from './SectionHeader';
import { SECTION, CONTAINER } from './layout';
import { SLOT_VH, slotHeights, stackWindow } from './stackMath';
import { cn } from '@/lib/utils';

/**
 * Only the featured cases get a sticky card. The rest live as text under the
 * job they were done for, in the experience section.
 */
const featuredProjects = projects.filter((p) => p.featured);
const TOTAL = featuredProjects.length;

const ACCENT = '#89AACC';
const pad = (n: number) => String(n).padStart(2, '0');

/** Mono field label — the one labelling device used across the card. */
const Field: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn('mb-3 font-mono text-label uppercase text-white/55', className)}>{children}</p>
);

/** Primary link: solid pill, same family as the hero CTA. */
const LiveLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-body text-sm font-medium text-black transition-colors duration-300 hover:bg-white/80"
  >
    {label}
    <ArrowUpRight className="h-4 w-4" />
  </a>
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
 * Shared card content: index line, title, actions, and (outside compact mode)
 * the fixed problem/impact/solution/insight grid.
 *
 * The grid used to be four separate boxes, each with a coloured left edge and
 * an icon in a circle, plus a pink first metric. Now it is one table: cells
 * split by 1px hairlines (the gap shows the border colour through), mono field
 * labels, white figures. Same four quadrants and the same shared row heights,
 * so cards still align with each other — only the decoration is gone.
 */
const ProjectCardBody: React.FC<ProjectCardBodyProps> = ({ project, index, onOpenDetail, compact = false }) => {
  const { t, language } = useLanguage();
  const en = language === 'en';
  const title = en ? project.title : project.titleEs;
  const star = project.metrics[0];

  return (
    <>
      <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label uppercase">
        <span style={{ color: ACCENT }}>
          {pad(index + 1)} / {pad(TOTAL)}
        </span>
        <span className="text-white/55">{en ? project.category : project.categoryEs}</span>
      </p>

      <h3 className="text-h3 font-body font-bold tracking-[-0.01em] text-white">{title}</h3>
      <p className="mt-2 max-w-2xl font-body text-base font-light leading-relaxed text-white/75">
        {en ? project.oneLiner : project.oneLinerEs}
      </p>

      {/* Compact mode: one headline figure teases the result; the rest is in the modal. */}
      {compact && (
        <>
          {/* Phones: the headline figure only. */}
          <div className="mt-5 flex items-baseline gap-2.5 sm:hidden">
            <span className="text-metric font-body font-bold text-white">{star.value}</span>
            <span className="font-body text-sm font-light text-white/60">{en ? star.label : star.labelEs}</span>
          </div>
          {/* Short laptops: every figure in one row — the card has the width for it. */}
          <dl className="mt-6 hidden grid-cols-4 divide-x divide-white/10 border-y border-white/10 py-4 sm:grid">
            {project.metrics.map((metric, mi) => (
              <div key={metric.label} className={cn('flex flex-col-reverse gap-1', mi === 0 ? 'pr-4' : 'px-4')}>
                <dt className="font-body text-xs font-light leading-snug text-white/60">{en ? metric.label : metric.labelEs}</dt>
                <dd className="text-h4 font-body font-bold text-white">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        {project.url && <LiveLink href={project.url} label={t('landing.liveProject')} />}
        <button
          type="button"
          onClick={() => onOpenDetail(project)}
          className="group inline-flex items-center gap-1.5 font-body text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-[6px] transition-colors duration-300 hover:text-white hover:decoration-white"
        >
          {t('landing.fullCase')}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Fixed 4-quadrant table, identical on every card:
          row 1: Problem | Impact  ·  row 2: Solution | Insight. */}
      {!compact && (
        <div className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-[44%_1fr]">
          <div className="order-1 bg-[#0A0D12] p-5 md:p-6 lg:min-h-[150px]">
            <Field>{t('landing.problem')}</Field>
            <p className="font-body text-sm font-light leading-relaxed text-white/85 md:text-base">
              {en ? project.problem : project.problemEs}
            </p>
          </div>

          <div className="order-3 flex flex-col bg-[#0A0D12] p-5 md:p-6 lg:order-2 lg:min-h-[150px]">
            <Field>{t(project.metricsKind === 'scope' ? 'landing.scope' : 'landing.impact')}</Field>
            <div className="flex flex-1 flex-col justify-center">
              <div
                className={cn(
                  'grid w-full grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-0 sm:divide-x sm:divide-white/10',
                  project.metrics.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
                )}
              >
                {project.metrics.map((metric, mi) => (
                  <div key={metric.label} className={mi === 0 ? 'sm:pr-4' : 'sm:px-4'}>
                    <p className="text-metric font-body font-bold text-white">{metric.value}</p>
                    <p className="mt-2 font-body text-xs font-light leading-snug text-white/65 sm:text-sm">
                      {en ? metric.label : metric.labelEs}
                    </p>
                  </div>
                ))}
              </div>
              {project.metricsSource && (
                <p className="mt-4 font-body text-xs font-light leading-relaxed text-white/50">
                  {en ? project.metricsSource : project.metricsSourceEs}
                </p>
              )}
            </div>
          </div>

          <div className="order-2 bg-[#0A0D12] p-5 md:p-6 lg:order-3 lg:min-h-[130px]">
            <Field>{t('landing.solution')}</Field>
            <p className="font-body text-sm font-light leading-relaxed text-white/85 md:text-base">
              {en ? project.solution : project.solutionEs}
            </p>
          </div>

          {project.insight && (
            <div className="order-4 flex flex-col justify-center bg-[#0A0D12] p-5 md:p-6 lg:min-h-[130px]">
              <Field>{t('landing.insight')}</Field>
              <p className="font-heading text-xl italic leading-snug text-white md:text-2xl">
                “{en ? project.insight : project.insightEs}”
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};


/**
 * Whether this card's full version fits its sticky slot on this screen.
 *
 * The card used to fall back to its own `overflow-y-auto` whenever the
 * content was taller than the slot — on any laptop around 800px tall — which
 * meant a scroll inside a scroll: the wheel drove either the card or the page,
 * unpredictably, and the stack stopped working. Now the full height is
 * measured whenever the full version is on screen and remembered while the
 * compact one is, so a resize can bring the full version back.
 */
function useFullFits(
  ref: React.RefObject<HTMLElement>,
  index: number,
  renderedFull: boolean,
  enabled: boolean
) {
  const { language } = useLanguage();
  const [fits, setFits] = useState(true);
  const fullHeight = useRef(0);

  useLayoutEffect(() => {
    if (!enabled) return;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const top = 96 + index * 16; // 6rem sticky top + the card's padding offset
      const available = Math.min((window.innerHeight * SLOT_VH) / 100 - index * 16, window.innerHeight - top - 16);
      if (renderedFull) fullHeight.current = el.scrollHeight;
      if (fullHeight.current) setFits(fullHeight.current <= available);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [ref, index, renderedFull, enabled, language]);

  return fits;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  onOpenDetail: (project: Project) => void;
  /** Decided by the section, so every card shows the same version. */
  compact: boolean;
  /** Reports whether this card's full version fits. */
  onFit: (index: number, fits: boolean) => void;
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
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, progress, onOpenDetail, compact, onFit }) => {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const articleRef = useRef<HTMLElement>(null);
  const fits = useFullFits(articleRef, index, !compact, !isMobile);

  useEffect(() => {
    onFit(index, fits);
  }, [index, fits, onFit]);

  const { recedeStart, recedeEnd, targetScale } = stackWindow(index, TOTAL);
  const scale = useTransform(progress, [recedeStart, recedeEnd], [1, targetScale]);

  return (
    <div
      className="sticky flex w-full items-start justify-center"
      style={{
        height: slotHeights(isMobile ? 'mobile' : compact ? 'compact' : 'full').slot,
        // Same sticky `top` for every card, offset drawn as padding instead.
        // With per-card `top` values and equal heights, the front card (largest
        // top) reached the end of the container first and scrolled off while the
        // rest were still stuck — the stack came apart at the end of the section.
        top: '6rem',
        paddingTop: index * 16,
      }}
    >
      <motion.article
        ref={articleRef}
        style={reduce ? undefined : { scale }}
        className="w-full origin-top overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D12] p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)] sm:rounded-3xl sm:p-8 md:p-10 max-h-full"
      >
        <ProjectCardBody project={project} index={index} onOpenDetail={onOpenDetail} compact={compact} />
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

  // One version for the whole stack: if any card's full version doesn't fit
  // this screen, every card goes compact, so the cards never look different
  // from one another.
  const isMobile = useIsMobile();
  const [misfits, setMisfits] = useState<ReadonlySet<number>>(() => new Set());
  const onFit = useCallback((i: number, fits: boolean) => {
    setMisfits((prev) => {
      if (fits !== prev.has(i)) return prev;
      const next = new Set(prev);
      if (fits) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);
  const compact = isMobile || misfits.size > 0;

  return (
    <section id="projects" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeader
          index="03"
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
              compact={compact}
              onFit={onFit}
            />
          ))}
          {/* Dwell room: without it, the container ends exactly where the
              last card's own slot ends, so it never gets a settled moment
              before the section scrolls away. */}
          <div aria-hidden="true" style={{ height: slotHeights(isMobile ? 'mobile' : compact ? 'compact' : 'full').dwell }} />
        </div>
      </div>

      {/* Full case study modal: process + decisions */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0A0D12] p-6 sm:p-10">
          <VisuallyHidden>
            <DialogTitle>{selected && (en ? selected.title : selected.titleEs)}</DialogTitle>
            <DialogDescription>
              {selected && (en ? selected.oneLiner : selected.oneLinerEs)}
            </DialogDescription>
          </VisuallyHidden>

          {selected && (
            <div>
              <Field className="mb-3">{en ? selected.category : selected.categoryEs}</Field>
              <h3 className="mb-2 font-body text-2xl font-bold leading-tight tracking-[-0.01em] text-white sm:text-3xl">
                {en ? selected.title : selected.titleEs}
              </h3>
              <p className="mb-8 font-body text-base font-light text-white/75">
                {en ? selected.oneLiner : selected.oneLinerEs}
              </p>

              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
                <div className="bg-[#0A0D12] p-5">
                  <Field>{t('landing.problem')}</Field>
                  <p className="font-body text-sm font-light leading-relaxed text-white/85 sm:text-base">
                    {en ? selected.problem : selected.problemEs}
                  </p>
                </div>
                <div className="bg-[#0A0D12] p-5">
                  <Field>{t('landing.solution')}</Field>
                  <p className="font-body text-sm font-light leading-relaxed text-white/85 sm:text-base">
                    {en ? selected.solution : selected.solutionEs}
                  </p>
                </div>
                <div className="bg-[#0A0D12] p-5 sm:col-span-2">
                  <Field>{t(selected.metricsKind === 'scope' ? 'landing.scope' : 'landing.impact')}</Field>
                  <div
                    className={
                      selected.metrics.length === 4 ? 'grid grid-cols-2 gap-4 sm:grid-cols-4' : 'grid grid-cols-3 gap-4'
                    }
                  >
                    {selected.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="text-metric font-body font-bold text-white">{metric.value}</p>
                        <p className="mt-1.5 font-body text-xs font-light leading-snug text-white/65">
                          {en ? metric.label : metric.labelEs}
                        </p>
                      </div>
                    ))}
                  </div>
                  {selected.metricsSource && (
                    <p className="mt-4 font-body text-xs font-light leading-relaxed text-white/50">
                      {en ? selected.metricsSource : selected.metricsSourceEs}
                    </p>
                  )}
                </div>
              </div>

              {selected.insight && (
                <p className="my-8 font-heading text-2xl italic leading-snug text-white sm:text-3xl">
                  “{en ? selected.insight : selected.insightEs}”
                </p>
              )}

              {/* Process — numbered steps instead of icon tiles */}
              <Field className="mb-5 border-t border-white/10 pt-6">{t('landing.process')}</Field>
              <ol className="mb-8 space-y-5">
                {selected.steps.map((step, i) => (
                  <li key={i} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                    <span className="pt-0.5 font-mono text-label" style={{ color: ACCENT }}>
                      {pad(i + 1)}
                    </span>
                    <div>
                      <p className="mb-1 font-body text-sm font-semibold text-white">
                        {en ? processLabels[i].en : processLabels[i].es}
                      </p>
                      <p className="font-body text-sm font-light leading-relaxed text-white/80 sm:text-base">
                        {en ? step.en : step.es}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Field className="mb-4">{t('landing.decisions')}</Field>
              <ul className="mb-8 divide-y divide-white/10 border-y border-white/10">
                {(en ? selected.decisions : selected.decisionsEs).map((d, i) => (
                  <li key={i} className="py-3 font-body text-sm font-light leading-relaxed text-white/85 sm:text-base">
                    {d}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {selected.url && <LiveLink href={selected.url} label={t('landing.liveProject')} />}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white"
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
