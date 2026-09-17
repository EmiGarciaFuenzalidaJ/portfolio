import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation

    // Hero

    // Projects
    'projects.subtitle': 'Impact-driven work across simulation, civic tech, AI, and design systems.',

    // How I Work

    // About
    'about.title': 'About',

    // Resume

    // Courses
    'courses.subtitle': 'A showcase of courses I\'ve completed.',

    // Skills
    'skills.title': 'Tools & Skills',
    'skills.subtitle': 'The tools and technologies I use to design, build, and ship.',

    // Portfolio
    'portfolio.subtitle': 'A curated selection of design work across branding, illustration and interactive experiences.',

    // Services
    'services.title': 'Services',
    'services.description': 'What I do across a product: research and interface design, design systems, conversational and immersive experiences, and the frontend to ship them.',
    'services.webdev': 'Web Development',
    'services.webdev.desc': 'Building responsive, dynamic, and visually engaging websites tailored to your needs.',
    'services.graphic': 'Graphic Design',
    'services.graphic.desc': 'Creating captivating visual content for print and digital media, from logos to full branding.',
    'services.uxui': 'UX/UI Design',
    'services.uxui.desc': 'Designing intuitive and user-friendly interfaces that enhance the user experience.',
    'services.gamedev': 'Game & Interactive Design',
    'services.gamedev.desc': 'Designing immersive interactive experiences — mechanics, interface and feel — built in Unity.',
    'services.brand': 'Brand Identity Design',
    'services.brand.desc': 'Developing cohesive and memorable brand identities that resonate with your audience.',
    'services.social': 'Social & Content Design',
    'services.social.desc': 'Designing visual content and post systems that keep a brand consistent across platforms.',
    'services.interaction': 'Interaction Design',
    'services.interaction.desc': 'Designing intuitive interactions, flows and micro-interactions that improve usability.',
    'services.vrar': 'VR and AR Development',
    'services.vrar.desc': 'Creating immersive virtual and augmented reality experiences for diverse platforms.',
    'services.prototype': 'Prototyping',
    'services.prototype.desc': 'Designing interactive prototypes to visualize user flows and test functionality.',
    'services.explore': 'Explore',

    // Contact
    'contact.subtitle': "Don't hesitate to reach out—I'd love to hear from you!",
    'contact.call': 'Call me',
    'contact.downloadCV': 'Download CV',
    'contact.quote': '"Life is just a game."',

    // Landing (spotlight redesign)
    'landing.contactMe': 'Contact Me',
    'landing.liveProject': 'Live Project',
    'landing.fullCase': 'Full Case Study',
    'landing.problem': 'Problem',
    'landing.solution': 'Solution',
    'landing.impact': 'Impact',
    'landing.insight': 'Key Insight',
    'landing.process': 'UX Process',
    'landing.decisions': 'UX Decisions',
    'landing.close': 'Close',
    'landing.heroTagline': 'a ux designer crafting striking experiences for ai, simulation and human behavior',
    'landing.aboutBody': "I'm a UX/UI designer with a background in game development, focused on crafting digital experiences that combine logic, emotion, and user-centered thinking. My technical background lets me collaborate smoothly with developers and bring unique visions to life. Let's build something incredible together!",
    'landing.viewCertificate': 'View certificate',
    'landing.about1': "I'm Emi García,",
    'landing.about2': 'a UX/UI designer',
    'landing.about3': 'with a background in game development.',
    'sh.services.eyebrow': 'What I do',
    'sh.services.title': 'Services &',
    'sh.services.accent': 'capabilities',
    'sh.projects.eyebrow': 'Selected Work',
    'sh.projects.title': 'Featured',
    'sh.projects.accent': 'projects',
    'sh.exp.eyebrow': 'Background',
    'sh.exp.title': 'Professional',
    'sh.exp.accent': 'journey',
    'sh.edu.title': 'Education &',
    'sh.edu.accent': 'learning',
    'sh.courses.eyebrow': 'Certifications',
    'sh.courses.title': 'Courses &',
    'sh.courses.accent': 'certificates',
    'sh.visual.eyebrow': 'Playground',
    'sh.visual.title': 'Visual',
    'sh.visual.accent': 'playground',
    'landing.marquee': "LET'S WORK TOGETHER",
    'landing.sayHi': 'Say hi',
    'landing.available': 'Available for projects',
    'landing.view': 'View',
    'services.ai': 'AI & Automation',
    'services.ai.desc': 'Designing AI chatbot identities and conversational UX, shipping n8n workflow automations and AI agents that optimize real business processes.',
    'services.pm': 'Project Management',
    'services.pm.desc': 'Planning and leading design and development projects with agile methodologies — scope, risk, timelines and stakeholder communication, backed by the Google Project Management certificate.',
    'sh.toolkit.title': 'Tools &',
    'sh.toolkit.accent': 'stack',
  },
  es: {
    // Navigation

    // Hero

    // Projects
    'projects.subtitle': 'Trabajo orientado al impacto en simulación, civic tech, IA y sistemas de diseño.',

    // How I Work

    // About
    'about.title': 'Sobre Mí',

    // Resume

    // Courses
    'courses.subtitle': 'Una muestra de los cursos que he completado.',

    // Skills
    'skills.title': 'Herramientas y Habilidades',
    'skills.subtitle': 'Las herramientas y tecnologías que uso para diseñar, construir y entregar.',

    // Portfolio
    'portfolio.subtitle': 'Selección curada de trabajo en branding, ilustración y experiencias interactivas.',

    // Services
    'services.title': 'Servicios',
    'services.description': 'Lo que hago dentro de un producto: investigación y diseño de interfaz, design systems, experiencias conversacionales e inmersivas, y el frontend para entregarlas.',
    'services.webdev': 'Desarrollo Web',
    'services.webdev.desc': 'Construyendo sitios web responsivos, dinámicos y visualmente atractivos, a medida de tus necesidades.',
    'services.graphic': 'Diseño Gráfico',
    'services.graphic.desc': 'Creando contenido visual cautivador para medios impresos y digitales, desde logos hasta branding completo.',
    'services.uxui': 'Diseño UX/UI',
    'services.uxui.desc': 'Diseñando interfaces intuitivas y amigables que mejoran la experiencia del usuario.',
    'services.gamedev': 'Diseño de Juegos e Interactivo',
    'services.gamedev.desc': 'Diseñando experiencias interactivas inmersivas — mecánicas, interfaz y sensación — construidas en Unity.',
    'services.brand': 'Diseño de Identidad de Marca',
    'services.brand.desc': 'Desarrollando identidades de marca cohesivas y memorables que conectan con tu audiencia.',
    'services.social': 'Diseño Social y de Contenido',
    'services.social.desc': 'Diseñando contenido visual y sistemas de publicación que mantienen la marca consistente en todas las plataformas.',
    'services.interaction': 'Diseño de Interacción',
    'services.interaction.desc': 'Diseñando interacciones, flujos y micro-interacciones intuitivas que mejoran la usabilidad.',
    'services.vrar': 'Desarrollo VR y AR',
    'services.vrar.desc': 'Creando experiencias inmersivas de realidad virtual y aumentada para diversas plataformas.',
    'services.prototype': 'Prototipado',
    'services.prototype.desc': 'Diseñando prototipos interactivos para visualizar flujos de usuario y probar funcionalidad.',
    'services.explore': 'Explorar',

    // Contact
    'contact.subtitle': '¡No dudes en contactarme—me encantaría saber de ti!',
    'contact.call': 'Llámame',
    'contact.downloadCV': 'Descargar CV',
    'contact.quote': '"La vida es solo un juego."',

    // Landing (spotlight redesign)
    'landing.contactMe': 'Contactame',
    'landing.liveProject': 'Ver Proyecto',
    'landing.fullCase': 'Caso Completo',
    'landing.problem': 'Problema',
    'landing.solution': 'Solución',
    'landing.impact': 'Impacto',
    'landing.insight': 'Insight Clave',
    'landing.process': 'Proceso UX',
    'landing.decisions': 'Decisiones UX',
    'landing.close': 'Cerrar',
    'landing.heroTagline': 'diseñador ux creando experiencias impactantes para ia, simulación y comportamiento humano',
    'landing.aboutBody': 'Soy diseñador UX/UI con experiencia en desarrollo de videojuegos, enfocado en crear experiencias digitales que combinan lógica, emoción y pensamiento centrado en el usuario. Mi formación técnica me permite colaborar fluidamente con desarrolladores y dar vida a visiones únicas. ¡Construyamos algo increíble juntos!',
    'landing.viewCertificate': 'Ver certificado',
    'landing.about1': 'Soy Emi García,',
    'landing.about2': 'diseñador UX/UI',
    'landing.about3': 'con base en desarrollo de videojuegos.',
    'sh.services.eyebrow': 'Qué hago',
    'sh.services.title': 'Servicios y',
    'sh.services.accent': 'capacidades',
    'sh.projects.eyebrow': 'Trabajo Seleccionado',
    'sh.projects.title': 'Proyectos',
    'sh.projects.accent': 'destacados',
    'sh.exp.eyebrow': 'Trayectoria',
    'sh.exp.title': 'Recorrido',
    'sh.exp.accent': 'profesional',
    'sh.edu.title': 'Educación y',
    'sh.edu.accent': 'aprendizaje',
    'sh.courses.eyebrow': 'Certificaciones',
    'sh.courses.title': 'Cursos y',
    'sh.courses.accent': 'certificados',
    'sh.visual.eyebrow': 'Playground',
    'sh.visual.title': 'Trabajo',
    'sh.visual.accent': 'visual',
    'landing.marquee': 'TRABAJEMOS JUNTOS',
    'landing.sayHi': 'Escribime',
    'landing.available': 'Disponible para proyectos',
    'landing.view': 'Ver',
    'services.ai': 'IA y Automatización',
    'services.ai.desc': 'Diseño identidades y UX conversacional para chatbots de IA, y desarrollo automatizaciones con n8n y agentes de IA que optimizan procesos reales de negocio.',
    'services.pm': 'Project Management',
    'services.pm.desc': 'Planificación y liderazgo de proyectos de diseño y desarrollo con metodologías ágiles — alcance, riesgos, tiempos y comunicación con stakeholders, respaldado por el certificado de Google Project Management.',
    'sh.toolkit.title': 'Herramientas y',
    'sh.toolkit.accent': 'stack',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'egf-language';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'es' || stored === 'en' ? stored : 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const fallbackContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => console.warn('useLanguage: LanguageProvider not found, using fallback'),
  t: (key: string) => translations['en'][key] || key,
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    console.warn('useLanguage called outside LanguageProvider — using English fallback');
    return fallbackContext;
  }
  return context;
};
