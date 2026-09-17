// Certifications data. Extracted verbatim from the original CoursesSection (v1).

import dataVisualization from '@/assets/courses/DataVisualization.jpg';
import disenoDePersonajes from '@/assets/courses/DisenoDePersonajes.jpg';
import graphicDesignEssentials from '@/assets/courses/GraphicDesignEssentials.webp';
import htmlYCss from '@/assets/courses/HTMLyCSS.jpg';
import canvaEssentials from '@/assets/courses/CanvaEssentials.webp';
import humanCentredDesign from '@/assets/courses/HumanCentredDesign.webp';
import masterUnity from '@/assets/courses/MasterUnity.jpg';
import programacionFullStack from '@/assets/courses/ProgramacionFullStack.webp';
import scrum from '@/assets/courses/Scrum.jpg';
import unityEssentials from '@/assets/courses/UnityEssentials.jpg';
import unityJunior from '@/assets/courses/UnityJunior.jpg';
import unityVR from '@/assets/courses/UnityVRDevelopment.jpg';
import universidadMendoza from '@/assets/courses/UniversidadDeMendoza.jpg';
import universidadFront from '@/assets/courses/UniversidadFront.png';
import uxui from '@/assets/courses/UXUI.jpg';
import uxgc from '@/assets/courses/UXGC.webp';
import googlePrompting from '@/assets/courses/GooglePrompting.webp';
import googleUX from '@/assets/courses/GoogleUX.webp';
import claudeCode101 from '@/assets/courses/ClaudeCode101.jpg';
import googleProjectManagement from '@/assets/courses/GoogleProjectManagement.webp';

export interface Course {
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  image?: string;
}

