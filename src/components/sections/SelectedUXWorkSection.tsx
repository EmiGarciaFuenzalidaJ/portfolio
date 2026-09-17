import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ExternalLink } from 'lucide-react';

interface UXProject {
  titleKey: string;
  descKey: string;
  url?: string;
}

const projects: UXProject[] = [
  { titleKey: 'produceFirst', descKey: 'produceFirst', url: 'https://www.producefirst.mx/' },
  { titleKey: 'gotApp', descKey: 'gotApp', url: 'https://www.behance.net/gallery/229251747/GotApp-UXUI-para-app-ciudadana-de-gestion-hidrica' },
  { titleKey: 'trekkMates', descKey: 'trekkMates', url: 'https://www.behance.net/gallery/233262263/TrekkMates-UXUI-Design-for-a-hiking-partner-app' },
];

export const SelectedUXWorkSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="selected-ux" className="py-16 md:py-20 lg:py-32 relative">
      <div className="section-container">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">{t('selectedUX.title')}</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <AnimatedSection key={project.titleKey} animation="fade-up" delay={index * 150}>
              <div className="group glass rounded-2xl p-5 sm:p-6 md:p-8 card-hover shine h-full flex flex-col">
                {/* Accent bar */}
                <div className="w-12 h-1 bg-primary rounded-full mb-4 group-hover:w-20 transition-all duration-500" />

                <h3 className="font-display font-semibold text-lg md:text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                  {t(`selectedUX.${project.titleKey}.title`)}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {t(`selectedUX.${project.descKey}.desc`)}
                </p>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-medium mt-4 hover:gap-2.5 transition-all duration-300"
                  >
                    {t('selectedUX.viewProject')} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
