'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, ChevronDown, MapPin, Calendar } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio.config';

export default function Experience() {
  const { experience, education, certifications } = portfolioConfig;
  const [tab, setTab] = useState<'work' | 'education' | 'certs'>('work');
  const [expanded, setExpanded] = useState<number | null>(0);

  const tabs = [
    { id: 'work',      label: 'Work',     icon: <Briefcase size={13} /> },
    { id: 'education', label: 'Education',icon: <GraduationCap size={13} /> },
    { id: 'certs',     label: 'Certs',    icon: <Award size={13} /> },
  ];

  return (
    <section id="experience" style={{ background: '#0f0f0f' }} className="grid-lines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="section-tag-dark">05 // Experience</span>
          <div style={{ flex: 1, height: '4px', background: '#CCFF00', minWidth: '40px' }} />
          <span className="mono-label" style={{ color: '#CCFF00' }}>THE JOURNEY</span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '32px', border: '3px solid #CCFF00', width: 'fit-content' }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id as any); setExpanded(0); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 20px',
                background: tab === t.id ? '#CCFF00' : 'transparent',
                color: tab === t.id ? '#000' : '#666',
                borderRight: t.id !== 'certs' ? '2px solid #CCFF00' : 'none',
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: '700',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* WORK */}
          {tab === 'work' && (
            <motion.div key="work" initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experience.map((exp, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    border: '4px solid',
                    borderColor: expanded === i ? '#CCFF00' : '#333',
                    boxShadow: expanded === i ? '8px 8px 0px 0px #CCFF00' : '6px 6px 0px 0px #222',
                    transition: 'all 0.2s',
                  }}
                >
                  {/* Header row */}
                  <div
                    style={{
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                      padding: '16px 18px', cursor: 'pointer',
                      background: expanded === i ? '#CCFF00' : '#111',
                      gap: '12px',
                    }}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', textTransform: 'uppercase', lineHeight: 1, color: expanded === i ? '#000' : '#fff' }}>
                          {exp.role}
                        </span>
                        {i === 0 && (
                          <span style={{ background: '#000', color: '#CCFF00', border: '2px solid #CCFF00', padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700', letterSpacing: '0.1em' }}>
                            RECENT
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <span className="mono-label" style={{ color: expanded === i ? '#000' : '#CCFF00' }}>{exp.company}</span>
                        <span className="mono-label" style={{ color: expanded === i ? '#000' : '#555', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={10} /> {exp.period}
                        </span>
                        <span className="mono-label" style={{ color: expanded === i ? '#000' : '#555', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={10} /> {exp.location}
                        </span>
                      </div>
                    </div>
                    <ChevronDown size={18}
                      style={{ color: expanded === i ? '#000' : '#CCFF00', transition: 'transform 0.2s', transform: expanded === i ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
                    />
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '16px 18px', background: '#1a1a1a', borderTop: '3px solid #CCFF00' }}>
                          <p className="mono-body" style={{ color: '#aaa', marginBottom: '14px' }}>{exp.description}</p>
                          <div className="mono-label" style={{ color: '#CCFF00', marginBottom: '10px' }}>KEY ACHIEVEMENTS</div>
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '14px' }}>
                            {exp.achievements.map((a, ai) => (
                              <li key={ai} style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ccc', lineHeight: 1.6 }}>
                                <span style={{ color: '#CCFF00', flexShrink: 0 }}>▸</span> {a}
                              </li>
                            ))}
                          </ul>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {exp.tech.map(t => <span key={t} className="tag-volt">{t}</span>)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* EDUCATION */}
          {tab === 'education' && (
            <motion.div key="edu" initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {education.map((edu, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ border: '4px solid #CCFF00', boxShadow: '8px 8px 0px 0px #CCFF00', overflow: 'hidden' }}
                >
                  <div style={{ background: '#CCFF00', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#000', textTransform: 'uppercase', lineHeight: 1 }}>{edu.degree}</div>
                      <div className="mono-label" style={{ color: '#000', opacity: 0.7, marginTop: '4px' }}>{edu.institution}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#000' }}>{edu.gpa}</div>
                      <div className="mono-label" style={{ color: '#000', opacity: 0.7 }}>{edu.period}</div>
                    </div>
                  </div>
                  <div style={{ background: '#111', padding: '14px 18px' }}>
                    {edu.highlights.map((h, hi) => (
                      <div key={hi} style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#aaa', marginBottom: '6px' }}>
                        <span style={{ color: '#CCFF00' }}>✓</span> {h}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CERTS */}
          {tab === 'certs' && (
            <motion.div key="certs" initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ border: '3px solid #CCFF00', boxShadow: '6px 6px 0px 0px #CCFF00', padding: '18px', background: '#111', position: 'relative', overflow: 'hidden' }}
                >
                  <div className="watermark" style={{ bottom: '-15px', right: '-10px', fontSize: '80px', opacity: 0.04, color: '#CCFF00' }}>
                    {i + 1}
                  </div>
                  <Award size={24} style={{ color: '#CCFF00', marginBottom: '10px' }} />
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: '#fff', fontSize: '14px', lineHeight: 1.4, marginBottom: '8px' }}>{cert.name}</div>
                  <div className="mono-label" style={{ color: '#CCFF00' }}>{cert.issuer}</div>
                  <div className="mono-label" style={{ color: '#444', marginTop: '4px' }}>{cert.year}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
