import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
  id?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  id,
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const animationClasses: Record<string, string> = {
    'fade-up': 'animate-fade-up',
    'fade-in': 'animate-fade-in',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'scale-in': 'animate-scale-in',
  };

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        'opacity-0',
        isInView && animationClasses[animation],
        className
      )}
      style={{
        animationDelay: isInView ? `${delay}ms` : '0ms',
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};
