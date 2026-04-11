import { SectionLayout } from '../layout/SectionLayout';
import { useTextReveal, useParallax } from '../../hooks/useGsapHooks';
import { portfolioData } from '../../data/portfolio';

const ProjectCard = ({ project }: { project: any }) => {
  const imageRef = useParallax(0.15); // Slight parallax inside frame

  return (
    <div className="group flex flex-col h-full w-full bg-surface border border-border rounded-lg overflow-hidden relative cursor-none">
      
      {/* Outer Glow on hover */}
      <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700 pointer-events-none" />
      
      {/* Image container with fixed ratio */}
      <div className="relative w-full h-[260px] md:h-[65%] overflow-hidden bg-[#0A0A0A]">
        <img 
          ref={imageRef as any}
          src={project.image} 
          alt={project.title}
          className="absolute top-[-10%] left-0 w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        />
        {/* Dark gradient overlay bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-surface to-transparent" />
      </div>

      {/* Content Area */}
      <div className="p-8 md:p-10 flex flex-col flex-grow relative z-10">
        <h3 className="font-display text-[28px] text-text mb-4 inline-block w-fit">
          {project.title}
          <div className="w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out mt-1" />
        </h3>
        
        <p className="font-body text-muted text-[15px] leading-relaxed mb-8 flex-grow">
          {project.description}
        </p>

        <div className="flex justify-between items-end">
          <div className="flex flex-wrap gap-2 max-w-[70%]">
            {project.tech.map((t: string) => (
              <span key={t} className="font-body text-[11px] text-[#808080] uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>

          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center text-gold font-body text-[14px] hover:text-text transition-colors duration-300"
          >
            GitHub
            <span className="ml-1 inline-block transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
      
      {/* Animated Border Reveal on hover overlay */}
      <div className="absolute inset-0 border border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
    </div>
  );
};

const Projects = () => {
  const headingRef = useTextReveal();

  return (
    <SectionLayout id="projects" number="04" eyebrow="SELECTED WORK">
      <h2 ref={headingRef} className="font-display text-display text-text mb-20 max-w-[800px]">
        Projects I've built.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" style={{ gridAutoRows: 'minmax(420px, auto)' }}>
        {portfolioData.projects.map((proj, i) => (
          <ProjectCard key={i} project={proj} />
        ))}
      </div>
    </SectionLayout>
  );
};

export default Projects;
