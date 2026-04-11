import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-gold opacity-90 py-8 relative z-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-[120px] flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="font-body text-[12px] text-muted">
          © 2026 Md Zunaid Ali. All rights reserved.
        </div>

        <div className="flex gap-6">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-gold hover:scale-115 transition-all duration-300"
          >
            <Github size={16} />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-gold hover:scale-115 transition-all duration-300"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="text-muted hover:text-gold hover:scale-115 transition-all duration-300"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
