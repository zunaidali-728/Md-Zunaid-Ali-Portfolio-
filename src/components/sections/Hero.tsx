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

  useEffect(() => {
    if (!nameRef.current || !subLine1Ref.current || !subLine2Ref.current) return;

    const sub1Text = 'Engineering premium digital products with backend depth and interface finesse.';
    subLine1Ref.current.innerHTML = sub1Text.split(' ').map((word) =>
      `<span class="inline-block overflow-hidden pb-1 -mb-1"><span class="inline-block sub-word1 opacity-0 translate-y-full">${word}</span></span>`
    ).join(' ');

    const tl = gsap.timeline({ delay: 0.45 });

    tl.to('.name-char', {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: 0.95,
      ease: 'power4.out',
      stagger: 0.035,
    }, 0);

    if (shimmerRef.current) {
      tl.to(shimmerRef.current, {
        x: nameRef.current.offsetWidth + 140,
        duration: 1.1,
        ease: 'power2.inOut',
        onComplete: () => {
          if (shimmerRef.current) shimmerRef.current.style.opacity = '0';
        },
      }, 0.8);
    }

    tl.fromTo(nameRef.current, { scale: 1.012 }, { scale: 1, duration: 0.45, ease: 'power2.out' }, 0.95);
    tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.65);
    tl.to('.sub-word1', { y: 0, opacity: 1, duration: 0.62, ease: 'power3.out', stagger: 0.045 }, 1.0);
    tl.fromTo(subLine2Ref.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, 1.35);
    tl.to('.cta-btn', { y: 0, opacity: 1, duration: 0.62, ease: 'power3.out', stagger: 0.1 }, 1.65);

    gsap.to(subLine2Ref.current.querySelectorAll('.tech-kw'), {
      color: '#D5B46F',
      duration: 0.35,
      stagger: 0.12,
      delay: 1.75,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.set(subLine2Ref.current?.querySelectorAll('.tech-kw') || [], { clearProps: 'color' });
      },
    });
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    lenis.scrollTo(target, { offset: -80, duration: 1.4 });
  };

  const nameString1 = 'Md Zunaid'.split('');
  const nameString2 = 'Ali.'.split('');

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute inset-x-6 top-24 bottom-8 md:inset-x-10 border border-[rgba(213,180,111,0.14)] pointer-events-none" />
      <div className="absolute left-6 top-24 h-14 w-14 border-l border-t border-gold/50 md:left-10" />
      <div className="absolute right-6 top-24 h-14 w-14 border-r border-t border-gold/50 md:right-10" />
      <div className="absolute bottom-8 left-6 h-14 w-14 border-l border-b border-gold/50 md:left-10" />
      <div className="absolute bottom-8 right-6 h-14 w-14 border-r border-b border-gold/50 md:right-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(213,180,111,0.10),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(6,6,6,0.82)_100%)] pointer-events-none" />

      <div ref={containerRef} className="max-w-[1280px] w-full px-6 flex flex-col items-center text-center z-10">
        <div ref={eyebrowRef} className="font-label text-gold uppercase tracking-[0.18em] text-[11px] opacity-0 translate-y-5">
          SOFTWARE ENGINEER / KOLKATA
        </div>

        <div className="h-10" />

        <div className="relative inline-block overflow-visible pb-2 pr-[0.06em]">
          <div
            ref={shimmerRef}
            className="absolute top-0 bottom-0 -left-[140px] w-[70px] pointer-events-none z-20 mix-blend-screen"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(213,180,111,0.42) 50%, transparent 100%)' }}
          />
          <h1 ref={nameRef} className="font-display font-black leading-[0.95] tracking-[0] whitespace-normal text-[clamp(42px,13vw,108px)] md:whitespace-nowrap md:text-[clamp(48px,6.8vw,108px)]">
            <span className="text-[#F7F0E2] inline-block whitespace-nowrap">
              {nameString1.map((char, i) => (
                <span key={`1-${i}`} className="inline-block overflow-hidden pb-4 -mb-4">
                  <span className="name-char inline-block opacity-0 translate-y-[110%] rotate-x-25 origin-bottom pr-[0.02em]">{char === ' ' ? '\u00A0' : char}</span>
                </span>
              ))}
            </span>
            <span className="text-gold italic block whitespace-nowrap md:inline-block md:ml-[0.12em]">
              {nameString2.map((char, i) => (
                <span key={`2-${i}`} className="inline-block overflow-hidden pb-4 -mb-4">
                  <span className="name-char inline-block opacity-0 translate-y-[110%] rotate-x-25 origin-bottom pr-[0.02em]">{char === ' ' ? '\u00A0' : char}</span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        <div className="h-7" />

        <div className="flex flex-col items-center">
          <div ref={subLine1Ref} className="font-body text-[clamp(16px,2vw,20px)] text-[#F7F0E2] font-normal max-w-[820px]" />
          <div ref={subLine2Ref} className="font-body text-[14px] md:text-[15px] font-light text-muted mt-[12px] max-w-[760px]">
            <span className="tech-kw">Java</span> / <span className="tech-kw">Spring Boot</span> / <span className="tech-kw">React</span> / <span className="tech-kw">Supabase</span> / <span className="tech-kw">Framer Motion</span>
          </div>
        </div>

        <div className="h-11" />

        <div className="flex flex-row justify-center items-center gap-4">
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="cta-btn opacity-0 translate-y-4 group relative overflow-hidden inline-flex items-center justify-center px-8 py-[14px] bg-gold text-[#080808] rounded-[4px] font-body font-medium text-[14px] tracking-[0.04em] shadow-[0_18px_60px_rgba(213,180,111,0.18)]"
          >
            <div className="absolute inset-0 bg-[#F7F0E2] clip-path-wipe-right opacity-0 group-hover:opacity-100 transition-all duration-350 ease-out z-0" />
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

        <div className="absolute bottom-12 left-1/2 hidden w-[min(460px,52vw)] -translate-x-1/2 md:block">
          <div className="h-[1px] animated-gold-line" />
          <div className="mt-5 font-label text-[10px] text-muted tracking-[0.46em]">SCROLL TO EXPLORE</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
