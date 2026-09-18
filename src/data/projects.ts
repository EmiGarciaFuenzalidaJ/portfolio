// Single source of truth for the 14 UX case studies.
// Extracted verbatim from the original ProjectsSection (v1) — do not trim content.
import { Search, AlertTriangle, PenTool, CheckCircle } from 'lucide-react';

export interface Metric {
  value: string;
  label: string;
  labelEs: string;
}

/**
 * Whether the figures under a case are measured outcomes or a statement of
 * scope. A product still in development has no production numbers, and saying
 * "impact" over descriptive facts is the kind of claim that unravels in an
 * interview.
 */
export type MetricsKind = 'impact' | 'scope';

export interface ProcessStep {
  en: string;
  es: string;
}

export interface Project {
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
  /**
   * Shown as a full sticky case study. Everything else lives as text under the
   * job it was done for, in the experience section — fourteen cards weighted
   * equally read as volume; a handful read as judgement.
   */
  featured?: boolean;
  metrics: Metric[];
  metricsKind?: MetricsKind;
  /**
   * Who measured the figures. Unattributed round percentages read as invented;
   * naming the source is what makes them survive the follow-up question.
   */
  metricsSource?: string;
  metricsSourceEs?: string;
  decisions: string[];
  decisionsEs: string[];
  url?: string;
  steps: ProcessStep[];
}

export const processLabels = [
  { en: 'Research & Discovery', es: 'Investigación y Descubrimiento', icon: Search },
  { en: 'Problem Definition', es: 'Definición del Problema', icon: AlertTriangle },
  { en: 'Design & Iteration', es: 'Diseño e Iteración', icon: PenTool },
  { en: 'Validation & Impact', es: 'Validación e Impacto', icon: CheckCircle },
];

