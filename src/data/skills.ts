// Toolkit data: every technology the user works with.
// Extracted verbatim from the original SkillsSection (v1) — do not trim.

export interface SkillCategory {
  title: string;
  titleEs: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Product Design',
    titleEs: 'Diseño de Producto',
    skills: ['Figma', 'Adobe XD', 'Pencil.dev', 'Prototyping', 'Wireframing', 'Design Systems', 'User Testing'],
  },
  {
    title: 'Visual & Motion',
    titleEs: 'Visual y Motion',
    skills: ['Photoshop', 'Illustrator', 'Adobe Animate', 'Blender', 'Canva', 'CapCut', 'Adobe Firefly', 'Lottie'],
  },
  {
    title: 'Development',
    titleEs: 'Desarrollo',
    skills: ['HTML', 'CSS', 'JavaScript', 'Unity', 'C#', 'Java', 'Git', 'React'],
  },
  {
    title: 'AI & Workflow',
    titleEs: 'IA y Workflow',
    skills: ['Figma Make', 'Lovable', 'Perplexity', 'Claude', 'ChatGPT', 'Gemini', 'n8n', 'Antigravity'],
  },
  {
    title: 'UX Research',
    titleEs: 'Investigación UX',
    skills: ['User Interviews', 'Usability Testing', 'Personas', 'Journey Mapping', 'A/B Testing', 'Heuristic Evaluation'],
  },
  {
    title: 'Simulation & XR',
    titleEs: 'Simulación y XR',
    skills: ['VR Development', 'AR Development', '3D Modeling', 'Game Design', 'Interactive Environments'],
  },
  {
    title: 'Methodology',
    titleEs: 'Metodología',
    skills: ['Agile/Scrum', 'Design Thinking', 'Lean UX', 'Project Management', 'Team Leadership'],
  },
];
