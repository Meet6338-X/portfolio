'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { portfolioConfig } from '@/config/portfolio.config';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { name, title, tagline, social, stats } = portfolioConfig;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Particle constellation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const colors = ['#3b82f6', '#a78bfa', '#06b6d4', '#10b981'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Mouse attraction
        const mdx = mouseX - particles[i].x;
        const mdy = mouseY - particles[i].y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          particles[i].vx += (mdx / mdist) * 0.02;
          particles[i].vy += (mdy / mdist) * 0.02;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
        ctx.fillStyle = particles[i].color + Math.round(particles[i].opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Update
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;

        // Speed limit
        const speed = Math.sqrt(particles[i].vx ** 2 + particles[i].vy ** 2);
        if (speed > 1.5) {
          particles[i].vx *= 0.95;
          particles[i].vy *= 0.95;
        }

        // Boundary bounce
        if (particles[i].x < 0 || particles[i].x > canvas.width) particles[i].vx *= -1;
        if (particles[i].y < 0 || particles[i].y > canvas.height) particles[i].vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div className="orb orb-blue  w-[500px] h-[500px] absolute -top-32 -left-32" />
        <div className="orb orb-purple w-[400px] h-[400px] absolute top-1/2 -right-40" />
        <div className="orb orb-green  w-[300px] h-[300px] absolute bottom-0 left-1/3" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Available badge */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-green)]" />
            </span>
            <span className="font-mono text-xs text-[var(--accent-green)] tracking-wider uppercase">
              {portfolioConfig.availability}
            </span>
          </motion.div>
        )}

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-6">
            <span className="block text-[var(--text-primary)]">{name.split(' ')[0]}</span>
            <span className="block gradient-text italic">{name.split(' ').slice(1).join(' ')}</span>
          </h1>
        </motion.div>

        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-mono text-[var(--accent-blue)] text-base md:text-lg mb-4 h-7"
        >
          {mounted && (
            <TypeAnimation
              sequence={[
                title,
                2000,
                'AI & LLM Developer 🤖',
                2000,
                'Flutter Mobile Engineer 📱',
                2000,
                'GenAI & Prompt Engineer ✨',
                2000,
                'B.Tech IT @ VIT Pune 🎓',
                2000,
                'Open to 6-month internship 🚀',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          )}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body"
        >
          {tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button onClick={scrollToProjects} className="btn-primary text-base px-8 py-3.5">
            <Sparkles size={16} />
            View Projects
          </button>
          <button onClick={scrollToContact} className="btn-secondary text-base px-8 py-3.5">
            Contact Me
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
              className="glass p-4 rounded-2xl text-center"
            >
              <div className="font-display text-3xl md:text-4xl gradient-text">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-[var(--text-muted)] text-xs mt-1 font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex items-center justify-center gap-4"
        >
          {social.github && (
            <SocialLink href={social.github} label="GitHub">
              <Github size={18} />
            </SocialLink>
          )}
          {social.linkedin && (
            <SocialLink href={social.linkedin} label="LinkedIn">
              <Linkedin size={18} />
            </SocialLink>
          )}
          {social.twitter && (
            <SocialLink href={social.twitter} label="Twitter">
              <Twitter size={18} />
            </SocialLink>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors cursor-pointer group"
        >
          <span className="font-mono text-xs tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 glass glass-hover flex items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors"
    >
      {children}
    </a>
  );
}
