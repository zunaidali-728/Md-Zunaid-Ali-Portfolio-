import { useEffect, useState } from 'react';
import { lenis } from '../../lib/lenis';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  // Scroll detection for glassy state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up intersection observers for active nav
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    links.forEach(link => {
      const el = document.getElementById(link.href.substring(1));
      if (!el) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(link.href);
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(el);
      observers.push(observer);
    });
    
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    lenis.scrollTo(href, { offset: -80, duration: 1.4 });
  };

  return (
    <>
      {/* Navbar Container */}
      <nav 
        className={`fixed top-0 left-0 w-full h-[64px] z-[100] transition-all duration-500 animate-[slideDown_0.7s_ease-out_0.2s_both]
          ${scrolled ? 'bg-[rgba(8,8,8,0.75)] backdrop-blur-[20px] saturate-[160%] border-b border-[rgba(200,169,110,0.12)]' : 'bg-transparent border-transparent'}
        `}
      >
        <div className="max-w-[1280px] w-full h-full mx-auto px-[clamp(24px,6vw,80px)] flex items-center justify-between">
          
          {/* Logo */}
          <div className="font-display italic text-[22px] text-gold cursor-pointer" onClick={(e) => handleNavClick(e as any, '#hero')}>
            ZA
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative font-body text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 group
                  ${activeSection === link.href ? 'text-gold' : 'text-muted hover:text-[#F0EBE1]'}
                `}
              >
                {link.name}
                {/* Custom Underline */}
                <span 
                  className={`absolute -bottom-[4px] left-0 w-full h-[1px] bg-gold origin-left transition-transform duration-300 ease-out
                    ${activeSection === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} 
                />
              </a>
            ))}
          </div>

          {/* Download CV */}
          <div className="hidden md:block">
            <a 
              href="/ZunaidAli_updatedResume.pdf" 
              target="_blank"
              onClick={() => {
                // Not a scroll action, let it occur normally or handle manual open
              }}
              className="font-body text-[13px] text-gold border border-[rgba(200,169,110,0.5)] px-5 py-2 hover:bg-gold hover:text-[#080808] transition-colors duration-300"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 relative z-[101]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`w-[22px] h-[1.5px] bg-[#F0EBE1] block transition-transform duration-300 ease-out absolute ${mobileMenuOpen ? 'rotate-45' : '-translate-y-2'}`} />
            <span className={`w-[22px] h-[1.5px] bg-[#F0EBE1] block transition-opacity duration-300 ease-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-[22px] h-[1.5px] bg-[#F0EBE1] block transition-transform duration-300 ease-out absolute ${mobileMenuOpen ? '-rotate-45' : 'translate-y-2'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <div 
        className={`fixed inset-0 bg-[#080808] z-[99] flex flex-col justify-center items-center pointer-events-none`}
        style={{
          clipPath: mobileMenuOpen ? 'circle(150% at calc(100% - 40px) 32px)' : 'circle(0% at calc(100% - 40px) 32px)',
          transition: 'clip-path 0.6s cubic-bezier(0.86, 0, 0.07, 1)',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none'
        }}
      >
        <div className="flex flex-col gap-2 items-center text-center">
          {links.map((link, i) => (
            <div key={link.name} className="overflow-hidden p-2">
              <a 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block font-display font-black text-[clamp(48px,10vw,72px)] text-[#F0EBE1] hover:text-gold hover:italic transition-all duration-300"
                style={{
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(60px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transition: `all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) ${0.3 + (i * 0.07)}s`
                }}
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
        
        {/* Mobile Social Links */}
        <div 
          className="absolute bottom-10 flex gap-6"
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            transition: 'opacity 0.4s ease 0.8s'
          }}
        >
          <a href="https://github.com/zunaidali-728" target="_blank" rel="noreferrer" className="font-body text-[12px] text-[#5C5C5C] hover:text-gold transition-colors">GITHUB</a>
          <a href="https://linkedin.com/in/md-zunaid-ali-315bb8229" target="_blank" rel="noreferrer" className="font-body text-[12px] text-[#5C5C5C] hover:text-gold transition-colors">LINKEDIN</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
