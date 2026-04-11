import { useEffect, useRef, useState } from 'react';
import { SectionLayout } from '../layout/SectionLayout';
import { useWordReveal } from '../../hooks/useGsapHooks';
import { portfolioData } from '../../data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated Counter component
const AnimatedCounter = ({ value, suffix = '', label, sublabel }: any) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!nodeRef.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !nodeRef.current) return;
    
    const obj = { val: 0 };
    let animDuration = 2;
    if (value === 1) animDuration = 0.8;
    else if (value === 15) animDuration = 1.5;

    gsap.to(obj, {
      val: value,
      duration: animDuration,
      ease: 'power3.out',
      onUpdate: () => {
        if (nodeRef.current) {
          const formatted = value % 1 !== 0 ? obj.val.toFixed(2) : Math.floor(obj.val);
          const valEl = nodeRef.current.querySelector('.counter-val');
          if (valEl) valEl.innerHTML = `${formatted}${suffix}`;
        }
      }
    });
  }, [inView, value, suffix]);

  return (
    <div ref={nodeRef} className="flex flex-col gap-2">
      <div className="font-display text-heading text-gold counter-val tracking-tight">0{suffix}</div>
      <div>
        <div className="font-label text-text">{label}</div>
        <div className="font-body text-[13px] text-muted">{sublabel}</div>
      </div>
    </div>
  );
};


const About = () => {
  const contentRef = useWordReveal();
  
  // Photo Refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    // Media query to disable on mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    // Lerp state
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let reqId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || !outerRef.current) return;
      
      const rect = outerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize to -1 to +1
      target.x = (e.clientX - centerX) / (rect.width / 2);
      target.y = (e.clientY - centerY) / (rect.height / 2);
    };

    const handleMouseLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    if (!isMobile && sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
      sectionRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      const render = () => {
        // Lerp
        current.x += (target.x - current.x) * 0.08;
        current.y += (target.y - current.y) * 0.08;
        
        if (outerRef.current) {
            outerRef.current.style.transform = `rotateX(${current.y * -10}deg) rotateY(${current.x * 12}deg)`;
        }
        if (imgRef.current) {
            imgRef.current.style.transform = `translate(${current.x * 8}px, ${current.y * 6}px)`;
        }
        if (frameRef.current) {
            frameRef.current.style.transform = `translate(${current.x * 14}px, ${current.y * 10}px)`;
        }
        if (svgRef.current) {
            svgRef.current.style.transform = `translate(${current.x * 18}px, ${current.y * 14}px)`;
        }

        reqId = requestAnimationFrame(render);
      };
      reqId = requestAnimationFrame(render);
    }

    // Scroll Animations
    if (outerRef.current && rectRef.current) {
        // Set perimeter for dash array
        const pathLen = 3000; // approximate
        rectRef.current.style.strokeDasharray = `${pathLen}`;
        rectRef.current.style.strokeDashoffset = `${pathLen}`;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%"
                }
            });

            // Step 1: Reveal from top to bottom
            tl.fromTo(outerRef.current,
                { clipPath: 'inset(0 0 100% 0)' },
                { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out' },
                0
            );

            // Step 2: Slight scale
            tl.fromTo(outerRef.current,
                { scale: 1.04 },
                { scale: 1.0, duration: 0.9, ease: 'power3.out' },
                0.2
            );

            // Step 3: Draw border ring
            tl.to(rectRef.current, {
                strokeDashoffset: 0,
                duration: 2.0,
                ease: 'power2.inOut'
            }, 0.9);

            // Step 4: L-Corners
            const corners = gsap.utils.toArray('.frame-corner') as HTMLElement[];
            gsap.set(corners, { scale: 0 });
            tl.to(corners, {
                scale: 1,
                duration: 0.4,
                stagger: 0.08,
                ease: 'back.out(1.5)'
            }, 1.1);

            // Step 5: Flash
            tl.to(imgRef.current, {
                filter: 'brightness(1.15)',
                duration: 0.2,
                yoyo: true,
                repeat: 1
            }, 1.4);

        }, sectionRef);

        return () => {
            ctx.revert();
            if (sectionRef.current) {
                sectionRef.current.removeEventListener('mousemove', handleMouseMove);
                sectionRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(reqId);
        };
    }
  }, []);

  return (
    <div ref={sectionRef}>
    <SectionLayout id="about" number="01" eyebrow="ABOUT ME">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        
        {/* Left Column (60) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <h2 className="font-display text-display text-text leading-tight max-w-[600px]">
            Passionate about systems that scale.
          </h2>
          
          <div ref={contentRef as any} className="font-body text-body-lg text-muted max-w-[560px]">
            {portfolioData.personal.bio}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-6 pt-10 border-t border-border">
            {portfolioData.stats.map((stat, i) => (
              <AnimatedCounter key={i} {...stat} />
            ))}
          </div>
        </div>

        {/* Right Column (40) */}
        <div className="lg:col-span-5 relative lg:pl-10 mt-10 lg:mt-0 flex justify-center perspective-[900px] z-20">
            
            {/* Outer Container with 3D space */}
            <div 
                ref={outerRef} 
                className="photo-outer group relative w-[320px] h-[400px] md:w-[420px] md:h-[520px] p-0 transform-style-3d cursor-crosshair transition-transform duration-300 ease-out hover:scale-[1.015]"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* SVG Overlay Border */}
                <svg 
                    ref={svgRef}
                    className="absolute -top-[16px] -bottom-[16px] -left-[16px] -right-[16px] w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-30 transition-all duration-400 group-hover:opacity-100 opacity-60" 
                    fill="none"
                >
                    <rect 
                        ref={rectRef}
                        x="1" y="1" 
                        width="calc(100% - 2px)" height="calc(100% - 2px)" 
                        rx="8" ry="8" 
                        stroke="#C8A96E" 
                        strokeWidth="1" 
                        className="group-hover:stroke-[1.5px] transition-all duration-400"
                    />
                </svg>

                {/* Inner Frame */}
                <div 
                    ref={frameRef}
                    className="photo-frame absolute inset-0 rounded-[6px] overflow-visible z-20"
                >
                    <div className="frame-corner absolute top-0 left-0 w-8 h-[2px] bg-gold origin-left" />
                    <div className="frame-corner absolute top-0 left-0 w-[2px] h-8 bg-gold origin-top" />
                    
                    <div className="frame-corner absolute bottom-0 right-0 w-8 h-[2px] bg-gold origin-right" />
                    <div className="frame-corner absolute bottom-0 right-0 w-[2px] h-8 bg-gold origin-bottom" />
                </div>

                {/* Image itself */}
                <div className="photo-img-container overflow-hidden rounded-[4px] w-full h-full absolute inset-0 z-10 bg-surface border border-[#1A1A1A]">
                    <img 
                        ref={imgRef}
                        src={portfolioData.personal.avatar} 
                        alt="Md Zunaid Ali" 
                        className="w-[110%] h-[110%] object-cover absolute top-[-5%] left-[-5%] transition-all duration-400 group-hover:brightness-[1.08]"
                        style={{ filter: 'brightness(1.0)' }}
                    />
                </div>
            </div>

        </div>
        
      </div>
    </SectionLayout>
    </div>
  );
};

export default About;
