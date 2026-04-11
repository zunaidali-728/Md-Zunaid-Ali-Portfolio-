import { useEffect, useRef } from 'react';
import { SectionLayout } from '../layout/SectionLayout';
import { portfolioData } from '../../data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;
    
    const ctx = gsap.context(() => {
      // 1. Line drawing scrub
      const length = lineRef.current?.getTotalLength() || 1000;
      gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1.5,
        }
      });

      // 2. Node and Card stagger animations
      const cards = gsap.utils.toArray('.exp-card-container') as HTMLElement[];
      
      cards.forEach((card, i) => {
        const node = card.querySelector('.exp-node');
        const nodeRing = card.querySelector('.exp-node-ring');
        const period = card.querySelector('.exp-period');
        const company = card.querySelector('.exp-company');
        const role = card.querySelector('.exp-role');
        const bulletItems = card.querySelectorAll('.exp-bullet');
        const bgPanel = card.querySelector('.exp-bg-panel');

        // SplitType for Company name
        const splitCompany = new SplitType(company as HTMLElement, { types: 'lines', lineClass: 'overflow-hidden' });
        splitCompany.lines?.forEach((line: HTMLElement) => {
           const inner = document.createElement('div');
           inner.innerHTML = line.innerHTML;
           line.innerHTML = '';
           line.appendChild(inner);
        });
        const companyInners = card.querySelectorAll('.exp-company > .overflow-hidden > div');

        ScrollTrigger.create({
            trigger: card,
            start: 'top 70%', 
            onEnter: () => {
                // Node Pulse
                if (node) gsap.fromTo(node, { scale: 1 }, { scale: 2.5, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 });
                // Ripple ring
                if (nodeRing) gsap.fromTo(nodeRing, { scale: 1, opacity: 0.8 }, { scale: 3.5, opacity: 0, duration: 0.8, ease: "power2.out" });

                // Card content
                if (period) gsap.fromTo(period, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
                if (companyInners.length) gsap.fromTo(companyInners, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power2.out', stagger: 0.1 });
                if (role) gsap.fromTo(role, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.25, ease: 'power2.out' });
                
                // Bullets
                if (bulletItems.length) {
                  gsap.fromTo(bulletItems, 
                    { x: i % 2 === 0 ? -15 : 15, opacity: 0 }, 
                    { x: 0, opacity: 1, duration: 0.4, delay: 0.4, ease: 'power2.out', stagger: 0.1 }
                  );
                }
                
                // Card outline flash (like the badge in education)
                if (bgPanel) {
                  gsap.to(bgPanel, {
                      borderColor: '#C8A96E',
                      duration: 0.3,
                      delay: 0.6,
                      yoyo: true,
                      repeat: 1,
                      onComplete: () => {
                          gsap.set(bgPanel, { clearProps: 'borderColor' })
                      }
                  });
                }
            }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionLayout id="experience" number="02" eyebrow="EXPERIENCE">
      <h2 className="font-display text-display text-text mb-24 relative z-10">
        Where I've worked.
      </h2>

      <div ref={containerRef} className="relative mt-12 w-full max-w-[1000px] mx-auto z-10">
        {/* Center Line SVG */}
        <div className="absolute top-0 left-0 md:left-1/2 -translate-x-[2px] w-[2px] h-full hidden md:block z-0 pointer-events-none">
          <svg className="w-[10px] h-full" preserveAspectRatio="none">
            <line 
              ref={lineRef as any}
              x1="2" y1="0" x2="2" y2="100%" 
              className="stroke-gold stroke-1 opacity-50" 
            />
          </svg>
        </div>

        {/* Timeline Cards */}
        {portfolioData.experience.map((exp, i) => {
          const isRight = i % 2 === 0;

          return (
            <div key={i} className={`exp-card-container group relative flex flex-col md:flex-row items-center justify-between md:justify-normal w-full mb-16 last:mb-0 ${isRight ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Node on center line */}
              <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 w-[12px] h-[12px] z-10 hidden md:block">
                 {/* Ripple */}
                 <div className="exp-node-ring absolute inset-[1px] border border-gold rounded-full opacity-0 pointer-events-none" />
                 {/* Dot */}
                 <div className="exp-node absolute inset-[2px] bg-gold rounded-full group-hover:opacity-100 opacity-60 md:opacity-100 transition-opacity duration-300 border border-background" />
              </div>

              {/* Empty space for alternate column (desktop only) */}
              <div className="hidden md:block w-[calc(50%-40px)]" />

              {/* Card Content */}
              <div className={`w-full md:w-[calc(50%-40px)] ${isRight ? 'md:text-left' : 'md:text-right'}`}>
                <div className="exp-bg-panel bg-[rgba(8,8,8,0.4)] md:bg-surface border border-[#1A1A1A] p-8 rounded-[6px] transition-all duration-300 hover:border-gold hover:-translate-y-2 hover:bg-[rgba(200,169,110,0.03)] cursor-default">
                  
                  <div className={`exp-period font-label text-gold mb-4 flex flex-col md:flex-row gap-2 opacity-0 ${isRight ? 'md:justify-start' : 'md:justify-end'}`}>
                    <span>{exp.period}</span>
                    <span className="hidden md:inline text-muted">·</span>
                    <span className="text-muted">{exp.location}</span>
                  </div>
                  
                  <h3 className="exp-company font-display text-[26px] text-text group-hover:text-gold transition-colors duration-300 mb-2 leading-tight">
                    {exp.company}
                  </h3>
                  
                  <p className="exp-role font-body text-muted mb-6 text-[15px] opacity-0">
                    {exp.role}
                  </p>
                  
                  <ul className={`text-left text-[14px] font-body text-muted space-y-3 ${isRight ? 'ml-0 md:ml-4 list-disc' : 'md:text-right list-none'}`}>
                    {exp.bullets.map((bullet: string, idx: number) => (
                      <li key={idx} className="exp-bullet leading-relaxed relative opacity-0">
                        {!isRight && <span className="absolute right-[-16px] top-[8px] w-1 h-1 bg-gold rounded-full opacity-50 hidden md:block" />}
                        <span className="group-hover:text-[#F0EBE1] transition-colors duration-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </SectionLayout>
  );
};

export default Experience;
