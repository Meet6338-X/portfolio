'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Loader2, Bot, User,
  Briefcase, Code2, Smile, Minimize2, Maximize2, RefreshCw
} from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio.config';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type VisitorType = 'recruiter' | 'developer' | 'curious' | null;

const VISITOR_OPTIONS = [
  { type: 'recruiter' as VisitorType, icon: <Briefcase size={14} />, label: 'Recruiter / HR', color: 'var(--accent-blue)' },
  { type: 'developer' as VisitorType, icon: <Code2 size={14} />, label: 'Fellow Developer', color: 'var(--accent-green)' },
  { type: 'curious' as VisitorType, icon: <Smile size={14} />, label: 'Just Exploring', color: 'var(--accent-purple)' },
];

function formatText(text: string) {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Line breaks
  text = text.replace(/\n/g, '<br>');
  return text;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [visitorType, setVisitorType] = useState<VisitorType>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [unread, setUnread] = useState(0);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { aiChat, name } = portfolioConfig;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Show notification pulse after 5s
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open) setUnread(1);
    }, 5000);
    return () => clearTimeout(t);
  }, [open]);

  const sendMessage = useCallback(async (content: string, vType?: VisitorType) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTyping(true);

    try {
      const allMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages,
          visitorType: vType ?? visitorType,
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      // Update visitor type if detected
      if (data.detectedVisitorType && !visitorType) {
        setVisitorType(data.detectedVisitorType);
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I encountered an issue. Please try again.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMsg]);
      if (!open) setUnread(prev => prev + 1);
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm having trouble connecting right now. You can reach ${name.split(' ')[0]} directly at **${portfolioConfig.email}**.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  }, [messages, visitorType, open, name]);

  const handleVisitorSelect = (vType: VisitorType) => {
    setVisitorType(vType);
    setShowWelcome(false);

    const greetingMap = {
      recruiter: `I'm a recruiter exploring ${name}'s background. Tell me about their experience and what makes them stand out.`,
      developer: `I'm a fellow developer! Tell me about the most technically interesting projects ${name.split(' ')[0]} has built.`,
      curious: `I'm just exploring — give me the best highlights of ${name.split(' ')[0]}'s work!`,
    };

    sendMessage(greetingMap[vType!]!, vType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    if (showWelcome) setShowWelcome(false);
    sendMessage(input.trim());
  };

  const resetChat = () => {
    setMessages([]);
    setVisitorType(null);
    setShowWelcome(true);
    setInput('');
  };

  if (!aiChat.enabled) return null;

  return (
    <div className="chat-widget" style={{ zIndex: 1000 }}>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="absolute bottom-16 right-0 w-[360px] glass rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            style={{
              height: minimized ? 'auto' : '520px',
              border: '1px solid var(--border-glow)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]"
                 style={{ background: 'rgba(59,130,246,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-display text-sm relative">
                  {aiChat.avatarInitial}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--accent-green)] rounded-full border-2 border-[var(--bg-primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{aiChat.botName}</p>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    {visitorType ? `Chatting as ${visitorType}` : 'AI-powered · Free'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
                  title="Reset chat"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
                >
                  {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                  {/* Welcome / visitor select */}
                  {showWelcome && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="chat-bubble-bot">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: formatText(aiChat.welcomeMessage),
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        {VISITOR_OPTIONS.map(opt => (
                          <motion.button
                            key={opt.type}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleVisitorSelect(opt.type)}
                            className="w-full flex items-center gap-2.5 p-3 glass rounded-xl hover:border-[var(--border-glow)] transition-all text-left group"
                          >
                            <span style={{ color: opt.color }}>{opt.icon}</span>
                            <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                              {opt.label}
                            </span>
                            <span className="ml-auto text-[var(--text-muted)] text-xs group-hover:text-[var(--accent-blue)] transition-colors">→</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Message history */}
                  {messages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white text-xs shrink-0 mt-auto">
                          {aiChat.avatarInitial}
                        </div>
                      )}
                      <div
                        className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}
                        dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                      />
                      {msg.role === 'user' && (
                        <div className="w-7 h-7 rounded-lg bg-[var(--accent-blue)]/20 border border-[var(--border-subtle)] flex items-center justify-center shrink-0 mt-auto">
                          <User size={12} className="text-[var(--accent-blue)]" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {typing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white text-xs shrink-0">
                        {aiChat.avatarInitial}
                      </div>
                      <div className="chat-bubble-bot chat-typing flex items-center gap-1 py-3 px-4">
                        <span /><span /><span />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick suggestions (after first message) */}
                {messages.length > 0 && !loading && (
                  <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                    {getSuggestions(visitorType).map(s => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-2.5 py-1 glass rounded-full text-[var(--text-muted)] hover:text-[var(--accent-blue)] hover:border-[var(--border-glow)] transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-[var(--border-subtle)]">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      disabled={loading}
                      className="form-input flex-1 text-sm py-2.5"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[var(--accent-blue)]/30 transition-all shrink-0"
                    >
                      {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    </button>
                  </form>
                  <p className="text-center text-[var(--text-muted)] text-xs font-mono mt-1.5">
                    AI-powered · Responses based on portfolio data
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white shadow-xl shadow-[var(--accent-blue)]/30 ml-auto"
        style={{ boxShadow: open ? '0 0 30px rgba(59,130,246,0.5)' : undefined }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {unread > 0 && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent-green)] rounded-full text-white text-xs flex items-center justify-center font-mono"
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-2xl border-2 border-[var(--accent-blue)]/40 animate-ping" />
        )}
      </motion.button>
    </div>
  );
}

function getSuggestions(visitorType: VisitorType): string[] {
  const base = ['Tell me more', 'Resume?'];
  if (visitorType === 'recruiter') {
    return ['Key achievements?', 'Tech stack?', 'Available when?', 'Salary range?'];
  }
  if (visitorType === 'developer') {
    return ['Architecture details?', 'Favorite stack?', 'Open source?', 'Hardest problem?'];
  }
  return ['Best project?', 'Skills?', 'Contact info?', 'Resume?'];
}