export const courses: Course[] = [
  {
    title: "Google Project Management Certificate",
    titleEs: "Certificado de Google Project Management",
    description: "Earned the Google Project Management Professional Certificate (7 courses) covering project initiation, planning, execution, agile delivery, and capstone work. Built solid foundations in scope, risk, stakeholder, and timeline management — skills that translate directly into structured, accountable design and product workflows.",
    descriptionEs: "Obtuve el Certificado Profesional de Google Project Management (7 cursos) cubriendo inicio, planificación y ejecución de proyectos, entrega ágil y trabajo de capstone. Construí bases sólidas en gestión de alcance, riesgos, stakeholders y tiempos — habilidades que aplico directamente a flujos de diseño y producto más estructurados y responsables.",
    image: googleProjectManagement,
  },
  {
    title: "Claude Code 101 - Anthropic",
    titleEs: "Claude Code 101 - Anthropic",
    description: "Completed Anthropic's Claude Code 101 course, learning how to leverage Claude Code for AI-assisted software development, agentic workflows, and productivity in modern engineering environments.",
    descriptionEs: "Completé el curso Claude Code 101 de Anthropic, aprendiendo a aprovechar Claude Code para desarrollo de software asistido por IA, flujos agénticos y productividad en entornos de ingeniería modernos.",
    image: claudeCode101,
  },
  {
    title: "Google UX Design Certificate",
    titleEs: "Certificado de Diseño UX de Google",
    description: "Earned the Google UX Design Professional Certificate covering user-centered design principles, wireframing, prototyping, and usability testing. Completed 8 courses including high-fidelity prototypes in Figma and UX research.",
    descriptionEs: "Obtuve el Certificado Profesional de Diseño UX de Google cubriendo principios de diseño centrado en el usuario, wireframing, prototipado y pruebas de usabilidad. Completé 8 cursos incluyendo prototipos de alta fidelidad en Figma.",
    image: googleUX,
  },
  {
    title: "Google Prompting Essentials",
    titleEs: "Fundamentos de Prompting de Google",
    description: "Completed the Google Prompting Essentials Specialization, learning best practices for crafting effective prompts to optimize AI interactions. Gained skills in prompt engineering and strategies to maximize AI-assisted productivity.",
    descriptionEs: "Completé la Especialización en Fundamentos de Prompting de Google, aprendiendo mejores prácticas para crear prompts efectivos y optimizar interacciones con IA. Adquirí habilidades en ingeniería de prompts.",
    image: googlePrompting,
  },
  {
    title: "UX/UI Design - UTN & Godoy Cruz",
    titleEs: "Diseño UX/UI - UTN y Godoy Cruz",
    description: "Completed the UX/UI Design course by UTN and Godoy Cruz municipality, strengthening expertise in the complete design process for web and mobile platforms with modern design systems.",
    descriptionEs: "Completé el curso de Diseño UX/UI de la UTN y Municipalidad de Godoy Cruz, fortaleciendo experiencia en el proceso completo de diseño para plataformas web y móvil.",
    image: uxgc,
  },
  {
    title: "Bachelor's Degree in Video Game Programming",
    titleEs: "Licenciatura en Programación de Videojuegos",
    description: "Studied Video Game Development, preparing for a growing industry. The program covered the creation and publishing of games for consoles, PC, and mobile, focusing on creativity, storytelling, and design.",
    descriptionEs: "Estudié Desarrollo de Videojuegos, preparándome para una industria en crecimiento. El programa cubrió la creación y publicación de juegos para consolas, PC y móvil.",
    image: universidadMendoza,
  },
  {
    title: "Web Full Stack",
    titleEs: "Web Full Stack",
    description: "Completed a Full Stack Development course, mastering both front-end and back-end technologies using Java and SQL.",
    descriptionEs: "Completé un curso de Desarrollo Full Stack, dominando tecnologías front-end y back-end usando Java y SQL.",
    image: programacionFullStack,
  },
  {
    title: "Complete Web and Mobile Designer",
    titleEs: "Diseñador Web y Móvil Completo",
    description: "Developed advanced skills in UX/UI design by mastering the principles of web and mobile interface design. Created high-fidelity prototypes using Figma.",
    descriptionEs: "Desarrollé habilidades avanzadas en diseño UX/UI dominando los principios de diseño de interfaces web y móvil.",
    image: uxui,
  },
  {
    title: "Graphic Design Essentials",
    titleEs: "Fundamentos de Diseño Gráfico",
    description: "Learned to use design elements and principles to enhance visual presentation. Focused on typography, color theory, and developing mood boards.",
    descriptionEs: "Aprendí a usar elementos y principios de diseño para mejorar la presentación visual.",
    image: graphicDesignEssentials,
  },
  {
    title: "Canva Essentials",
    titleEs: "Fundamentos de Canva",
    description: "Learned to navigate the Canva platform and its tools to design effectively.",
    descriptionEs: "Aprendí a navegar la plataforma Canva y sus herramientas para diseñar efectivamente.",
    image: canvaEssentials,
  },
  {
    title: "Human Centred Design",
    titleEs: "Diseño Centrado en el Humano",
    description: "Learned the principles of Human-Centered Design to create solutions that prioritize user needs.",
    descriptionEs: "Aprendí los principios del Diseño Centrado en el Humano para crear soluciones que priorizan las necesidades del usuario.",
    image: humanCentredDesign,
  },
  {
    title: "Master's in Video Game Programming with Unity®",
    titleEs: "Máster en Programación de Videojuegos con Unity®",
    description: "Learned to develop and publish video games using Unity and C#. Studied game mechanics, 2D and 3D level design.",
    descriptionEs: "Aprendí a desarrollar y publicar videojuegos usando Unity y C#.",
    image: masterUnity,
  },
  {
    title: "Unity Junior Programmer",
    titleEs: "Programador Junior de Unity",
    description: "Learned to understand code, write application scripts, and debug programs. Gained skills in version control and code optimization.",
    descriptionEs: "Aprendí a entender código, escribir scripts y depurar programas.",
    image: unityJunior,
  },
  {
    title: "Unity Essentials",
    titleEs: "Fundamentos de Unity",
    description: "Learned about camera handling in Unity, lighting, and essential audio concepts.",
    descriptionEs: "Aprendí sobre manejo de cámaras en Unity, iluminación y conceptos esenciales de audio.",
    image: unityEssentials,
  },
  {
    title: "Characters Design",
    titleEs: "Diseño de Personajes",
    description: "Explored the fundamentals of character design, focusing on creating compelling and memorable characters.",
    descriptionEs: "Exploré los fundamentos del diseño de personajes.",
    image: disenoDePersonajes,
  },
  {
    title: "Unity VR Development",
    titleEs: "Desarrollo VR con Unity",
    description: "Learned to develop virtual reality experiences using Unity.",
    descriptionEs: "Aprendí a desarrollar experiencias de realidad virtual usando Unity.",
    image: unityVR,
  },
  {
    title: "Scrum Fundamentals",
    titleEs: "Fundamentos de Scrum",
    description: "Learned the accredited fundamentals of Scrum, including the values, roles, ceremonies, and artifacts.",
    descriptionEs: "Aprendí los fundamentos acreditados de Scrum.",
    image: scrum,
  },
  {
    title: "Data Visualization and Information Design",
    titleEs: "Visualización de Datos y Diseño de Información",
    description: "Discovered the possibilities offered by visual data presentation. Learned to find reliable sources and create effective pieces.",
    descriptionEs: "Descubrí las posibilidades de la presentación visual de datos.",
    image: dataVisualization,
  },
  {
    title: "HTML and CSS Definitive Course",
    titleEs: "Curso Definitivo de HTML y CSS",
    description: "Learned HTML and CSS and explored key concepts in frontend, backend, and full-stack development.",
    descriptionEs: "Aprendí HTML y CSS y exploré conceptos clave en desarrollo frontend y full-stack.",
    image: htmlYCss,
  },
  {
    title: "University of FrontEnd Development",
    titleEs: "Universidad de Desarrollo FrontEnd",
    description: "Web Development Fundamentals course covering HTML, CSS, and frontend concepts.",
    descriptionEs: "Curso de Fundamentos de Desarrollo Web cubriendo HTML, CSS y conceptos frontend.",
    image: universidadFront,
  }
];
