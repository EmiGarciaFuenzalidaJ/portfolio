import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ZoomIn, ExternalLink } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// Portfolio images
import simpleApp from '@/assets/portfolio/SimpleApp.png';
import flimer from '@/assets/portfolio/Flimer.png';
import galacticMadness from '@/assets/portfolio/GalacticMadness.png';
import goodVibrations from '@/assets/portfolio/GoodVibrations.png';
import appleWatch from '@/assets/portfolio/AppleWatch.png';
import cruelDestiny from '@/assets/portfolio/CruelDestiny.jpg';
import spaceCowboy from '@/assets/portfolio/SpaceCowboy.jpg';
import bala from '@/assets/portfolio/Bala.jpg';
import coEmissions from '@/assets/portfolio/COemissions.jpg';
import linkedBanner from '@/assets/portfolio/LinkedBanner.jpg';
import peakPC from '@/assets/portfolio/PeakPC.png';
import instagramClone from '@/assets/portfolio/InstagramClone.png';
import peakMobile from '@/assets/portfolio/PeakMobile.png';
import peakTablet from '@/assets/portfolio/PeakTablet.png';
import theSilence from '@/assets/portfolio/TheSilence.jpg';
import trainIllustration from '@/assets/portfolio/TrainIllustration.jpg';
import wacomSketch from '@/assets/portfolio/WacomSketch.jpg';
import gotApp from '@/assets/portfolio/GotApp.png';
import plastic from '@/assets/portfolio/Plastic.png';
import maskACrime from '@/assets/portfolio/MaskACrime.png';

interface ProjectDetail {
  problem: string;
  problemEs: string;
  role: string;
  roleEs: string;
  process: string;
  processEs: string;
  outcome: string;
  outcomeEs: string;
}

