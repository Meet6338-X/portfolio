'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ChevronDown, ChevronUp, MessageSquare, X, RotateCcw, Bot, Zap } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio.config';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

type VisitorType = 'recruiter' | 'developer' | 'curious' | null;

const VISITOR_OPTS = [
  { type: 'recruiter' as VisitorType, emoji: '💼', label: 'RECRUITER / HR' },
  { type: 'developer' as VisitorType, emoji: '⌨️', label: 'FELLOW DEV' },
  { type: 'curious' as VisitorType, emoji: '🔍', label: 'JUST EXPLORING' },
];

function formatText(t: string) {
  return t
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#CCFF00">$1</strong>')
    .replace(/\n/g, '<br>');
}

export default function ChatBar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [visitorType, setVisitorType] = useState<VisitorType>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [unread, setUnread] = useState(0);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { aiChat, name, email } = portfolioConfig;
  const nick = portfolioConfig.nickname;

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  // Nudge after 8s
  useEffect(() => {
    const t = setTimeout(() => { if (!open) setUnread(1); }, 8000);
    return () => clearTimeout(t);
  }, [open]);

  const sendMessage = useCallback(async (content: string, vType?: VisitorType) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const allMsgs = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMsgs, visitorType: vType ?? visitorType }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      if (data.detectedVisitorType && !visitorType) setVisitorType(data.detectedVisitorType);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || `Something went wrong. Reach ${nick} at ${email}.`,
      };
      setMessages(prev => [...prev, botMsg]);
      if (!open) setUnread(p => p + 1);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now().toString(), role: 'assistant',
        content: `I'm having trouble connecting. Reach **${nick}** directly at **${email}**.`,
      }]);
    } finally { setLoading(false); }
  }, [messages, visitorType, open, nick, email]);

  const handleVisitor = (vType: VisitorType) => {
    setVisitorType(vType);
    setShowWelcome(false);
    const map = {
      recruiter: `I'm a recruiter looking at ${name}'s profile. What makes them stand out and what are their key achievements?`,
      developer: `I'm a fellow developer! Tell me about the most technically interesting things ${nick} has built.`,
      curious: `I'm just exploring — give me the best highlights about ${nick}!`,
    };
    sendMessage(map[vType!]!, vType);
  };

  const reset = () => { setMessages([]); setVisitorType(null); setShowWelcome(true); setInput(''); };

  const quickReplies = visitorType === 'recruiter'
    ? ['Key achievements?', 'Tech stack?', 'Available when?', 'Resume?']
    : visitorType === 'developer'
    ? ['Architecture details?', 'Favourite stack?', 'Open source?', 'Hardest problem?']
    : ['Best project?', 'Skills overview?', 'Contact info?'];

  if (!aiChat.enabled) return null;

  return (
    <div
      className="chat-bar"
      style={{ height: open ? undefined : '54px' }}
    >
      {/* Always-visible bar header */}
      <div
        style={{
          height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 12px sm:0 20px', cursor: 'pointer',
          borderBottom: open ? '3px solid #CCFF00' : 'none',
          background: '#000',
          flexShrink: 0,
        }}
        onClick={() => setOpen(o => !o)}
      >
        {/* Left: branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px',
            background: '#CCFF00', border: '2px solid #CCFF00',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Bot size={16} style={{ color: '#000' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '700', color: '#CCFF00', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {aiChat.botName}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'none' }} className="sm:inline">
            // AI-POWERED · ASK ME ANYTHING ABOUT {name.toUpperCase()}
          </span>
        </div>

        {/* Right: controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={e => e.stopPropagation()}>
          {/* Unread badge */}
          {unread > 0 && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                background: '#CCFF00', color: '#000',
                width: '18px', height: '18px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: '700',
              }}
            >
              {unread}
            </motion.span>
          )}

          {/* Quick topics when closed */}
          {!open && (
            <div style={{ display: 'flex', gap: '6px', marginRight: '8px' }}>
              {['Skills?', 'Projects?', 'Internship?'].map(q => (
                <button
                  key={q}
                  onClick={() => { setOpen(true); setTimeout(() => sendMessage(q), 300); }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '4px 8px',
                    background: 'transparent', color: '#555',
                    border: '2px solid #333',
                    cursor: 'pointer',
                    display: 'none',
                    transition: 'all 0.15s',
                  }}
                  className="sm:inline-flex"
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#CCFF00'; (e.target as HTMLElement).style.color = '#CCFF00'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = '#333'; (e.target as HTMLElement).style.color = '#555'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {open && messages.length > 0 && (
            <button onClick={reset}
              style={{ background: 'transparent', border: '2px solid #333', color: '#555', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Reset chat"
            >
              <RotateCcw size={12} />
            </button>
          )}
          <button onClick={() => setOpen(o => !o)}
            style={{ background: 'transparent', border: '2px solid #CCFF00', color: '#CCFF00', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700' }}>
            {open ? <><ChevronDown size={12} /> CLOSE</> : <><ChevronUp size={12} /> CHAT</>}
          </button>
        </div>
      </div>

      {/* Chat body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 54px)' }}
          >
            {/* Messages */}
            <div
              ref={messagesRef}
              style={{
                flex: 1, overflowY: 'auto', padding: '12px 16px',
                display: 'flex', flexDirection: 'column', gap: '10px',
                scrollbarWidth: 'none',
              }}
            >
              {/* Welcome screen */}
              {showWelcome && messages.length === 0 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="chat-msg-bot" style={{ maxWidth: '100%' }}>
                    <span dangerouslySetInnerHTML={{ __html: formatText(aiChat.welcomeMessage) }} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {VISITOR_OPTS.map(opt => (
                      <motion.button
                        key={opt.type}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        onClick={() => handleVisitor(opt.type)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          padding: '7px 14px',
                          background: '#1a1a1a', color: '#CCFF00',
                          border: '2px solid #CCFF00',
                          boxShadow: '3px 3px 0px 0px #CCFF00',
                          fontFamily: 'var(--font-mono)', fontSize: '10px',
                          fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.12s',
                        }}
                      >
                        {opt.emoji} {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message history */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  <div
                    className={msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}
                    dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                  />
                </motion.div>
              ))}

              {/* Typing */}
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="chat-msg-bot" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '10px 14px' }}>
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length > 0 && !loading && (
              <div style={{ padding: '0 16px 8px', display: 'flex', gap: '6px', flexWrap: 'wrap', flexShrink: 0 }}>
                {quickReplies.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '4px 10px', cursor: 'pointer',
                      background: 'transparent', color: '#444',
                      border: '2px solid #333',
                      transition: 'all 0.12s',
                    }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#CCFF00'; (e.target as HTMLElement).style.color = '#CCFF00'; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = '#333'; (e.target as HTMLElement).style.color = '#444'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div style={{
              borderTop: '3px solid #222', padding: '10px 12px',
              display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0,
              background: '#0a0a0a',
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (input.trim() && !loading) { if (showWelcome) setShowWelcome(false); sendMessage(input.trim()); } } }}
                placeholder="ASK ANYTHING ABOUT MEET..."
                disabled={loading}
                style={{
                  flex: 1, padding: '8px 12px',
                  background: '#111', color: '#fff',
                  border: '2px solid #333', outline: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  letterSpacing: '0.04em',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = '#CCFF00'}
                onBlur={e => e.target.style.borderColor = '#333'}
              />
              <button
                onClick={() => { if (input.trim() && !loading) { if (showWelcome) setShowWelcome(false); sendMessage(input.trim()); } }}
                disabled={loading || !input.trim()}
                style={{
                  width: '38px', height: '38px', flexShrink: 0,
                  background: '#CCFF00', border: '2px solid #000',
                  color: '#000', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '3px 3px 0px 0px #000',
                  opacity: (loading || !input.trim()) ? 0.5 : 1,
                  transition: 'transform 0.12s, box-shadow 0.12s',
                }}
                onMouseEnter={e => { if (!loading && input.trim()) { (e.currentTarget).style.transform = 'translate(2px,2px)'; (e.currentTarget).style.boxShadow = '1px 1px 0px 0px #000'; } }}
                onMouseLeave={e => { (e.currentTarget).style.transform = ''; (e.currentTarget).style.boxShadow = '3px 3px 0px 0px #000'; }}
              >
                {loading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
