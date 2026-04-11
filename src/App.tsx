import React, { useEffect } from 'react';
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
        {/* Entrance animation split screen wrapper */}
        <div className="fixed inset-0 bg-black z-[9998] pointer-events-none animate-[split-screen-open_1.2s_cubic-bezier(0.8,0,0.2,1)_forwards]" />
        
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
