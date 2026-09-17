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
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.resume': 'Resume',
    'nav.courses': 'Courses',
    'nav.skills': 'Tools & Skills',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Services',
    'nav.contact': 'Contact',

    // Hero
    'hero.greeting': "Hello, I'm",
    'hero.name': 'Emiliano García Fuenzalida',
    'hero.title': 'UX Designer specialized in complex systems, simulation, and human behavior.',
    'hero.subtitle': 'I design experiences that improve decision-making, learning, and performance — from playful environments to high-risk scenarios.',
    'hero.cta': 'View Projects',
    'hero.contact': 'Contact',
    'hero.scroll': 'Scroll to explore',
    'hero.availability': 'Available for UX/UI and Product Design opportunities.',

    // Projects
    'projects.title': 'Case Studies',
    'projects.subtitle': 'Impact-driven work across simulation, civic tech, AI, and design systems.',
    'projects.viewProject': 'View project',
    'projects.keyInsight': 'Key Insight',
    'projects.impact': 'Impact',
    'projects.uxDecisions': 'UX Decisions',
    'projects.close': 'Close',
    'projects.filter.all': 'All',

    // How I Work
    'howIWork.title': 'How I Work',
    'howIWork.research.title': 'Research',
    'howIWork.research.desc': 'Understanding users, project context and product goals through interviews, observation, analysis and testing.',
    'howIWork.design.title': 'Design',
    'howIWork.design.desc': 'Transforming insights into wireframes, navigation flows and interface structures that simplify complex interactions.',
    'howIWork.validate.title': 'Validate',
    'howIWork.validate.desc': 'Testing experiences, gathering feedback and refining usability to ensure the solution works for real users.',
    'howIWork.build.title': 'Build',
    'howIWork.build.desc': 'Collaborating with developers or implementing interactive experiences to transform ideas into functional digital products.',

    // About
    'about.title': 'About',
    'about.description': "I'm a UX/UI designer with a background in game development, focused on crafting digital experiences that combine logic, emotion, and user-centered thinking.",
    'about.intro': "I have a strong foundation in prototyping and interface design, with hands-on experience in mobile apps, websites, games, and simulators. I use tools like Figma and Adobe XD to design clear user flows, test ideas, and communicate visual concepts effectively.",
    'about.collaboration': "My technical background allows me to collaborate smoothly with developers and multidisciplinary teams. I'm passionate about building functional, accessible, and visually consistent products, always keeping the user experience at the core.",
    'about.role': 'Developer & UI/UX Designer',
    'about.specialty': "I specialize in UX/UI design, creating intuitive interfaces and seamless user flows for apps, websites, and interactive products. With a background in game development, I bring a unique perspective to user experience, blending usability, creativity, and technical insight.",
    'about.passion': "I'm passionate about art and thrive in collaborative environments. My love for creativity drives me to bring unique visions to life, and I believe that teamwork is the key to achieving the best results.",
    'about.birthday': 'Birthday',
    'about.phone': 'Phone',
    'about.city': 'City',
    'about.age': 'Age',
    'about.degree': 'Degree',
    'about.email': 'Email',
    'about.freelance': 'Freelance',
    'about.available': 'Available',

    // Resume
    'resume.title': 'Resume',
    'resume.subtitle': '"Crafting Digital Experiences"',
    'resume.description': 'With a foundation in game development and interactive media, I bring a multidisciplinary approach to UX/UI design. My experience spans digital products, simulations, and interfaces combining user centered thinking with technical execution.',
    'resume.download': 'Download My CV',
    'resume.summary': 'Summary',
    'resume.education': 'Education',
    'resume.experience': 'Professional Experience',

    // Courses
    'courses.title': 'Courses And Certifications',
    'courses.subtitle': 'A showcase of courses I\'ve completed.',

    // Skills
    'skills.title': 'Tools & Skills',
    'skills.subtitle': 'The tools and technologies I use to design, build, and ship.',

    // Portfolio
    'portfolio.title': 'Visual Work',
    'portfolio.subtitle': 'A curated selection of design work across branding, illustration and interactive experiences.',

    // Services
    'services.title': 'Services',
    'services.description': 'I offer UX/UI design services focused on creating intuitive, accessible, and visually compelling digital experiences.',
    'services.webdev': 'Web Development',
    'services.webdev.desc': 'Building responsive, dynamic, and visually engaging websites tailored to your needs.',
    'services.graphic': 'Graphic Design',
    'services.graphic.desc': 'Creating captivating visual content for print and digital media, from logos to full branding.',
    'services.uxui': 'UX/UI Design',
    'services.uxui.desc': 'Designing intuitive and user-friendly interfaces that enhance the user experience.',
    'services.gamedev': 'Game Development',
    'services.gamedev.desc': 'Crafting immersive and engaging games with compelling graphics and gameplay.',
    'services.brand': 'Brand Identity Design',
    'services.brand.desc': 'Developing cohesive and memorable brand identities that resonate with your audience.',
    'services.social': 'Social Media Management',
    'services.social.desc': 'Managing your social media presence to effectively engage and grow your audience.',
    'services.interaction': 'Interaction Design',
    'services.interaction.desc': 'Designing intuitive interactions, flows and micro-interactions that improve usability.',
    'services.vrar': 'VR and AR Development',
    'services.vrar.desc': 'Creating immersive virtual and augmented reality experiences for diverse platforms.',
    'services.prototype': 'Prototyping',
    'services.prototype.desc': 'Designing interactive prototypes to visualize user flows and test functionality.',
    'services.explore': 'Explore',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': "Don't hesitate to reach out—I'd love to hear from you!",
    'contact.address': 'Address',
    'contact.call': 'Call me',
    'contact.email': 'Email Me',
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
    'landing.heroTagline': 'a ux designer crafting striking experiences for complex systems, simulation and human behavior',
    'landing.aboutBody': "I'm a UX/UI designer with a background in game development, focused on crafting digital experiences that combine logic, emotion, and user-centered thinking. My technical background lets me collaborate smoothly with developers and bring unique visions to life. Let's build something incredible together!",
    'nav.experience': 'Experience',
    'landing.education': 'Education',
    'landing.experienceTitle': 'Experience',
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
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre Mí',
    'nav.resume': 'Currículum',
    'nav.courses': 'Cursos',
    'nav.skills': 'Herramientas',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',

    // Hero
    'hero.greeting': 'Hola, soy',
    'hero.name': 'Emiliano García Fuenzalida',
    'hero.title': 'Diseñador UX especializado en sistemas complejos, simulación y comportamiento humano.',
    'hero.subtitle': 'Diseño experiencias que mejoran la toma de decisiones, el aprendizaje y el rendimiento — desde entornos lúdicos hasta escenarios de alto riesgo.',
    'hero.cta': 'Ver Proyectos',
    'hero.contact': 'Contacto',
    'hero.scroll': 'Desplázate para explorar',
    'hero.availability': 'Disponible para oportunidades de UX/UI y Product Design.',

    // Projects
    'projects.title': 'Casos de Estudio',
    'projects.subtitle': 'Trabajo orientado al impacto en simulación, civic tech, IA y sistemas de diseño.',
    'projects.viewProject': 'Ver proyecto',
    'projects.keyInsight': 'Insight Clave',
    'projects.impact': 'Impacto',
    'projects.uxDecisions': 'Decisiones UX',
    'projects.close': 'Cerrar',
    'projects.filter.all': 'Todos',

    // How I Work
    'howIWork.title': 'Cómo Trabajo',
    'howIWork.research.title': 'Investigar',
    'howIWork.research.desc': 'Comprender a los usuarios, el contexto del proyecto y los objetivos del producto a través de entrevistas, observación, análisis y pruebas.',
    'howIWork.design.title': 'Diseñar',
    'howIWork.design.desc': 'Transformar hallazgos en wireframes, flujos de navegación y estructuras de interfaz que simplifican interacciones complejas.',
    'howIWork.validate.title': 'Validar',
    'howIWork.validate.desc': 'Probar experiencias, recopilar feedback y refinar la usabilidad para asegurar que la solución funcione para usuarios reales.',
    'howIWork.build.title': 'Construir',
    'howIWork.build.desc': 'Colaborar con desarrolladores o implementar experiencias interactivas para transformar ideas en productos digitales funcionales.',

    // About
    'about.title': 'Sobre Mí',
    'about.description': 'Soy diseñador UX/UI con experiencia en desarrollo de videojuegos, enfocado en crear experiencias digitales que combinan lógica, emoción y pensamiento centrado en el usuario.',
    'about.intro': 'Tengo una sólida base en prototipado y diseño de interfaces, con experiencia práctica en aplicaciones móviles, sitios web, juegos y simuladores.',
    'about.collaboration': 'Mi formación técnica me permite colaborar fluidamente con desarrolladores y equipos multidisciplinarios.',
    'about.role': 'Desarrollador y Diseñador UI/UX',
    'about.specialty': 'Me especializo en diseño UX/UI, creando interfaces intuitivas y flujos de usuario fluidos para aplicaciones, sitios web y productos interactivos.',
    'about.passion': 'Me apasiona el arte y prospero en entornos colaborativos. Mi amor por la creatividad me impulsa a dar vida a visiones únicas.',
    'about.birthday': 'Cumpleaños',
    'about.phone': 'Teléfono',
    'about.city': 'Ciudad',
    'about.age': 'Edad',
    'about.degree': 'Título',
    'about.email': 'Email',
    'about.freelance': 'Freelance',
    'about.available': 'Disponible',

    // Resume
    'resume.title': 'Currículum',
    'resume.subtitle': '"Creando Experiencias Digitales"',
    'resume.description': 'Con una base en desarrollo de videojuegos y medios interactivos, aporto un enfoque multidisciplinario al diseño UX/UI.',
    'resume.download': 'Descargar Mi CV',
    'resume.summary': 'Resumen',
    'resume.education': 'Educación',
    'resume.experience': 'Experiencia Profesional',

    // Courses
    'courses.title': 'Cursos y Certificaciones',
    'courses.subtitle': 'Una muestra de los cursos que he completado.',

    // Skills
    'skills.title': 'Herramientas y Habilidades',
    'skills.subtitle': 'Las herramientas y tecnologías que uso para diseñar, construir y entregar.',

    // Portfolio
    'portfolio.title': 'Trabajo Visual',
    'portfolio.subtitle': 'Selección curada de trabajo en branding, ilustración y experiencias interactivas.',

    // Services
    'services.title': 'Servicios',
    'services.description': 'Ofrezco servicios de diseño UX/UI enfocados en crear experiencias digitales intuitivas, accesibles y visualmente atractivas.',
    'services.webdev': 'Desarrollo Web',
    'services.webdev.desc': 'Construyendo sitios web responsivos, dinámicos y visualmente atractivos.',
    'services.graphic': 'Diseño Gráfico',
    'services.graphic.desc': 'Creando contenido visual cautivador para medios impresos y digitales.',
    'services.uxui': 'Diseño UX/UI',
    'services.uxui.desc': 'Diseñando interfaces intuitivas y amigables que mejoran la experiencia del usuario.',
    'services.gamedev': 'Desarrollo de Videojuegos',
    'services.gamedev.desc': 'Creando juegos inmersivos y atractivos con gráficos y jugabilidad convincentes.',
    'services.brand': 'Diseño de Identidad de Marca',
    'services.brand.desc': 'Desarrollando identidades de marca cohesivas y memorables.',
    'services.social': 'Gestión de Redes Sociales',
    'services.social.desc': 'Gestionando tu presencia en redes sociales.',
    'services.interaction': 'Diseño de Interacción',
    'services.interaction.desc': 'Diseñando interacciones intuitivas que mejoran la usabilidad.',
    'services.vrar': 'Desarrollo VR y AR',
    'services.vrar.desc': 'Creando experiencias inmersivas de realidad virtual y aumentada.',
    'services.prototype': 'Prototipado',
    'services.prototype.desc': 'Diseñando prototipos interactivos para visualizar flujos de usuario.',
    'services.explore': 'Explorar',

    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': '¡No dudes en contactarme—me encantaría saber de ti!',
    'contact.address': 'Dirección',
    'contact.call': 'Llámame',
    'contact.email': 'Escríbeme',
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
    'landing.heroTagline': 'diseñador ux creando experiencias impactantes para sistemas complejos, simulación y comportamiento humano',
    'landing.aboutBody': 'Soy diseñador UX/UI con experiencia en desarrollo de videojuegos, enfocado en crear experiencias digitales que combinan lógica, emoción y pensamiento centrado en el usuario. Mi formación técnica me permite colaborar fluidamente con desarrolladores y dar vida a visiones únicas. ¡Construyamos algo increíble juntos!',
    'nav.experience': 'Experiencia',
    'landing.education': 'Educación',
    'landing.experienceTitle': 'Experiencia',
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
