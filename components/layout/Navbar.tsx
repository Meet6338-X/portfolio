'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Zap } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio.config';
import { useScrollPosition, useActiveSection } from '@/hooks/useScrollPosition';

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];
const sectionIds = navLinks.map(l => l.href.slice(1));

export default function Navbar() {
  const { scrollProgress } = useScrollPosition();
  const activeSection = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll progress */}
      <div className="progress-line" style={{ width: `${scrollProgress}%` }} />

      <nav className="navbar-brutal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                background: '#CCFF00', border: '3px solid #000',
                boxShadow: '3px 3px 0px 0px #CCFF00', transform: 'rotate(3deg)',
                transition: 'transform 0.2s',
              }}
            >
              <Zap size={14} fill="#000" className="text-black" />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              color: '#CCFF00',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              {portfolioConfig.name.split(' ')[0]}
              <span style={{ color: '#fff' }}>
                .{portfolioConfig.name.split(' ')[1]?.toLowerCase()}
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleLink(e, link.href)}
                className="mono-label px-4 py-2 transition-all duration-150"
                style={{
                  color: activeSection === link.href.slice(1) ? '#CCFF00' : '#666',
                  borderBottom: activeSection === link.href.slice(1)
                    ? '3px solid #CCFF00' : '3px solid transparent',
                  fontSize: '10px',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Resume btn + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioConfig.resumeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-volt hidden sm:inline-flex"
              style={{ padding: '8px 16px', fontSize: '10px' }}
            >
              <Download size={12} /> Resume
            </a>

            <button
              className="md:hidden p-2"
              style={{ border: '2px solid #CCFF00', background: 'transparent', color: '#CCFF00', cursor: 'pointer' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              style={{ overflow: 'hidden', background: '#000', borderTop: '3px solid #CCFF00' }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={e => handleLink(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="mono-label block px-4 py-3"
                    style={{
                      color: activeSection === link.href.slice(1) ? '#CCFF00' : '#fff',
                      borderLeft: activeSection === link.href.slice(1)
                        ? '3px solid #CCFF00' : '3px solid transparent',
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href={portfolioConfig.resumeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-volt mt-2 justify-center"
                >
                  <Download size={12} /> Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
