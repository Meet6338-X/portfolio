'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, CheckCircle, Loader2, MapPin, Zap } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio.config';

export default function Contact() {
  const { contact, email, social, name } = portfolioConfig;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const fid = process.env.NEXT_PUBLIC_FORMSPREE_ID || contact.formspreeId;
      if (fid) {
        const r = await fetch(`https://formspree.io/f/${fid}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (r.ok) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }); return; }
      }
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(form.message)}`;
      setStatus('success');
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" style={{ background: '#0f0f0f' }} className="dot-pattern">
      <div style={{ height: '6px', background: '#CCFF00' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="sticker" style={{ display: 'inline-flex', marginBottom: '20px' }}>
            07 // Contact
          </div>
          <div className="display-lg" style={{ color: '#fff' }}>
            {contact.heading.split(' ').slice(0, 3).join(' ')}
          </div>
          <div className="display-lg" style={{ color: '#CCFF00' }}>
            {contact.heading.split(' ').slice(3).join(' ')}
          </div>
          <p className="mono-body" style={{ color: '#666', marginTop: '16px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            {contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Email card */}
            <div style={{ background: '#CCFF00', border: '4px solid #000', boxShadow: '6px 6px 0px 0px #000', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Mail size={20} style={{ color: '#000' }} />
                <span className="mono-label" style={{ color: '#000' }}>DIRECT EMAIL</span>
              </div>
              <a href={`mailto:${email}`}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#000', fontWeight: '700', wordBreak: 'break-all' }}>
                {email}
              </a>
            </div>

            {/* Location */}
            <div style={{ border: '4px solid #CCFF00', boxShadow: '6px 6px 0px 0px #CCFF00', padding: '18px', background: '#111', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={20} style={{ color: '#CCFF00', flexShrink: 0 }} />
              <div>
                <div className="mono-label" style={{ color: '#CCFF00' }}>LOCATION</div>
                <div style={{ fontFamily: 'var(--font-body)', color: '#fff', marginTop: '4px' }}>{portfolioConfig.location}</div>
              </div>
            </div>

            {/* Availability */}
            <div style={{ border: '4px solid #333', padding: '18px', background: '#111' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88', flexShrink: 0 }} className="pulse-volt" />
                <span className="mono-label" style={{ color: '#00ff88' }}>AVAILABLE</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#aaa', lineHeight: 1.6 }}>
                {contact.availability}
              </p>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="btn-white"
                   style={{ justifyContent: 'center', padding: '10px' }}>
                  <Github size={14} /> GITHUB
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-volt"
                   style={{ justifyContent: 'center', padding: '10px' }}>
                  <Linkedin size={14} /> LINKEDIN
                </a>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div style={{ border: '4px solid #CCFF00', boxShadow: '8px 8px 0px 0px #CCFF00', overflow: 'hidden' }}>
              <div style={{ background: '#CCFF00', padding: '12px 18px', borderBottom: '4px solid #000' }}>
                <span className="mono-label" style={{ color: '#000' }}>
                  <Zap size={12} style={{ display: 'inline', marginRight: '6px' }} />
                  SEND A MESSAGE
                </span>
              </div>
              <div style={{ padding: '24px', background: '#111' }}>
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '32px 0' }}>
                    <CheckCircle size={48} style={{ color: '#CCFF00', margin: '0 auto 16px' }} />
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#CCFF00', textTransform: 'uppercase' }}>
                      MESSAGE SENT!
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#666', marginTop: '8px' }}>
                      I'll get back to you within 24-48 hours.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-volt" style={{ marginTop: '20px' }}>
                      SEND ANOTHER
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="mono-label" style={{ color: '#CCFF00', marginBottom: '6px' }}>NAME</div>
                        <input type="text" required value={form.name}
                          onChange={e => setForm(p => ({...p, name: e.target.value}))}
                          placeholder="YOUR NAME" className="brutal-input" />
                      </div>
                      <div>
                        <div className="mono-label" style={{ color: '#CCFF00', marginBottom: '6px' }}>EMAIL</div>
                        <input type="email" required value={form.email}
                          onChange={e => setForm(p => ({...p, email: e.target.value}))}
                          placeholder="YOUR@EMAIL.COM" className="brutal-input" />
                      </div>
                    </div>
                    <div>
                      <div className="mono-label" style={{ color: '#CCFF00', marginBottom: '6px' }}>SUBJECT</div>
                      <input type="text" value={form.subject}
                        onChange={e => setForm(p => ({...p, subject: e.target.value}))}
                        placeholder="INTERNSHIP OPPORTUNITY / COLLABORATION" className="brutal-input" />
                    </div>
                    <div>
                      <div className="mono-label" style={{ color: '#CCFF00', marginBottom: '6px' }}>MESSAGE</div>
                      <textarea rows={5} required value={form.message}
                        onChange={e => setForm(p => ({...p, message: e.target.value}))}
                        placeholder="TELL ME ABOUT THE OPPORTUNITY OR PROJECT..."
                        className="brutal-input" style={{ resize: 'vertical' }} />
                    </div>
                    {status === 'error' && (
                      <p className="mono-sm" style={{ color: '#ff4444' }}>Something went wrong. Email me directly.</p>
                    )}
                    <button type="submit" disabled={status === 'sending'} className="btn-volt"
                      style={{ justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
                      {status === 'sending'
                        ? <><Loader2 size={14} className="animate-spin" /> SENDING...</>
                        : <><Send size={14} /> SEND MESSAGE</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '6px', background: '#CCFF00' }} />
    </section>
  );
}
