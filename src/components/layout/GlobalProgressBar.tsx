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
    <div className="fixed top-0 left-0 w-full h-[2px] bg-border z-[100]">
      <div 
        className="h-full bg-gold"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
