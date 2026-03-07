'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Code2, Coffee, Globe } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { portfolioConfig } from '@/config/portfolio.config';

const iconMap: Record<string, React.ReactNode> = {
  'Open Source': <Code2 size={14} />,
  'AI/ML': <span>🤖</span>,
  'Photography': <span>📷</span>,
  'Technical Writing': <span>✍️</span>,
};

export default function About() {
  const { about, name } = portfolioConfig;
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <AnimatedSection>
              <p className="section-label">About Me</p>
              <h2 className="section-title">
                Crafting software with<br />
                <span className="gradient-text italic">purpose & precision.</span>
              </h2>
            </AnimatedSection>

            <StaggerContainer className="space-y-5 mt-6" staggerDelay={0.15}>
              {about.paragraphs.map((para, i) => (
                <StaggerItem key={i}>
                  <p
                    className="text-[var(--text-secondary)] leading-relaxed text-base"
                    dangerouslySetInnerHTML={{
                      __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-primary)] font-semibold">$1</strong>'),
                    }}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Values */}
            <AnimatedSection delay={0.4} className="mt-8">
              <p className="font-mono text-xs text-[var(--accent-purple)] tracking-widest uppercase mb-4">
                Core Values
              </p>
              <div className="grid grid-cols-2 gap-2">
                {about.values.map((val, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 glass rounded-xl"
                  >
                    <span className="text-[var(--accent-green)] text-xs">✦</span>
                    <span className="text-sm text-[var(--text-secondary)]">{val}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Visual side */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              {/* Decorative rotating ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="w-80 h-80 border border-dashed border-[var(--border-subtle)] rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-60 h-60 border border-[var(--border-subtle)] rounded-full"
                  style={{ borderStyle: 'dashed' }}
                />
              </div>

              {/* Central card */}
              <div className="relative z-10 w-64 mx-auto">
                <div className="glass glow-border p-8 rounded-3xl text-center">
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)]">
                    {portfolioConfig.avatarURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={portfolioConfig.avatarURL} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-3xl font-display">
                        {name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl text-[var(--text-primary)] mb-1">{name}</h3>
                  <p className="font-mono text-xs text-[var(--accent-blue)] mb-4">
                    {portfolioConfig.title.split('&')[0].trim()}
                  </p>

                  <div className="flex justify-center gap-2 text-[var(--text-muted)] text-xs">
                    <span>📍 {portfolioConfig.location}</span>
                  </div>
                </div>
              </div>

              {/* Floating skill chips */}
              <div ref={ref} className="relative mt-8">
                <p className="font-mono text-xs text-[var(--text-muted)] text-center mb-4 tracking-widest uppercase">
                  Interests
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {about.interests.map((interest, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                      className="tag cursor-default"
                    >
                      {iconMap[interest] || ''}
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <FloatingBadge
                className="absolute -top-4 -right-4"
                delay={0.5}
                icon="☕"
                label="Coffee-powered"
              />
              <FloatingBadge
                className="absolute -bottom-4 -left-4"
                delay={0.7}
                icon="🌙"
                label="Night owl"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({
  className,
  delay,
  icon,
  label,
}: {
  className: string;
  delay: number;
  icon: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 150 }}
      className={`glass px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs text-[var(--text-secondary)] ${className}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
}
