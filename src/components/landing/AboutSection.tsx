import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './Buttons';
import { SectionTitle } from './SectionTitle';
import { WordsPullUp } from './WordsPullUp';
import { FadeIn } from './FadeIn';

/**
 * About block, Prisma-style: dark inner card, multi-style pull-up heading
 * (sans + italic serif accent) and a scroll-linked character reveal paragraph.
 */
export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-black px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-32">
      <div className="mb-10 sm:mb-14">
        <SectionTitle className="!text-5xl sm:!text-7xl md:!text-8xl lg:!text-[9rem]">
          {t('about.title')}
        </SectionTitle>
      </div>

      <FadeIn>
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#101010] px-6 py-14 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center">
          {/* Label */}
          <p className="mb-8 text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-[#DEDBC8]">
            UX/UI Design
          </p>

          {/* Multi-style heading */}
          <h3 className="mx-auto max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] text-[#E1E0CC]">
            <WordsPullUp
              segments={[
                { text: t('landing.about1'), className: 'font-normal' },
                { text: t('landing.about2'), className: 'font-serif italic font-normal' },
                { text: t('landing.about3'), className: 'font-normal' },
              ]}
            />
          </h3>

          {/* Scroll-linked character reveal */}
          <div className="mx-auto mt-10 sm:mt-12 max-w-2xl">
            <AnimatedText
              text={t('landing.aboutBody')}
              className="text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#DEDBC8]"
            />
          </div>

          <div className="mt-12 sm:mt-14">
            <ContactButton>{t('landing.contactMe')}</ContactButton>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
