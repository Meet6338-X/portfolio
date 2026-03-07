'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Twitter, Globe, CheckCircle, Loader2 } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { portfolioConfig } from '@/config/portfolio.config';

export default function Contact() {
  const { contact, email, social, name } = portfolioConfig;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // If Formspree is configured, use it
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || contact.formspreeId;
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          return;
        }
      }
      // Fallback: open mailto
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(formData.subject || 'Portfolio contact')}&body=${encodeURIComponent(formData.message)}`;
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const socialLinks = [
    { href: social.github, icon: <Github size={18} />, label: 'GitHub', color: '#6e7681' },
    { href: social.linkedin, icon: <Linkedin size={18} />, label: 'LinkedIn', color: '#0a66c2' },
    { href: social.twitter, icon: <Twitter size={18} />, label: 'Twitter', color: '#1d9bf0' },
    { href: social.website, icon: <Globe size={18} />, label: 'Website', color: '#10b981' },
  ].filter(l => l.href);

  return (
    <section id="contact" className="section relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent-blue)]/4 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-purple)]/4 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-14">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            {contact.heading}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            {contact.subheading}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — info */}
          <AnimatedSection direction="left" delay={0.2} className="lg:col-span-2 space-y-6">
            {/* Direct email */}
            <div className="glass p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-blue)]/15 flex items-center justify-center">
                  <Mail size={18} className="text-[var(--accent-blue)]" />
                </div>
                <div>
                  <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">Email</p>
                  <a href={`mailto:${email}`} className="text-sm text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors">
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="glass p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-green)]" />
                </span>
                <p className="font-mono text-xs text-[var(--accent-green)] uppercase tracking-wider">Available</p>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{contact.availability}</p>
            </div>

            {/* Social links */}
            <div className="glass p-5 rounded-2xl">
              <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-4">Find me online</p>
              <div className="space-y-2">
                {socialLinks.map(({ href, icon, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span style={{ color }} className="transition-transform group-hover:scale-110">
                      {icon}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {label}
                    </span>
                    <span className="ml-auto text-[var(--text-muted)] text-xs group-hover:text-[var(--accent-blue)] transition-colors">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection direction="right" delay={0.3} className="lg:col-span-3">
            <div className="glass p-8 rounded-2xl">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle size={48} className="text-[var(--accent-green)] mx-auto mb-4" />
                  <h3 className="font-display text-2xl text-[var(--text-primary)] mb-2">Message sent!</h3>
                  <p className="text-[var(--text-secondary)]">I'll get back to you within 24–48 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 btn-secondary text-sm px-6"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                      placeholder="What's this about?"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Tell me about your project, opportunity, or just say hello..."
                      className="form-input resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm font-mono">Something went wrong. Please email me directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center py-3.5 text-base"
                  >
                    {status === 'sending' ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
