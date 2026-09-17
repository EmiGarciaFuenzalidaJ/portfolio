import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SnowEffect } from '@/components/SnowEffect';
import { ChevronDown, MessageCircle } from 'lucide-react';
import heroBackground from '@/assets/portfolio/MiAmorBosque.jpg';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground}
          alt="Forest background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
      </div>

      {/* Snow Effect */}
      <SnowEffect />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Small greeting */}
        <p className="text-primary font-medium mb-6 animate-fade-up opacity-0 drop-shadow-lg text-xs sm:text-sm uppercase tracking-[0.3em]" style={{ animationDelay: '200ms' }}>
          {t('hero.greeting')}
        </p>
        
        {/* Big editorial name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-8 animate-fade-up opacity-0 drop-shadow-lg leading-[0.95] tracking-tight" style={{ animationDelay: '400ms' }}>
          <span className="gradient-text">{t('hero.name')}</span>
        </h1>

        {/* Title — large and impactful */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 mb-4 animate-fade-up opacity-0 drop-shadow-lg font-display font-medium leading-relaxed max-w-3xl mx-auto" style={{ animationDelay: '600ms' }}>
          {t('hero.title')}
        </p>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up opacity-0 drop-shadow-md leading-relaxed" style={{ animationDelay: '700ms' }}>
          {t('hero.subtitle')}
        </p>

        {/* Availability badge */}
        <div className="animate-fade-up opacity-0 mb-10" style={{ animationDelay: '750ms' }}>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary font-medium px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t('hero.availability')}
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: '800ms' }}>
          <button
            type="button"
            onClick={handleScrollToProjects}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base md:text-lg rounded-full bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {t('hero.cta')}
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>

          <a
            href="https://wa.me/5492612513302"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base md:text-lg rounded-full border-2 border-foreground/20 text-foreground font-semibold hover:bg-foreground/5 hover:border-foreground/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-foreground/20 backdrop-blur-sm"
          >
            <MessageCircle className="w-5 h-5" />
            {t('hero.contact')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 animate-fade-up opacity-0 z-20" style={{ animationDelay: '1000ms' }}>
        <span className="text-xs text-muted-foreground uppercase tracking-widest drop-shadow-md">
          {t('hero.scroll')}
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center relative overflow-hidden">
          <div className="w-1.5 h-3 bg-foreground/60 rounded-full absolute top-2 animate-scroll-mouse" />
        </div>
      </div>
    </section>
  );
};
