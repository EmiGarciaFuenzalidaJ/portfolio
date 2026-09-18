/**
 * Single source of truth for the downloadable CV (EN + ES).
 *
 * Content is derived from src/data/resume.ts (roles, dates, education) and
 * src/data/projects.ts (the quantified metrics). If you change a date or a
 * job title here, change it in src/data/resume.ts too — the site and the CV
 * must tell the same story.
 *
 * Rebuild the PDFs with:  npm run build:cv
 */

const CONTACT = {
  name: 'Emiliano García Fuenzalida',
  linkedinText: 'linkedin.com/in/emigarciafuenzalida',
  linkedinHref:
    'https://www.linkedin.com/in/emigarciafuenzalida',
  portfolioText: 'emigarciafuenzalidadesign.pages.dev',
  portfolioHref: 'https://emigarciafuenzalidadesign.pages.dev/',
  githubText: 'github.com/EmiGarciaFuenzalidaJ',
  githubHref: 'https://github.com/EmiGarciaFuenzalidaJ',
  email: 'emigarciafuenzalida@gmail.com',
  phoneText: '+54 261 251 3302',
  phoneHref: 'tel:+542612513302',
};

const en = {
  lang: 'en-US',
  fileName: 'Emiliano-Garcia-Fuenzalida-UX-UI-Designer-CV-EN.pdf',
  meta: {
    title: 'Emiliano García Fuenzalida — UX/UI & Product Designer — CV (EN)',
    subject: 'Curriculum Vitae — UX/UI & Product Designer',
    keywords:
      'UX Designer, UI Designer, Product Designer, UX Research, Usability Testing, Information Architecture, Design Systems, Figma, Prototyping, Accessibility, WCAG, Interaction Design, React, Unity, XR, AR, VR, AI, Conversational UX, Agile, Scrum, Argentina, Remote',
  },
  headline: 'UX/UI & Product Designer',
  locationLine: 'Mendoza, Argentina — Open to remote work',
  labels: {
    email: 'Email',
    phone: 'Phone',
    portfolio: 'Portfolio',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  sections: {
    summary: 'PROFESSIONAL SUMMARY',
    skills: 'CORE SKILLS',
    experience: 'PROFESSIONAL EXPERIENCE',
    projects: 'SELECTED PROJECTS',
    education: 'EDUCATION',
    certifications: 'CERTIFICATIONS',
    languages: 'LANGUAGES',
  },
  summary:
    'UX/UI and Product Designer with 6+ years in digital product design: web and mobile products, XR training simulators and AI-driven interfaces. Specialized in user research, information architecture, usability testing and high-fidelity prototyping. Comfortable across the full product cycle, from discovery and research through design systems to frontend implementation in React, in cross-functional Agile teams that align user needs with business KPIs.',
  skills: [
    [
      'UX Research',
      'User Research, User Interviews, Usability Testing, Personas, User Journeys, Journey Mapping, Information Architecture, Heuristic Evaluation, A/B Testing, Design Thinking, Lean UX',
    ],
    [
      'UI & Product Design',
      'Design Systems, Component Libraries, Interaction Design, Responsive Design, Wireframing, Prototyping, Accessibility (WCAG), Product Strategy, Visual Design, Branding, Visual Identity',
    ],
    [
      'AI & Automation',
      'Conversational UX, AI Agent Design, Chatbot Design, Prompt Engineering, AI Model Evaluation, n8n, Claude, ChatGPT, Gemini, Perplexity',
    ],
    [
      'Design Tools',
      'Figma, FigJam, Figma Make, Adobe XD, Photoshop, Illustrator, Adobe Animate, Adobe Firefly, Blender, Canva, CapCut, Lottie',
    ],
    ['Technical', 'HTML, CSS, JavaScript, React, Git, Unity, C#, Java'],
    [
      'Simulation & XR',
      'VR Development, AR Development, 3D Modeling, Game Design, Interactive Environments',
    ],
    [
      'Methodology',
      'Agile, Scrum, Design Thinking, Lean UX, Project Management, Team Leadership, Cross-functional Collaboration',
    ],
  ],
  experience: [
    {
      role: 'UX Designer, User & AI Researcher, Frontend Developer',
      company: 'DAIA AI',
      place: 'Mendoza, Argentina (Remote)',
      period: '2025 - Present',
      bullets: [
        'Lead end-to-end UX/UI processes for in-house AI products, from discovery and user research through high-fidelity prototyping and validation.',
        'Designed BADI, a voice-first companion robot for older adults: a 100% voice-driven experience with 3 conversational care agents and zero screens to learn.',
        'Redesigned three client products end to end — Produce First (e-commerce), Scheurer Properties (real estate) and Dagna (insurance): +70% conversion and -40% checkout drop-off on Produce First, +50% sales on Scheurer.',
        'Design AI chatbot identities and conversational UX, reaching a 100% response rate and +45% lead qualification.',
        'Ship n8n workflow automations and AI agent solutions that cut manual workload by 60% and increased sales capacity by 30%.',
        'Designed AXIA, Farmacia.AI and aegle — AI backoffices for insurance, pharmacy and hospitality — as instances of one product system, including a drag-and-drop report builder that lets an operator compose a pivot query without writing SQL.',
        'Build production frontend interfaces in React, implementing my own designs directly.',
      ],
    },
    {
      role: 'AI Reviewer',
      company: 'Outlier AI',
      place: 'San Francisco, USA (Remote)',
      period: '2025 - Present',
      bullets: [
        'Evaluate AI model performance for accuracy, consistency and alignment with system objectives.',
        'Review AI-generated content, identify failure patterns, and deliver structured feedback that measurably improves output quality.',
      ],
    },
    {
      role: 'UX/UI Designer',
      company: 'Casa del Futuro',
      place: 'Mendoza, Argentina',
      period: '2025 - 2026',
      bullets: [
        'UX for GotApp, a civic water-services application built with the Casa del Futuro programme (Government of Mendoza) and still in active development.',
        'Own the product UX end to end: user research, information architecture, user flows, wireframes and high-fidelity prototypes in Figma.',
        'Designed accessibility-first responsive interfaces and published a full interactive prototype covering the complete user flow.',
      ],
    },
    {
      role: 'AI Tasker',
      company: 'Outlier AI',
      place: 'San Francisco, USA (Remote)',
      period: '2024 - 2025',
      bullets: [
        'Automated and managed AI training tasks, streamlining workflows for model training and deployment.',
      ],
    },
    {
      role: 'UX/UI Designer & Programmer',
      company: 'InterBrain',
      place: 'Mendoza, Argentina',
      period: '2022 - 2024',
      bullets: [
        'Designed UX/UI for simulators, web platforms and XR environments at a Unity-based simulation studio, contributing to 6+ interactive products across the full cycle: design, UX/UI, 3D modeling and collaborative programming in Unity and C#.',
        'Evacuation Simulator: reduced user disorientation by 40% and improved route accuracy by 50% through iterative usability testing.',
        'First Aid Simulator: raised task accuracy by 50% and reduced critical errors by 35% with protocol-based scenario design.',
        'AR Road Safety App: gamified learning experience built on research with children, lifting engagement +55% and retention +48%.',
        'Built and maintained a shared design system that cut UI inconsistencies by 50% and sped up team onboarding by 40%.',
      ],
    },
    {
      role: 'Freelance UX/UI Designer',
      company: 'Independent',
      place: 'Mendoza, Argentina (Remote)',
      period: '2020 - Present',
      bullets: [
        'UX research, wireframing, prototyping and interface validation for web and mobile clients.',
        'Built visual identity systems for small businesses, from logo to digital presence.',
        'Mask A Crime — lead designer and art director for a noir investigation game published on itch.io: logo, key art, in-game assets, UI and promotional material.',
        'Plastic Love (Flimer) — cover artwork and full animation for the release, used as the official music video.',
      ],
    },
    {
      role: 'Designer',
      company: 'One Duet',
      place: 'Mendoza, Argentina',
      period: '2021 - Present',
      bullets: [
        'Logo, brand identity and visual content for a musical duo, including publication management across digital platforms.',
      ],
    },
    {
      role: 'Designer',
      company: 'Municipality of Godoy Cruz',
      place: 'Mendoza, Argentina',
      period: '2021 - 2022',
      bullets: [
        'Directorate of Innovation and Technological Development: produced graphic pieces in Adobe Illustrator, from logos to promotional materials.',
        'Designed institutional web interfaces balancing visual appeal with stakeholder requirements.',
      ],
    },
    {
      role: '3D Designer',
      company: 'Startreming',
      place: 'Mendoza, Argentina',
      period: '2019',
      bullets: [
        '3D vehicle modeling and Unity implementation for game products.',
      ],
    },
  ],
  projects: [
    'BADI - Voice-First Companion Robot (DAIA AI): voice-only UX for older adults; 3 conversational care agents, 0 screens to learn.',
    'Produce First - E-commerce UX redesign: +70% conversion rate, +65% completed purchases, -40% checkout drop-off.',
    'AR Road Safety - Gamified AR learning built on research with children: +55% engagement, +48% retention.',
    'Design System (Project Package) - Component library for a simulation studio: -50% UI inconsistencies, +30% developer efficiency.',
  ],
  projectsNote:
    'Full case studies for 14 projects, with process and decisions, at ' +
    CONTACT.portfolioText,
  education: [
    [
      "Bachelor's Degree in Video Game Programming - UX/UI Design",
      'Universidad de Mendoza, Argentina',
      '2018 - 2022',
    ],
    [
      'UX/UI Design (70 h)',
      'UTN Facultad Regional Mendoza, Argentina',
      '2025',
    ],
    [
      "Master's in Video Game Programming with Unity",
      'Udemy',
      '2021 - 2022',
    ],
    ['Full-Stack Web Development (600 h)', 'Egg', '2022 - 2023'],
    [
      'Psychology (two years of coursework)',
      'Universidad de Congreso, Argentina',
      '2017 - 2019',
    ],
  ],
  certifications: [
    'Google UX Design Specialization - Google, 2025',
    'Google Project Management - Google, 2026',
    'Google Prompting Essentials, Generative AI - Google, 2025',
    'Claude Code 101 - Anthropic, 2026',
    'Unity VR Development - Unity, 2025',
    'Accredited Scrum Fundamentals - AICS, 2023',
  ],
  certificationsNote:
    '20 certifications listed in full, with credentials, at ' +
    CONTACT.portfolioText,
  languages: ['Spanish: Native', 'English: Full Professional Proficiency'],
};

const es = {
  lang: 'es-AR',
  fileName: 'Emiliano-Garcia-Fuenzalida-Disenador-UX-UI-CV-ES.pdf',
  meta: {
    title: 'Emiliano García Fuenzalida — Diseñador UX/UI y de Producto — CV (ES)',
    subject: 'Curriculum Vitae — Diseñador UX/UI y de Producto',
    keywords:
      'Diseñador UX, Diseñador UI, Product Designer, UX Research, Usability Testing, Arquitectura de Información, Design Systems, Figma, Prototipado, Accesibilidad, WCAG, Interaction Design, React, Unity, XR, AR, VR, IA, UX Conversacional, Agile, Scrum, Argentina, Remoto',
  },
  headline: 'Diseñador UX/UI y de Producto',
  locationLine: 'Mendoza, Argentina — Disponible para trabajo remoto',
  labels: {
    email: 'Email',
    phone: 'Teléfono',
    portfolio: 'Portfolio',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  sections: {
    summary: 'PERFIL PROFESIONAL',
    skills: 'COMPETENCIAS CLAVE',
    experience: 'EXPERIENCIA PROFESIONAL',
    projects: 'PROYECTOS DESTACADOS',
    education: 'EDUCACIÓN',
    certifications: 'CERTIFICACIONES',
    languages: 'IDIOMAS',
  },
  summary:
    'Diseñador UX/UI y de Producto con más de 6 años en diseño de producto digital: productos web y mobile, simuladores de entrenamiento XR e interfaces impulsadas por IA. Especializado en investigación de usuarios, arquitectura de información, pruebas de usabilidad y prototipado en alta fidelidad. Cubro el ciclo completo de producto, de discovery a design systems e implementación frontend en React, en equipos Agile multidisciplinarios que alinean necesidades de usuario con KPIs de negocio.',
  skills: [
    [
      'UX Research',
      'User Research, Entrevistas de Usuario, Usability Testing, Personas, User Journeys, Journey Mapping, Arquitectura de Información, Evaluación Heurística, A/B Testing, Design Thinking, Lean UX',
    ],
    [
      'UI y Diseño de Producto',
      'Design Systems, Librerías de Componentes, Interaction Design, Diseño Responsive, Wireframing, Prototipado, Accesibilidad (WCAG), Product Strategy, Diseño Visual, Branding, Identidad Visual',
    ],
    [
      'IA y Automatización',
      'UX Conversacional, Diseño de Agentes de IA, Diseño de Chatbots, Prompt Engineering, Evaluación de Modelos de IA, n8n, Claude, ChatGPT, Gemini, Perplexity',
    ],
    [
      'Herramientas de Diseño',
      'Figma, FigJam, Figma Make, Adobe XD, Photoshop, Illustrator, Adobe Animate, Adobe Firefly, Blender, Canva, CapCut, Lottie',
    ],
    ['Tecnologías', 'HTML, CSS, JavaScript, React, Git, Unity, C#, Java'],
    [
      'Simulación y XR',
      'Desarrollo VR, Desarrollo AR, Modelado 3D, Game Design, Entornos Interactivos',
    ],
    [
      'Metodología',
      'Agile, Scrum, Design Thinking, Lean UX, Gestión de Proyectos, Liderazgo de Equipo, Colaboración Multidisciplinaria',
    ],
  ],
  experience: [
    {
      role: 'Diseñador UX, Investigador de Usuarios e IA, Frontend Developer',
      company: 'DAIA AI',
      place: 'Mendoza, Argentina (Remoto)',
      period: '2025 - Actualidad',
      bullets: [
        'Lidero procesos UX/UI end-to-end para productos de IA propios, desde discovery e investigación de usuarios hasta prototipado en alta fidelidad y validación.',
        'Diseñé BADI, un robot acompañante por voz para adultos mayores: experiencia 100% por voz, con 3 agentes conversacionales de cuidado y cero pantallas que aprender.',
        'Rediseñé tres productos de cliente de punta a punta — Produce First (e-commerce), Scheurer Propiedades (inmobiliaria) y Dagna (seguros): +70% de conversión y -40% de abandono en checkout en Produce First, +50% de ventas en Scheurer.',
        'Diseño identidades y UX conversacional de chatbots de IA, alcanzando 100% de tasa de respuesta y +45% de calificación de leads.',
        'Desarrollo automatizaciones n8n y soluciones de agentes de IA que redujeron 60% la carga de trabajo manual y aumentaron 30% la capacidad de ventas.',
        'Diseñé AXIA, Farmacia.AI y aegle — backoffices con IA para seguros, farmacia y hotelería — como instancias de un mismo sistema de producto, incluyendo un constructor de informes por arrastre que permite armar una consulta pivot sin escribir SQL.',
        'Construyo interfaces frontend en producción con React, implementando directamente mis propios diseños.',
      ],
    },
    {
      role: 'AI Reviewer',
      company: 'Outlier AI',
      place: 'San Francisco, EE.UU. (Remoto)',
      period: '2025 - Actualidad',
      bullets: [
        'Evalúo el desempeño de modelos de IA en precisión, consistencia y alineación con los objetivos del sistema.',
        'Reviso contenido generado por IA, identifico patrones de error y entrego feedback estructurado que mejora la calidad de las salidas.',
      ],
    },
    {
      role: 'Diseñador UX/UI',
      company: 'Casa del Futuro',
      place: 'Mendoza, Argentina',
      period: '2025 - 2026',
      bullets: [
        'UX de GotApp, una aplicación ciudadana de servicios hídricos construida con el programa Casa del Futuro (Gobierno de Mendoza) y todavía en desarrollo activo.',
        'Responsable de la UX del producto de punta a punta: investigación de usuarios, arquitectura de información, user flows, wireframes y prototipos de alta fidelidad en Figma.',
        'Diseñé interfaces responsive con foco en accesibilidad y publiqué un prototipo interactivo completo que cubre todo el flujo de usuario.',
      ],
    },
    {
      role: 'AI Tasker',
      company: 'Outlier AI',
      place: 'San Francisco, EE.UU. (Remoto)',
      period: '2024 - 2025',
      bullets: [
        'Automaticé y gestioné tareas de entrenamiento de IA, optimizando flujos de trabajo para entrenamiento y despliegue de modelos.',
      ],
    },
    {
      role: 'Diseñador UX/UI y Programador',
      company: 'InterBrain',
      place: 'Mendoza, Argentina',
      period: '2022 - 2024',
      bullets: [
        'Diseñé UX/UI para simuladores, plataformas web y entornos XR en un estudio basado en Unity, participando en más de 6 productos interactivos a lo largo de todo el ciclo: diseño, UX/UI, modelado 3D y programación colaborativa en Unity y C#.',
        'Simulador de Evacuación: reduje 40% la desorientación de los usuarios y mejoré 50% la precisión de ruta mediante testing iterativo de usabilidad.',
        'Simulador de Primeros Auxilios: elevé 50% la precisión de tarea y reduje 35% los errores críticos con escenarios basados en protocolos.',
        'App AR de Seguridad Vial: experiencia de aprendizaje gamificada construida sobre research con niños, con +55% de engagement y +48% de retención.',
        'Construí y mantuve un design system compartido que redujo 50% las inconsistencias de UI y aceleró 40% el onboarding del equipo.',
      ],
    },
    {
      role: 'Diseñador UX/UI Freelance',
      company: 'Independiente',
      place: 'Mendoza, Argentina (Remoto)',
      period: '2020 - Actualidad',
      bullets: [
        'Investigación UX, wireframing, prototipado y validación de interfaces para clientes web y mobile.',
        'Construí sistemas de identidad visual para comercios chicos, del logo a la presencia digital.',
        'Mask A Crime — diseñador principal y director de arte de un juego de investigación noir publicado en itch.io: logo, key art, assets in-game, UI y material promocional.',
        'Plastic Love (Flimer) — arte de portada y animación completa del lanzamiento, usada como video oficial.',
      ],
    },
    {
      role: 'Diseñador',
      company: 'One Duet',
      place: 'Mendoza, Argentina',
      period: '2021 - Actualidad',
      bullets: [
        'Logo, identidad de marca y contenido visual para un dúo musical, incluyendo gestión de publicaciones en plataformas digitales.',
      ],
    },
    {
      role: 'Diseñador',
      company: 'Municipalidad de Godoy Cruz',
      place: 'Mendoza, Argentina',
      period: '2021 - 2022',
      bullets: [
        'Dirección de Innovación y Desarrollo Tecnológico: producción de piezas gráficas en Adobe Illustrator, desde logos hasta material promocional.',
        'Diseño de interfaces web institucionales, equilibrando atractivo visual con los requerimientos de los stakeholders.',
      ],
    },
    {
      role: 'Diseñador 3D',
      company: 'Startreming',
      place: 'Mendoza, Argentina',
      period: '2019',
      bullets: [
        'Modelado 3D de vehículos e implementación en Unity para productos de videojuegos.',
      ],
    },
  ],
  projects: [
    'BADI - Robot Acompañante por Voz (DAIA AI): UX solo por voz para adultos mayores; 3 agentes conversacionales de cuidado, 0 pantallas que aprender.',
    'Produce First - Rediseño UX de e-commerce: +70% de conversión, +65% de compras completadas, -40% de abandono en checkout.',
    'AR Seguridad Vial - Aprendizaje gamificado en AR basado en research con niños: +55% de engagement, +48% de retención.',
    'Design System (Project Package) - Librería de componentes para un estudio de simulación: -50% de inconsistencias de UI, +30% de eficiencia de desarrollo.',
  ],
  projectsNote:
    'Casos completos de 14 proyectos, con proceso y decisiones, en ' +
    CONTACT.portfolioText,
  education: [
    [
      'Licenciatura en Programación de Videojuegos - Diseño UX/UI',
      'Universidad de Mendoza, Argentina',
      '2018 - 2022',
    ],
    [
      'Diseño UX/UI (70 h)',
      'UTN Facultad Regional Mendoza, Argentina',
      '2025',
    ],
    [
      'Máster en Programación de Videojuegos con Unity',
      'Udemy',
      '2021 - 2022',
    ],
    ['Programación Web Full Stack (600 h)', 'Egg', '2022 - 2023'],
    [
      'Psicología (dos años de cursado)',
      'Universidad de Congreso, Argentina',
      '2017 - 2019',
    ],
  ],
  certifications: [
    'Google UX Design Specialization - Google, 2025',
    'Google Project Management - Google, 2026',
    'Google Prompting Essentials, IA Generativa - Google, 2025',
    'Claude Code 101 - Anthropic, 2026',
    'Unity VR Development - Unity, 2025',
    'Accredited Scrum Fundamentals - AICS, 2023',
  ],
  certificationsNote:
    '20 certificaciones listadas en detalle, con credenciales, en ' +
    CONTACT.portfolioText,
  languages: [
    'Español: Nativo',
    'Inglés: Competencia profesional completa',
  ],
};

module.exports = { CONTACT, en, es };
