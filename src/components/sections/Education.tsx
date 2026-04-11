import { useEffect, useRef } from 'react';
import { SectionLayout } from '../layout/SectionLayout';
import { portfolioData } from '../../data/portfolio';
import { useParallax } from '../../hooks/useGsapHooks';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useParallax(0.35);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      // Line scrub drawing
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { 
          scaleX: 1, 
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'center center',
            scrub: 1.5,
          }
        }
      );

      // Node and Card stagger animations
      const cards = gsap.utils.toArray('.edu-card') as HTMLElement[];
      
      cards.forEach((card, i) => {
        const node = card.querySelector('.edu-node');
        const nodeRing = card.querySelector('.edu-node-ring');
        const year = card.querySelector('.edu-year');
        const school = card.querySelector('.edu-school');
        const degree = card.querySelector('.edu-degree');
        const badge = card.querySelector('.edu-badge');

        const splitSchool = new SplitType(school as HTMLElement, { types: 'lines', lineClass: 'overflow-hidden' });
        splitSchool.lines?.forEach((line: HTMLElement) => {
           const inner = document.createElement('div');
           inner.innerHTML = line.innerHTML;
           line.innerHTML = '';
           line.appendChild(inner);
        });
        const schoolInners = card.querySelectorAll('.edu-school > .overflow-hidden > div');

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: `top ${75 - (i * 20)}%`, // Approximate line tracking
            onEnter: () => {
                // Node Pulse
                gsap.fromTo(node, { scale: 1 }, { scale: 2.5, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 });
                // Ripple ring
                gsap.fromTo(nodeRing, { scale: 1, opacity: 0.8 }, { scale: 3.5, opacity: 0, duration: 0.8, ease: "power2.out" });

                // Card content
                gsap.fromTo(year, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
                gsap.fromTo(schoolInners, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power2.out', stagger: 0.1 });
                gsap.fromTo(degree, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.25, ease: 'power2.out' });
                
                // Badge
                gsap.fromTo(badge, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, delay: 0.4, ease: 'back.out(1.5)' });
                // Badge border flash
                gsap.to(badge, {
                    borderColor: '#C8A96E',
                    duration: 0.3,
                    delay: 0.6,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        gsap.set(badge, { clearProps: 'borderColor' })
                    }
                });
            }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionLayout id="education" number="05" eyebrow="EDUCATION">
      <div ref={containerRef} className="relative w-full max-w-[1000px] z-10 pt-10">

        {/* BACKGROUND ACCENT text */}
        <div 
          ref={bgTextRef as any}
          className="absolute bottom-[-100px] right-[-50px] font-display text-[250px] text-[#F0EBE1] opacity-[0.02] pointer-events-none z-0 tracking-tighter"
          style={{ lineHeight: 0.8 }}
        >
          2025
        </div>

        <h2 className="font-display text-display text-text mb-32 max-w-[800px] relative z-10">
          Academic background
        </h2>

        {/* Desktop Timeline (Horizontal) / Mobile Stack (Vertical) */}
        <div className="relative mt-20 md:mt-32 pt-8 border-l border-[rgba(200,169,110,0.2)] md:border-l-0 md:pt-0 z-10">
          
          {/* Horizontal Line (Desktop) */}
          <div 
            ref={lineRef} 
            className="hidden md:block absolute top-[6px] left-0 w-full h-[1px] bg-gold opacity-50" 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 ml-8 md:ml-0">
            {portfolioData.education.map((edu, i) => (
              <div 
                key={i} 
                className="edu-card group relative flex flex-col pt-0 md:pt-12 transition-transform duration-300 hover:-translate-y-2 cursor-default"
              >
                {/* Timeline Node Container */}
                <div className="absolute -left-[39px] md:-left-auto md:top-[1px] md:left-0 top-0 w-[12px] h-[12px]">
                   {/* Ripple */}
                   <div className="edu-node-ring absolute inset-[1px] border border-gold rounded-full opacity-0 pointer-events-none" />
                   {/* Dot */}
                   <div className="edu-node absolute inset-[2px] bg-gold rounded-full group-hover:opacity-100 opacity-60 md:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="edu-year font-label text-gold mb-3 md:mt-2 opacity-0">
                  {edu.period}
                </div>
                <h3 className="edu-school font-display text-[22px] text-text group-hover:text-gold transition-colors duration-300 leading-snug mb-3">
                  {edu.institution}
                </h3>
                <p className="edu-degree font-body text-[15px] text-muted mb-6 opacity-0">
                  {edu.degree}
                </p>
                
                <div className="mt-auto pt-4 border-t border-[#1E1E1E] inline-block w-fit">
                  <span className="edu-badge font-body text-[13px] text-gold font-medium bg-[rgba(200,169,110,0.08)] border border-[rgba(200,169,110,0.3)] px-[14px] py-[6px] rounded-[4px] group-hover:bg-[rgba(200,169,110,0.16)] group-hover:border-gold transition-all duration-300 opacity-0 inline-block">
                    {edu.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionLayout>
  );
};

export default Education;
