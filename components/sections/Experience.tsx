'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Award, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { portfolioConfig } from '@/config/portfolio.config';

export default function Experience() {
  const { experience, education, certifications } = portfolioConfig;
  const [activeTab, setActiveTab] = useState<'work' | 'education' | 'certs'>('work');
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="section relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[var(--accent-green)]/3 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-14">
          <p className="section-label">Experience</p>
          <h2 className="section-title">
            My <span className="gradient-text italic">journey.</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            From scrappy startups to engineering teams serving millions — here's where I've been.
          </p>
        </AnimatedSection>

        {/* Tab selector */}
        <AnimatedSection delay={0.2} className="flex justify-center gap-2 mb-12">
          {[
            { id: 'work', label: 'Work', icon: <Briefcase size={14} /> },
            { id: 'education', label: 'Education', icon: <GraduationCap size={14} /> },
            { id: 'certs', label: 'Certifications', icon: <Award size={14} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setExpanded(0); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[var(--accent-blue)] text-white shadow-lg shadow-[var(--accent-blue)]/30'
                  : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {/* Work Experience */}
          {activeTab === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="timeline-line" />

              <div className="space-y-6 pl-10">
                {experience.map((exp, i) => (
                  <TimelineItem
                    key={i}
                    index={i}
                    isExpanded={expanded === i}
                    onToggle={() => setExpanded(expanded === i ? null : i)}
                    dotStyle="top-6"
                  >
                    <div
                      className="glass glass-hover p-6 rounded-2xl cursor-pointer"
                      onClick={() => setExpanded(expanded === i ? null : i)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-display text-lg text-[var(--text-primary)]">
                              {exp.role}
                            </span>
                            {i === 0 && (
                              <span className="bg-[var(--accent-green)]/15 text-[var(--accent-green)] text-xs px-2 py-0.5 rounded-full font-mono">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                            <span className="text-[var(--accent-blue)] font-medium">{exp.company}</span>
                            <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-muted)]">
                              <Calendar size={11} /> {exp.period}
                            </span>
                            <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-muted)]">
                              <MapPin size={11} /> {exp.location}
                            </span>
                          </div>
                        </div>
                        <span className="text-[var(--text-muted)] mt-1">
                          {expanded === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </div>

                      <AnimatePresence>
                        {expanded === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
                              <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                                {exp.description}
                              </p>

                              <p className="font-mono text-xs text-[var(--accent-purple)] uppercase tracking-widest mb-3">
                                Key Achievements
                              </p>
                              <ul className="space-y-2 mb-4">
                                {exp.achievements.map((ach, ai) => (
                                  <li key={ai} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--accent-green)] mt-0.5 shrink-0">✓</span>
                                    {ach}
                                  </li>
                                ))}
                              </ul>

                              <div className="flex flex-wrap gap-1.5">
                                {exp.tech.map(t => <span key={t} className="tag text-xs">{t}</span>)}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </TimelineItem>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education */}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-[var(--text-primary)] mb-1">{edu.degree}</h3>
                      <p className="text-[var(--accent-blue)] font-medium text-sm mb-1">{edu.institution}</p>
                      <p className="font-mono text-xs text-[var(--text-muted)] mb-3">
                        {edu.period} · GPA {edu.gpa}
                      </p>
                      <ul className="space-y-1">
                        {edu.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-[var(--accent-green)] shrink-0">✦</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Certifications */}
          {activeTab === 'certs' && (
            <motion.div
              key="certs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass glass-hover p-5 rounded-2xl text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1 leading-tight">
                    {cert.name}
                  </h3>
                  <p className="font-mono text-xs text-[var(--accent-blue)] mb-1">{cert.issuer}</p>
                  <p className="font-mono text-xs text-[var(--text-muted)]">{cert.year}</p>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer"
                       className="mt-2 inline-block text-xs text-[var(--accent-blue)] hover:underline">
                      Verify ↗
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function TimelineItem({
  children,
  index,
  isExpanded,
  onToggle,
  dotStyle,
}: {
  children: React.ReactNode;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  dotStyle?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
      transition={{ delay: index * 0.15 }}
      className="relative"
    >
      {/* Dot */}
      <div
        className={`timeline-dot ${dotStyle || 'top-4'}`}
        style={{
          background: isExpanded ? 'var(--accent-green)' : 'var(--accent-blue)',
          transition: 'background 0.3s',
        }}
      />
      {children}
    </motion.div>
  );
}
