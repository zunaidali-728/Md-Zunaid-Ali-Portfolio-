import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitTextElements } from './useCursor';

gsap.registerPlugin(ScrollTrigger);

export const useParallax = <T extends HTMLElement = HTMLDivElement>(speed: number) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Parallax using a yPercent shift
    // For background (slower), speed < 1. For foreground (faster) speed > 1
    const yValue = speed * 100;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: yValue,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

export const useTextReveal = <T extends HTMLElement = HTMLHeadingElement>(stagger: number = 0.018) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Custom Split
    const chars = splitTextElements(ref.current, 'chars');

    const ctx = gsap.context(() => {
      gsap.fromTo(chars, 
        { y: '120%', opacity: 0, rotationZ: 8 },
        { 
          y: '0%', 
          opacity: 1, 
          rotationZ: 0, 
          ease: 'power3.out',
          duration: 0.9,
          stagger: stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, [stagger]);

  return ref;
};

export const useWordReveal = <T extends HTMLElement = HTMLParagraphElement>(stagger: number = 0.04) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const words = splitTextElements(ref.current, 'words');

    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.8,
          stagger: stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, [stagger]);

  return ref;
};

export const useLineReveal = <T extends HTMLElement = HTMLElement>(stagger: number = 0.12) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const lines = splitTextElements(ref.current, 'lines');

    const ctx = gsap.context(() => {
      gsap.fromTo(lines,
        { y: '100%' },
        {
          y: '0%',
          ease: 'power3.out',
          duration: 0.9,
          stagger: stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, [stagger]);

  return ref;
};
