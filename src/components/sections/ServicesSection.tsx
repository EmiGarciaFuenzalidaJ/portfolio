import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { 
  Code, 
  Palette, 
  Layers, 
  Gamepad2, 
  Fingerprint, 
  MessageCircle,
  MousePointerClick,
  Glasses,
  Shapes
} from 'lucide-react';

const services = [
  {
    icon: Code,
    key: 'webdev',
    color: 'from-blue-500 to-cyan-500',
    scrollTo: '#portfolio',
  },
  {
    icon: Palette,
    key: 'graphic',
    color: 'from-pink-500 to-rose-500',
    scrollTo: '#portfolio',
  },
  {
    icon: Layers,
    key: 'uxui',
    color: 'from-primary to-accent',
    scrollTo: '#selected-ux',
  },
  {
    icon: Gamepad2,
    key: 'gamedev',
    color: 'from-purple-500 to-indigo-500',
    scrollTo: '#portfolio',
  },
  {
    icon: Fingerprint,
    key: 'brand',
    color: 'from-orange-500 to-amber-500',
    scrollTo: '#portfolio',
  },
  {
    icon: MessageCircle,
    key: 'social',
    color: 'from-green-500 to-emerald-500',
    scrollTo: '#contact',
  },
  {
    icon: MousePointerClick,
    key: 'interaction',
    color: 'from-violet-500 to-purple-500',
    scrollTo: '#how-i-work',
  },
  {
    icon: Glasses,
    key: 'vrar',
    color: 'from-red-500 to-pink-500',
    scrollTo: '#portfolio',
  },
  {
    icon: Shapes,
    key: 'prototype',
    color: 'from-teal-500 to-cyan-500',
    scrollTo: '#selected-ux',
  },
];

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 md:py-20 lg:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-64 md:w-96 h-64 md:h-96 bg-glow-gradient opacity-20" />
      
      <div className="section-container relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto px-4 text-sm md:text-base">
            {t('services.description')}
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedSection 
                key={service.key} 
                animation="scale-in" 
                delay={index * 100}
              >
                <div 
                  className="glass rounded-2xl p-5 md:p-6 card-hover group h-full cursor-pointer"
                  onClick={() => handleScrollTo(service.scrollTo)}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                    {t(`services.${service.key}`)}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`services.${service.key}.desc`)}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">{t('services.explore')}</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};