export const projects: Project[] = [
  {
    featured: true,
    id: 'daia-verticals',
    title: 'AXIA, Farmacia.AI & aegle — One System, Three Verticals',
    titleEs: 'AXIA, Farmacia.AI y aegle — Un sistema, tres verticales',
    oneLiner:
      'AI backoffices for insurance, pharmacy and hospitality, all instances of one product system.',
    oneLinerEs:
      'Backoffices con IA para seguros, farmacia y hotelería, todos instancias de un mismo sistema de producto.',
    category: 'B2B SaaS',
    categoryEs: 'B2B SaaS',
    problem:
      'Operators in insurance, pharmacy and hospitality run on spreadsheets and disconnected tools. The data to answer "which product is losing us money this quarter" exists — but getting the answer means asking someone technical, so most of those questions never get asked at all.',
    problemEs:
      'Los operadores de seguros, farmacia y hotelería trabajan con planillas y herramientas desconectadas. El dato para responder "qué producto nos está haciendo perder plata este trimestre" existe — pero llegar a la respuesta implica pedírsela a alguien técnico, así que la mayoría de esas preguntas directamente no se hacen.',
    solution:
      'One product system instantiated three times rather than three products: a shared architecture, sales pipeline and reporting core, with each vertical carrying its own vocabulary, brand and typography. The business data has two doors — natural language for the question you ask once, and a drag-and-drop report builder for the one you ask every month.',
    solutionEs:
      'Un sistema de producto instanciado tres veces, en lugar de tres productos: arquitectura, pipeline comercial y motor de informes compartidos, con cada vertical llevando su propio vocabulario, marca y tipografía. Los datos del negocio tienen dos puertas — lenguaje natural para la pregunta que hacés una vez, y un constructor de informes por arrastre para la que hacés todos los meses.',
    insight:
      'The same data needs two doors: conversation for the question you ask once, structure for the one you ask every month.',
    insightEs:
      'Los mismos datos necesitan dos puertas: conversación para la pregunta que hacés una vez, estructura para la que hacés todos los meses.',
    metrics: [
      { value: '3', label: 'Verticals from one system', labelEs: 'Verticales sobre un mismo sistema' },
      { value: '2', label: 'Ways into the same data', labelEs: 'Caminos hacia los mismos datos' },
      { value: '5', label: 'Pipeline stages, role-aware views', labelEs: 'Etapas de pipeline, vistas por rol' },
    ],
    metricsKind: 'scope',
    metricsSource:
      'Scope, not outcomes. The time savings were measured by DAIA and are the company\'s to report.',
    metricsSourceEs:
      'Alcance, no resultados. Las mejoras de tiempo las midió DAIA y son de la empresa.',
    decisions: [
      'Designed one system instantiated per vertical instead of three products, so a new market is a configuration rather than a rebuild',
      'Built a drag-and-drop report builder — attributes and indicators dropped onto rows, columns and values — so an operator composes a pivot query without writing SQL',
      'Paired it with natural-language querying, because a one-off question and a monthly report are different jobs and deserve different tools',
      'Gave each role its own view of the same system, so a supervisor and an operator see the slice they need rather than the same crowded screen',
      'Kept per-vertical typography and voice on the shared skeleton, so three products never read as one template with the words swapped',
    ],
    decisionsEs: [
      'Diseñé un sistema instanciado por vertical en lugar de tres productos, para que un mercado nuevo sea una configuración y no una reconstrucción',
      'Construí un constructor de informes por arrastre — atributos e indicadores sobre filas, columnas y valores — para que un operador arme una consulta pivot sin escribir SQL',
      'Lo combiné con consultas en lenguaje natural, porque una pregunta suelta y un informe mensual son trabajos distintos y merecen herramientas distintas',
      'Le di a cada rol su propia vista del mismo sistema, para que un supervisor y un operador vean lo que necesitan y no la misma pantalla saturada',
      'Mantuve tipografía y voz propias por vertical sobre el esqueleto compartido, para que tres productos nunca se lean como una plantilla con las palabras cambiadas',
    ],
    url: 'https://axia.daia.com.ar/',
    steps: [
      {
        en: 'Worked with operators across insurance, pharmacy and hospitality to map how each one actually answers a question about its own business today.',
        es: 'Trabajé con operadores de seguros, farmacia y hotelería para mapear cómo responde hoy cada uno una pregunta sobre su propio negocio.',
      },
      {
        en: 'The three verticals differ in vocabulary, not in shape: the same entities, the same pipeline, the same reporting need. Building three products would have tripled the work and split the quality three ways.',
        es: 'Las tres verticales se diferencian en vocabulario, no en forma: las mismas entidades, el mismo pipeline, la misma necesidad de informes. Construir tres productos habría triplicado el trabajo y partido la calidad en tres.',
      },
      {
        en: 'Designed the shared system and both query paths, then built the presentation sites end to end and the backoffice frontend alongside the team.',
        es: 'Diseñé el sistema compartido y los dos caminos de consulta, y después construí las presentaciones de punta a punta y el frontend del backoffice junto al equipo.',
      },
      {
        en: 'Three verticals shipped with market variants on the same core, each presenting as its own product rather than a skin.',
        es: 'Tres verticales entregadas con variantes de mercado sobre el mismo núcleo, cada una presentándose como su propio producto y no como un cambio de piel.',
      },
    ],
  },
  {
    featured: true,
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
      { value: '100%', label: 'Voice-driven experience', labelEs: 'Experiencia 100% por voz' },
      { value: '3', label: 'Conversational care agents', labelEs: 'Agentes conversacionales de cuidado' },
      { value: '0', label: 'Screens to learn', labelEs: 'Pantallas que aprender' },
    ],
    metricsKind: 'scope',
    metricsSource: 'Product facts, not performance figures. Field research covered older adults, caregivers and families.',
    metricsSourceEs: 'Datos del producto, no de rendimiento. La investigación de campo cubrió adultos mayores, cuidadores y familias.',
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
    featured: true,
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
    insight: 'Every step you remove from checkout is revenue you recover.',
    insightEs: 'Cada paso que eliminás del checkout es ingreso que recuperás.',
    metrics: [
      { value: '+70%', label: 'Conversion rate', labelEs: 'Tasa de conversión' },
      { value: '+65%', label: 'Completed purchases', labelEs: 'Compras completadas' },
      { value: '-40%', label: 'Checkout drop-off', labelEs: 'Abandono en checkout' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Figures reported by the client from their own analytics.',
    metricsSourceEs: 'Cifras reportadas por el cliente desde su propia analítica.',
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
    featured: true,
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
    insight: 'Civic tools only work when every citizen can use them.',
    insightEs: 'Las herramientas cívicas solo funcionan cuando todo ciudadano puede usarlas.',
    metrics: [
      { value: 'Full', label: 'User flow prototyped end to end', labelEs: 'Flujo de usuario prototipado completo' },
      { value: 'A11y', label: 'Accessibility-led interface', labelEs: 'Interfaz guiada por accesibilidad' },
      { value: '2026', label: 'Still in active development', labelEs: 'Todavía en desarrollo activo' },
    ],
    metricsKind: 'scope',
    metricsSource: 'Scope, not outcomes: the product is still in development, so there are no production figures yet.',
    metricsSourceEs: 'Alcance, no resultados: el producto sigue en desarrollo, así que todavía no hay cifras de producción.',
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
    category: 'Lifestyle',
    categoryEs: 'Lifestyle',
    problem: 'Hikers felt uncertain and lacked confidence when navigating unfamiliar outdoor routes without proper guidance.',
    problemEs: 'Los excursionistas se sentían inseguros al navegar rutas al aire libre desconocidas sin guía adecuada.',
    solution: 'Designed guided navigation flows with social matching features, prioritizing clarity, reassurance, and trust.',
    solutionEs: 'Diseñé flujos de navegación guiada con funciones de matching social, priorizando claridad, confianza y seguridad.',
    insight: 'In the outdoors, trust is the real feature.',
    insightEs: 'Al aire libre, la confianza es la verdadera funcionalidad.',
    metrics: [
      { value: 'Concept', label: 'Self-initiated, not client work', labelEs: 'Proyecto propio, no de cliente' },
      { value: '2', label: 'Core flows: guided navigation and social matching', labelEs: 'Flujos núcleo: navegación guiada y matching social' },
      { value: 'Behance', label: 'Full case study published', labelEs: 'Caso completo publicado' },
    ],
    metricsKind: 'scope',
    metricsSource: 'A self-initiated concept project: no production users, so no performance figures.',
    metricsSourceEs: 'Proyecto conceptual propio: sin usuarios en producción, así que no hay cifras de rendimiento.',
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
    insight: 'Clarity converts better than cleverness.',
    insightEs: 'La claridad convierte más que la astucia.',
    metrics: [
      { value: '+40%', label: 'User inquiries', labelEs: 'Consultas de usuarios' },
      { value: '+35%', label: 'Search visibility', labelEs: 'Visibilidad en buscadores' },
      { value: '+25%', label: 'Conversion to contact', labelEs: 'Conversión a contacto' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Figures reported by the client from their own analytics.',
    metricsSourceEs: 'Cifras reportadas por el cliente desde su propia analítica.',
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
    insight: 'Performance is part of the brand experience.',
    insightEs: 'El rendimiento es parte de la experiencia de marca.',
    metrics: [
      { value: '+50%', label: 'Sales increase', labelEs: 'Aumento de ventas' },
      { value: '+80%', label: 'Response speed', labelEs: 'Velocidad de respuesta' },
      { value: '+30%', label: 'Session duration', labelEs: 'Duración de sesión' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Figures reported by the client from their own analytics.',
    metricsSourceEs: 'Cifras reportadas por el cliente desde su propia analítica.',
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
    insight: 'Automation frees people for the conversations that matter.',
    insightEs: 'La automatización libera a las personas para las conversaciones que importan.',
    metrics: [
      { value: '-60%', label: 'Manual workload', labelEs: 'Carga de trabajo manual' },
      { value: '+45%', label: 'Lead qualification', labelEs: 'Calificación de leads' },
      { value: '+30%', label: 'Sales capacity', labelEs: 'Capacidad de ventas' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Internal figures from DAIA.',
    metricsSourceEs: 'Cifras internas de DAIA.',
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
    featured: true,
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
      { value: '+35%', label: 'Task completion', labelEs: 'Completitud de tarea' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Measured by InterBrain in user testing with children.',
    metricsSourceEs: 'Medido por InterBrain en testing con niños.',
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
    insight: 'AR sells when it informs, not when it decorates.',
    insightEs: 'La RA vende cuando informa, no cuando decora.',
    metrics: [
      { value: '+60%', label: 'Product visibility', labelEs: 'Visibilidad del producto' },
      { value: '+50%', label: 'Interaction rate', labelEs: 'Tasa de interacción' },
      { value: '+30%', label: 'Purchase intent', labelEs: 'Intención de compra' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Measured by InterBrain during user testing.',
    metricsSourceEs: 'Medido por InterBrain durante pruebas con usuarios.',
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
    featured: true,
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
      { value: '-40%', label: 'User disorientation', labelEs: 'Desorientación de usuarios' },
      { value: '+45%', label: 'Faster navigation', labelEs: 'Rapidez de navegación' },
      { value: '+50%', label: 'Route accuracy', labelEs: 'Precisión de ruta' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Measured by InterBrain in usability testing under simulated stress.',
    metricsSourceEs: 'Medido por InterBrain en pruebas de usabilidad bajo estrés simulado.',
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
      { value: '+40%', label: 'Completion rate', labelEs: 'Tasa de completitud' },
      { value: '+35%', label: 'Task accuracy', labelEs: 'Precisión de tarea' },
      { value: '-30%', label: 'Error reduction', labelEs: 'Reducción de errores' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Measured by InterBrain during user testing.',
    metricsSourceEs: 'Medido por InterBrain durante pruebas con usuarios.',
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
      { value: '+50%', label: 'Engagement', labelEs: 'Engagement' },
      { value: '+45%', label: 'Repeated interaction', labelEs: 'Interacción repetida' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Measured by InterBrain during user testing.',
    metricsSourceEs: 'Medido por InterBrain durante pruebas con usuarios.',
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
      { value: '+50%', label: 'Task accuracy', labelEs: 'Precisión de tarea' },
      { value: '+45%', label: 'User confidence', labelEs: 'Confianza del usuario' },
      { value: '-35%', label: 'Critical errors', labelEs: 'Errores críticos' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Measured by InterBrain during user testing.',
    metricsSourceEs: 'Medido por InterBrain durante pruebas con usuarios.',
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
    featured: true,
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
      { value: '-50%', label: 'UI inconsistencies', labelEs: 'Inconsistencias de UI' },
      { value: '+40%', label: 'Team onboarding speed', labelEs: 'Rapidez de onboarding del equipo' },
      { value: '+30%', label: 'Developer efficiency', labelEs: 'Eficiencia de desarrollo' },
    ],
    metricsKind: 'impact',
    metricsSource: 'Internal team figures from InterBrain, across the 3+ products the library served.',
    metricsSourceEs: 'Cifras internas del equipo de InterBrain, sobre los 3+ productos que usaban la librería.',
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

export const categories = ['All', 'E-commerce', 'Civic Tech', 'EdTech', 'Web Design', 'AI', 'Simulation', 'AR', 'Systems'];
export const categoriesEs = ['Todos', 'E-commerce', 'Civic Tech', 'EdTech', 'Diseño Web', 'IA', 'Simulación', 'RA', 'Sistemas'];
