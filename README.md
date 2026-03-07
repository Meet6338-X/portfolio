# ⚡ AI-Powered Developer Portfolio

A **premium, configuration-driven** developer portfolio with a built-in AI assistant that adapts its pitch based on whether the visitor is a recruiter, fellow developer, or just exploring.

> Built with Next.js 14 · Tailwind CSS · Framer Motion · OpenRouter AI · Deploy-ready for Vercel

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Add your OpenRouter API key to .env.local
# OPENROUTER_API_KEY=sk-or-v1-your-key

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎨 Customising Your Portfolio

**Everything lives in one file**: `config/portfolio.config.ts`

Edit this file to update:

| Section | Config Key |
|---|---|
| Name, title, bio | `name`, `title`, `tagline`, `bio` |
| Social links | `social.github`, `social.linkedin`, etc. |
| Stats (5+ years, 47 projects…) | `stats[]` |
| About section paragraphs | `about.paragraphs[]` |
| Skills & proficiency | `skills[]` |
| Projects | `projects[]` |
| Work experience | `experience[]` |
| Education | `education[]` |
| Certifications | `certifications[]` |
| AI chatbot model | `aiChat.model` |
| Theme colours | `theme.accentColor` |
| SEO metadata | `seo.*` |

### Adding a New Project

```ts
// In config/portfolio.config.ts, add to projects array:
{
  id: "my-new-project",
  title: "My New Project",
  description: "Short description shown in the card.",
  longDescription: "Longer description shown in the modal popup.",
  image: "https://images.unsplash.com/...",  // or /images/myproject.png
  tags: ["React", "Node.js", "PostgreSQL"],
  github: "https://github.com/you/project",
  demo: "https://myproject.com",
  featured: true,  // shows in Featured filter
  year: 2024,
  metrics: "10k users · $0 CAC",
}
```

### Adding Work Experience

```ts
{
  type: "work",
  company: "Company Name",
  role: "Senior Engineer",
  period: "2023 – Present",
  location: "Remote",
  logo: "",  // optional URL to company logo
  description: "What you did in 1-2 sentences.",
  achievements: [
    "Reduced latency by 40% via caching",
    "Led a team of 5 engineers",
  ],
  tech: ["React", "Go", "PostgreSQL"],
}
```

---

## 🤖 GitHub Auto-Sync

Set `githubUsername` in the config to automatically pull your public repos:

```ts
githubUsername: "yourusername",
```

The portfolio will:
1. Fetch your **pinned repos** (if you set `GITHUB_TOKEN`)
2. Fall back to your **top starred repos** (no token needed)
3. Merge them with your manual projects (no duplicates)
4. Show live star counts and languages

### Setting up GitHub Token (optional, recommended)

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Create a token with **no scopes** (read-only for public data)
3. Add to `.env.local`: `GITHUB_TOKEN=ghp_your_token`

---

## 💼 LinkedIn Import

LinkedIn's API doesn't allow free automated access. Here are your options:

### Option 1: Manual Update (Recommended)
Just update `experience[]` and `certifications[]` in `portfolio.config.ts` directly. This is the most reliable approach.

### Option 2: LinkedIn Data Export
1. LinkedIn → Settings → Data Privacy → **Get a copy of your data**
2. Select "Positions" and "Certifications"
3. Copy the data into `config/portfolio.config.ts`

### Option 3: Periodic Manual Sync
When you update your LinkedIn, also update `portfolio.config.ts`. It's one file, takes 2 minutes.

---

## 🧠 AI Chatbot Configuration

The chatbot uses **OpenRouter** (free tier) and automatically adapts to:

- **Recruiters** → emphasises metrics, achievements, team impact, availability
- **Developers** → goes deep on tech stack, architecture, interesting problems
- **Explorers** → gives engaging highlights and asks what they're curious about

### Changing the AI Model

```ts
// In config/portfolio.config.ts:
aiChat: {
  model: "google/gemma-3-27b-it:free",          // primary
  fallbackModel: "nvidia/nemotron-3-nano-30b-a3b:free", // fallback
}
```

