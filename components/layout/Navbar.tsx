'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio.config';
import { useScrollPosition, useActiveSection } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

const sectionIds = navLinks.map(l => l.href.slice(1));

export default function Navbar() {
  const { scrollY, scrollProgress } = useScrollPosition();
  const activeSection = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scrollY > 60;

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className={cn('navbar', scrolled && 'navbar-scrolled')}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-mono text-sm font-medium relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[var(--accent-blue)]">{'<'}</span>
            <span className="text-[var(--text-primary)]">{portfolioConfig.name.split(' ')[0].toLowerCase()}</span>
            <span className="text-[var(--accent-purple)]">.dev</span>
            <span className="text-[var(--accent-blue)]">{' />'}</span>
          </motion.a>

          {/* Desktop Nav */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleLink(e, link.href)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                  activeSection === link.href.slice(1)
                    ? 'text-[var(--accent-blue)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-[var(--accent-blue)]/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}

            <a
              href={portfolioConfig.resumeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 btn-primary text-sm py-2 px-4"
            >
              <Download size={14} />
              Resume
            </a>
          </motion.div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-[var(--border-subtle)]"
            >
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={e => handleLink(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      activeSection === link.href.slice(1)
                        ? 'text-[var(--accent-blue)] bg-[var(--accent-blue)]/10'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href={portfolioConfig.resumeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-2.5 mt-2 justify-center"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