interface PortfolioItem {
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  hoverDesc: string;
  hoverDescEs: string;
  category: string;
  tags: string[];
  image?: string;
  url?: string;
  featured?: boolean;
  detail?: ProjectDetail;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'GotApp',
    titleEs: 'GotApp',
    description:
      'A UX/UI project for a civic application focused on water management and citizen services. The design prioritizes clarity of information, accessibility and usability to help users understand and manage water-related services more easily.',
    descriptionEs:
      'Proyecto UX/UI para una aplicación ciudadana enfocada en gestión hídrica y servicios ciudadanos. El diseño prioriza claridad de información, accesibilidad y usabilidad para ayudar a los usuarios a comprender y gestionar servicios relacionados con el agua.',
    hoverDesc: 'Civic app for water management and citizen services.',
    hoverDescEs: 'App ciudadana para gestión hídrica y servicios.',
    category: 'UX/UI',
    tags: ['UX Research', 'UI Design', 'Prototyping'],
    image: gotApp,
    url: 'https://www.behance.net/gallery/229251747/GotApp-UXUI-para-app-ciudadana-de-gestion-hidrica',
    featured: true,
    detail: {
      problem: 'Citizens lacked a clear, accessible way to understand and manage water-related services.',
      problemEs: 'Los ciudadanos carecían de una forma clara y accesible para comprender y gestionar servicios hídricos.',
      role: 'UX/UI Designer — research, wireframes, prototyping and interface design.',
      roleEs: 'Diseñador UX/UI — investigación, wireframes, prototipado y diseño de interfaz.',
      process: 'User research, information architecture analysis, wireframing and iterative prototyping with usability testing.',
      processEs: 'Investigación de usuarios, análisis de arquitectura de información, wireframing y prototipado iterativo con pruebas de usabilidad.',
      outcome: 'Delivered an intuitive civic app interface that simplifies water service management for citizens.',
      outcomeEs: 'Entregué una interfaz de app ciudadana intuitiva que simplifica la gestión de servicios hídricos.',
    },
  },
  {
    title: 'Plastic Love — Flimer',
    titleEs: 'Plastic Love — Flimer',
    description:
      'Visual identity and animation work for Flimer\'s cover of the cult Japanese city-pop classic "Plastic Love". I designed the cover art and produced the full motion piece for the music video, blending retro Japanese typography, manga-inspired illustration and grainy analog textures to honor the 80s aesthetic of the original track.',
    descriptionEs:
      'Identidad visual y animación para el cover de Flimer del clásico japonés de city-pop "Plastic Love". Diseñé la portada y produje toda la pieza animada del videoclip, mezclando tipografía japonesa retro, ilustración inspirada en manga y texturas analógicas para honrar la estética ochentera del tema original.',
    hoverDesc: 'Cover art & motion design for a Plastic Love city-pop cover.',
    hoverDescEs: 'Portada y animación para un cover city-pop de Plastic Love.',
    category: 'Motion',
    tags: ['Motion', 'Illustration', 'Branding'],
    image: plastic,
    url: 'https://www.youtube.com/watch?v=PE1uqmCLiog',
    featured: true,
    detail: {
      problem: 'Translating a beloved 80s Japanese city-pop track into a fresh visual identity without losing the nostalgia that defines the song.',
      problemEs: 'Traducir un querido tema japonés de city-pop de los 80 a una identidad visual fresca sin perder la nostalgia que define la canción.',
      role: 'Art direction, cover artwork and full motion design for the music video.',
      roleEs: 'Dirección de arte, ilustración de portada y diseño completo de animación para el videoclip.',
      process: 'Visual research on 80s Japanese city-pop, manga inking and grainy analog textures. Frame-by-frame motion built around the song\'s rhythm and lyrics.',
      processEs: 'Investigación visual sobre city-pop japonés de los 80, entintado manga y texturas analógicas. Animación cuadro por cuadro construida alrededor del ritmo y la letra del tema.',
      outcome: 'Delivered a cohesive cover and animated music video that pays homage to the original while giving Flimer a strong, recognisable visual signature.',
      outcomeEs: 'Entregué una portada cohesiva y un videoclip animado que rinde homenaje al original a la vez que le da a Flimer una firma visual fuerte y reconocible.',
    },
  },
  {
    title: 'Mask A Crime',
    titleEs: 'Mask A Crime',
    description:
      'Complete visual design for "Mask A Crime", a noir investigation game published on itch.io. I was in charge of the full art direction: logo, key art, in-game assets, UI and promotional materials, building a dark crime-scene aesthetic with strong red accents and cinematic typography.',
    descriptionEs:
      'Diseño visual completo de "Mask A Crime", un juego de investigación noir publicado en itch.io. Estuve a cargo de toda la dirección de arte: logo, key art, assets in-game, UI y materiales promocionales, construyendo una estética oscura de escena del crimen con fuertes acentos rojos y tipografía cinematográfica.',
    hoverDesc: 'Full art direction & assets for a noir investigation game.',
    hoverDescEs: 'Dirección de arte y assets para un juego de investigación noir.',
    category: 'Game Design',
    tags: ['Game Design', 'Illustration', 'Branding'],
    image: maskACrime,
    url: 'https://akiosvega.itch.io/mask-a-crime',
    featured: true,
    detail: {
      problem: 'A small indie team needed a strong, cohesive visual identity that could carry a crime-investigation narrative across menus, gameplay and marketing.',
      problemEs: 'Un pequeño equipo indie necesitaba una identidad visual fuerte y cohesiva capaz de sostener una narrativa de investigación criminal en menús, gameplay y marketing.',
      role: 'Lead designer — logo, key art, in-game assets, UI and promotional pieces.',
      roleEs: 'Diseñador principal — logo, key art, assets in-game, UI y piezas promocionales.',
      process: 'Mood-board research on noir cinema and crime-scene photography, definition of a dark palette with red accents, and production of every visual asset shipped with the game.',
      processEs: 'Investigación de mood-board sobre cine noir y fotografía forense, definición de una paleta oscura con acentos rojos y producción de todos los assets visuales del juego.',
      outcome: 'Shipped on itch.io with a fully unified visual language across game, UI and marketing — strengthening the noir atmosphere players engage with.',
      outcomeEs: 'Publicado en itch.io con un lenguaje visual totalmente unificado entre juego, UI y marketing — reforzando la atmósfera noir con la que interactúan los jugadores.',
    },
  },
  {
    title: 'Simple App',
    titleEs: 'App Simple',
    description: 'Mockup for a mobile login application with nature-inspired UI design',
    descriptionEs: 'Mockup para una aplicación de login móvil con diseño UI inspirado en la naturaleza',
    hoverDesc: 'Nature-inspired mobile login UI mockup.',
    hoverDescEs: 'Mockup de login móvil con estética natural.',
    category: 'UX/UI',
    tags: ['UI Design'],
    image: simpleApp,
  },
  {
    title: 'Flimer Logo',
    titleEs: 'Logo Flimer',
    description: 'Complete brand identity and logo system for Flimer',
    descriptionEs: 'Identidad de marca completa y sistema de logos para Flimer',
    hoverDesc: 'Brand identity and logo system.',
    hoverDescEs: 'Identidad de marca y sistema de logos.',
    category: 'Branding',
    tags: ['Branding'],
    image: flimer,
  },
  {
    title: 'Galactic Madness',
    titleEs: 'Locura Galáctica',
    description: 'Artwork and promotional design for a music single',
    descriptionEs: 'Arte y diseño promocional para un single musical',
    hoverDesc: 'Promotional artwork for a music single.',
    hoverDescEs: 'Arte promocional para single musical.',
    category: 'Illustration',
    tags: ['Illustration'],
    image: galacticMadness,
  },
  {
    title: 'Good Vibrations',
    titleEs: 'Buenas Vibraciones',
    description: 'Retro-futuristic artwork for a music release',
    descriptionEs: 'Arte retro-futurista para un lanzamiento musical',
    hoverDesc: 'Retro-futuristic album artwork.',
    hoverDescEs: 'Arte retro-futurista para álbum.',
    category: 'Illustration',
    tags: ['Illustration'],
    image: goodVibrations,
  },
  {
    title: 'Apple Watch Mockup',
    titleEs: 'Mockup Apple Watch',
    description: 'Realistic Apple Watch Ultra mockup with incoming call UI',
    descriptionEs: 'Mockup realista de Apple Watch Ultra con UI de llamada entrante',
    hoverDesc: 'Apple Watch UI with incoming call screen.',
    hoverDescEs: 'UI de Apple Watch con pantalla de llamada.',
    category: 'UX/UI',
    tags: ['UI Design'],
    image: appleWatch,
  },
  {
    title: 'Peak Page PC',
    titleEs: 'Página Peak PC',
    description: 'Desktop mockup for Summit Quest mountain expedition website',
    descriptionEs: 'Mockup desktop para sitio web de expediciones de montaña Summit Quest',
    hoverDesc: 'Desktop website for mountain expeditions.',
    hoverDescEs: 'Sitio web desktop para expediciones de montaña.',
    category: 'Web Design',
    tags: ['Web Design', 'UI Design'],
    image: peakPC,
    featured: true,
    detail: {
      problem: 'The expedition company needed a compelling web presence to attract adventurers.',
      problemEs: 'La empresa de expediciones necesitaba una presencia web atractiva para atraer aventureros.',
      role: 'UI Designer — visual design, layout and responsive structure.',
      roleEs: 'Diseñador UI — diseño visual, layout y estructura responsive.',
      process: 'Visual research, layout exploration and high-fidelity mockup creation across breakpoints.',
      processEs: 'Investigación visual, exploración de layout y creación de mockups de alta fidelidad en múltiples breakpoints.',
      outcome: 'Delivered a visually striking responsive website design that communicates adventure and trust.',
      outcomeEs: 'Entregué un diseño web responsive visualmente impactante que comunica aventura y confianza.',
    },
  },
  {
    title: 'Peak Page Mobile',
    titleEs: 'Página Peak Móvil',
    description: 'Mobile responsive version of Summit Quest website',
    descriptionEs: 'Versión móvil responsive del sitio web Summit Quest',
    hoverDesc: 'Responsive mobile version of Summit Quest.',
    hoverDescEs: 'Versión móvil responsive de Summit Quest.',
    category: 'UX/UI',
    tags: ['UI Design', 'Responsive'],
    image: peakMobile,
  },
  {
    title: 'Peak Page Tablet',
    titleEs: 'Página Peak Tablet',
    description: 'Tablet version of Summit Quest website on iPad',
    descriptionEs: 'Versión tablet del sitio web Summit Quest en iPad',
    hoverDesc: 'Tablet-optimized Summit Quest layout.',
    hoverDescEs: 'Layout optimizado para tablet de Summit Quest.',
    category: 'UX/UI',
    tags: ['UI Design', 'Responsive'],
    image: peakTablet,
  },
  {
    title: 'Instagram Clone',
    titleEs: 'Clon de Instagram',
    description: 'Instagram clone UI showcasing mountain photography content',
    descriptionEs: 'UI clon de Instagram mostrando contenido de fotografía de montaña',
    hoverDesc: 'Instagram-style UI with mountain photography.',
    hoverDescEs: 'UI estilo Instagram con fotografía de montaña.',
    category: 'UX/UI',
    tags: ['UI Design'],
    image: instagramClone,
  },
  {
    title: 'CO2 Emissions Data Visualization',
    titleEs: 'Visualización de Emisiones CO2',
    description: 'Infographic showing CO2 emissions per country with curved lines and circle charts',
    descriptionEs: 'Infografía mostrando emisiones de CO2 por país con líneas curvas y gráficos circulares',
    hoverDesc: 'Data visualization of global CO2 emissions.',
    hoverDescEs: 'Visualización de datos de emisiones globales de CO2.',
    category: 'Data Viz',
    tags: ['Data Viz', 'Information Design'],
    image: coEmissions,
  },
  {
    title: 'Lucky Shot',
    titleEs: 'Lucky Shot',
    description: 'Cartoon-style character illustration with vintage aesthetic',
    descriptionEs: 'Ilustración de personajes estilo cartoon con estética vintage',
    hoverDesc: 'Vintage cartoon-style character design.',
    hoverDescEs: 'Diseño de personaje cartoon estilo vintage.',
    category: 'Illustration',
    tags: ['Illustration'],
    image: bala,
  },
  {
    title: 'Cruel Destiny',
    titleEs: 'Destino Cruel',
    description: 'Dark illustration of a broken glass eye for a book cover',
    descriptionEs: 'Ilustración oscura de un ojo de cristal roto para portada de libro',
    hoverDesc: 'Dark book cover illustration.',
    hoverDescEs: 'Ilustración oscura para portada de libro.',
    category: 'Illustration',
    tags: ['Illustration'],
    image: cruelDestiny,
  },
  {
    title: 'Space Cowboy',
    titleEs: 'Vaquero Espacial',
    description: 'Cowboy Bebop inspired fanart illustration',
    descriptionEs: 'Ilustración fanart inspirada en Cowboy Bebop',
    hoverDesc: 'Cowboy Bebop-inspired fanart.',
    hoverDescEs: 'Fanart inspirado en Cowboy Bebop.',
    category: 'Illustration',
    tags: ['Illustration'],
    image: spaceCowboy,
  },
  {
    title: 'The Silence',
    titleEs: 'El Silencio',
    description: 'Digital illustration of a rainy night scene with moonlight',
    descriptionEs: 'Ilustración digital de una escena nocturna lluviosa con luz de luna',
    hoverDesc: 'Atmospheric rainy night scene.',
    hoverDescEs: 'Escena nocturna lluviosa atmosférica.',
    category: 'Illustration',
    tags: ['Illustration'],
    image: theSilence,
  },
  {
    title: 'Night Train',
    titleEs: 'Tren Nocturno',
    description: 'Atmospheric illustration of solitude in a city train at night',
    descriptionEs: 'Ilustración atmosférica de soledad en un tren de ciudad por la noche',
    hoverDesc: 'Solitude in a city train at night.',
    hoverDescEs: 'Soledad en un tren de ciudad nocturno.',
    category: 'Illustration',
    tags: ['Illustration'],
    image: trainIllustration,
  },
  {
    title: 'Wacom Sketch',
    titleEs: 'Boceto Wacom',
    description: 'Minimalist ink-style portrait sketch drawn with Wacom tablet',
    descriptionEs: 'Boceto de retrato estilo tinta minimalista dibujado con tableta Wacom',
    hoverDesc: 'Minimalist ink portrait with Wacom tablet.',
    hoverDescEs: 'Retrato en tinta minimalista con tableta Wacom.',
    category: 'Illustration',
    tags: ['Illustration'],
    image: wacomSketch,
  },
  {
    title: 'LinkedIn Banner',
    titleEs: 'Banner de LinkedIn',
    description: 'Isometric pixel art banner design for LinkedIn profile',
    descriptionEs: 'Diseño de banner pixel art isométrico para perfil de LinkedIn',
    hoverDesc: 'Isometric pixel art LinkedIn banner.',
    hoverDescEs: 'Banner LinkedIn con pixel art isométrico.',
    category: 'Branding',
    tags: ['Branding', 'Illustration'],
    image: linkedBanner,
  },
];

