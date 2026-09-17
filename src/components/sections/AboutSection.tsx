import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { MapPin, Phone, Mail, Briefcase, Calendar, GraduationCap, User } from 'lucide-react';
import profileImage from '@/assets/Profile.jpeg';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const personalInfo = [
    { icon: Calendar, label: t('about.birthday'), value: '6 Nov 1997' },
    { icon: Phone, label: t('about.phone'), value: '+54 2612513302' },
    { icon: MapPin, label: t('about.city'), value: 'Mendoza, Argentina' },
    { icon: User, label: t('about.age'), value: '27' },
    { icon: GraduationCap, label: t('about.degree'), value: 'Master' },
    { icon: Mail, label: t('about.email'), value: 'emigarciafuenzalida@gmail.com' },
    { icon: Briefcase, label: t('about.freelance'), value: t('about.available') },
  ];

  return (
    <section id="about" className="py-16 md:py-20 lg:py-32 relative">
      <div className="section-container">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">{t('about.title')}</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-4">
            {t('about.description')}
          </p>
        </AnimatedSection>

        {/* Main Content - Single Column Layout */}
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Profile Card */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center overflow-hidden">
                      <img 
                        src={profileImage} 
                        alt="Emiliano García Fuenzalida"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-display font-semibold text-lg sm:text-xl md:text-2xl mb-2">
                    Emiliano García Fuenzalida
                  </h3>
                  <p className="text-primary font-medium mb-3 md:mb-4">{t('about.role')}</p>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {t('about.specialty')}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Description */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </span>
                <h3 className="font-display font-semibold text-base md:text-xl">{t('about.role')}</h3>
              </div>
              
              <div className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>{t('about.intro')}</p>
                <p>{t('about.collaboration')}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Personal Info Grid */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="glass rounded-2xl p-6 md:p-8">
              <h3 className="font-display font-semibold text-base md:text-xl mb-4 md:mb-6">Personal Info</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personalInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                    >
                      <span className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] md:text-xs text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-sm truncate">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Quote */}
          <AnimatedSection animation="fade-up" delay={500}>
            <p className="text-muted-foreground italic border-l-4 border-primary pl-4 text-sm md:text-base">
              "{t('about.passion')}"
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
