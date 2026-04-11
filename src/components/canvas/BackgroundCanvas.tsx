import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScroll, useVelocity } from 'framer-motion';
import { NeuralNetwork } from './NeuralNetwork';
import { CodeFragments } from './CodeFragments';
import { BinaryStreams } from './BinaryStreams';
import { AmbientGeometry } from './AmbientGeometry';
import { useMouse } from '../../hooks/useMouse';

export default function BackgroundCanvas() {
  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const mouse = useMouse();

  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

  // Sync Framer motion values to React state for Three.js props
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => setProgress(latest));
  }, [scrollYProgress]);

  useEffect(() => {
    return scrollVelocity.on('change', (latest) => setVelocity(latest));
  }, [scrollVelocity]);

  // Handle reduced motion / battery saver
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          gl.setClearColor(0x000000, 0);
        }}
      >
        {!reducedMotion && (
          <>
            <BinaryStreams scrollProgress={progress} />
            <NeuralNetwork scrollProgress={progress} mouse={mouse} scrollVelocity={velocity} />
            <AmbientGeometry scrollProgress={progress} mouse={mouse} scrollVelocity={velocity} />
            <CodeFragments scrollProgress={progress} mouse={mouse} />
          </>
        )}
      </Canvas>
    </div>
  );
}
