import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Download, Briefcase, GraduationCap, MapPin, Calendar, Mail, Phone, User, ExternalLink } from 'lucide-react';

interface ResumeItemProps {
  title: string;
  period: string;
  location: string;
  description: string;
  projects?: Array<{ title: string; description: string; url?: string }>;
  delay?: number;
}

const ResumeItem: React.FC<ResumeItemProps> = ({ 
  title, 
  period, 
  location, 
  description, 
  projects,
  delay = 0 
}) => (
  <AnimatedSection animation="fade-up" delay={delay}>
    <div className="timeline-item group">
      <div className="glass rounded-xl p-5 sm:p-6 card-hover flex flex-col shine">
        <h4 className="font-display font-semibold text-base sm:text-lg mb-3 group-hover:text-primary transition-colors">
          {title}
        </h4>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-sm">
          <span className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded-full">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="whitespace-nowrap">{period}</span>
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{location}</span>
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        {projects && projects.length > 0 && (
          <div className="mt-4 space-y-2 pt-3 border-t border-border/50">
            {projects.map((project, idx) => (
              <div key={idx} className="pl-3 border-l-2 border-primary/30">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium text-sm text-primary mb-0.5">{project.title}</h5>
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary/60 hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </AnimatedSection>
);

export const ResumeSection: React.FC = () => {
  const { t, language } = useLanguage();

  const summaryData = {
    name: "Emi Garcia Fuenzalida",
    role: language === 'en' ? "UX/UI Designer" : "Diseñador UX/UI",
    bio: language === 'en' 
      ? "UX/UI Designer focused on crafting intuitive interfaces and meaningful user journeys. My background in interactive development enhances the way I turn ideas into functional, engaging designs."
      : "Diseñador UX/UI enfocado en crear interfaces intuitivas y experiencias de usuario significativas. Mi experiencia en desarrollo interactivo mejora la forma en que convierto ideas en diseños funcionales y atractivos.",
    location: "Godoy Cruz, Argentina",
    phone: "(+54) 2612513302",
    email: "emigarciafuenzalida@gmail.com"
  };

  const education: ResumeItemProps[] = [
    {
      title: language === 'en' ? "Google Project Management Certificate" : "Certificado de Google Project Management",
      period: "2025 - 2026",
      location: "Google, California, United States",
      description: language === 'en'
        ? "Completed the seven-course Google Project Management Professional Certificate covering project initiation, planning, execution, agile delivery, and a real-world capstone. Built solid foundations in scope, risk, stakeholder and timeline management — skills I apply directly to structured, accountable design and product workflows."
        : "Completé el Certificado Profesional de Google Project Management de siete cursos, cubriendo inicio, planificación y ejecución de proyectos, entrega ágil y un capstone basado en un caso real. Construí bases sólidas en gestión de alcance, riesgos, stakeholders y tiempos — habilidades que aplico directamente a flujos de diseño y producto más estructurados y responsables."
    },
    {
      title: language === 'en' ? "Claude Code 101 - Anthropic" : "Claude Code 101 - Anthropic",
      period: "2026",
      location: "Anthropic",
      description: language === 'en'
        ? "Completed Anthropic's Claude Code 101, learning how to leverage Claude Code for AI-assisted software development, agentic workflows and modern engineering productivity. Reinforced practices around prompt design, code review with AI, and integrating LLM agents into real product work."
        : "Completé Claude Code 101 de Anthropic, aprendiendo a aprovechar Claude Code para desarrollo de software asistido por IA, flujos agénticos y productividad de ingeniería moderna. Reforcé prácticas de diseño de prompts, revisión de código con IA e integración de agentes LLM en producto real."
    },
    {
      title: language === 'en' ? "Google UX Design Certificate" : "Certificado de Diseño UX de Google",
      period: "2025 - 2026",
      location: "Google, California, United States",
      description: language === 'en'
        ? "Earned the UX Design Certificate from Google, covering user-centered design principles, wireframing, prototyping, and usability testing. Learned to conduct user research, create user personas, and design intuitive interfaces for web and mobile applications. Applied hands-on projects to develop practical skills in creating accessible and visually appealing digital experiences that meet user needs and business goals."
        : "Obtuve el Certificado de Diseño UX de Google, cubriendo principios de diseño centrado en el usuario, wireframing, prototipado y pruebas de usabilidad. Aprendí a realizar investigación de usuarios, crear personas y diseñar interfaces intuitivas para aplicaciones web y móviles. Apliqué proyectos prácticos para desarrollar habilidades en la creación de experiencias digitales accesibles que cumplan con las necesidades del usuario y los objetivos del negocio."
    },
    {
      title: language === 'en' ? "Google Prompting Essentials" : "Fundamentos de Prompting de Google",
      period: "2025 - 2026",
      location: "Google, California, United States",
      description: language === 'en'
        ? "Completed the Prompting Essentials course by Google, learning best practices for crafting effective prompts to optimize AI interactions. Gained practical skills in structuring prompts for clarity, precision, and desired outcomes, applicable to AI tools in creative, educational, and professional contexts. Developed a strong foundation in prompt engineering and strategies to maximize AI-assisted productivity and problem-solving."
        : "Completé el curso de Fundamentos de Prompting de Google, aprendiendo mejores prácticas para crear prompts efectivos para optimizar interacciones con IA. Adquirí habilidades prácticas en estructuración de prompts para claridad, precisión y resultados deseados, aplicables a herramientas de IA en contextos creativos, educativos y profesionales. Desarrollé una base sólida en ingeniería de prompts y estrategias para maximizar la productividad asistida por IA."
    },
    {
      title: language === 'en' ? "UX/UI Design" : "Diseño UX/UI",
      period: "2024 - 2025",
      location: "UTN & Godoy Cruz, Mendoza",
      description: language === 'en'
        ? "Strengthened expertise in UX/UI design by exploring the complete design process for web and mobile platforms. Mastered the creation of user-centered interfaces, developed high-fidelity prototypes, and applied modern design systems to ensure visual consistency. Designed responsive layouts with Figma and enhanced usability through thoughtful interaction patterns aligned with current industry standards."
        : "Fortalecí mi experiencia en diseño UX/UI explorando el proceso completo de diseño para plataformas web y móvil. Dominé la creación de interfaces centradas en el usuario, desarrollé prototipos de alta fidelidad y apliqué sistemas de diseño modernos para asegurar consistencia visual. Diseñé layouts responsivos con Figma y mejoré la usabilidad mediante patrones de interacción alineados con estándares actuales de la industria."
    },
    {
      title: language === 'en' ? "Complete Web & Mobile Designer: UI/UX, Figma, +more" : "Diseñador Web y Móvil Completo: UI/UX, Figma, +más",
      period: "2023 - 2024",
      location: "Udemy",
      description: language === 'en' 
        ? "Comprehensive UX/UI design course covering mobile and web interfaces, with deep focus on user experience principles. Gained proficiency in Figma for professional prototypes, wireframes, and design systems. Explored responsive design patterns, accessibility standards, and user-centered methodologies that inform every stage from ideation through delivery."
        : "Curso integral de diseño UX/UI cubriendo interfaces móviles y web, con enfoque profundo en principios de experiencia de usuario. Adquirí dominio de Figma para prototipos profesionales, wireframes y sistemas de diseño. Exploré patrones de diseño responsivo, estándares de accesibilidad y metodologías centradas en el usuario que informan cada etapa desde la ideación hasta la entrega."
    },
    {
      title: language === 'en' ? "Human-Centered Design" : "Diseño Centrado en el Humano",
      period: "2023 - 2024",
      location: "Canva",
      description: language === 'en'
        ? "Explored the principles of human-centered design, focusing on understanding user needs, defining problems clearly, and creating solutions grounded in empathy. Strengthened skills in ideation techniques, iterative testing, and designing experiences that prioritize real user behavior and accessibility."
        : "Exploré los principios del diseño centrado en el humano, enfocándome en comprender las necesidades de los usuarios, definir problemas con claridad y crear soluciones basadas en empatía. Fortalecí habilidades en técnicas de ideación, pruebas iterativas y diseño de experiencias que priorizan el comportamiento real del usuario y la accesibilidad."
    },
    {
      title: language === 'en' ? "Graphic Design Essentials" : "Fundamentos del Diseño Gráfico",
      period: "2022 - 2023",
      location: "Canva",
      description: language === 'en'
        ? "Built a solid foundation in graphic design principles including typography, color theory, composition, and visual hierarchy. Applied these concepts to create effective layouts and visual communication materials, reinforcing the design thinking that supports strong UI and branding work."
        : "Construí una base sólida en principios de diseño gráfico incluyendo tipografía, teoría del color, composición y jerarquía visual. Apliqué estos conceptos para crear layouts efectivos y materiales de comunicación visual, reforzando el pensamiento de diseño que sustenta un buen trabajo de UI y branding."
    },
    {
      title: "Full-Stack Development",
      period: "2022 - 2023",
      location: language === 'en' ? "Egg Institute, Mendoza" : "Instituto Egg, Mendoza",
      description: language === 'en'
        ? "Intensive programming bootcamp built around cooperative methodology and team-based problem solving. Mastered frontend and backend technologies including HTML, CSS, JavaScript, Java, and SQL. Practiced agile workflows and version control with Git, reinforcing structured thinking and the ability to bridge design decisions with technical implementation."
        : "Bootcamp intensivo de programación construido alrededor de metodología cooperativa y resolución de problemas en equipo. Dominé tecnologías frontend y backend incluyendo HTML, CSS, JavaScript, Java y SQL. Practiqué flujos de trabajo ágiles y control de versiones con Git, reforzando el pensamiento estructurado y la capacidad de conectar decisiones de diseño con implementación técnica."
    },
    {
      title: language === 'en' ? "Scrum Fundamentals" : "Fundamentos de Scrum",
      period: "2021 - 2022",
      location: "ASFC",
      description: language === 'en'
        ? "Gained a solid understanding of the Scrum framework, including roles, events, and artifacts. Learned to apply agile principles to manage iterative workflows, improve team collaboration, and deliver incremental value — skills that enhance cross-functional communication in design and development projects."
        : "Adquirí una comprensión sólida del framework Scrum, incluyendo roles, eventos y artefactos. Aprendí a aplicar principios ágiles para gestionar flujos de trabajo iterativos, mejorar la colaboración en equipo y entregar valor incremental — habilidades que mejoran la comunicación multidisciplinaria en proyectos de diseño y desarrollo."
    },
    {
      title: language === 'en' ? "Bachelor's Degree in Video Game Programming - UX/UI Design" : "Licenciatura en Programación de Videojuegos - Diseño UX/UI",
      period: "2018 - 2022",
      location: "Universidad de Mendoza",
      description: language === 'en'
        ? "Four-year degree covering video game development across PC, mobile, and consoles. Built expertise in graphics, animations, and design documentation. Developed strong UX/UI skills through interface design for interactive products, learning to balance visual aesthetics with functional usability. Collaborated with programming and art teams, gaining experience in cross-disciplinary communication and iterative design."
        : "Carrera de cuatro años cubriendo desarrollo de videojuegos para PC, móvil y consolas. Construí experiencia en gráficos, animaciones y documentación de diseño. Desarrollé sólidas habilidades UX/UI a través del diseño de interfaces para productos interactivos, aprendiendo a balancear estética visual con usabilidad funcional. Colaboré con equipos de programación y arte en procesos de diseño iterativo.",
      projects: [
        {
          title: language === 'en' ? "Thesis: Video Game Demo" : "Tesis: Demo de Videojuego",
          description: language === 'en'
            ? "Project manager of a 5-person team. Led PC video game demo development. Contributed 2D design including characters, interfaces, and scenarios."
            : "Gerente de proyecto de equipo de 5 personas. Lideré desarrollo de demo de videojuego PC."
        }
      ]
    },
    {
      title: language === 'en' ? "Master's in Video Game Programming with Unity®" : "Máster en Programación de Videojuegos con Unity®",
      period: "2021 - 2022",
      location: "Udemy",
      description: language === 'en'
        ? "Comprehensive course on video game programming from scratch using Unity and C#. Developed 2D and 3D games targeting iOS, Android, PC, and Mac platforms. Covered game architecture patterns, physics systems, animation controllers, and UI implementation. Strengthened both programming skills and the ability to design engaging interactive experiences."
        : "Curso integral de programación de videojuegos desde cero usando Unity y C#. Desarrollé juegos 2D y 3D para plataformas iOS, Android, PC y Mac. Cubrí patrones de arquitectura de juegos, sistemas de física, controladores de animación e implementación de UI. Fortaleció tanto habilidades de programación como la capacidad de diseñar experiencias interactivas atractivas."
    },
    {
      title: language === 'en' ? "Psychology" : "Psicología",
      period: "2017 - 2019",
      location: "Universidad de Congreso",
      description: language === 'en'
        ? "Two years studying human behavior, cognitive processes, and research methodologies. Gained foundational knowledge in how people perceive, process, and respond to information — skills that directly inform user research, empathy mapping, and behavior-driven design decisions in UX work."
        : "Dos años estudiando comportamiento humano, procesos cognitivos y metodologías de investigación. Adquirí conocimiento fundamental sobre cómo las personas perciben, procesan y responden a la información — habilidades que informan directamente la investigación de usuarios, mapeo de empatía y decisiones de diseño basadas en comportamiento en trabajo UX."
    },
    {
      title: language === 'en' ? "Economics and Management of Organizations" : "Economía y Gestión de Organizaciones",
      period: language === 'en' ? "Graduated 2015" : "Graduado 2015",
      location: "Colegio San Luis Gonzaga",
      description: language === 'en'
        ? "Focused on economic principles, financial analysis, organizational behavior, and strategic planning. Developed analytical thinking and an understanding of how business goals and market dynamics shape product decisions — a perspective that enriches UX strategy and stakeholder communication."
        : "Enfocado en principios económicos, análisis financiero, comportamiento organizacional y planificación estratégica. Desarrollé pensamiento analítico y comprensión de cómo los objetivos de negocio y dinámicas de mercado dan forma a las decisiones de producto — una perspectiva que enriquece la estrategia UX y la comunicación con stakeholders."
    }
  ];

  const experience: ResumeItemProps[] = [
    {
      title: language === 'en' ? "UX Designer, User & AI Researcher, Frontend Developer" : "Diseñador UX, Investigador de Usuarios e IA, Frontend Developer",
      period: language === 'en' ? "2025 - Present" : "2025 - Presente",
      location: "DAIA AI, Mendoza",
      description: language === 'en'
        ? "Multi-role contributor at DAIA: design and optimize user-centered digital experiences combining research, usability and aesthetics; lead user research and AI research for in-house products such as BADI; and work as a frontend developer building production interfaces. Also design AI chatbot identities, conversational UX, and ship n8n workflow automations and AI agent solutions for business process optimization."
        : "Múltiples roles en DAIA: diseño y optimizo experiencias digitales centradas en el usuario combinando investigación, usabilidad y estética; lidero la investigación de usuarios e investigación de IA para productos internos como BADI; y trabajo como frontend developer construyendo interfaces en producción. También diseño identidades y UX conversacional para chatbots de IA, y desarrollo automatizaciones con n8n y agentes de IA para optimización de procesos de negocio.",
      projects: [
        {
          title: "BADI",
          description: language === 'en'
            ? "Voice-first companion robot for older adults. Currently leading user research and AI research, and previously contributed as frontend developer. The product is a home device, similar to Alexa but care-first, controlled entirely by voice so seniors can use it without screens."
            : "Robot acompañante por voz para adultos mayores. Actualmente lidero la investigación de usuarios y de IA, y previamente colaboré como frontend developer. El producto es un dispositivo para el hogar, parecido a Alexa pero centrado en el cuidado, controlado solo por voz para que los adultos mayores puedan usarlo sin pantallas.",
          url: "https://badi.com.ar/"
        },
        {
          title: "DAIA",
          description: language === 'en'
            ? "Corporate site for DAIA AI. Contributed to UX decisions and frontend implementation to communicate the studio's AI products and services clearly."
            : "Sitio corporativo de DAIA AI. Contribuí en decisiones UX e implementación frontend para comunicar con claridad los productos y servicios de IA del estudio.",
          url: "https://daia.com.ar/"
        },
        {
          title: "José Luis AI",
          description: language === 'en'
            ? "Conversational AI experience built on DAIA's stack. Defined the assistant's interface and tone so users can interact naturally and get useful answers fast."
            : "Experiencia de IA conversacional construida sobre el stack de DAIA. Definí la interfaz y el tono del asistente para que los usuarios interactúen con naturalidad y obtengan respuestas útiles rápido.",
          url: "https://joseluisai.daia.com.ar/"
        },
        {
          title: "Finanzas con Adrián",
          description: language === 'en'
            ? "Landing and content platform for personal-finance educator Adrián. Worked on information architecture, UI design and frontend delivery to turn classes and resources into a clear, conversion-ready experience."
            : "Landing y plataforma de contenidos para el educador de finanzas personales Adrián. Trabajé en arquitectura de información, diseño de UI y entrega frontend para convertir clases y recursos en una experiencia clara y orientada a conversión.",
          url: "https://finanzasconadrian.com/"
        },
        {
          title: "Produce First",
          description: language === 'en'
            ? "Interviews with the client revealed communication gaps and navigation problems in the existing website. Navigation testing and iterative improvements defined a clearer information structure, resulting in a more intuitive and visually improved experience."
            : "Entrevistas con el cliente revelaron problemas de comunicación y navegación en el sitio existente. Pruebas de navegación y mejoras iterativas definieron una estructura de información más clara, resultando en una experiencia más intuitiva y visualmente mejorada.",
          url: "https://www.producefirst.mx/"
        },
        {
          title: "Dagna",
          description: language === 'en'
            ? "After researching the company's insurance services and business areas, a simple landing page was designed to communicate services clearly while expanding digital reach. Direct collaboration with the client and navigation testing shaped the final result."
            : "Tras investigar los servicios de seguros y áreas de negocio de la empresa, se diseñó una landing page simple para comunicar servicios claramente y expandir el alcance digital. La colaboración directa con el cliente y pruebas de navegación dieron forma al resultado final.",
          url: "https://dagna.com.ar/"
        },
        {
          title: "Scheurer Propiedades",
          description: language === 'en'
            ? "The previous WordPress site suffered from performance issues and outdated visuals. Client interviews identified user needs and browsing behavior. The redesigned interface respected the brand's color identity while significantly improving performance and usability."
            : "El sitio WordPress anterior sufría problemas de rendimiento y visuales desactualizados. Entrevistas con el cliente identificaron necesidades de usuarios y comportamiento de navegación. La interfaz rediseñada respetó la identidad de color de la marca mientras mejoró significativamente rendimiento y usabilidad.",
          url: "https://scheurerpropiedades.com/"
        },
        {
          title: language === 'en' ? "n8n Workflow Automations" : "Automatizaciones n8n",
          description: language === 'en'
            ? "Design and implementation of automated workflows using n8n for business process optimization."
            : "Diseño e implementación de flujos de trabajo automatizados usando n8n para optimización de procesos."
        },
        {
          title: language === 'en' ? "AI Chatbot Identity & Design" : "Identidad y Diseño de Chatbots IA",
          description: language === 'en'
            ? "Brand identity design and conversational UX for AI-powered chatbots."
            : "Diseño de identidad de marca y UX conversacional para chatbots potenciados por IA."
        },
        {
          title: language === 'en' ? "AI Agent Development" : "Desarrollo de Agentes de IA",
          description: language === 'en'
            ? "Development and deployment of AI agents for automated customer service and business workflows."
            : "Desarrollo y despliegue de agentes de IA para servicio al cliente automatizado y flujos de negocio."
        }
      ]
    },
    {
      title: "AI Reviewer",
      period: language === 'en' ? "2025 - Present" : "2025 - Presente",
      location: "Outlier AI, San Francisco, USA",
      description: language === 'en'
        ? "Analyze and evaluate AI model performance to ensure accuracy, consistency, and alignment with system objectives. Specialized in reviewing AI-generated content, identifying errors, and continuously improving outcomes."
        : "Analizo y evalúo el rendimiento de modelos de IA para asegurar precisión, consistencia y alineación con objetivos del sistema."
    },
    {
      title: "UX/UI Designer",
      period: "2025",
      location: "Gotapp, Mendoza",
      description: language === 'en'
        ? "Responsible for complete user experience design. Led UX research to identify user needs, created user flows, wireframes, and high-fidelity prototypes using Figma. Developed responsive and accessible interfaces with focus on usability."
        : "Responsable del diseño completo de experiencia de usuario. Lideré investigación UX, creé flujos de usuario, wireframes y prototipos de alta fidelidad usando Figma."
    },
    {
      title: "AI Tasker",
      period: "2024 - 2025",
      location: "Outlier AI, San Francisco, USA",
      description: language === 'en'
        ? "Streamlined AI workflows by automating and managing tasks for efficient AI model training and deployment."
        : "Optimicé flujos de trabajo de IA automatizando y gestionando tareas para entrenamiento y despliegue eficiente de modelos de IA."
    },
    {
      title: language === 'en' ? "UX/UI Designer, Programmer" : "Diseñador UX/UI, Programador",
      period: "2022 - 2024",
      location: "InterBrain, Mendoza",
      description: language === 'en'
        ? "Designer and programmer at a simulator development company using Unity. Participated in all stages of development, focusing on design, UX/UI, and 3D, while collaborating in programming."
        : "Diseñador y programador en empresa de desarrollo de simuladores con Unity.",
      projects: [
        {
          title: language === 'en' ? "AR Road Safety App" : "App AR Seguridad Vial",
          description: language === 'en'
            ? "User research centered on children as the primary audience. The challenge was capturing attention while teaching road safety. Vibrant visual design combined with gamified interactions created an engaging learning experience."
            : "Investigación de usuarios centrada en niños como audiencia principal. El desafío fue captar atención mientras se enseñaba seguridad vial. Diseño visual vibrante combinado con interacciones gamificadas crearon una experiencia de aprendizaje atractiva."
        },
        {
          title: language === 'en' ? "VR Recycling Simulator" : "Simulador VR de Reciclaje",
          description: language === 'en'
            ? "Deep dive into the regional waste management process to ensure realism. Iterative testing sessions with the client and quality assurance validation shaped the final simulation."
            : "Investigación profunda del proceso de gestión de residuos regional para asegurar realismo. Sesiones de prueba iterativas con el cliente y validación de calidad dieron forma a la simulación final."
        },
        {
          title: language === 'en' ? "AR Wine Presentation" : "Presentación AR de Vinos",
          description: language === 'en'
            ? "Analysis of app users and usage context revealed problems related to reach and performance. A redesigned version solved these issues while improving accessibility across devices."
            : "El análisis de usuarios de la app y contexto de uso reveló problemas de alcance y rendimiento. Una versión rediseñada resolvió estos problemas mejorando la accesibilidad entre dispositivos."
        },
        {
          title: language === 'en' ? "Metaverse Project" : "Proyecto Metaverso",
          description: language === 'en'
            ? "Research on how users interact in VR environments identified two key challenges: motion sickness for inexperienced users and the need for intuitive floating interfaces. Wireframes and navigation wireflows redesigned the experience to improve usability."
            : "Investigación sobre cómo los usuarios interactúan en entornos VR identificó dos desafíos clave: mareos por movimiento en usuarios inexpertos y la necesidad de interfaces flotantes intuitivas. Wireframes y wireflows de navegación rediseñaron la experiencia para mejorar la usabilidad."
        },
        {
          title: language === 'en' ? "Evacuation Simulator" : "Simulador de Evacuación",
          description: language === 'en'
            ? "During testing, users became disoriented while navigating evacuation routes. Additional research on emergency signage and direct interviews helped improve spatial guidance throughout the simulation."
            : "Durante las pruebas, los usuarios se desorientaban navegando rutas de evacuación. Investigación adicional sobre señalización de emergencia y entrevistas directas ayudaron a mejorar la guía espacial."
        },
        {
          title: language === 'en' ? "Sprayer Simulator" : "Simulador de Pulverizador",
          description: language === 'en'
            ? "Class diagrams, wireframes and wireflows structured the simulation. Research involved studying real agricultural machines and correct preparation procedures. QA testing and direct collaboration with the client ensured accuracy."
            : "Diagramas de clase, wireframes y wireflows estructuraron la simulación. La investigación incluyó estudio de máquinas agrícolas reales y procedimientos de preparación correctos. Pruebas QA y colaboración directa con el cliente aseguraron precisión."
        },
        {
          title: language === 'en' ? "Interactive Primary School Space" : "Espacio Interactivo Escolar",
          description: language === 'en'
            ? "Created an engaging environment where children could explore the history of the city. Research and testing helped design a playful, interactive experience that encourages curiosity and exploration."
            : "Creé un entorno atractivo donde los niños podían explorar la historia de la ciudad. Investigación y pruebas ayudaron a diseñar una experiencia lúdica e interactiva que fomenta la curiosidad y la exploración."
        },
        {
          title: language === 'en' ? "First Aid Simulator" : "Simulador de Primeros Auxilios",
          description: language === 'en'
            ? "Extensive research including studying first aid protocols, consulting professionals, and attending CPR training sessions. The objective was creating a realistic educational simulation grounded in real-world practice."
            : "Investigación extensiva incluyendo estudio de protocolos de primeros auxilios, consulta con profesionales y asistencia a sesiones de entrenamiento de RCP. El objetivo fue crear una simulación educativa realista basada en la práctica real."
        },
        {
          title: language === 'en' ? "Project Package" : "Paquete de Proyecto",
          description: language === 'en'
            ? "Created a unified system to package the company's simulators with consistent structure and visual identity. Wireframes and sitemaps organized information and defined shared navigation. Direct collaboration with QA ensured stability and usability across all packaged applications."
            : "Creé un sistema unificado para empaquetar los simuladores de la empresa con estructura consistente e identidad visual. Wireframes y sitemaps organizaron la información y definieron navegación compartida. Colaboración directa con QA aseguró estabilidad y usabilidad en todas las aplicaciones empaquetadas."
        },
        {
          title: language === 'en' ? "VR Hilux Experience" : "Experiencia VR Hilux",
          description: language === 'en'
            ? "VR experience to showcase Hilux truck. Responsible for translations and optimization."
            : "Experiencia VR para mostrar camioneta Hilux."
        }
      ]
    },
    {
      title: language === 'en' ? "Freelance UX/UI Designer" : "Diseñador UX/UI Freelance",
      period: language === 'en' ? "2020 - Present" : "2020 - Presente",
      location: "Mendoza, Argentina",
      description: language === 'en'
        ? "Improved clarity and usability of digital products through research-driven design decisions and iterative prototyping. Delivered branding and visual identity systems, UX research and user experience analysis for websites and applications, UX/UI design for web and mobile interfaces, development and design of digital applications and interactive experiences, graphic assets and visual communication materials, and wireframing, prototyping and interface validation."
        : "Mejoré la claridad y usabilidad de productos digitales a través de decisiones de diseño basadas en investigación y prototipado iterativo. Entregué sistemas de branding e identidad visual, investigación UX y análisis de experiencia de usuario para sitios web y aplicaciones, diseño UX/UI para interfaces web y móviles, desarrollo y diseño de aplicaciones digitales y experiencias interactivas, materiales gráficos y de comunicación visual, y wireframing, prototipado y validación de interfaces.",
      projects: [
        {
          title: "Mask A Crime",
          description: language === 'en'
            ? "Lead designer for a noir investigation game published on itch.io. Owned the full art direction — logo, key art, in-game assets, UI and promotional materials — building a cohesive dark crime-scene aesthetic across product and marketing."
            : "Diseñador principal de un juego de investigación noir publicado en itch.io. Estuve a cargo de toda la dirección de arte — logo, key art, assets in-game, UI y materiales promocionales — construyendo una estética oscura de escena del crimen cohesiva entre producto y marketing.",
          url: "https://akiosvega.itch.io/mask-a-crime"
        },
        {
          title: "Plastic Love — Flimer",
          description: language === 'en'
            ? "Cover artwork and full animation for Flimer's cover of the Japanese city-pop classic 'Plastic Love'. Delivered the visual identity of the release and the motion piece used as official music video."
            : "Portada y animación completa para el cover de Flimer del clásico japonés de city-pop 'Plastic Love'. Entregué la identidad visual del lanzamiento y la pieza animada usada como videoclip oficial.",
          url: "https://www.youtube.com/watch?v=PE1uqmCLiog"
        },
        {
          title: language === 'en' ? "Branding & Identity Projects" : "Proyectos de Branding e Identidad",
          description: language === 'en'
            ? "Created cohesive visual identity systems for small businesses, improving brand recognition and digital presence."
            : "Creé sistemas de identidad visual cohesivos para pequeñas empresas, mejorando reconocimiento de marca y presencia digital."
        },
        {
          title: language === 'en' ? "UX/UI Design for Web & Mobile" : "Diseño UX/UI para Web y Móvil",
          description: language === 'en'
            ? "Designed intuitive interfaces through user research, wireframing and usability testing, delivering accessible and engaging digital experiences."
            : "Diseñé interfaces intuitivas mediante investigación de usuarios, wireframing y pruebas de usabilidad, entregando experiencias digitales accesibles y atractivas."
        }
      ]
    },
    {
      title: language === 'en' ? "Designer" : "Diseñador",
      period: language === 'en' ? "2021 - Present" : "2021 - Presente",
      location: "One Duet, Mendoza",
      description: language === 'en'
        ? "Designer for musical duo One Duet. Responsible for logo creation, brand identity, visual content and publication management across digital platforms."
        : "Diseñador para dúo musical One Duet. Responsable de creación de logo, identidad de marca, contenido visual y gestión de publicaciones en plataformas digitales."
    },
    {
      title: language === 'en' ? "Designer" : "Diseñador",
      period: "2021 - 2022",
      location: language === 'en' ? "Municipality of Godoy Cruz" : "Municipalidad de Godoy Cruz",
      description: language === 'en'
        ? "Directorate of Innovation and Technological Development. Created graphic pieces using Adobe Illustrator, from logos to promotional materials. Designed web interfaces ensuring visual appeal and client alignment."
        : "Dirección de Innovación y Desarrollo Tecnológico. Creé piezas gráficas con Adobe Illustrator."
    },
    {
      title: language === 'en' ? "3D Designer" : "Diseñador 3D",
      period: "2019",
      location: "Startreming, Mendoza",
      description: language === 'en'
        ? "3D designer responsible for Unity implementations and vehicle modeling for games."
        : "Diseñador 3D responsable de implementaciones en Unity y modelado de vehículos para juegos.",
      projects: [
        {
          title: "Wave Rider",
          description: language === 'en'
            ? "Modeled futuristic vehicles including a motorcycle and reimagined Toyota AE86."
            : "Modelé vehículos futuristas incluyendo motocicleta y Toyota AE86 reimaginado."
        }
      ]
    }
  ];

  return (
    <section id="resume" className="py-16 md:py-20 lg:py-32 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-glow-gradient opacity-30 pointer-events-none" />
      
      <div className="section-container relative">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="gradient-text">{t('resume.title')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-display mb-4">
            {t('resume.subtitle')}
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4 text-sm sm:text-base">
            {language === 'en' 
              ? "With a foundation in game development and interactive media, I bring a multidisciplinary approach to UX/UI design. My experience spans digital products, simulations, and interfaces combining user centered thinking with technical execution. From immersive applications to functional UI systems, I aim to design experiences that are as intuitive as they are engaging."
              : "Con una base en desarrollo de videojuegos y medios interactivos, aporto un enfoque multidisciplinario al diseño UX/UI. Mi experiencia abarca productos digitales, simulaciones e interfaces combinando pensamiento centrado en el usuario con ejecución técnica."
            }
          </p>
          <a 
            href={language === 'en' ? '/Emiliano-Garcia-Fuenzalida-UX-UI-Designer-CV-EN.pdf' : '/Emiliano-Garcia-Fuenzalida-Disenador-UX-UI-CV-ES.pdf'} 
            download 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base md:text-lg rounded-full bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Download className="w-4 h-4" />
            {t('resume.download')}
          </a>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100} className="mb-12">
          <div className="glass rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl">{t('resume.summary')}</h3>
            </div>
            
            <h4 className="font-display font-semibold text-xl mb-1">{summaryData.name}</h4>
            <p className="text-primary font-medium mb-3">{summaryData.role}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{summaryData.bio}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                {summaryData.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-primary" />
                {summaryData.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-primary" />
                {summaryData.email}
              </span>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <AnimatedSection className="flex items-center gap-3 mb-8">
              <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl">{t('resume.education')}</h3>
            </AnimatedSection>

            <div className="space-y-0">
              {education.map((item, index) => (
                <ResumeItem key={index} {...item} delay={index * 80} />
              ))}
            </div>
          </div>

          <div>
            <AnimatedSection className="flex items-center gap-3 mb-8">
              <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl">{t('resume.experience')}</h3>
            </AnimatedSection>

            <div className="space-y-0">
              {experience.map((item, index) => (
                <ResumeItem key={index} {...item} delay={index * 80} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