export const PortfolioSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [selectedItem]);

  return (
    <section id="portfolio" className="py-16 md:py-20 lg:py-32 relative bg-secondary/20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">{t('portfolio.title')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4 text-sm md:text-base">
            {t('portfolio.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {portfolioItems.map((item, index) => (
            <AnimatedSection key={item.title} animation="scale-in" delay={index * 50}>
              <div
                className={`group relative aspect-[4/3] bg-card cursor-pointer rounded-xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 shine ${
                  item.featured
                    ? 'border-primary/40 ring-1 ring-primary/20'
                    : 'border-border/50 hover:border-primary/30'
                }`}
                onClick={() => setSelectedItem(item)}
              >
                {item.featured && (
                  <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold uppercase tracking-wider">
                    Featured
                  </div>
                )}

                {item.image ? (
                  <img
                    src={item.image}
                    alt={language === 'en' ? item.title : item.titleEs}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-display font-bold text-primary/30">
                      {item.title.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-display font-semibold text-sm md:text-base mb-1">
                    {language === 'en' ? item.title : item.titleEs}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {language === 'en' ? item.hoverDesc : item.hoverDescEs}
                  </p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-xs font-medium mt-1.5 hover:gap-2 transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {language === 'en' ? 'View Project' : 'Ver Proyecto'} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 z-10">
                  <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="w-[96vw] max-w-6xl h-[90vh] sm:h-[88vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20 animate-in zoom-in-95 duration-300">
          <VisuallyHidden>
            <DialogTitle>{selectedItem && (language === 'en' ? selectedItem.title : selectedItem.titleEs)}</DialogTitle>
            <DialogDescription>{selectedItem && (language === 'en' ? selectedItem.description : selectedItem.descriptionEs)}</DialogDescription>
          </VisuallyHidden>

          {selectedItem && (
            <div className="flex h-full min-h-0 flex-col lg:flex-row">
              <div className="flex h-64 sm:h-80 lg:h-full lg:w-[58%] shrink-0 items-center justify-center border-b border-border/50 bg-card/60 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                <img
                  src={selectedItem.image}
                  alt={language === 'en' ? selectedItem.title : selectedItem.titleEs}
                  className="max-h-full w-full object-contain animate-in fade-in zoom-in-95 duration-500"
                />
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedItem.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs text-primary font-medium">{selectedItem.category}</span>

                  <h3 className="font-display font-bold text-xl sm:text-2xl mt-2">
                    {language === 'en' ? selectedItem.title : selectedItem.titleEs}
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
                    {language === 'en' ? selectedItem.description : selectedItem.descriptionEs}
                  </p>

                  {selectedItem.detail && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/50">
                      <div>
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                          {language === 'en' ? 'Problem' : 'Problema'}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {language === 'en' ? selectedItem.detail.problem : selectedItem.detail.problemEs}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                          {language === 'en' ? 'Role' : 'Rol'}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {language === 'en' ? selectedItem.detail.role : selectedItem.detail.roleEs}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                          {language === 'en' ? 'Process' : 'Proceso'}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {language === 'en' ? selectedItem.detail.process : selectedItem.detail.processEs}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                          {language === 'en' ? 'Outcome' : 'Resultado'}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {language === 'en' ? selectedItem.detail.outcome : selectedItem.detail.outcomeEs}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedItem.url && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary text-sm font-medium mt-5 hover:gap-2.5 transition-all duration-300"
                    >
                      {language === 'en' ? 'View Project' : 'Ver Proyecto'} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};