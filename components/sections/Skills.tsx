'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { portfolioConfig } from '@/config/portfolio.config';

export default function Skills() {
  const { skills } = portfolioConfig;
  const [activeCategory, setActiveCategory] = useState(skills[0].category);

  const activeSkills = skills.find(s => s.category === activeCategory)?.items || [];

  return (
    <section id="skills" className="section">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-blue)]/3 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-14">
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">
            Tools of the <span className="gradient-text italic">trade.</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            A curated set of technologies I use to build fast, scalable, and beautiful products.
          </p>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-2 mb-12">
          {skills.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm transition-all duration-300 ${
                activeCategory === cat.category
                  ? 'bg-[var(--accent-blue)] text-white shadow-lg shadow-[var(--accent-blue)]/30'
                  : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-glow)]'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.category}
            </button>
          ))}
        </AnimatedSection>

        {/* Skill cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All skills cloud (non-active) */}
        <AnimatedSection delay={0.4} className="mt-16">
          <p className="font-mono text-xs text-[var(--text-muted)] text-center tracking-widest uppercase mb-6">
            Also familiar with
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Assembly (8086)', 'OpenCV', 'TensorFlow', 'Scikit-Learn',
              'PostgreSQL', 'MongoDB', 'SQLite', 'Firebase Realtime DB',
              'Google Cloud', 'Oracle Cloud', 'REST APIs',
              'Agile / Scrum', 'Figma', 'VS Code', 'Android Studio',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className="tag"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  index,
}: {
  skill: { name: string; level: number; icon: string };
  index: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const levelLabel =
    skill.level >= 90 ? 'Expert' :
    skill.level >= 75 ? 'Advanced' :
    skill.level >= 60 ? 'Proficient' : 'Learning';

  const levelColor =
    skill.level >= 90 ? 'var(--accent-green)' :
    skill.level >= 75 ? 'var(--accent-blue)' :
    skill.level >= 60 ? 'var(--accent-purple)' : 'var(--text-muted)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass glass-hover p-5 rounded-2xl group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-medium text-[var(--text-primary)] text-sm">{skill.name}</span>
        </div>
        <span
          className="font-mono text-xs px-2 py-1 rounded-lg"
          style={{
            color: levelColor,
            background: `${levelColor}15`,
          }}
        >
          {levelLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? skill.level / 100 : 0 }}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className="font-mono text-xs text-[var(--text-muted)]">proficiency</span>
        <span className="font-mono text-xs" style={{ color: levelColor }}>
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
}
