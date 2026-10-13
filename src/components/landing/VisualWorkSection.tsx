import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { portfolioItems, type PortfolioItem } from '@/data/visualWorks';
import { FadeIn } from './FadeIn';
import { SectionHeader } from './SectionHeader';
import { LiveProjectButton } from './Buttons';
import { cn } from '@/lib/utils';
import { SECTION, CONTAINER } from './layout';

const ACCENT = '#89AACC';

/** Bento span pattern per row of two: 7/5 then 5/7. */
const spanClass = (index: number) => {
  const pos = index % 4;
  return pos === 0 || pos === 3 ? 'md:col-span-7' : 'md:col-span-5';
};

const aspectClass = (index: number) => {
  const pos = index % 4;
  return pos === 0 || pos === 3 ? 'aspect-[16/10]' : 'aspect-[4/3]';
};

export const VisualWorkSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const en = language === 'en';

  return (
    <section id="visual-work" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeader
          index="07"
          eyebrow={t('sh.visual.eyebrow')}
          title={t('sh.visual.title')}
          accent={t('sh.visual.accent')}
          subtext={t('portfolio.subtitle')}
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {portfolioItems.map((item, index) => (
            <FadeIn key={item.title} className={spanClass(index)} delay={Math.min((index % 2) * 0.1, 0.2)} y={24}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className={cn(
                  'group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D12] text-left transition-colors duration-300 hover:border-white/30',
                  aspectClass(index)
                )}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={en ? item.title : item.titleEs}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                )}

                {/* Caption: always visible on touch, slides in on hover on desktop.
                    Replaces a blurred overlay with a gradient-ringed pill. */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-10 transition-all duration-300 md:translate-y-2 md:p-5 md:pt-12 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <p className="mb-1 font-mono text-label uppercase text-white/60">
                    {item.tags.slice(0, 3).join(' · ')}
                  </p>
                  <p className="font-body text-base font-medium text-white md:text-lg">{en ? item.title : item.titleEs}</p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="h-[88vh] max-h-[88vh] w-[96vw] max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#0A0D12] p-0">
          <VisuallyHidden>
            <DialogTitle>{selected && (en ? selected.title : selected.titleEs)}</DialogTitle>
            <DialogDescription>
              {selected && (en ? selected.description : selected.descriptionEs)}
            </DialogDescription>
          </VisuallyHidden>

          {selected && (
            <div className="flex h-full max-h-[88vh] flex-col lg:flex-row">
              <div className="flex h-64 flex-shrink-0 items-center justify-center bg-[#141922] p-4 sm:h-80 sm:p-6 lg:h-auto lg:w-[60%]">
                <img
                  src={selected.image}
                  alt={en ? selected.title : selected.titleEs}
                  className="max-h-full w-full object-contain"
                />
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <p className="mb-2 font-mono text-label uppercase text-white/55">{selected.tags.join(' · ')}</p>
                <span className="font-mono text-label uppercase" style={{ color: ACCENT }}>
                  {selected.category}
                </span>
                <h3 className="mt-1.5 font-body font-semibold text-xl leading-tight text-white sm:text-2xl">
                  {en ? selected.title : selected.titleEs}
                </h3>
                <p className="mt-3 font-body text-base font-light leading-relaxed text-white/80">
                  {en ? selected.description : selected.descriptionEs}
                </p>

                {selected.detail && (
                  <div className="mt-5 grid grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
                    {(
                      [
                        ['Problem', 'Problema', selected.detail.problem, selected.detail.problemEs],
                        ['Role', 'Rol', selected.detail.role, selected.detail.roleEs],
                        ['Process', 'Proceso', selected.detail.process, selected.detail.processEs],
                        ['Outcome', 'Resultado', selected.detail.outcome, selected.detail.outcomeEs],
                      ] as const
                    ).map(([labelEn, labelEs, valueEn, valueEs]) => (
                      <div key={labelEn}>
                        <h4 className="mb-1 font-mono text-label uppercase text-white/55">
                          {en ? labelEn : labelEs}
                        </h4>
                        <p className="font-body text-sm font-light leading-relaxed text-white/80">
                          {en ? valueEn : valueEs}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {selected.url && (
                  <div className="mt-6">
                    <LiveProjectButton href={selected.url} className="!px-6 !py-2.5 !text-xs sm:!text-sm">
                      <span className="inline-flex items-center gap-2">
                        {t('landing.liveProject')}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </LiveProjectButton>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
