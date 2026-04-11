import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { lenis } from '../../lib/lenis';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subLine1Ref = useRef<HTMLDivElement>(null);
  const subLine2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameRef.current || !subLine1Ref.current || !subLine2Ref.current) return;

    // Split subLine1 words
    const sub1Text = "Backend engineer by day. Android tinkerer by night.";
    subLine1Ref.current.innerHTML = sub1Text.split(' ').map((word) => 
      `<span class="inline-block overflow-hidden pb-1 -mb-1"><span class="inline-block sub-word1 opacity-0 translate-y-full">${word}</span></span>`
    ).join(' ');

    const tl = gsap.timeline({ delay: 0.3 });

    // PHASE 1 - Curtain Lift
    tl.to('.name-char', {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: 0.85,
      ease: 'power4.out',
      stagger: 0.035,
    }, 0);

    // PHASE 2 - Gold Shimmer
    if (shimmerRef.current) {
      tl.to(shimmerRef.current, {
        x: nameRef.current.offsetWidth + 120, // Sweep past
        duration: 1.0,
        ease: 'power2.inOut',
        onComplete: () => {
          if (shimmerRef.current) shimmerRef.current.style.opacity = '0';
        }
      }, 0.7);
    }

    // PHASE 3 - Subtle Settle
    tl.fromTo(nameRef.current, 
      { scale: 1.008 },
      { scale: 1, duration: 0.4, ease: 'power2.out' },
      0.9
    );

    // PHASE 4 - Supporting Content
    tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.6);
    
    // Subheadline Line 1
    tl.to('.sub-word1', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.05 }, 0.9);
    
    // Subheadline Line 2
    tl.fromTo(subLine2Ref.current, 
        { y: 12, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
        1.3
    );

    // Tech keywords highlight inside Line 2
    const kw = subLine2Ref.current.querySelectorAll('.tech-kw');
    gsap.to(kw, {
        color: '#C8A96E',
        duration: 0.3,
        stagger: 0.15,
        delay: 1.6,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            gsap.set(kw, { clearProps: 'color' })
        }
    });

    tl.to('.cta-btn', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 1.6);

  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    lenis.scrollTo(target, { offset: -80, duration: 1.4 });
  };

  const nameString1 = "Md Zunaid".split('');
  const nameString2 = " Ali.".split('');

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      <div ref={containerRef} className="max-w-[1280px] w-full px-6 flex flex-col items-center text-center z-10">
        
        {/* Eyebrow Label */}
        <div ref={eyebrowRef} className="font-label text-gold uppercase tracking-[0.12em] text-[11px] opacity-0 translate-y-5">
          SOFTWARE ENGINEER · KOLKATA
        </div>
        
        <div className="h-10" /> {/* 40px gap */}

        {/* Main Headline */}
        <div className="relative inline-block overflow-visible pb-2 pr-[0.06em]">
          {/* Shimmer pseudo-element substitute */}
          <div 
            ref={shimmerRef} 
            className="absolute top-0 bottom-0 -left-[120px] w-[60px] pointer-events-none z-20 mix-blend-screen"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.35) 50%, transparent 100%)' }}
          />
          <h1 
            ref={nameRef} 
            className="font-display font-black leading-[0.92] tracking-[-0.02em] whitespace-nowrap text-[clamp(48px,6.8vw,108px)]"
          >
            <span className="text-[#F0EBE1] inline-block whitespace-nowrap">
              {nameString1.map((char, i) => (
                <span key={`1-${i}`} className="inline-block overflow-hidden pb-4 -mb-4">
                  <span className="name-char inline-block opacity-0 translate-y-[110%] rotate-x-25 origin-bottom pr-[0.02em]">{char === ' ' ? '\u00A0' : char}</span>
                </span>
              ))}
            </span>
            <span className="text-gold italic inline-block whitespace-nowrap">
              {nameString2.map((char, i) => (
                <span key={`2-${i}`} className="inline-block overflow-hidden pb-4 -mb-4">
                  <span className="name-char inline-block opacity-0 translate-y-[110%] rotate-x-25 origin-bottom pr-[0.02em]">{char === ' ' ? '\u00A0' : char}</span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        <div className="h-7" /> {/* 28px gap */}

        {/* Subheadline block */}
        <div className="flex flex-col items-center">
            {/* Line 1 */}
            <div ref={subLine1Ref} className="font-body text-[18px] text-[#F0EBE1] font-normal" />
            {/* Line 2 */}
            <div ref={subLine2Ref} className="font-body text-[15px] font-light text-[#5C5C5C] mt-[10px]">
                <span className="tech-kw">Java</span> · <span className="tech-kw">Spring Boot</span> · <span className="tech-kw">REST APIs</span> · <span className="tech-kw">Android</span> — shipped from Kolkata.
            </div>
        </div>

        <div className="h-11" /> {/* 44px gap */}

        {/* CTA Buttons Row */}
        <div ref={ctaRef} className="flex flex-row justify-center items-center gap-4">
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="cta-btn opacity-0 translate-y-4 group relative overflow-hidden inline-flex items-center justify-center px-8 py-[14px] bg-gold text-[#080808] rounded-[4px] font-body font-medium text-[14px] tracking-[0.04em]"
          >
            <div className="absolute inset-0 bg-[#F0EBE1] clip-path-wipe-right opacity-0 group-hover:opacity-100 transition-all duration-350 ease-out z-0" />
            <span className="relative z-10 transition-colors duration-350 text-[#080808]">View Projects</span>
          </a>
          
          <a 
            href="#contact" 
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="cta-btn opacity-0 translate-y-4 group relative overflow-hidden inline-flex items-center justify-center px-8 py-[14px] bg-transparent border border-gold text-gold rounded-[4px] font-body font-medium text-[14px] tracking-[0.04em]"
          >
            <div className="absolute inset-0 bg-gold clip-path-wipe-right opacity-0 group-hover:opacity-100 transition-all duration-350 ease-out z-0" />
            <span className="relative z-10 transition-colors duration-350 group-hover:text-[#080808]">Get in Touch</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
