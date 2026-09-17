import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Search, PenTool, CheckCircle, Rocket } from 'lucide-react';

const steps = [
  { key: 'research', icon: Search },
  { key: 'design', icon: PenTool },
  { key: 'validate', icon: CheckCircle },
  { key: 'build', icon: Rocket },
];

export const HowIWorkSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="how-i-work" className="py-16 md:py-20 lg:py-32 relative bg-secondary/20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">{t('howIWork.title')}</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <AnimatedSection key={step.key} animation="scale-in" delay={index * 150}>
                <div className="group glass rounded-2xl p-5 sm:p-6 md:p-8 text-center card-hover shine relative overflow-hidden h-full">
                  {/* Step number */}
                  <span className="absolute top-3 right-3 text-xs font-mono text-primary/40 group-hover:text-primary/70 transition-colors">
                    0{index + 1}
                  </span>

                  {/* Icon with pulse animation on hover */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 relative">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                    {/* Subtle pulse ring on hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 group-hover:animate-ping transition-all duration-500 pointer-events-none" />
                  </div>

                  {/* Animated accent bar */}
                  <div className="w-0 h-0.5 bg-primary rounded-full mx-auto mb-4 group-hover:w-12 transition-all duration-500 ease-out" />

                  {/* Title */}
                  <h3 className="font-display font-semibold text-base md:text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                    {t(`howIWork.${step.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`howIWork.${step.key}.desc`)}
                  </p>

                  {/* Connecting line (desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};
