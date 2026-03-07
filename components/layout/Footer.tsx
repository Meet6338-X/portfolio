import { portfolioConfig } from '@/config/portfolio.config';
import { Github, Linkedin, Twitter, Globe, Heart } from 'lucide-react';

export default function Footer() {
  const { name, social, email } = portfolioConfig;
  const year = new Date().getFullYear();

  const socials = [
    { href: social.github, icon: <Github size={16} />, label: 'GitHub' },
    { href: social.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn' },
    { href: social.twitter, icon: <Twitter size={16} />, label: 'Twitter' },
    { href: social.website, icon: <Globe size={16} />, label: 'Website' },
  ].filter(s => s.href);

  return (
    <footer className="border-t border-[var(--border-subtle)] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-sm text-[var(--text-muted)]">
          <span>©{year} {name}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            Built with <Heart size={12} className="text-red-400 mx-0.5" /> & Next.js
          </span>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 glass flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-blue)] hover:border-[var(--border-glow)] transition-all"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
