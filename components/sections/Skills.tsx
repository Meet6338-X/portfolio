'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioConfig } from '@/config/portfolio.config';

export default function Skills() {
  const { skills } = portfolioConfig;
  const [active, setActive] = useState(0);

  return (
    <section id="skills" style={{ background: '#0f0f0f' }} className="grid-lines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="section-tag-dark">03 // Skills</span>
          <div style={{ flex: 1, height: '4px', background: '#CCFF00', minWidth: '40px' }} />
          <span className="mono-label" style={{ color: '#CCFF00' }}>TECH ARSENAL</span>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {skills.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px', fontWeight: '700',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '8px 18px', cursor: 'pointer',
                background: active === i ? '#CCFF00' : 'transparent',
                color: active === i ? '#000' : '#666',
                border: active === i ? '3px solid #CCFF00' : '3px solid #333',
                boxShadow: active === i ? '4px 4px 0px 0px #CCFF00' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {cat.icon} {cat.category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {skills[active].items.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Also familiar with */}
        <div style={{ marginTop: '48px', borderTop: '4px solid #222', paddingTop: '32px' }}>
          <div className="mono-label" style={{ color: '#444', marginBottom: '16px' }}>
            Also experienced with:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Advanced DSA', 'OOP', 'DBMS', 'Operating Systems', 'API Design', 'MobileNetV2',
              'LSTM', 'Prophet', 'Random Forest', 'Algorand Blockchain', 'TradingView', 'Bash'].map(tech => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05, borderColor: '#CCFF00', color: '#CCFF00' }}
                className="tag-white"
                style={{ cursor: 'default', transition: 'all 0.15s' }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: { name: string; level: number; icon: string }; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const label = skill.level >= 88 ? 'EXPERT' : skill.level >= 75 ? 'ADVANCED' : skill.level >= 62 ? 'PROFICIENT' : 'LEARNING';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      style={{
        background: '#111', border: '3px solid #222',
        boxShadow: '6px 6px 0px 0px #CCFF00',
        padding: '18px', position: 'relative',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      whileHover={{ y: -3, boxShadow: '9px 9px 0px 0px #CCFF00' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>{skill.icon}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: '#fff', fontSize: '14px' }}>
            {skill.name}
          </span>
        </div>
        <span
          className="mono-label"
          style={{
            background: skill.level >= 88 ? '#CCFF00' : '#222',
            color: skill.level >= 88 ? '#000' : '#666',
            border: '2px solid',
            borderColor: skill.level >= 88 ? '#CCFF00' : '#333',
            padding: '2px 7px', fontSize: '9px',
          }}
        >
          {label}
        </span>
      </div>

      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? skill.level / 100 : 0 }}
          transition={{ duration: 1.3, delay: index * 0.07 + 0.1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
        <span className="mono-label" style={{ color: '#444' }}>PROFICIENCY</span>
        <span className="mono-label" style={{ color: '#CCFF00' }}>{skill.level}%</span>
      </div>
    </motion.div>
  );
}
