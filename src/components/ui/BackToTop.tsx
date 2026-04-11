import { useEffect, useState } from 'react';
import { lenis } from '../../lib/lenis';
import { useScroll } from 'framer-motion';

export const BackToTop = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const shouldShow = latest > 0.3;
      if (shouldShow && !isVisible) {
        setIsVisible(true);
        setHasAnimatedIn(true);
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
      }
    });
  }, [scrollYProgress, isVisible]);

  const handleScrollTop = () => {
    lenis.scrollTo(0, { duration: 2.0, easing: (t) => 1 - Math.pow(1 - t, 4) });
  };

  return (
    <button
      onClick={handleScrollTop}
      className={`fixed z-[200] flex items-center justify-center bg-transparent border border-gold rounded-full w-[42px] h-[42px] md:w-[48px] md:h-[48px] bottom-[20px] right-[20px] md:bottom-[36px] md:right-[36px] group transition-all duration-300 ease-out cursor-pointer hover:bg-gold hover:scale-[1.08] ${
        isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-[0.8] pointer-events-none'
      } ${isVisible && hasAnimatedIn ? 'animate-[spinBack_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]' : ''}`}
      aria-label="Back to top"
    >
      <svg 
        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className="group-hover:stroke-[#080808] transition-colors duration-300"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
};
