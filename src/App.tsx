import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from './components/layout/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { GlobalProgressBar } from './components/layout/GlobalProgressBar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import { BackToTop } from './components/ui/BackToTop';

import { initSmoothScroll } from './lib/lenis';

// Lazy loading the Three.js Background canvas
const BackgroundCanvas = React.lazy(() => import('./components/canvas/BackgroundCanvas'));

const OpeningSequence = () => (
  <motion.div
    className="fixed inset-0 z-[9998] pointer-events-none bg-[#050505]"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 0.5, delay: 2.15, ease: 'easeOut' }}
  >
    <motion.div
      className="absolute inset-6 md:inset-10 border border-[rgba(200,169,110,0.24)]"
      initial={{ clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.16),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <motion.div
        className="font-label text-gold tracking-[0.55em] mb-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        PREMIUM PORTFOLIO
      </motion.div>
      <motion.div
        className="font-display italic text-[clamp(84px,16vw,190px)] leading-none text-[#F7EFD9] drop-shadow-[0_0_36px_rgba(200,169,110,0.2)]"
        initial={{ opacity: 0, scale: 0.88, filter: 'blur(18px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.05, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
      >
        ZA
      </motion.div>
      <motion.div
        className="mt-7 h-[1px] w-[min(420px,72vw)] bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.85, ease: 'easeOut' }}
      />
      <motion.div
        className="mt-7 font-body text-[12px] uppercase tracking-[0.42em] text-[#8C877A]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.05, ease: 'easeOut' }}
      >
        Software Engineer / Full-Stack Experiences
      </motion.div>
    </div>
    <motion.div
      className="absolute inset-0 bg-black"
      initial={{ clipPath: 'inset(0 0 0 0)' }}
      animate={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 1.0, delay: 1.55, ease: [0.77, 0, 0.175, 1] }}
    />
  </motion.div>
);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling inside a useEffect
    initSmoothScroll();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-text">
      <CustomCursor />
      <GlobalProgressBar />
      
      <React.Suspense fallback={<div className="fixed inset-0 z-0 bg-[#080808]" />}>
        <BackgroundCanvas />
      </React.Suspense>
      
      <Navbar />

      <main className="relative z-10 w-full overflow-hidden flex flex-col items-center">
        <OpeningSequence />
        
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
