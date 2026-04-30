import { useEffect, useRef } from 'react';
import { SectionLayout } from '../layout/SectionLayout';
import { useTextReveal, useParallax } from '../../hooks/useGsapHooks';
import { portfolioData } from '../../data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { id: 'Languages', title: 'LANGUAGES', count: portfolioData.skills.Languages.length, items: portfolioData.skills.Languages },
  { id: 'Frameworks', title: 'FRAMEWORKS', count: portfolioData.skills.Frameworks.length, items: portfolioData.skills.Frameworks },
  { id: 'Databases', title: 'DATABASES', count: portfolioData.skills.Databases.length, items: portfolioData.skills.Databases },
  { id: 'Tools', title: 'TOOLS', count: portfolioData.skills.Tools.length, items: portfolioData.skills.Tools },
];

const Skills = () => {
  const headingRef = useTextReveal();
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useParallax(0.4);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      // 4. Horizontal and Vertical Cross-hair gap lines draw
      const horizontalLine = gridRef.current?.querySelector('.gap-hz');
      const verticalLine = gridRef.current?.querySelector('.gap-vt');
      
      if (horizontalLine) {
        gsap.fromTo(horizontalLine, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 0.6, ease: 'power2.out', transformOrigin: 'left', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
        );
      }
      if (verticalLine) {
        gsap.fromTo(verticalLine, 
          { scaleY: 0 }, 
          { scaleY: 1, duration: 0.6, delay: 0.1, ease: 'power2.out', transformOrigin: 'top', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
        );
      }

      // Panel animations
      const panelsEls = gsap.utils.toArray('.skill-panel') as HTMLElement[];
      panelsEls.forEach((panel, i) => {
        const delay = i * 0.1;
        
        // 1. GRID REVEAL
        gsap.fromTo(panel,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: delay, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
        );

        // Panel Corner Accents Reveal
        const beforeRules = panel.querySelector('.accent-h');
        const afterRules = panel.querySelector('.accent-v');
        if(beforeRules && afterRules) {
            gsap.fromTo([beforeRules, afterRules],
                { scaleX: 0, scaleY: 0 },
                { scaleX: 1, scaleY: 1, duration: 0.4, delay: delay + 0.2, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
            );
        }

        // 2. CATEGORY LABEL REVEAL
        const label = panel.querySelector('.cat-label');
        if (label) {
          gsap.fromTo(label,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 0.5, delay: delay + 0.2, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
          );
        }

        // 3. SKILL TAGS
        const tags = panel.querySelectorAll('.skill-tag');
        if(tags.length) {
            gsap.fromTo(tags,
                { scale: 0.85, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, delay: delay + 0.3, stagger: 0.04, ease: 'back.out(1.4)', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
            )
        }
      });

    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionLayout id="skills" number="03" eyebrow="SKILLS">
      <div ref={containerRef} className="relative z-10 w-full">
        {/* BACKGROUND ACCENT text */}
        <div 
          ref={bgTextRef as any}
          className="absolute -top-[60px] -right-[30px] font-display text-[220px] md:text-[300px] text-[#F0EBE1] opacity-[0.025] pointer-events-none z-0"
          style={{ lineHeight: 0.8 }}
        >
          SKILLS
        </div>

        <h2 ref={headingRef} className="font-display text-display text-text max-w-[800px] mb-16 relative z-10">
          A stack shaped for polished products.
        </h2>

        {/* 2x2 Grid Container */}
        <div ref={gridRef} className="relative max-w-[1100px] mx-auto border border-gold/15 bg-gold/10 z-10 rounded-[8px] overflow-hidden shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            {panels.map((panel) => (
              <div 
                key={panel.id} 
                className="skill-panel group relative bg-[#080808]/95 sm:bg-[rgba(255,255,255,0.018)] px-6 py-8 md:px-[40px] md:py-[36px] overflow-hidden transition-all duration-300 hover:bg-[rgba(213,180,111,0.045)] hover:shadow-[0_0_0_1px_rgba(213,180,111,0.24)] hover:z-10"
              >
                {/* L-Shape Corner Accents */}
                <div className="accent-h absolute top-0 left-0 w-[20px] h-[1px] bg-gold origin-left" />
                <div className="accent-v absolute top-0 left-0 w-[1px] h-[20px] bg-gold origin-top" />

                <div className="cat-label flex items-center mb-4">
                  <span className="font-body text-[11px] uppercase tracking-[0.14em] text-gold">{panel.title}</span>
                  <span className="font-body text-[11px] text-[#5C5C5C] ml-3">( {panel.count} )</span>
                </div>

                {/* Horizontal rule */}
                <div className="w-full h-[1px] bg-[#1E1E1E] mb-6" />

                <div className="flex flex-wrap gap-3">
                  {panel.items.map((skill) => (
                    <div 
                      key={skill}
                      className="skill-tag relative group/tag font-body text-[13px] text-[#B8B0A1] border border-gold/15 bg-black/10 rounded-[3px] px-[18px] py-[8px] transition-all duration-250 ease-out hover:border-gold hover:text-[#F0EBE1] hover:bg-[rgba(213,180,111,0.08)] overflow-hidden cursor-default flex items-center"
                    >
                      {/* Gold dot hover effect */}
                      <div className="w-[4px] h-[4px] bg-gold rounded-full absolute left-[8px] transform -translate-x-[8px] opacity-0 group-hover/tag:translate-x-0 group-hover/tag:opacity-100 transition-all duration-200" />
                      <span className="group-hover/tag:transform group-hover/tag:translate-x-[6px] transition-transform duration-200 inline-block overflow-visible">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Gap lines specifically for drawing animation */}
          <div className="gap-hz hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#1E1E1E] pointer-events-none" />
          <div className="gap-vt hidden md:block absolute top-0 left-1/2 w-[1px] h-full bg-[#1E1E1E] pointer-events-none" />
        </div>
      </div>
    </SectionLayout>
  );
};

export default Skills;
