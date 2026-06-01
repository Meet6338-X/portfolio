import { portfolioConfig } from '@/config/portfolio.config';
import { Github, Linkedin, Heart, Terminal } from 'lucide-react';

export default function Footer() {
  const { name, social, email } = portfolioConfig;

  return (
    <footer style={{ background: '#000', borderTop: '4px solid #CCFF00', padding: '20px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#444' }}>
          <Terminal size={12} style={{ color: '#CCFF00' }} />
          <span>© {new Date().getFullYear()} <span style={{ color: '#CCFF00' }}>{name}</span></span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            BUILT WITH <Heart size={11} style={{ color: '#CCFF00' }} /> & NEXT.JS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {social.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer"
               style={{ width: '32px', height: '32px', background: '#111', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', transition: 'all 0.15s' }}
               onMouseEnter={e => { (e.currentTarget).style.borderColor = '#CCFF00'; (e.currentTarget).style.color = '#CCFF00'; }}
               onMouseLeave={e => { (e.currentTarget).style.borderColor = '#333'; (e.currentTarget).style.color = '#666'; }}>
              <Github size={14} />
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
               style={{ width: '32px', height: '32px', background: '#111', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', transition: 'all 0.15s' }}
               onMouseEnter={e => { (e.currentTarget).style.borderColor = '#CCFF00'; (e.currentTarget).style.color = '#CCFF00'; }}
               onMouseLeave={e => { (e.currentTarget).style.borderColor = '#333'; (e.currentTarget).style.color = '#666'; }}>
              <Linkedin size={14} />
            </a>
          )}
          {social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer"
               style={{ width: '32px', height: '32px', background: '#111', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', transition: 'all 0.15s' }}
               onMouseEnter={e => { (e.currentTarget).style.borderColor = '#CCFF00'; (e.currentTarget).style.color = '#CCFF00'; }}
               onMouseLeave={e => { (e.currentTarget).style.borderColor = '#333'; (e.currentTarget).style.color = '#666'; }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 900, lineHeight: 1 }}>X</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
