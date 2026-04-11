import React from 'react';
import { useParallax } from '../../hooks/useGsapHooks';

interface SectionLayoutProps {
  id: string;
  number: string;
  eyebrow: string;
  children: React.ReactNode;
}

export const SectionLayout: React.FC<SectionLayoutProps> = ({ id, number, eyebrow, children }) => {
  const numberRef = useParallax(0.6);

  return (
    <section id={id} className="relative w-full py-[100px] md:py-[160px] overflow-hidden">
      {/* Decorative Number */}
      <div 
        ref={numberRef}
        className="absolute top-0 md:-top-16 left-4 md:left-12 font-display text-[140px] md:text-[200px] leading-none text-text opacity-[0.04] pointer-events-none select-none z-0"
      >
        {number}
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10 w-full">
        {/* Eyebrow */}
        <div className="font-label text-gold mb-16 inline-block relative pr-12">
          {eyebrow}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gold opacity-50" />
        </div>
        
        {/* Content */}
        {children}
      </div>

      <div className="hr-gold absolute bottom-0 left-0" />
    </section>
  );
};
