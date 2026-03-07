import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePortfolioContext(config: any): string {
  const { name, title, elevatorPitch, skills, projects, experience, education, certifications, stats, social } = config;

  const skillsSummary = skills
    .map((cat: any) => `${cat.category}: ${cat.items.map((s: any) => s.name).join(', ')}`)
    .join('\n');

  const projectsSummary = projects
    .slice(0, 6)
    .map((p: any) => `• ${p.title} (${p.year}): ${p.description} [Tags: ${p.tags.join(', ')}]${p.metrics ? ` — ${p.metrics}` : ''}`)
    .join('\n');

  const experienceSummary = experience
    .map((e: any) => `• ${e.role} @ ${e.company} (${e.period}): ${e.description} Key wins: ${e.achievements.slice(0,2).join('; ')}`)
    .join('\n');

  const educationSummary = education
    .map((e: any) => `• ${e.degree} — ${e.institution} (${e.period})`)
    .join('\n');

  return `
NAME: ${name}
CURRENT TITLE: ${title}
ELEVATOR PITCH: ${elevatorPitch}

STATS:
${stats.map((s: any) => `• ${s.value}${s.suffix} ${s.label}`).join('\n')}

SKILLS:
${skillsSummary}

NOTABLE PROJECTS:
${projectsSummary}

WORK EXPERIENCE:
${experienceSummary}

EDUCATION:
${educationSummary}

CERTIFICATIONS:
${certifications.map((c: any) => `• ${c.name} — ${c.issuer} (${c.year})`).join('\n')}

SOCIAL / CONTACT:
GitHub: ${social.github}
LinkedIn: ${social.linkedin}
Twitter: ${social.twitter || 'N/A'}
`.trim();
}

export function buildSystemPrompt(config: any, visitorType?: string): string {
  const context = generatePortfolioContext(config);
  const { name, nickname, aiChat } = config;

  let visitorInstructions = '';
  if (visitorType === 'recruiter') {
    visitorInstructions = `
VISITOR TYPE: RECRUITER / HR
Strategy: Focus on business impact, metrics, team collaboration, leadership, reliability, culture fit.
Emphasise: measurable achievements, promotions, scale of systems built, soft skills, availability.
Tone: Professional, confident, concise. Lead with impact numbers.
Offer to: share resume link, discuss role fit, explain career trajectory.
`;
  } else if (visitorType === 'developer') {
    visitorInstructions = `
VISITOR TYPE: FELLOW DEVELOPER / TECHNICAL PEER
Strategy: Go deep on architecture, technical tradeoffs, code quality, interesting engineering challenges.
Emphasise: specific tech stack decisions, system design, open-source contributions, learning philosophy.
Tone: Peer-to-peer, technical, enthusiastic. Use correct terminology.
Offer to: discuss specific projects in depth, share GitHub repos, talk about tradeoffs.
`;
  } else {
    visitorInstructions = `
VISITOR TYPE: UNKNOWN / GENERAL
Strategy: Give an engaging overview. Identify what the visitor cares about through natural conversation.
Ask clarifying questions to understand their interest and tailor subsequent responses.
Keep initial responses welcoming and highlight the most impressive/interesting aspects.
`;
  }

  return `You are the AI assistant for ${name}'s professional portfolio. You speak AS ${name}'s representative — knowledgeable, enthusiastic, and honest about their work.

${visitorInstructions}

PORTFOLIO DATA:
${context}

RULES:
1. ONLY answer questions based on the portfolio data above. If you don't know something, say "${nickname} hasn't shared that publicly, but you could reach out directly at ${config.email}."
2. Be conversational and warm, not robotic or salesy.
3. If you detect the visitor's type from conversation (recruiter/developer/other), adapt your style accordingly without being obvious about it.
4. Keep responses focused and under 200 words unless asked for detail.
5. Proactively offer relevant information based on what the visitor seems interested in.
6. Never fabricate stats, companies, or projects not listed above.
7. If asked about salary expectations, redirect to direct contact.
8. You can recommend the visitor check out specific projects or sections of the portfolio.
9. Always stay in character as ${name}'s AI — friendly, professional, and genuinely helpful.
10. When a recruiter seems interested, offer to help them get ${nickname}'s resume or set up a call.`;
}

export function formatDate(dateStr: string): string {
  return dateStr; // already formatted in config, but could parse if needed
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}
