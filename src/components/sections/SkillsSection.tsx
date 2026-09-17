import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/AnimatedSection';

interface SkillCategory {
  title: string;
  titleEs: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
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

export const SkillsSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="skills" className="py-24 md:py-32 lg:py-40 relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-glow-gradient opacity-20" />
      
      <div className="section-container">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-4">
            {language === 'en' ? 'Toolkit' : 'Kit de Herramientas'}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">{t('skills.title')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4 text-sm md:text-base leading-relaxed">
            {t('skills.subtitle')}
          </p>
        </AnimatedSection>

        {/* Categories grid — 2 column layout on desktop */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {skillCategories.map((category, catIndex) => (
            <AnimatedSection 
              key={category.title} 
              animation="fade-up" 
              delay={catIndex * 60}
              className={catIndex === skillCategories.length - 1 && skillCategories.length % 2 !== 0 ? 'md:col-span-2 md:max-w-[calc(50%-0.75rem)]' : ''}
            >
              <div className="glass rounded-2xl p-6 h-full group hover:border-primary/20 transition-colors duration-300">
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-primary">
                  {language === 'en' ? category.title : category.titleEs}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-full text-sm font-medium bg-secondary text-foreground hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/30 transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
