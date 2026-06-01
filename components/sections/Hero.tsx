'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Zap, Terminal, Code2 } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { portfolioConfig } from '@/config/portfolio.config';

export default function Hero() {
  const { name, tagline, social, stats } = portfolioConfig;
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const firstName = name.split(' ')[0];
  const lastName  = name.split(' ')[1] || '';

  return (
    <section
      id="hero"
      className="relative min-h-screen dot-pattern grid-lines flex flex-col justify-center overflow-hidden"
      style={{ background: '#0f0f0f' }}
    >
      {/* Top ticker bar */}
      <div style={{ background: '#CCFF00', borderBottom: '4px solid #000', overflow: 'hidden', height: '34px', display: 'flex', alignItems: 'center' }}>
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {['AI & LLM DEV', '✦', 'FLUTTER ENGINEER', '✦', 'VIT PUNE', '✦', 'GENAI SPECIALIST', '✦', 'OPEN TO INTERNSHIP', '✦', 'PUNE, INDIA', '✦', 'HARVARD CS50X', '✦', 'GOOGLE GEMINI CERTIFIED', '✦'].map((t, j) => (
                <span
                  key={j}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.15em',
                    color: '#000',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    whiteSpace: 'nowrap',
                  }}
                >{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 flex flex-col gap-10">
        {/* Sticker + availability */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="sticker">
            <span className="pulse-volt inline-block w-2 h-2 rounded-full" style={{ background: '#00ff88', flexShrink: 0 }} />
            {portfolioConfig.availability}
          </div>
          <div className="sticker-white">
            📍 PUNE, INDIA
          </div>
          <div className="sticker-dark">
            B.TECH IT · VIT PUNE · 9.05 CGPA
          </div>
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 style={{ margin: 0 }}>
            <div className="display-xl" style={{ color: '#fff' }}>
              {firstName}
            </div>
            <div className="display-xl" style={{ color: '#CCFF00' }}>
              {lastName}
            </div>
          </h1>
        </motion.div>

        {/* Animated subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <div style={{ width: '40px', height: '4px', background: '#CCFF00', flexShrink: 0 }} />
          <div
            className="mono-sm"
            style={{ color: '#CCFF00', fontSize: '13px', letterSpacing: '0.06em', minHeight: '24px' }}
          >
            {mounted && (
              <TypeAnimation
                sequence={[
                  'AI & LLM DEVELOPER',
                  2000,
                  'FLUTTER MOBILE ENGINEER',
                  2000,
                  'GENERATIVE AI SPECIALIST',
                  2000,
                  'PROMPT ENGINEER',
                  2000,
                  'OPEN TO 6-MONTH INTERNSHIP',
                  2000,
                ]}
                speed={60}
                repeat={Infinity}
              />
            )}
          </div>
          <span className="blink mono-sm" style={{ color: '#CCFF00' }}>_</span>
        </motion.div>

        {/* Bottom row — stats + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left: CTA */}
          <div className="flex flex-col gap-5">
            <p
              className="mono-body"
              style={{ color: '#888', maxWidth: '480px', lineHeight: 1.8 }}
            >
              {tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-volt"
              >
                <Zap size={14} /> View Projects
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-black"
              >
                <Terminal size={14} /> Let's Talk
              </a>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer"
                   className="btn-white" style={{ padding: '8px 14px' }}>
                  <Github size={14} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                   className="btn-volt" style={{ padding: '8px 14px' }}>
                  <Linkedin size={14} />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer"
                   className="btn-white" style={{ padding: '8px 14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 900, lineHeight: 1 }}>X</span>
                </a>
              )}
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="brutal-card-volt p-5 relative overflow-hidden"
              >
                <div
                  className="watermark"
                  style={{
                    fontSize: '80px',
                    bottom: '-10px',
                    right: '-10px',
                    opacity: 0.06,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: '#000',
                  lineHeight: 1,
                }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="mono-label" style={{ color: '#000', marginTop: '4px', opacity: 0.7 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#CCFF00', display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em',
            textTransform: 'uppercase', width: 'fit-content',
          }}
        >
          <ArrowDown size={14} /> SCROLL DOWN
        </motion.button>
      </div>

      {/* Side watermark text */}
      <div
        className="hidden lg:flex items-center gap-0 absolute right-0 top-0 bottom-0"
        style={{ borderLeft: '4px solid #222' }}
      >
        {['DESIGN', 'BUILD', 'SHIP', 'LEARN'].map((word, i) => (
          <div
            key={i}
            style={{
              width: '36px',
              height: '100%',
              borderLeft: i > 0 ? '2px solid #222' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: i === 0 ? '#CCFF00' : '#333',
              fontWeight: '700',
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </section>
  );
}
