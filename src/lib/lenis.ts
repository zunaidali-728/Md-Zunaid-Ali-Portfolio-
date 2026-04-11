import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

export const lenis = new Lenis({
  lerp: 0.075,
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeInOutCubic approx
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
});

// Create a unified tick for GSAP and Lenis
export const initSmoothScroll = () => {
  // Add lenis to GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Turn off GSAP default lag smoothing to avoid conflicts with smooth scroll
  gsap.ticker.lagSmoothing(0);
  
  // Update ScrollTrigger on scroll
  lenis.on('scroll', () => {
    // ScrollTrigger.update(); // We don't always need this directly if ticket handles it, but good fallback
  });
};
