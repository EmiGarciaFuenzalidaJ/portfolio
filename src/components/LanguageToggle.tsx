import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-2 py-1 rounded transition-all duration-300 font-medium',
          language === 'en' 
            ? 'text-primary' 
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </button>
      <span className="text-muted-foreground">/</span>
      <button
        onClick={() => setLanguage('es')}
        className={cn(
          'px-2 py-1 rounded transition-all duration-300 font-medium',
          language === 'es' 
            ? 'text-primary' 
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        ES
      </button>
    </div>
  );
};
