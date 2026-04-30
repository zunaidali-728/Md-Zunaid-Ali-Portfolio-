import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { lenis } from '../../lib/lenis';
import { portfolioData } from '../../data/portfolio';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    links.forEach((link) => {
      const el = document.getElementById(link.href.substring(1));
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(link.href);
        },
        { threshold: 0.32 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    lenis.scrollTo(href, { offset: -80, duration: 1.35 });
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 z-[100] h-[68px] w-[calc(100%-32px)] max-w-[1180px] -translate-x-1/2 transition-all duration-500 animate-[slideDown_0.7s_ease-out_0.2s_both]
          ${scrolled ? 'luxury-panel rounded-[8px]' : 'bg-transparent border border-transparent'}
        `}
      >
        <div className="relative flex h-full w-full items-center justify-between px-4 md:px-6">
          <button
            className="group flex items-center gap-3"
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="Go to hero"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[4px] border border-gold/35 bg-gold/5 font-display italic text-[20px] text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-[#060606]">
              ZA
            </span>
            <span className="hidden flex-col text-left md:flex">
              <span className="font-label text-[10px] text-gold">PORTFOLIO</span>
              <span className="font-body text-[12px] text-muted">{portfolioData.personal.location}</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`group relative rounded-[4px] px-4 py-3 font-body text-[12px] uppercase tracking-[0.08em] transition-colors duration-300
                  ${activeSection === link.href ? 'text-[#060606]' : 'text-muted hover:text-text'}
                `}
              >
                <span className={`absolute inset-0 rounded-[4px] bg-gold transition-all duration-300 ${activeSection === link.href ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-10 group-hover:scale-100'}`} />
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          <a
            href={portfolioData.personal.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-[4px] border border-gold/45 px-4 py-3 font-body text-[12px] uppercase tracking-[0.08em] text-gold transition-all duration-300 hover:bg-gold hover:text-[#060606] md:inline-flex"
          >
            <Download size={15} />
            CV
          </a>

          <button
            className="grid h-11 w-11 place-items-center rounded-[4px] border border-gold/35 text-gold transition-all duration-300 hover:bg-gold hover:text-[#060606] md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-[#060606] px-6 pt-28"
            initial={{ clipPath: 'circle(0% at calc(100% - 38px) 42px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 38px) 42px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 38px) 42px)' }}
            transition={{ duration: 0.65, ease: [0.86, 0, 0.07, 1] }}
          >
            <div className="absolute inset-6 border border-gold/15" />
            <div className="relative flex h-full flex-col justify-center">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group border-b border-gold/10 py-4 font-display text-[clamp(42px,13vw,74px)] leading-none text-text transition-colors hover:text-gold"
                  initial={{ opacity: 0, x: 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
                >
                  <span className="mr-4 font-body text-[12px] text-gold">0{i + 1}</span>
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
