import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { courses, type Course } from '@/data/courses';
import { FadeIn } from './FadeIn';
import { SectionHeader } from './SectionHeader';
import { SECTION, CONTAINER } from './layout';
import { cn } from '@/lib/utils';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * All 20 certifications as a horizontal rail — the gallery pattern of
 * award-winning portfolios such as Elliott Mangham's and Jesper Landberg's.
 *
 * Every certificate stays visible as an image, but the whole set takes the
 * height of a single row instead of seven rows of cards. It scrolls with a
 * trackpad, touch, the arrow buttons, the keyboard, or by dragging with the
 * mouse; a progress line shows where you are. Each certificate still opens
 * full size, with its description, in the lightbox.
 */
export const CoursesSectionV2: React.FC = () => {
  const { t, language } = useLanguage();
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Course | null>(null);
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);
  // Mouse drag-to-scroll. Snapping is switched off while dragging (it would
  // fight the pointer) and a drag never counts as a click on a certificate.
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const en = language === 'en';

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !railRef.current) return;
    drag.current = { active: true, startX: e.clientX, startLeft: railRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || !railRef.current) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) railRef.current.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  const shown = Math.min(courses.length, Math.round(progress * (courses.length - 1)) + 1);

  return (
    <section id="courses" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeader
          index="06"
          eyebrow={t('sh.courses.eyebrow')}
          title={t('sh.courses.title')}
          accent={t('sh.courses.accent')}
          subtext={t('courses.subtitle')}
          className="mb-10 sm:mb-12"
        />

        <FadeIn y={20}>
          {/* Counter, progress and arrows */}
          <div className="mb-6 flex items-center gap-5">
            <p className="font-mono text-label uppercase text-white/55" aria-live="polite">
              {pad(shown)} / {pad(courses.length)}
            </p>
            <div className="relative h-px flex-1 bg-white/15" aria-hidden="true">
              <span
                className="absolute inset-y-0 left-0 bg-white/70"
                style={{ width: `${Math.max(progress, 0.04) * 100}%` }}
              />
            </div>
            <div className="flex gap-2">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => step(dir)}
                  aria-label={t(dir === -1 ? 'courses.prev' : 'courses.next')}
                  disabled={dir === -1 ? progress <= 0.001 : progress >= 0.999}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-white/60 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  {dir === -1 ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>

          <ul
            ref={railRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            tabIndex={0}
            aria-label={t('sh.courses.eyebrow')}
            className={cn(
              'flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              dragging ? 'cursor-grabbing select-none' : 'snap-x snap-mandatory md:cursor-grab'
            )}
          >
            {courses.map((course, index) => (
              <li
                key={index}
                className="w-[78%] flex-shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    if (drag.current.moved) {
                      e.preventDefault();
                      return;
                    }
                    setSelected(course);
                  }}
                  draggable={false}
                  className="group flex w-full flex-col text-left"
                >
                  <span className="relative block aspect-[16/11] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:border-white/35">
                    {course.image && (
                      <img
                        src={course.image}
                        alt={en ? course.title : course.titleEs}
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    )}
                  </span>
                  <span className="mt-3 flex items-baseline gap-3">
                    <span className="font-mono text-label text-white/40">{pad(index + 1)}</span>
                    <span className="line-clamp-2 font-body text-sm font-semibold leading-snug text-white/90 transition-colors group-hover:text-white">
                      {en ? course.title : course.titleEs}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-mono text-label uppercase text-white/40">{t('courses.hint')}</p>
        </FadeIn>
      </div>

      {/* Certificate lightbox */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="w-[95vw] max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-panel p-0">
          <VisuallyHidden>
            <DialogTitle>{selected && (en ? selected.title : selected.titleEs)}</DialogTitle>
            <DialogDescription>
              {selected && (en ? selected.description : selected.descriptionEs)}
            </DialogDescription>
          </VisuallyHidden>

          {selected && (
            <div>
              {selected.image && (
                <div className="bg-[#151515] p-4 sm:p-6">
                  <img
                    src={selected.image}
                    alt={en ? selected.title : selected.titleEs}
                    className="h-auto max-h-[65vh] w-full rounded-xl object-contain"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="mb-2 font-body text-xl font-semibold leading-tight text-white sm:text-2xl">
                  {en ? selected.title : selected.titleEs}
                </h3>
                <p className="font-body text-sm font-light leading-relaxed text-white/70 sm:text-base">
                  {en ? selected.description : selected.descriptionEs}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
