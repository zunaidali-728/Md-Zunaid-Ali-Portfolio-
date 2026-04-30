import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { SectionLayout } from '../layout/SectionLayout';
import { useTextReveal, useParallax } from '../../hooks/useGsapHooks';
import { portfolioData } from '../../data/portfolio';

const ProjectVisualFallback = ({ title }: { title: string }) => (
  <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(213,180,111,0.16),transparent_36%),linear-gradient(135deg,#11100d,#050505)]">
    <div className="text-center">
      <div className="font-display italic text-[clamp(82px,12vw,150px)] leading-none gold-text-gradient">{title.charAt(0)}</div>
      <div className="mt-5 font-label text-[10px] text-muted tracking-[0.42em]">PREMIUM BUILD</div>
    </div>
  </div>
);

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const imageRef = useParallax(0.12);
  const [imageFailed, setImageFailed] = useState(false);
  const isFeatured = project.featured;

  return (
    <article
      className={`group relative flex h-full min-h-[520px] w-full overflow-hidden rounded-[8px] luxury-panel cursor-none ${isFeatured ? 'md:col-span-2 md:min-h-[600px]' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`relative overflow-hidden bg-[#080806] ${isFeatured ? 'w-full md:w-[58%]' : 'w-full'} ${isFeatured ? 'hidden md:block' : 'absolute inset-0'}`}>
        {project.image && !imageFailed ? (
          <img
            ref={imageRef as any}
            src={project.image}
            alt={project.title}
            onError={() => setImageFailed(true)}
            className="absolute left-0 top-[-8%] h-[116%] w-full object-cover opacity-72 saturate-[0.82] transition-all duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.045] group-hover:opacity-100 group-hover:saturate-100"
          />
        ) : (
          <ProjectVisualFallback title={project.title} />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.08),rgba(6,6,6,0.78)),linear-gradient(0deg,rgba(6,6,6,0.72),transparent_54%)]" />
      </div>

      {isFeatured && (
        <div className="absolute inset-0 block md:hidden">
          {project.image && !imageFailed ? (
            <img src={project.image} alt={project.title} onError={() => setImageFailed(true)} className="h-full w-full object-cover opacity-35" />
          ) : (
            <ProjectVisualFallback title={project.title} />
          )}
          <div className="absolute inset-0 bg-[#060606]/80" />
        </div>
      )}

      <div className={`relative z-10 flex flex-1 flex-col justify-end p-7 md:p-10 ${isFeatured ? 'md:w-[42%]' : 'min-h-[520px] bg-[linear-gradient(180deg,rgba(6,6,6,0.1),rgba(6,6,6,0.92)_48%,#060606_100%)]'}`}>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-[1px] w-10 bg-gold" />
          <span className="font-label text-[10px] text-gold">{isFeatured ? 'FEATURED CASE STUDY' : 'SELECTED PROJECT'}</span>
        </div>

        <h3 className="font-display text-[clamp(31px,4vw,62px)] leading-[0.98] text-text">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="mt-4 font-body text-[13px] uppercase tracking-[0.14em] text-gold/80">
            {project.subtitle}
          </p>
        )}

        <p className="mt-6 max-w-[680px] font-body text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <span key={t} className="rounded-[4px] border border-gold/20 bg-gold/[0.045] px-3 py-2 font-body text-[11px] uppercase tracking-[0.08em] text-[#C8BEA8]">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] bg-gold px-4 py-3 font-body text-[12px] uppercase tracking-[0.08em] text-[#060606] transition-all duration-300 hover:bg-[#F7F0E2]"
            >
              Live Preview
              <ExternalLink size={15} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] border border-gold/35 px-4 py-3 font-body text-[12px] uppercase tracking-[0.08em] text-gold transition-all duration-300 hover:bg-gold hover:text-[#060606]"
            >
              Source
              <Github size={15} />
            </a>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[8px] border border-gold/0 transition-colors duration-500 group-hover:border-gold/45" />
      <div className="pointer-events-none absolute -inset-[1px] opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute left-0 top-0 h-[1px] w-full animated-gold-line" />
        <div className="absolute bottom-0 left-0 h-[1px] w-full animated-gold-line" />
      </div>
    </article>
  );
};

const Projects = () => {
  const headingRef = useTextReveal();

  return (
    <SectionLayout id="projects" number="04" eyebrow="SELECTED WORK">
      <div className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 ref={headingRef} className="font-display text-display text-text max-w-[820px]">
          Signature builds with cinematic interaction.
        </h2>
        <p className="max-w-[360px] font-body text-[15px] leading-relaxed text-muted">
          Each project is framed as a product experience: refined motion, strong architecture, and a clear path from first impression to action.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {portfolioData.projects.map((proj, i) => (
          <ProjectCard key={proj.title} project={proj} index={i} />
        ))}
      </div>
    </SectionLayout>
  );
};

export default Projects;
