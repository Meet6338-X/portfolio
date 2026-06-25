'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioConfig } from '@/config/portfolio.config';

export default function About() {
  const { about, name, avatarURL, location, email } = portfolioConfig;
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" style={{ background: '#fff' }}>
      {/* Top divider */}
      <div style={{ height: '6px', background: '#000' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24" ref={ref}>
        {/* Section header */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="section-tag">02 // About</span>
          <div style={{ flex: 1, height: '4px', background: '#000', minWidth: '40px' }} />
          <span className="mono-label" style={{ color: '#000' }}>THE HUMAN BEHIND THE CODE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="brutal-card-volt p-6 relative overflow-hidden flex flex-col gap-4"
          >
            <div className="watermark" style={{ bottom: '-20px', right: '-10px', fontSize: '120px', opacity: 0.05, color: '#000' }}>
              MS
            </div>
            {/* Avatar */}
            <div style={{ width: '80px', height: '80px', border: '4px solid #000', boxShadow: '4px 4px 0px 0px #000', overflow: 'hidden', flexShrink: 0 }}>
              {avatarURL
                ? <img src={avatarURL} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '36px', color: '#CCFF00' }}>{name.charAt(0)}</div>
              }
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#000', textTransform: 'uppercase', lineHeight: 1 }}>{name}</div>
              <div className="mono-label" style={{ color: '#000', opacity: 0.7, marginTop: '4px' }}>{portfolioConfig.title}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
              <div className="mono-sm" style={{ color: '#000' }}>{location}</div>
              <div className="mono-sm" style={{ color: '#000' }}>{email}</div>
              <div className="mono-sm" style={{ color: '#000' }}>B.Tech IT - VIT Pune - 9.29 CGPA</div>
            </div>
          </motion.div>

          {/* About text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 brutal-card p-6 sm:p-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4">
              {about.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="mono-body"
                  style={{ color: '#000', lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{
                    __html: para.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#000;font-weight:800;background:#CCFF00;padding:0 4px">$1</strong>'),
                  }}
                />
              ))}
            </div>

            {/* Values */}
            <div style={{ borderTop: '3px solid #000', paddingTop: '16px', marginTop: 'auto' }}>
              <div className="mono-label" style={{ color: '#000', marginBottom: '10px' }}>Core Values</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {about.values.map((val, i) => (
                  <span
                    key={i}
                    style={{
                      background: i % 2 === 0 ? '#CCFF00' : '#000',
                      color: i % 2 === 0 ? '#000' : '#CCFF00',
                      border: '2px solid #000',
                      padding: '4px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interests row */}
          {about.interests.map((interest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              style={{
                background: '#000', color: '#CCFF00',
                border: '3px solid #CCFF00',
                boxShadow: '5px 5px 0px 0px #CCFF00',
                padding: '14px 12px',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px', fontWeight: '700',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                transform: i % 3 === 1 ? 'rotate(1.5deg)' : i % 3 === 2 ? 'rotate(-1deg)' : 'rotate(0deg)',
              }}
            >
              {interest}
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ height: '6px', background: '#000' }} />
    </section>
  );
}
