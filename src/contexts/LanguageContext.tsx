import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Exported so the i18n test can assert every referenced key resolves.
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar labels. These are read as t(item.key) from an array, not as
    // literals, so a usage scan that only looks for t('…') will not see them.
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.courses': 'Courses',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'resume.projectsInRole': 'Projects in this role',
    'resume.project': 'project',
    'visual.showAll': 'See all work',
    'visual.showLess': 'Show less',
    'courses.prev': 'Previous certificates',
    'courses.next': 'Next certificates',
    'courses.hint': 'Drag, swipe or use the arrows · click to view',
    'resume.projects': 'projects',
    'info.label': 'At a glance',
    'info.statement': "I design digital products from user research to a working interface. Lately that means AI backoffices, voice agents and data tools; before that, XR training simulators. I prototype in Figma or straight in code, whichever answers the question faster.",
    'info.designer': 'Designer',
    'info.based': 'Based in',
    'info.focus': 'Focus',
    'info.focusValue': 'AI products · Data & BI · Design systems',
    'info.certified': 'Certified',
    'info.status': 'Status',
    'info.mode': 'Remote, or hybrid in Mendoza',
    'info.connect': 'Connect',
    'services.col.design': 'Design & Product',
    'services.col.tech': 'AI & Development',
    'services.col.brand': 'Brand & Visual',
    // Navigation

    // Hero

    // Projects
    'projects.subtitle': "Seven case studies across AI products, e-commerce, civic tech, simulation and design systems — each with its problem, decisions and results.",

    // How I Work

    // About
    'about.title': 'About',

    // Resume

    // Courses
    'courses.subtitle': "Twenty courses and certifications, from Google UX Design to Unity and full-stack development.",

    // Skills
    'skills.title': 'Tools & Skills',
    'skills.subtitle': 'The tools and technologies I use to design, build, and ship.',

    // Portfolio
    'portfolio.subtitle': 'A curated selection of design work across branding, illustration and interactive experiences.',

    // Services
    'services.title': 'Services',
    'services.description': 'What I do across a product: research and interface design, design systems, conversational and immersive experiences, and the frontend to ship them.',
    'services.webdev': 'Web Development',
    'services.webdev.desc': "Responsive front ends in React. I implement my own designs, so nothing is lost between the mockup and production.",
    'services.graphic': 'Graphic Design',
    'services.graphic.desc': "Visual pieces for print and digital: logos, key art, cover artwork and promotional material.",
    'services.uxui': 'UX/UI Design',
    'services.uxui.desc': "End-to-end UX/UI for web and mobile products: research, information architecture, flows and high-fidelity interfaces, validated with users before they are built.",
    'services.gamedev': 'Game & Interactive Design',
    'services.gamedev.desc': 'Designing immersive interactive experiences — mechanics, interface and feel — built in Unity.',
    'services.brand': 'Brand Identity Design',
    'services.brand.desc': "Brand identities built as systems — logo, colour, type and usage rules — so the brand stays consistent wherever it appears.",
    'services.social': 'Social & Content Design',
    'services.social.desc': 'Designing visual content and post systems that keep a brand consistent across platforms.',
    'services.interaction': 'Interaction Design',
    'services.interaction.desc': "Flows, states and micro-interactions defined in detail — including the empty, loading and error cases — so the product behaves as well as it looks.",
    'services.vrar': 'VR and AR Development',
    'services.vrar.desc': "AR and VR training experiences in Unity: evacuation, first-aid and road-safety simulators designed around measurable learning outcomes.",
    'services.prototype': 'Prototyping',
    'services.prototype.desc': "Interactive prototypes in Figma or directly in code (HTML, React), fast enough to test an idea with real users within days.",
    'services.explore': 'Explore',

    // Contact
    'contact.subtitle': 'Open to new projects and roles. Email is the fastest way to reach me.',
    'contact.call': "WhatsApp",
    'contact.rights': "All rights reserved.",
    'contact.copyFailed': "Could not copy the email",
    'contact.copied': "Email copied",
    'contact.downloadCV': 'Download CV',
    'contact.quote': '"Life is just a game."',

    // Landing (spotlight redesign)
    'landing.contactMe': 'Contact Me',
    'landing.liveProject': 'Live Project',
    'landing.fullCase': 'Full Case Study',
    'landing.problem': 'Problem',
    'landing.solution': 'Solution',
    'landing.impact': 'Impact',
    'landing.scope': 'Scope',
    'landing.insight': 'Key Insight',
    'landing.process': 'UX Process',
    'landing.decisions': 'UX Decisions',
    'landing.close': 'Close',
    'landing.heroTagline': "ux/ui designer — research, interface and code for ai products, data tools and simulation",
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
    'sh.edu.eyebrow': "Education",
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
    'landing.marquee': "Let's work together.",
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
    // Navbar labels. These are read as t(item.key) from an array, not as
    // literals, so a usage scan that only looks for t('…') will not see them.
    'nav.services': 'Servicios',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.courses': 'Cursos',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contacto',
    'resume.projectsInRole': 'Proyectos en este puesto',
    'resume.project': 'proyecto',
    'visual.showAll': 'Ver todo el trabajo',
    'visual.showLess': 'Ver menos',
    'courses.prev': 'Certificados anteriores',
    'courses.next': 'Certificados siguientes',
    'courses.hint': 'Arrastrá, deslizá o usá las flechas · clic para ver',
    'resume.projects': 'proyectos',
    'info.label': 'De un vistazo',
    'info.statement': "Diseño productos digitales desde la investigación con usuarios hasta una interfaz funcionando. Últimamente son backoffices con IA, agentes de voz y herramientas de datos; antes, simuladores de capacitación en XR. Prototipo en Figma o directamente en código, lo que responda la pregunta más rápido.",
    'info.designer': 'Diseñador',
    'info.based': 'Ubicación',
    'info.focus': 'Foco',
    'info.focusValue': 'Productos con IA · Datos y BI · Design systems',
    'info.certified': 'Certificaciones',
    'info.status': 'Estado',
    'info.mode': 'Remoto, o híbrido en Mendoza',
    'info.connect': 'Contacto',
    'services.col.design': 'Diseño y producto',
    'services.col.tech': 'IA y desarrollo',
    'services.col.brand': 'Marca y visual',
    // Navigation

    // Hero

    // Projects
    'projects.subtitle': "Siete casos en productos con IA, e-commerce, civic tech, simulación y sistemas de diseño — cada uno con su problema, decisiones y resultados.",

    // How I Work

    // About
    'about.title': 'Sobre Mí',

    // Resume

    // Courses
    'courses.subtitle': "Veinte cursos y certificaciones, de Google UX Design a Unity y desarrollo full stack.",

    // Skills
    'skills.title': 'Herramientas y Habilidades',
    'skills.subtitle': 'Las herramientas y tecnologías que uso para diseñar, construir y entregar.',

    // Portfolio
    'portfolio.subtitle': 'Selección curada de trabajo en branding, ilustración y experiencias interactivas.',

    // Services
    'services.title': 'Servicios',
    'services.description': 'Lo que hago dentro de un producto: investigación y diseño de interfaz, design systems, experiencias conversacionales e inmersivas, y el frontend para entregarlas.',
    'services.webdev': 'Desarrollo Web',
    'services.webdev.desc': "Front ends responsivos en React. Implemento mis propios diseños, así nada se pierde entre el mockup y producción.",
    'services.graphic': 'Diseño Gráfico',
    'services.graphic.desc': "Piezas visuales para impresión y digital: logos, key art, arte de tapa y material promocional.",
    'services.uxui': 'Diseño UX/UI',
    'services.uxui.desc': "UX/UI de punta a punta para productos web y mobile: investigación, arquitectura de información, flujos e interfaces en alta fidelidad, validadas con usuarios antes de construirlas.",
    'services.gamedev': 'Diseño de Juegos e Interactivo',
    'services.gamedev.desc': 'Diseñando experiencias interactivas inmersivas — mecánicas, interfaz y sensación — construidas en Unity.',
    'services.brand': 'Diseño de Identidad de Marca',
    'services.brand.desc': "Identidades de marca pensadas como sistema — logo, color, tipografía y reglas de uso — para que la marca se mantenga consistente donde aparezca.",
    'services.social': 'Diseño Social y de Contenido',
    'services.social.desc': 'Diseñando contenido visual y sistemas de publicación que mantienen la marca consistente en todas las plataformas.',
    'services.interaction': 'Diseño de Interacción',
    'services.interaction.desc': "Flujos, estados y microinteracciones definidos en detalle — incluidos los casos vacíos, de carga y de error — para que el producto se comporte tan bien como se ve.",
    'services.vrar': 'Desarrollo VR y AR',
    'services.vrar.desc': "Experiencias de capacitación en AR y VR con Unity: simuladores de evacuación, primeros auxilios y seguridad vial diseñados alrededor de resultados de aprendizaje medibles.",
    'services.prototype': 'Prototipado',
    'services.prototype.desc': "Prototipos interactivos en Figma o directamente en código (HTML, React), lo bastante rápidos para probar una idea con usuarios reales en días.",
    'services.explore': 'Explorar',

    // Contact
    'contact.subtitle': 'Abierto a nuevos proyectos y roles. El email es la forma más rápida de contactarme.',
    'contact.call': "WhatsApp",
    'contact.rights': "Todos los derechos reservados.",
    'contact.copyFailed': "No se pudo copiar el email",
    'contact.copied': "Email copiado",
    'contact.downloadCV': 'Descargar CV',
    'contact.quote': '"La vida es solo un juego."',

    // Landing (spotlight redesign)
    'landing.contactMe': 'Contactame',
    'landing.liveProject': 'Ver Proyecto',
    'landing.fullCase': 'Caso Completo',
    'landing.problem': 'Problema',
    'landing.solution': 'Solución',
    'landing.impact': 'Impacto',
    'landing.scope': 'Alcance',
    'landing.insight': 'Insight Clave',
    'landing.process': 'Proceso UX',
    'landing.decisions': 'Decisiones UX',
    'landing.close': 'Cerrar',
    'landing.heroTagline': "diseñador ux/ui — investigación, interfaz y código para productos con ia, datos y simulación",
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
    'sh.edu.eyebrow': "Formación",
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
    'landing.marquee': 'Trabajemos juntos.',
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
