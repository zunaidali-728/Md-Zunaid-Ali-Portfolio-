import { useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

export const GlobalProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setWidth(latest * 100);
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-[101]">
      <div 
        className="h-full bg-gold shadow-[0_0_18px_rgba(213,180,111,0.75)]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
