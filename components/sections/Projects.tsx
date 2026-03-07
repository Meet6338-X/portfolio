'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { portfolioConfig } from '@/config/portfolio.config';

type Project = typeof portfolioConfig.projects[0] & { fromGitHub?: boolean; metrics?: string };

export default function Projects() {
  const [filter, setFilter] = useState<'featured' | 'all'>('featured');
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const manual = portfolioConfig.projects as Project[];
  const all: Project[] = [
    ...manual,
    ...githubProjects.filter(g =>
      !manual.some(m => m.github === g.github || m.title.toLowerCase() === g.title.toLowerCase())
    ),
  ];
  const displayed = filter === 'featured' ? all.filter(p => p.featured) : all;

  useEffect(() => {
    if (!portfolioConfig.githubUsername) return;
    setLoading(true);
    fetch('/api/github').then(r => r.json()).then(d => {
      if (d.repos) setGithubProjects(d.repos);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" style={{ background: '#fff' }}>
      <div style={{ height: '6px', background: '#000' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="section-tag">04 // Projects</span>
          <div style={{ flex: 1, height: '4px', background: '#000', minWidth: '40px' }} />
          {loading && <span className="mono-label" style={{ color: '#000', display: 'flex', alignItems: 'center', gap: '6px' }}><Loader2 size={12} className="animate-spin" /> SYNCING GITHUB</span>}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {(['featured', 'all'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '700',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '8px 18px', cursor: 'pointer',
                background: filter === f ? '#000' : 'transparent',
                color: filter === f ? '#CCFF00' : '#000',
                border: '3px solid #000',
                boxShadow: filter === f ? '4px 4px 0px 0px #CCFF00' : '4px 4px 0px 0px #000',
                transition: 'all 0.15s',
              }}
            >
              {f === 'all' ? `ALL (${all.length})` : `FEATURED (${all.filter(p => p.featured).length})`}
            </button>
          ))}
        </div>

        {/* Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub link */}
        {portfolioConfig.social.github && (
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <a href={portfolioConfig.social.github} target="_blank" rel="noopener noreferrer"
               className="btn-black" style={{ display: 'inline-flex' }}>
              <Github size={14} /> MORE ON GITHUB <ArrowRight size={14} />
            </a>
          </div>
        )}
      </div>
      <div style={{ height: '6px', background: '#000' }} />

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onClick={onClick}
      style={{
        background: '#fff', border: '4px solid #000',
        boxShadow: '8px 8px 0px 0px #000',
        cursor: 'pointer', overflow: 'hidden',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      whileHover={{ y: -4, boxShadow: '12px 12px 0px 0px #000' } as any}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden', borderBottom: '4px solid #000' }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          style={{ transition: 'transform 0.5s' }}
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
        {/* Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {project.featured && (
            <span style={{ background: '#CCFF00', color: '#000', border: '2px solid #000', padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700', letterSpacing: '0.1em' }}>
              FEATURED
            </span>
          )}
          {project.fromGitHub && (
            <span style={{ background: '#000', color: '#CCFF00', border: '2px solid #CCFF00', padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Github size={9} /> GITHUB
            </span>
          )}
        </div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <span className="mono-label" style={{ color: '#fff', opacity: 0.7 }}>{project.year}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#000', textTransform: 'uppercase', marginBottom: '6px', lineHeight: 1 }}>
          {project.title}
        </h3>
        {project.metrics && (
          <p className="mono-label" style={{ color: '#000', opacity: 0.7, marginBottom: '8px' }}>📊 {project.metrics}</p>
        )}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#333', lineHeight: 1.7, marginBottom: '14px' }}>
          {project.description.length > 100 ? project.description.slice(0, 100) + '…' : project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {project.tags.slice(0, 4).map(t => <span key={t} className="tag-black">{t}</span>)}
        </div>
        <div style={{ display: 'flex', gap: '8px', borderTop: '2px solid #000', paddingTop: '12px' }}>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
               onClick={e => e.stopPropagation()}
               className="btn-volt" style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '10px' }}>
              <ExternalLink size={11} /> DEMO
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
               onClick={e => e.stopPropagation()}
               className="btn-black" style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '10px' }}>
              <Github size={11} /> CODE
            </a>
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
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 900, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', border: '4px solid #000', boxShadow: '12px 12px 0px 0px #CCFF00', width: '100%', maxWidth: '600px', overflow: 'hidden', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ position: 'relative', height: '200px' }}>
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <button onClick={onClose}
            style={{ position: 'absolute', top: '12px', right: '12px', background: '#000', color: '#CCFF00', border: '2px solid #CCFF00', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: '700' }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ padding: '24px', borderTop: '4px solid #000' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: '#000', textTransform: 'uppercase', lineHeight: 1, marginBottom: '8px' }}>{project.title}</h2>
          {project.metrics && <p className="mono-label" style={{ color: '#000', opacity: 0.7, marginBottom: '12px' }}>📊 {project.metrics}</p>}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#333', lineHeight: 1.8, marginBottom: '16px' }}>
            {(project as any).longDescription || project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tags.map(t => <span key={t} className="tag-black">{t}</span>)}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-volt"><ExternalLink size={14} /> LIVE DEMO</a>}
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-black"><Github size={14} /> SOURCE CODE</a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
