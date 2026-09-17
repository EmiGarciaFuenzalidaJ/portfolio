import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { toast } from '@/components/ui/sonner';
import { MapPin, Phone, Mail, Download, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('emigarciafuenzalida@gmail.com');
      toast('Email copied', {
        description: 'emigarciafuenzalida@gmail.com',
      });
    } catch {
      toast('Could not copy email', {
        description: 'emigarciafuenzalida@gmail.com',
      });
    }
  };


  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.address'),
      value: 'Mendoza, Argentina',
    },
    {
      icon: Phone,
      label: t('contact.call'),
      value: '+54 2612513302',
      href: 'https://wa.me/5492612513302',
      external: true,
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'emigarciafuenzalida@gmail.com',
      action: handleCopyEmail,
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/emigarciafuenzalida',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/EmiGarciaFuenzalidaJ',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'ArtStation',
      href: 'https://www.artstation.com/emigarciafuenzalida',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-3.193a2.42 2.42 0 0 0-.531-1.517L15.87 1.544a2.42 2.42 0 0 0-2.105-1.216h-4.074l10.332 17.899 2.454-4.251a2.41 2.41 0 0 0 .523-1.446zM8.611 13.569L4.571 6.608.019 14.53h8.592z"/>
        </svg>
      ),
    },
    {
      name: 'Behance',
      href: 'https://www.behance.net/emigarciafuenzalida',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-32 relative bg-secondary/20">
      <div className="section-container">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4 text-sm md:text-base">
            {t('contact.subtitle')}
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <div className="glass rounded-2xl p-6 text-center card-hover h-full group cursor-pointer">
                  <span className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </span>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">
                    {info.label}
                  </h3>
                  <p className="font-display font-medium text-sm break-all group-hover:text-primary transition-colors">
                    {info.value}
                  </p>
                  {(info.href || info.action) && (
                    <ExternalLink className="w-4 h-4 mx-auto mt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              );

              return (
                <AnimatedSection 
                  key={info.label} 
                  animation="scale-in" 
                  delay={index * 100}
                >
                  {info.href ? (
                    <a href={info.href} className="block h-full" {...(info.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {content}
                    </a>
                  ) : info.action ? (
                    <button type="button" onClick={info.action} className="block h-full w-full text-left">
                      {content}
                    </button>
                  ) : (
                    content
                  )}
                </AnimatedSection>
              );
            })}
          </div>

          {/* Download CV */}
          <AnimatedSection animation="fade-up" delay={300} className="text-center mb-12">
            <a 
              href="/Emiliano-Garcia-Fuenzalida-UX-UI-Designer-CV-EN.pdf" 
              download 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base md:text-lg rounded-full bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <Download className="w-4 h-4" />
              {t('contact.downloadCV')}
            </a>
          </AnimatedSection>

          {/* Social Links */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group"
                  title={social.name}
                >
                  <span className="transform group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Quote */}
          <AnimatedSection animation="fade-up" delay={500} className="mt-16 text-center">
            <p className="text-lg md:text-2xl font-display font-light italic text-muted-foreground px-4">
              {t('contact.quote')}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-border/50">
        <div className="section-container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emiliano García Fuenzalida. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};
