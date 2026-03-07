'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { portfolioConfig } from '@/config/portfolio.config';

type Project = typeof portfolioConfig.projects[0] & { fromGitHub?: boolean };

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'featured'>('featured');
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [loadingGH, setLoadingGH] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  // Merge config projects with GitHub projects
  const manualProjects = portfolioConfig.projects;
  const allProjects: Project[] = [
    ...manualProjects,
    ...githubProjects.filter(gp =>
      !manualProjects.some(mp => mp.github === gp.github || mp.title.toLowerCase() === gp.title.toLowerCase())
    ),
  ];

  const displayed = filter === 'featured'
    ? allProjects.filter(p => p.featured)
    : allProjects;

  // Fetch GitHub repos
  useEffect(() => {
    if (!portfolioConfig.githubUsername) return;
    setLoadingGH(true);
    fetch('/api/github')
      .then(r => r.json())
      .then(data => {
        if (data.repos) setGithubProjects(data.repos);
      })
      .catch(() => {})
      .finally(() => setLoadingGH(false));
  }, []);

  const allTags = Array.from(new Set(allProjects.flatMap(p => p.tags))).slice(0, 10);

  return (
    <section id="projects" className="section relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--accent-purple)]/4 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-14">
          <p className="section-label">Work & Projects</p>
          <h2 className="section-title">
            Things I've <span className="gradient-text italic">built.</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            A mix of production products, open-source tools, and side experiments.
            {portfolioConfig.githubUsername && (
              <span className="text-[var(--accent-blue)]"> GitHub repos are synced automatically.</span>
            )}
          </p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.2} className="flex items-center justify-center gap-3 mb-10">
          {(['featured', 'all'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-mono text-sm transition-all duration-300 capitalize ${
                filter === f
                  ? 'bg-[var(--accent-blue)] text-white shadow-lg shadow-[var(--accent-blue)]/30'
                  : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f === 'all' ? `All (${allProjects.length})` : `Featured (${allProjects.filter(p => p.featured).length})`}
            </button>
          ))}
          {loadingGH && (
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-mono">
              <Loader2 size={12} className="animate-spin" />
              syncing github...
            </span>
          )}
        </AnimatedSection>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayed.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* More on GitHub */}
        {portfolioConfig.social.github && (
          <AnimatedSection delay={0.3} className="text-center mt-12">
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-mono text-sm group"
            >
              <Github size={16} />
              See more on GitHub
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </AnimatedSection>
        )}
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="project-card cursor-pointer group"
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      {/* Image */}
      <div className="project-card-image">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80`; }}
        />
        <div className="project-card-overlay" />

        {/* Hover links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <div className="flex gap-2">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 bg-white text-black text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[var(--accent-blue)] hover:text-white transition-colors"
              >
                <ExternalLink size={12} /> Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[var(--accent-blue)] transition-colors border border-white/20"
              >
                <Github size={12} /> Code
              </a>
            )}
          </div>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {project.featured && (
            <span className="bg-[var(--accent-blue)]/90 text-white text-xs px-2 py-0.5 rounded-full font-mono backdrop-blur-sm">
              Featured
            </span>
          )}
          {(project as any).fromGitHub && (
            <span className="bg-black/60 text-[var(--text-secondary)] text-xs px-2 py-0.5 rounded-full font-mono backdrop-blur-sm border border-white/10 flex items-center gap-1">
              <Github size={10} /> GitHub
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-[var(--text-muted)] shrink-0 ml-2">{project.year}</span>
        </div>

        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {project.metrics && (
          <p className="text-[var(--accent-green)] text-xs font-mono mb-3">📊 {project.metrics}</p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="tag text-xs py-0.5">{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag text-xs py-0.5 text-[var(--text-muted)]">+{project.tags.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="glass w-full max-w-2xl rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-display text-2xl text-[var(--text-primary)]">{project.title}</h2>
            <span className="font-mono text-sm text-[var(--text-muted)]">{project.year}</span>
          </div>

          {project.metrics && (
            <p className="text-[var(--accent-green)] text-sm font-mono mb-3">📊 {project.metrics}</p>
          )}

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            {(project as any).longDescription || project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>

          <div className="flex gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center text-sm py-2.5">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 justify-center text-sm py-2.5">
                <Github size={14} /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