**Free models on OpenRouter (as of 2025):**
- `google/gemma-3-27b-it:free` ← Best quality
- `meta-llama/llama-3.1-8b-instruct:free` ← Fastest
- `nvidia/nemotron-3-nano-30b-a3b:free` ← Good balance
- `mistralai/mistral-7b-instruct:free` ← Reliable

Disable the chatbot:
```ts
aiChat: { enabled: false }
```

---

## 🌍 Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel and it auto-deploys on every push.

### Required Environment Variables in Vercel

Go to your Vercel project → **Settings → Environment Variables**:

| Variable | Value | Required |
|---|---|---|
| `OPENROUTER_API_KEY` | `sk-or-v1-...` | ✅ Yes (for AI chat) |
| `GITHUB_TOKEN` | `ghp_...` | Optional |
| `NEXT_PUBLIC_SITE_URL` | `https://yoursite.vercel.app` | Recommended |
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID | Optional |

---

## 📬 Contact Form

Two options:

### Option 1: Formspree (Free tier: 50 submissions/month)
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a form and get your form ID
3. Add to Vercel env: `NEXT_PUBLIC_FORMSPREE_ID=your-form-id`

### Option 2: mailto fallback (default)
Without Formspree configured, the form opens the user's email client with a pre-filled message. Zero setup needed.

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Main page (assembles all sections)
│   ├── globals.css         # Design system (CSS variables, utilities)
│   └── api/
│       ├── chat/route.ts   # AI chatbot API (OpenRouter)
│       └── github/route.ts # GitHub repo sync
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav with scroll progress
│   │   └── Footer.tsx      # Simple footer with social links
│   ├── sections/
│   │   ├── Hero.tsx        # Particle canvas + animated hero
│   │   ├── About.tsx       # Bio, values, interests
│   │   ├── Skills.tsx      # Categorized skill cards with progress bars
│   │   ├── Projects.tsx    # Project grid + GitHub sync + modal
│   │   ├── Experience.tsx  # Timeline with work/education/certs tabs
│   │   └── Contact.tsx     # Form + social links
│   └── ui/
│       ├── ChatWidget.tsx  # AI chat — the main feature
│       └── AnimatedSection.tsx # Scroll-triggered animation wrapper
├── config/
│   └── portfolio.config.ts # ← EDIT THIS FILE TO CUSTOMISE EVERYTHING
├── hooks/
│   └── useScrollPosition.ts
├── lib/
│   ├── utils.ts            # AI system prompt builder, helpers
│   └── github.ts           # GitHub API helpers
├── public/
│   └── resume.pdf          # ← PUT YOUR RESUME HERE
└── .env.local              # ← YOUR API KEYS (never commit this)
```

---

## ✨ Features

- **🤖 AI Chat** — Visitor-type detection, adapts pitch for recruiters vs developers
- **⚡ GitHub Sync** — Auto-fetches pinned repos, shows live stars
- **🎨 Particle Background** — Interactive constellation that reacts to mouse
- **📱 Fully Responsive** — Mobile, tablet, and desktop optimised
- **🌙 Dark Mode** — Obsidian theme with optional light mode
- **🔍 SEO Ready** — OpenGraph, Twitter cards, structured metadata
- **♿ Accessible** — ARIA labels, keyboard navigation, reduced motion support
- **🚀 Edge-Ready** — API routes run on Vercel Edge Runtime
- **📊 Scroll Progress** — Reading progress bar at top of page
- **✨ Glassmorphism** — Premium glass cards with backdrop blur
- **🎬 Framer Motion** — Staggered reveals, spring animations, page transitions

---

## 🔧 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom CSS |
| Animations | Framer Motion |
| AI | OpenRouter API (free models) |
| Type Safety | TypeScript |
| Icons | Lucide React |
| Fonts | DM Serif Display + Syne + JetBrains Mono |
| Deployment | Vercel (Edge Runtime) |
| GitHub Sync | GitHub REST + GraphQL API |
| Forms | Formspree (optional) |

---

## 📝 Licence

MIT — free to use and modify for your personal portfolio.
