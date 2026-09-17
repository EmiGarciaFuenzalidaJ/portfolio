import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';
import { X, ExternalLink, Lightbulb, Search, AlertTriangle, PenTool, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Metric {
  value: string;
  label: string;
  labelEs: string;
}

interface ProcessStep {
  en: string;
  es: string;
}

interface Project {
  id: string;
  title: string;
  titleEs: string;
  oneLiner: string;
  oneLinerEs: string;
  category: string;
  categoryEs: string;
  problem: string;
  problemEs: string;
  solution: string;
  solutionEs: string;
  insight?: string;
  insightEs?: string;
  metrics: Metric[];
  decisions: string[];
  decisionsEs: string[];
  url?: string;
  steps: ProcessStep[];
}

const processLabels = [
  { en: 'Research & Discovery', es: 'Investigación y Descubrimiento', icon: Search },
  { en: 'Problem Definition', es: 'Definición del Problema', icon: AlertTriangle },
  { en: 'Design & Iteration', es: 'Diseño e Iteración', icon: PenTool },
  { en: 'Validation & Impact', es: 'Validación e Impacto', icon: CheckCircle },
];

const projects: Project[] = [
  {
    id: 'badi',
    title: 'BADI — Voice-First Companion Robot',
    titleEs: 'BADI — Robot Acompañante por Voz',
    oneLiner: 'Voice-only companion robot designed so older adults can use it without ever touching a screen.',
    oneLinerEs: 'Robot acompañante por voz diseñado para que adultos mayores lo usen sin tocar una pantalla.',
    category: 'AI',
    categoryEs: 'IA',
    problem: 'Millions of older adults live alone and feel disconnected, but most "smart" devices assume screen literacy, fast reflexes and constant app updates — barriers that exclude the very people who would benefit the most.',
    problemEs: 'Millones de adultos mayores viven solos y se sienten desconectados, pero la mayoría de los dispositivos "inteligentes" asumen alfabetización en pantallas, reflejos rápidos y actualizaciones constantes — barreras que excluyen justamente a quienes más se beneficiarían.',
    solution: 'A physical home companion (similar to Alexa, but caring-first) controlled entirely by natural voice. We designed conversational agents — Companion, Health, Emergency — that adapt to each person\'s pace, alert family if something happens, and feel warm rather than clinical.',
    solutionEs: 'Un compañero físico para el hogar (similar a Alexa, pero centrado en el cuidado) controlado únicamente por voz natural. Diseñamos agentes conversacionales — Compañía, Salud, Emergencia — que se adaptan al ritmo de cada persona, avisan a la familia si algo ocurre, y se sienten cálidos en lugar de clínicos.',
    insight: 'For older adults, screens are friction. Voice is intimacy.',
    insightEs: 'Para los adultos mayores, las pantallas son fricción. La voz es intimidad.',
    metrics: [
      { value: '100%', label: 'Voice-driven UX', labelEs: 'UX 100% por voz' },
      { value: '3', label: 'Care agents shipped', labelEs: 'Agentes de cuidado' },
      { value: '0', label: 'Screens to learn', labelEs: 'Pantallas que aprender' },
      { value: '24/7', label: 'Family peace of mind', labelEs: 'Tranquilidad familiar' },
    ],
    decisions: [
      'Field research with older adults and their families to map real loneliness pain points',
      'AI research to define agent personalities, tone, and escalation paths to caregivers',
      'Frontend development of the companion app to onboard the device and manage agents',
      'Voice flows tuned for slow speech, repeats, and forgiving error handling',
    ],
    decisionsEs: [
      'Investigación de campo con adultos mayores y familias para mapear puntos reales de soledad',
      'Investigación de IA para definir personalidades, tono y rutas de escalado de los agentes',
      'Desarrollo frontend de la app compañera para activar el dispositivo y gestionar agentes',
      'Flujos de voz ajustados a habla pausada, repeticiones y manejo tolerante de errores',
    ],
    url: 'https://badi.com.ar/',
    steps: [
      { en: 'Interviewed older adults, caregivers and families to understand daily loneliness and the limits of existing smart devices.', es: 'Entrevisté a adultos mayores, cuidadores y familiares para entender la soledad cotidiana y los límites de los dispositivos actuales.' },
      { en: 'Most "smart" devices fail older users because they require screens, app updates and fast interactions.', es: 'La mayoría de los dispositivos "inteligentes" fallan con adultos mayores porque exigen pantallas, actualizaciones y reflejos rápidos.' },
      { en: 'Designed a voice-only companion with three care agents and built the frontend of the companion app.', es: 'Diseñé un compañero solo por voz con tres agentes de cuidado y construí el frontend de la app compañera.' },
      { en: 'Delivered a warm, accessible product family can trust, with AI agents tuned through ongoing user research.', es: 'Entregué un producto cálido y accesible en el que las familias pueden confiar, con agentes de IA ajustados mediante investigación continua.' },
    ],
  },
  {
    id: 'produce-first',
    title: 'Produce First',
    titleEs: 'Produce First',
    oneLiner: 'Redesigned e-commerce UX to drive conversion and reduce drop-off.',
    oneLinerEs: 'Rediseño de UX e-commerce para impulsar conversión y reducir abandono.',
    category: 'E-commerce',
    categoryEs: 'E-commerce',
    problem: 'Users were abandoning purchases due to friction and lack of clarity in the checkout process, leading to significant revenue loss.',
    problemEs: 'Los usuarios abandonaban compras por fricción y falta de claridad en el proceso de checkout, generando pérdida significativa de ingresos.',
    solution: 'Simplified the checkout flow, improved visual hierarchy, and eliminated unnecessary steps to create a frictionless buying experience.',
    solutionEs: 'Simplifiqué el flujo de checkout, mejoré la jerarquía visual y eliminé pasos innecesarios para crear una experiencia de compra sin fricción.',
    metrics: [
      { value: '+70%', label: 'Conversion rate', labelEs: 'Tasa de conversión' },
      { value: '+65%', label: 'Completed purchases', labelEs: 'Compras completadas' },
      { value: '-40%', label: 'Checkout drop-off', labelEs: 'Abandono en checkout' },
    ],
    decisions: [
      'Client interviews revealed navigation confusion and communication gaps',
      'Simplified information architecture based on user mental models',
      'Iterative testing of checkout flow reduced friction points',
    ],
    decisionsEs: [
      'Entrevistas con el cliente revelaron confusión en navegación y brechas de comunicación',
      'Simplificación de arquitectura de información basada en modelos mentales del usuario',
      'Pruebas iterativas del flujo de checkout redujeron puntos de fricción',
    ],
    url: 'https://www.producefirst.mx/',
    steps: [
      { en: 'Analyzed user behavior in the purchase flow and identified drop-off points in checkout.', es: 'Analicé el comportamiento del usuario en el flujo de compra e identifiqué puntos de abandono en checkout.' },
      { en: 'Users were abandoning purchases due to friction and lack of clarity in the buying process.', es: 'Los usuarios abandonaban compras por fricción y falta de claridad en el proceso de compra.' },
      { en: 'Simplified checkout flow, improved visual hierarchy, and reduced unnecessary steps.', es: 'Simplifiqué el flujo de checkout, mejoré la jerarquía visual y reduje pasos innecesarios.' },
      { en: 'Validated through increased conversion and reduced drop-off rates.', es: 'Validado mediante aumento de conversión y reducción de tasas de abandono.' },
    ],
  },
  {
    id: 'gotapp',
    title: 'GotApp',
    titleEs: 'GotApp',
    oneLiner: 'Civic app for water management — accessible design for all citizens.',
    oneLinerEs: 'App ciudadana para gestión hídrica — diseño accesible para todos.',
    category: 'Civic Tech',
    categoryEs: 'Civic Tech',
    problem: 'Citizens could not effectively report water-related issues due to confusing interfaces and unclear reporting flows.',
    problemEs: 'Los ciudadanos no podían reportar problemas hídricos efectivamente debido a interfaces confusas y flujos de reporte poco claros.',
    solution: 'Redesigned the reporting flow to be faster, clearer, and more intuitive, prioritizing accessibility for diverse demographics.',
    solutionEs: 'Rediseñé el flujo de reportes para que fuera más rápido, claro e intuitivo, priorizando accesibilidad para diversos perfiles.',
    metrics: [
      { value: '+60%', label: 'User reports', labelEs: 'Reportes de usuarios' },
      { value: '+40%', label: 'Issue resolution', labelEs: 'Resolución de problemas' },
      { value: '+35%', label: 'Faster response', labelEs: 'Respuesta más rápida' },
    ],
    decisions: [
      'Prioritized clarity and accessibility for diverse user demographics',
      'Information architecture designed for quick task completion',
      'Usability testing with real citizens shaped the final interface',
    ],
    decisionsEs: [
      'Se priorizó claridad y accesibilidad para diversos perfiles de usuario',
      'Arquitectura de información diseñada para completar tareas rápidamente',
      'Pruebas de usabilidad con ciudadanos reales dieron forma a la interfaz final',
    ],
    url: 'https://www.behance.net/gallery/229251747/GotApp-UXUI-para-app-ciudadana-de-gestion-hidrica',
    steps: [
      { en: 'Studied user interaction with reporting tools and identified low engagement.', es: 'Estudié la interacción del usuario con herramientas de reporte e identifiqué bajo engagement.' },
      { en: 'Users were not effectively reporting issues due to friction and unclear flows.', es: 'Los usuarios no reportaban problemas efectivamente por fricción y flujos poco claros.' },
      { en: 'Redesigned reporting flow to be faster, clearer, and more intuitive.', es: 'Rediseñé el flujo de reportes para que fuera más rápido, claro e intuitivo.' },
      { en: 'Increased reports, faster resolution, and improved response times.', es: 'Aumento de reportes, resolución más rápida y mejores tiempos de respuesta.' },
    ],
  },
  {
    id: 'trekk-mates',
    title: 'Trekk Mates',
    titleEs: 'Trekk Mates',
    oneLiner: 'Research-driven hiking partner app connecting outdoor enthusiasts.',
    oneLinerEs: 'App de compañeros de trekking basada en investigación.',
    category: 'EdTech',
    categoryEs: 'EdTech',
    problem: 'Hikers felt uncertain and lacked confidence when navigating unfamiliar outdoor routes without proper guidance.',
    problemEs: 'Los excursionistas se sentían inseguros al navegar rutas al aire libre desconocidas sin guía adecuada.',
    solution: 'Designed guided navigation flows with social matching features, prioritizing clarity, reassurance, and trust.',
    solutionEs: 'Diseñé flujos de navegación guiada con funciones de matching social, priorizando claridad, confianza y seguridad.',
    metrics: [
      { value: '85%', label: 'Preferred guided routes', labelEs: 'Prefirieron rutas guiadas' },
      { value: '+70%', label: 'User confidence', labelEs: 'Confianza del usuario' },
      { value: '+50%', label: 'Engagement', labelEs: 'Engagement' },
    ],
    decisions: [
      'User research revealed trust and safety as primary concerns',
      'Guided route system designed based on user preference data',
      'Social matching features iterated through prototype testing',
    ],
    decisionsEs: [
      'La investigación reveló que confianza y seguridad eran las principales preocupaciones',
      'Sistema de rutas guiadas diseñado según datos de preferencia del usuario',
      'Funciones de matching social iteradas mediante pruebas de prototipo',
    ],
    url: 'https://www.behance.net/gallery/233262263/TrekkMates-UXUI-Design-for-a-hiking-partner-app',
    steps: [
      { en: 'Conducted interviews to understand navigation behavior in outdoor environments.', es: 'Realicé entrevistas para comprender el comportamiento de navegación en entornos al aire libre.' },
      { en: 'Users felt uncertain and lacked confidence when navigating unfamiliar routes.', es: 'Los usuarios se sentían inseguros al navegar rutas desconocidas.' },
      { en: 'Designed guided navigation flows prioritizing clarity and reassurance.', es: 'Diseñé flujos de navegación guiada priorizando claridad y confianza.' },
      { en: 'Users showed higher confidence and engagement during navigation.', es: 'Los usuarios mostraron mayor confianza y engagement durante la navegación.' },
    ],
  },
  {
    id: 'dagna',
    title: 'Dagna Insurance',
    titleEs: 'Dagna Seguros',
    oneLiner: 'Landing page designed to communicate services and expand digital reach.',
    oneLinerEs: 'Landing page diseñada para comunicar servicios y expandir alcance digital.',
    category: 'Web Design',
    categoryEs: 'Diseño Web',
    problem: 'Low online discoverability and weak conversion from website visits to actual client contact and inquiries.',
    problemEs: 'Baja descubribilidad online y débil conversión de visitas web a contacto real con clientes.',
    solution: 'Improved content structure, clarity, and call-to-actions to build trust and drive user engagement.',
    solutionEs: 'Mejoré la estructura de contenido, claridad y call-to-actions para generar confianza e impulsar engagement.',
    metrics: [
      { value: '+35%', label: 'Search visibility', labelEs: 'Visibilidad en búsqueda' },
      { value: '+40%', label: 'User inquiries', labelEs: 'Consultas de usuarios' },
      { value: '+25%', label: 'Conversion to contact', labelEs: 'Conversión a contacto' },
    ],
    decisions: [
      'Client collaboration defined clear service communication goals',
      'Simple layout prioritized trust signals and easy navigation',
      'Navigation testing shaped the final information structure',
    ],
    decisionsEs: [
      'La colaboración con el cliente definió metas claras de comunicación',
      'Layout simple que priorizó señales de confianza y navegación fácil',
      'Pruebas de navegación dieron forma a la estructura de información final',
    ],
    url: 'https://dagna.com.ar/',
    steps: [
      { en: 'Analyzed visibility and user behavior across digital channels.', es: 'Analicé la visibilidad y el comportamiento del usuario en canales digitales.' },
      { en: 'Low discoverability and weak conversion from visits to contact.', es: 'Baja descubribilidad y débil conversión de visitas a contacto.' },
      { en: 'Improved content structure, clarity, and call-to-actions.', es: 'Mejoré la estructura de contenido, claridad y call-to-actions.' },
      { en: 'Increased visibility, inquiries, and conversion rates.', es: 'Aumento de visibilidad, consultas y tasas de conversión.' },
    ],
  },
  {
    id: 'scheurer',
    title: 'Scheurer Properties',
    titleEs: 'Scheurer Propiedades',
    oneLiner: 'Performance-focused redesign for a real estate platform.',
    oneLinerEs: 'Rediseño enfocado en rendimiento para plataforma inmobiliaria.',
    category: 'Web Design',
    categoryEs: 'Diseño Web',
    problem: 'Slow response times and outdated visuals on the existing WordPress site were reducing user trust and conversions.',
    problemEs: 'Los tiempos de respuesta lentos y visuales desactualizados en WordPress reducían la confianza del usuario y las conversiones.',
    solution: 'Optimized communication flows, modernized the interface while respecting brand identity, and improved load performance.',
    solutionEs: 'Optimicé los flujos de comunicación, modernicé la interfaz respetando la identidad de marca y mejoré el rendimiento de carga.',
    metrics: [
      { value: '+50%', label: 'Sales increase', labelEs: 'Aumento de ventas' },
      { value: '+30%', label: 'Session duration', labelEs: 'Duración de sesión' },
      { value: '+80%', label: 'Response speed', labelEs: 'Velocidad de respuesta' },
    ],
    decisions: [
      'Identified performance issues and outdated visuals in existing WordPress site',
      'Redesigned interface respecting brand color identity',
      'Optimized load times and browsing behavior based on user interviews',
    ],
    decisionsEs: [
      'Se identificaron problemas de rendimiento y visuales desactualizados en WordPress',
      'Interfaz rediseñada respetando la identidad de color de la marca',
      'Optimización de tiempos de carga basada en entrevistas con usuarios',
    ],
    url: 'https://scheurerpropiedades.com.ar/',
    steps: [
      { en: 'Evaluated user interaction patterns and response times.', es: 'Evalué patrones de interacción del usuario y tiempos de respuesta.' },
      { en: 'Slow responses and unclear information reduced conversions.', es: 'Las respuestas lentas e información poco clara reducían las conversiones.' },
      { en: 'Optimized communication flows and improved content clarity.', es: 'Optimicé los flujos de comunicación y mejoré la claridad del contenido.' },
      { en: 'Higher sales, longer sessions, and faster response times.', es: 'Mayores ventas, sesiones más largas y tiempos de respuesta más rápidos.' },
    ],
  },
  {
    id: 'automations',
    title: 'AI Chatbots & Automations',
    titleEs: 'Chatbots IA y Automatizaciones',
    oneLiner: 'Conversational UX and workflow automation for business optimization.',
    oneLinerEs: 'UX conversacional y automatización de flujos para optimización de negocios.',
    category: 'AI',
    categoryEs: 'IA',
    problem: 'Manual processes limited business scalability, delayed responses, and created bottlenecks in lead qualification.',
    problemEs: 'Los procesos manuales limitaban la escalabilidad, retrasaban respuestas y creaban cuellos de botella en calificación de leads.',
    solution: 'Implemented automated workflows with n8n and AI-driven chatbot interactions for seamless customer engagement.',
    solutionEs: 'Implementé flujos automatizados con n8n e interacciones de chatbot con IA para engagement continuo con clientes.',
    metrics: [
      { value: '100%', label: 'Response rate', labelEs: 'Tasa de respuesta' },
      { value: '+45%', label: 'Lead qualification', labelEs: 'Calificación de leads' },
      { value: '-60%', label: 'Manual workload', labelEs: 'Carga de trabajo manual' },
      { value: '+30%', label: 'Sales capacity', labelEs: 'Capacidad de ventas' },
    ],
    decisions: [
      'Designed conversational flows that mirror natural user communication patterns',
      'Automated lead qualification reduced manual screening by 60%',
      'n8n workflow automations streamlined repetitive business processes',
    ],
    decisionsEs: [
      'Diseño de flujos conversacionales que reflejan patrones naturales de comunicación',
      'La calificación automatizada de leads redujo el filtrado manual en 60%',
      'Automatizaciones con n8n optimizaron procesos de negocio repetitivos',
    ],
    steps: [
      { en: 'Analyzed user communication patterns and response bottlenecks.', es: 'Analicé patrones de comunicación del usuario y cuellos de botella en respuestas.' },
      { en: 'Manual processes limited scalability and delayed responses.', es: 'Los procesos manuales limitaban la escalabilidad y retrasaban respuestas.' },
      { en: 'Implemented automated workflows and AI-driven interactions.', es: 'Implementé flujos automatizados e interacciones impulsadas por IA.' },
      { en: 'Achieved full response coverage and improved lead handling efficiency.', es: 'Logré cobertura total de respuestas y mejoré la eficiencia en manejo de leads.' },
    ],
  },
  {
    id: 'ar-road-safety',
    title: 'AR Road Safety',
    titleEs: 'Seguridad Vial AR',
    oneLiner: 'AR experience teaching road safety through interactive visual learning.',
    oneLinerEs: 'Experiencia AR enseñando seguridad vial mediante aprendizaje visual interactivo.',
    category: 'Simulation',
    categoryEs: 'Simulación',
    problem: 'Traditional passive instruction methods failed to engage children and retain their attention when learning road safety.',
    problemEs: 'Los métodos de instrucción pasiva tradicionales no lograban captar la atención de los niños al aprender seguridad vial.',
    solution: 'Designed interactive AR experiences with gamification and instant feedback tailored to cognitive development stages.',
    solutionEs: 'Diseñé experiencias AR interactivas con gamificación y feedback instantáneo adaptadas a etapas de desarrollo cognitivo.',
    insight: 'Children respond better to interactive and visual learning than passive instruction.',
    insightEs: 'Los niños responden mejor al aprendizaje interactivo y visual que a la instrucción pasiva.',
    metrics: [
      { value: '+55%', label: 'Engagement', labelEs: 'Engagement' },
      { value: '+48%', label: 'Retention', labelEs: 'Retención' },
      { value: '+35%', label: 'Task completion', labelEs: 'Completación de tareas' },
    ],
    decisions: [
      'Interactive AR approach chosen over passive instruction for children',
      'Visual cues designed to match cognitive development stages',
      'Gamification elements increased sustained attention and retention',
    ],
    decisionsEs: [
      'Enfoque AR interactivo elegido sobre instrucción pasiva para niños',
      'Señales visuales diseñadas para etapas de desarrollo cognitivo',
      'Elementos de gamificación aumentaron la atención sostenida y retención',
    ],
    steps: [
      { en: 'Studied how children interact with educational content and attention patterns.', es: 'Estudié cómo los niños interactúan con contenido educativo y patrones de atención.' },
      { en: 'Traditional learning methods failed to engage and retain attention.', es: 'Los métodos de aprendizaje tradicionales no lograban captar ni retener la atención.' },
      { en: 'Designed interactive AR experiences with gamification and instant feedback.', es: 'Diseñé experiencias AR interactivas con gamificación y feedback instantáneo.' },
      { en: 'Improved engagement, retention, and task completion.', es: 'Mejoré el engagement, retención y completación de tareas.' },
    ],
  },
  {
    id: 'ar-wine',
    title: 'AR Wine Presentation',
    titleEs: 'Presentación de Vinos AR',
    oneLiner: 'Augmented reality experience to enhance wine product discovery.',
    oneLinerEs: 'Experiencia de realidad aumentada para mejorar el descubrimiento de vinos.',
    category: 'AR',
    categoryEs: 'RA',
    problem: 'Low product visibility and limited engagement in retail environments affected wine purchase decisions.',
    problemEs: 'La baja visibilidad del producto y engagement limitado en entornos retail afectaban las decisiones de compra.',
    solution: 'Created interactive AR experiences that showcase products dynamically, increasing visibility and purchase intent.',
    solutionEs: 'Creé experiencias AR interactivas que muestran productos dinámicamente, aumentando visibilidad e intención de compra.',
    metrics: [
      { value: '+60%', label: 'Product visibility', labelEs: 'Visibilidad del producto' },
      { value: '+50%', label: 'Interaction rate', labelEs: 'Tasa de interacción' },
      { value: '+30%', label: 'Purchase intent', labelEs: 'Intención de compra' },
    ],
    decisions: [
      'AR layer designed to complement physical product without overwhelming',
      'Information hierarchy prioritized key purchase decision factors',
      'Touch interactions kept minimal for intuitive first-time use',
    ],
    decisionsEs: [
      'Capa AR diseñada para complementar el producto físico sin saturar',
      'Jerarquía de información priorizó factores clave de decisión de compra',
      'Interacciones táctiles mínimas para uso intuitivo la primera vez',
    ],
    steps: [
      { en: 'Analyzed how users interact with product information in retail environments.', es: 'Analicé cómo los usuarios interactúan con información de producto en entornos retail.' },
      { en: 'Low product visibility and limited engagement affected purchase decisions.', es: 'La baja visibilidad del producto y engagement limitado afectaban las decisiones de compra.' },
      { en: 'Created interactive AR experiences to showcase products dynamically.', es: 'Creé experiencias AR interactivas para mostrar productos dinámicamente.' },
      { en: 'Increased product visibility, interaction, and purchase intent.', es: 'Aumento de visibilidad del producto, interacción e intención de compra.' },
    ],
  },
  {
    id: 'evacuation-sim',
    title: 'Evacuation Simulator',
    titleEs: 'Simulador de Evacuación',
    oneLiner: 'VR training for emergency navigation under stress conditions.',
    oneLinerEs: 'Entrenamiento VR para navegación de emergencia bajo estrés.',
    category: 'Simulation',
    categoryEs: 'Simulación',
    problem: 'Users became disoriented under stress during emergency evacuations despite having correct navigation paths available.',
    problemEs: 'Los usuarios se desorientaban bajo estrés durante evacuaciones de emergencia a pesar de tener rutas correctas disponibles.',
    solution: 'Enhanced visual cues, directional guidance, and reduced cognitive load to support instinctive navigation under stress.',
    solutionEs: 'Mejoré las señales visuales, guía direccional y reduje la carga cognitiva para apoyar navegación instintiva bajo estrés.',
    insight: 'Users rely on instinctive cues under stress, not complex navigation logic.',
    insightEs: 'Los usuarios confían en señales instintivas bajo estrés, no en lógica de navegación compleja.',
    metrics: [
      { value: '-40%', label: 'Disorientation', labelEs: 'Desorientación' },
      { value: '+45%', label: 'Faster navigation', labelEs: 'Navegación más rápida' },
      { value: '+50%', label: 'Route accuracy', labelEs: 'Precisión de ruta' },
    ],
    decisions: [
      'Instinctive visual cues replaced complex navigation systems for stress scenarios',
      'Progressive difficulty levels matched real emergency conditions',
      'User testing under simulated stress revealed critical design blind spots',
    ],
    decisionsEs: [
      'Señales visuales instintivas reemplazaron sistemas de navegación complejos',
      'Niveles de dificultad progresivos simularon condiciones de emergencia reales',
      'Pruebas de usuario bajo estrés simulado revelaron puntos ciegos de diseño',
    ],
    steps: [
      { en: 'Observed user behavior during simulation testing and conducted interviews.', es: 'Observé el comportamiento del usuario durante pruebas de simulación y realicé entrevistas.' },
      { en: 'Users became disoriented under stress despite correct navigation paths.', es: 'Los usuarios se desorientaban bajo estrés a pesar de tener rutas correctas.' },
      { en: 'Enhanced visual cues, directional guidance, and reduced cognitive load.', es: 'Mejoré las señales visuales, guía direccional y reduje la carga cognitiva.' },
      { en: 'Improved navigation speed, accuracy, and reduced confusion.', es: 'Mejoré la velocidad de navegación, precisión y reduje la confusión.' },
    ],
  },
  {
    id: 'sprayer-sim',
    title: 'Sprayer Simulator',
    titleEs: 'Simulador de Fumigación',
    oneLiner: 'Procedural training simulator for agricultural equipment operation.',
    oneLinerEs: 'Simulador de entrenamiento procedimental para operación de equipos agrícolas.',
    category: 'Simulation',
    categoryEs: 'Simulación',
    problem: 'Users struggled with executing correct procedural steps when operating agricultural sprayer machinery.',
    problemEs: 'Los usuarios tenían dificultades para ejecutar los pasos procedimentales correctos al operar maquinaria fumigadora.',
    solution: 'Structured workflows using wireflows and clear step-by-step procedural guidance mapped to real equipment.',
    solutionEs: 'Estructuré flujos de trabajo usando wireflows y guía procedimental clara paso a paso mapeada a equipos reales.',
    insight: 'Users need clear procedural guidance, not just interfaces.',
    insightEs: 'Los usuarios necesitan guía procedimental clara, no solo interfaces.',
    metrics: [
      { value: '+35%', label: 'Task accuracy', labelEs: 'Precisión en tareas' },
      { value: '-30%', label: 'Error reduction', labelEs: 'Reducción de errores' },
      { value: '+40%', label: 'Completion rate', labelEs: 'Tasa de completación' },
    ],
    decisions: [
      'Step-by-step procedural guidance replaced freeform interface exploration',
      'Error prevention through progressive disclosure of controls',
      'Real equipment mapping ensured training transfer to actual operation',
    ],
    decisionsEs: [
      'Guía procedimental paso a paso reemplazó la exploración libre de interfaz',
      'Prevención de errores mediante revelación progresiva de controles',
      'Mapeo de equipos reales aseguró transferencia del entrenamiento a operación real',
    ],
    steps: [
      { en: 'Studied real agricultural machinery and operational procedures.', es: 'Estudié maquinaria agrícola real y procedimientos operativos.' },
      { en: 'Users struggled with executing correct procedural steps.', es: 'Los usuarios tenían dificultades para ejecutar los pasos procedimentales correctos.' },
      { en: 'Structured workflows using wireflows and clear step-by-step guidance.', es: 'Estructuré flujos de trabajo usando wireflows y guía clara paso a paso.' },
      { en: 'Improved task accuracy and reduced operational errors.', es: 'Mejoré la precisión en tareas y reduje errores operativos.' },
    ],
  },
  {
    id: 'interactive-school',
    title: 'Interactive School Space',
    titleEs: 'Espacio Escolar Interactivo',
    oneLiner: 'Exploratory learning environment for children in virtual spaces.',
    oneLinerEs: 'Entorno de aprendizaje exploratorio para niños en espacios virtuales.',
    category: 'EdTech',
    categoryEs: 'EdTech',
    problem: 'Traditional educational formats failed to sustain engagement and curiosity in children within virtual environments.',
    problemEs: 'Los formatos educativos tradicionales no lograban mantener el engagement y curiosidad de los niños en entornos virtuales.',
    solution: 'Designed open-ended, exploratory interactions that encourage self-directed discovery and repeated engagement.',
    solutionEs: 'Diseñé interacciones exploratorias de final abierto que fomentan el descubrimiento autodirigido y engagement repetido.',
    insight: 'Exploration drives deeper learning than linear instruction.',
    insightEs: 'La exploración impulsa un aprendizaje más profundo que la instrucción lineal.',
    metrics: [
      { value: '+60%', label: 'Exploration time', labelEs: 'Tiempo de exploración' },
      { value: '+45%', label: 'Repeated interaction', labelEs: 'Interacción repetida' },
      { value: '+50%', label: 'Engagement', labelEs: 'Engagement' },
    ],
    decisions: [
      'Open-ended exploration model outperformed linear lesson structures',
      'Child-friendly spatial navigation reduced cognitive load',
      'Discovery-based rewards encouraged self-directed learning',
    ],
    decisionsEs: [
      'Modelo de exploración abierta superó estructuras de lecciones lineales',
      'Navegación espacial amigable para niños redujo la carga cognitiva',
      'Recompensas basadas en descubrimiento fomentaron el aprendizaje autodirigido',
    ],
    steps: [
      { en: 'Analyzed how children engage with educational environments.', es: 'Analicé cómo los niños interactúan con entornos educativos.' },
      { en: 'Traditional formats failed to sustain engagement.', es: 'Los formatos tradicionales no lograban mantener el engagement.' },
      { en: 'Designed open-ended, exploratory interactions.', es: 'Diseñé interacciones exploratorias de final abierto.' },
      { en: 'Increased exploration time and repeated engagement.', es: 'Aumento del tiempo de exploración y engagement repetido.' },
    ],
  },
  {
    id: 'first-aid-sim',
    title: 'First Aid Simulator',
    titleEs: 'Simulador de Primeros Auxilios',
    oneLiner: 'Critical-scenario training where users must act, not just understand.',
    oneLinerEs: 'Entrenamiento en escenarios críticos donde los usuarios deben actuar, no solo comprender.',
    category: 'Simulation',
    categoryEs: 'Simulación',
    problem: 'Users needed to apply first aid knowledge quickly and accurately under pressure, but lacked practical training.',
    problemEs: 'Los usuarios necesitaban aplicar conocimiento de primeros auxilios rápida y precisamente bajo presión, pero carecían de entrenamiento práctico.',
    solution: 'Designed structured, action-oriented simulation flows with immediate feedback to build muscle memory and confidence.',
    solutionEs: 'Diseñé flujos de simulación estructurados y orientados a la acción con feedback inmediato para construir memoria muscular y confianza.',
    insight: 'Users must act, not just understand, in critical situations.',
    insightEs: 'Los usuarios deben actuar, no solo comprender, en situaciones críticas.',
    metrics: [
      { value: '+50%', label: 'Task accuracy', labelEs: 'Precisión en tareas' },
      { value: '+45%', label: 'User confidence', labelEs: 'Confianza del usuario' },
      { value: '-35%', label: 'Critical errors', labelEs: 'Errores críticos' },
    ],
    decisions: [
      'Action-first design prioritized doing over reading instructions',
      'Time-pressure scenarios built muscle memory for real emergencies',
      'Immediate feedback loops corrected technique in real-time',
    ],
    decisionsEs: [
      'Diseño de acción primero priorizó hacer sobre leer instrucciones',
      'Escenarios con presión de tiempo construyeron memoria muscular',
      'Bucles de feedback inmediato corrigieron técnica en tiempo real',
    ],
    steps: [
      { en: 'Researched first aid protocols and consulted professionals.', es: 'Investigué protocolos de primeros auxilios y consulté profesionales.' },
      { en: 'Users needed to apply knowledge quickly and accurately under pressure.', es: 'Los usuarios necesitaban aplicar conocimiento rápida y precisamente bajo presión.' },
      { en: 'Designed structured, action-oriented simulation flows with feedback.', es: 'Diseñé flujos de simulación estructurados y orientados a la acción con feedback.' },
      { en: 'Improved accuracy, confidence, and reduced critical errors.', es: 'Mejoré la precisión, confianza y reduje errores críticos.' },
    ],
  },
  {
    id: 'project-package',
    title: 'Project Package (Design System)',
    titleEs: 'Project Package (Sistema de Diseño)',
    oneLiner: 'Design system that improved consistency and scalability across products.',
    oneLinerEs: 'Sistema de diseño que mejoró consistencia y escalabilidad entre productos.',
    category: 'Systems',
    categoryEs: 'Sistemas',
    problem: 'Lack of consistent structure across multiple simulation products created usability issues and scalability problems.',
    problemEs: 'La falta de estructura consistente en múltiples productos de simulación creaba problemas de usabilidad y escalabilidad.',
    solution: 'Developed unified architecture, navigation patterns, and a component library to ensure consistency across all products.',
    solutionEs: 'Desarrollé arquitectura unificada, patrones de navegación y biblioteca de componentes para asegurar consistencia.',
    insight: 'Design systems improve usability and scalability across products.',
    insightEs: 'Los sistemas de diseño mejoran la usabilidad y escalabilidad entre productos.',
    metrics: [
      { value: '-50%', label: 'Inconsistencies', labelEs: 'Inconsistencias' },
      { value: '+40%', label: 'Onboarding speed', labelEs: 'Velocidad de onboarding' },
      { value: '+30%', label: 'Dev efficiency', labelEs: 'Eficiencia de desarrollo' },
      { value: '-25%', label: 'QA issues', labelEs: 'Problemas de QA' },
    ],
    decisions: [
      'Component library unified visual language across 3+ products',
      'Documentation-first approach accelerated developer onboarding',
      'Token-based system enabled consistent theming and dark mode support',
      'Regular audits maintained system health and adoption metrics',
    ],
    decisionsEs: [
      'Biblioteca de componentes unificó el lenguaje visual en 3+ productos',
      'Enfoque de documentación primero aceleró el onboarding de desarrolladores',
      'Sistema basado en tokens permitió theming consistente y soporte dark mode',
      'Auditorías regulares mantuvieron la salud del sistema y métricas de adopción',
    ],
    steps: [
      { en: 'Analyzed inconsistencies across multiple simulation products.', es: 'Analicé inconsistencias en múltiples productos de simulación.' },
      { en: 'Lack of structure created usability and scalability issues.', es: 'La falta de estructura creaba problemas de usabilidad y escalabilidad.' },
      { en: 'Developed unified architecture, navigation, and system patterns.', es: 'Desarrollé arquitectura unificada, navegación y patrones de sistema.' },
      { en: 'Reduced inconsistencies and improved efficiency across products.', es: 'Reduje inconsistencias y mejoré la eficiencia en todos los productos.' },
    ],
  },
];

const categories = ['All', 'E-commerce', 'Civic Tech', 'EdTech', 'Web Design', 'AI', 'Simulation', 'AR', 'Systems'];
const categoriesEs = ['Todos', 'E-commerce', 'Civic Tech', 'EdTech', 'Diseño Web', 'IA', 'Simulación', 'RA', 'Sistemas'];

export const ProjectsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Lock body scroll when project modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const filteredProjects = activeFilter === 'All' || activeFilter === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.categoryEs === activeFilter);

  const currentCategories = language === 'en' ? categories : categoriesEs;

  return (
    <section id="projects" className="py-24 md:py-32 lg:py-40 relative">
      <div className="section-container">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-4">
            {language === 'en' ? 'Selected Work' : 'Trabajo Seleccionado'}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4 text-sm md:text-base leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </AnimatedSection>

        {/* Filter pills */}
        <AnimatedSection animation="fade-up" delay={100} className="mb-12 md:mb-16">
          <div className="flex flex-wrap justify-center gap-2">
            {currentCategories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(language === 'en' ? categories[i] : categoriesEs[i])}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
                  (activeFilter === categories[i] || activeFilter === categoriesEs[i])
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={project.id} animation="scale-in" delay={index * 60}>
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="w-full text-left group glass rounded-2xl p-6 sm:p-7 card-hover shine h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 border border-transparent hover:border-primary/20"
              >
                {/* Category tag */}
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-5 self-start">
                  {language === 'en' ? project.category : project.categoryEs}
                </span>

                {/* Title */}
                <h3 className="font-display font-bold text-lg md:text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                  {language === 'en' ? project.title : project.titleEs}
                </h3>

                {/* One-liner */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {language === 'en' ? project.oneLiner : project.oneLinerEs}
                </p>

                {/* Subtle arrow indicator */}
                <div className="mt-5 flex items-center gap-1 text-primary/40 group-hover:text-primary transition-all duration-300 text-sm">
                  <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
                  <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {language === 'en' ? 'View case' : 'Ver caso'}
                  </span>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Project detail overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" />

          {/* Detail card — fixed size with internal scroll */}
          <div
            className="relative z-10 w-full max-w-3xl max-h-[85vh] glass rounded-2xl overflow-hidden border border-border/50 flex flex-col animate-in zoom-in-95 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 overscroll-contain">
              {/* Header */}
              <div className="p-6 sm:p-8 pb-0 sticky top-0 bg-card/95 backdrop-blur-md z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                      {language === 'en' ? selectedProject.category : selectedProject.categoryEs}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl">
                      {language === 'en' ? selectedProject.title : selectedProject.titleEs}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive/20 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                  {language === 'en' ? selectedProject.oneLiner : selectedProject.oneLinerEs}
                </p>
              </div>

              {/* Problem & Solution */}
              <div className="mx-6 sm:mx-8 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/15">
                  <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-2">
                    {language === 'en' ? 'Problem' : 'Problema'}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'en' ? selectedProject.problem : selectedProject.problemEs}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    {language === 'en' ? 'Solution' : 'Solución'}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'en' ? selectedProject.solution : selectedProject.solutionEs}
                  </p>
                </div>
              </div>

              {/* Insight */}
              {selectedProject.insight && (
                <div className="mx-6 sm:mx-8 mb-6 p-4 rounded-xl bg-primary/5 border border-primary/15">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                        {t('projects.keyInsight')}
                      </p>
                      <p className="text-sm text-foreground italic">
                        "{language === 'en' ? selectedProject.insight : selectedProject.insightEs}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Metrics grid */}
              <div className="px-6 sm:px-8 mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  {t('projects.impact')}
                </p>
                <div className={cn(
                  'grid gap-3',
                  selectedProject.metrics.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'
                )}>
                  {selectedProject.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl bg-secondary/60 p-4 text-center border border-border/30"
                    >
                      <p className={cn(
                        'font-display font-bold text-2xl sm:text-3xl mb-1',
                        metric.value.startsWith('-') ? 'text-accent' : 'text-primary'
                      )}>
                        {metric.value}
                      </p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight">
                        {language === 'en' ? metric.label : metric.labelEs}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* UX Process Steps */}
              <div className="px-6 sm:px-8 mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
                  {language === 'en' ? 'UX Process' : 'Proceso UX'}
                </p>
                <div className="relative">
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
                  <div className="space-y-5">
                    {selectedProject.steps.map((step, i) => {
                      const StepIcon = processLabels[i].icon;
                      return (
                        <div key={i} className="flex gap-4 relative">
                          <div className="w-[31px] h-[31px] rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center flex-shrink-0 z-10">
                            <StepIcon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="flex-1 pb-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1">
                              {language === 'en' ? processLabels[i].en : processLabels[i].es}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {language === 'en' ? step.en : step.es}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* UX Decisions */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                  {t('projects.uxDecisions')}
                </p>
                <ul className="space-y-2">
                  {(language === 'en' ? selectedProject.decisions : selectedProject.decisionsEs).map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>

                {selectedProject.url && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-medium mt-6 hover:gap-2.5 transition-all duration-300"
                  >
                    {t('projects.viewProject')} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
