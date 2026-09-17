import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { courses, type Course } from '@/data/courses';
import { FadeIn } from './FadeIn';
import { SectionHeader } from './SectionHeader';
import { SECTION, CONTAINER } from './layout';

/** All 20 certifications as a clean card grid with a lightbox per certificate. */
export const CoursesSectionV2: React.FC = () => {
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState<Course | null>(null);
  const en = language === 'en';

  return (
    <section id="courses" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={t('sh.courses.eyebrow')}
          title={t('sh.courses.title')}
          accent={t('sh.courses.accent')}
          subtext={t('courses.subtitle')}
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <FadeIn key={index} delay={Math.min((index % 3) * 0.08, 0.24)} y={24}>
              <button
                type="button"
                onClick={() => setSelected(course)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A0D12] text-left shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25"
              >
                {/* Certificate preview */}
                <span className="relative block h-56 w-full overflow-hidden bg-[#141922] sm:h-64">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={en ? course.title : course.titleEs}
                      loading="lazy"
                      className="h-full w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                </span>

                {/* Body */}
                <span className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Fixed 2-line height reserves the same vertical footprint
                      for every title (1-line or 2-line), so the description
                      below always starts at the same Y — symmetric cards. */}
                  <span className="line-clamp-2 min-h-[3.5rem] font-body text-xl font-semibold leading-snug text-white sm:min-h-[4.25rem] sm:text-2xl">
                    {en ? course.title : course.titleEs}
                  </span>
                  {/* mb-6 guarantees breathing room before the divider even
                      when content nearly fills the card (mt-auto alone can
                      collapse to ~0 in that case); it still grows further
                      via mt-auto on shorter cards. */}
                  <span className="mt-3 mb-6 font-body text-sm font-light leading-relaxed text-white/60 line-clamp-2 md:text-base">
                    {en ? course.description : course.descriptionEs}
                  </span>

                  {/* mt-auto pins the footer to the card's bottom edge
                      regardless of how many lines the title/description
                      wrap to, so "View certificate" aligns across every
                      card in a row instead of drifting with copy length. */}
                  <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-body text-sm font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
                      {t('landing.viewCertificate')}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 group-hover:border-[#89AACC] group-hover:text-[#89AACC]">
                      <ArrowUpRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </span>
                  </span>
                </span>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Certificate lightbox */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="w-[95vw] max-w-4xl overflow-hidden rounded-[32px] border border-white/15 bg-[#101010] p-0">
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
