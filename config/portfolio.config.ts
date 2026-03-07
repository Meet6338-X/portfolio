// ============================================================
//  PORTFOLIO CONFIGURATION — Meet Shah
//  Edit this file to update your entire portfolio.
//  GitHub auto-sync: set githubUsername below.
// ============================================================

export const portfolioConfig = {
  name: "Meet Shah",
  nickname: "Meet",
  title: "AI & LLM Developer | Flutter & Web Developer",
  tagline: "Building intelligent solutions at the intersection of AI and modern software.",
  bio: `I'm Meet, a curious and growth-driven developer pursuing a B.Tech in IT at VIT Pune.
I specialise in the intersection of Artificial Intelligence, Large Language Models (LLMs),
and modern software development. With a strong foundation in Flutter, Python, and Web
technologies, I've delivered impactful solutions during internships at Kodacy and TechGigs.
My focus is on building intelligent, scalable applications that solve real-world problems
using cutting-edge GenAI techniques.`,

  elevatorPitch: `I'm a 20-year-old AI & LLM developer from Pune, currently in my 2nd year of B.Tech IT at VIT Pune (9.05 CGPA). I specialise in GenAI, LLMs, prompt engineering, and Flutter mobile development. I've completed internships at Kodacy (AI/ML) and TechGigs (Flutter), hold 40+ global certifications including Harvard CS50x and Google Gemini, and I'm actively seeking a 6-month internship in AI/ML, GenAI, or full-stack development. I bring a 'grind by default' mentality and I'm available immediately — remote or on-site in Pune.`,

  email: "meetshah.work@gmail.com",
  phone: "",
  location: "Pune, Maharashtra, India",
  availability: "Seeking 6-month internship — Available now",
  resumeURL: "/resume.pdf",
  avatarURL: "https://avatars.githubusercontent.com/u/104332912?v=4",

  social: {
    github:   "https://github.com/Meet6338-X",
    linkedin: "https://www.linkedin.com/in/meet-shah-co",
    twitter:  "",
    website:  "",
    dribbble: "",
    youtube:  "",
  },

  githubUsername: "Meet6338-X",

  theme: {
    defaultMode: "dark" as "dark" | "light",
    accentColor:     "#6366f1",
    accentSecondary: "#06b6d4",
    accentTertiary:  "#a78bfa",
  },

  aiChat: {
    enabled: true,
    model:         "google/gemma-3-27b-it:free",
    fallbackModel: "nvidia/nemotron-3-nano-30b-a3b:free",
    welcomeMessage: "Hey! 👋 I'm Meet's AI assistant. I can tell you everything about him — skills, projects, internships, and what he's looking for.\n\nAre you a **recruiter**, a **fellow developer**, or just **exploring**?",
    botName: "Meet's AI",
    avatarInitial: "M",
  },

  stats: [
    { value: 9,  suffix: ".05",  label: "CGPA at VIT Pune" },
    { value: 40, suffix: "+",    label: "Global Certifications" },
    { value: 2,  suffix: "",     label: "Internships Completed" },
    { value: 20, suffix: " yrs", label: "Young & Hungry" },
  ],

  about: {
    paragraphs: [
      "I started programming during my Diploma in Computer Engineering and quickly fell in love with building things that *actually do something smart*. That curiosity led me deep into **AI, LLMs, and Generative AI** — the technologies reshaping software in this decade.",
      "Today I blend a strong academic record (9.05 CGPA at VIT Pune) with real industry exposure through internships at **Kodacy** (AI/ML) and **TechGigs** (Flutter). I don't just learn frameworks — I understand what's happening under the hood, from 8086 Assembly to transformer architectures.",
      "Outside code I invest heavily in structured learning — Harvard CS50x, Google Gemini certification, and 40+ other credentials. My motivation is simple: **bridge the gap between raw AI capabilities and practical, user-centric software solutions**.",
    ],
    interests: [
      "Generative AI & LLMs",
      "Mobile Engineering",
      "Open Source",
      "Financial Technology",
      "Low-level Systems",
      "Continuous Learning",
    ],
    values: [
      "Grind by default",
      "Ship and iterate",
      "Learn under the hood",
      "Build for real users",
    ],
  },

  skills: [
    {
      category: "AI / LLM",
      icon: "🤖",
      items: [
        { name: "Large Language Models",      level: 88, icon: "🧠" },
        { name: "Generative AI",              level: 87, icon: "✨" },
        { name: "Prompt Engineering",         level: 90, icon: "🔤" },
        { name: "RAG Pipelines",              level: 80, icon: "📚" },
        { name: "LangChain",                  level: 78, icon: "🔗" },
        { name: "Hugging Face / PyTorch",     level: 72, icon: "🤗" },
      ],
    },
    {
      category: "Mobile & Web",
      icon: "📱",
      items: [
        { name: "Flutter / Dart",             level: 88, icon: "💙" },
        { name: "React.js / Next.js",         level: 80, icon: "⚛️" },
        { name: "Firebase",                   level: 85, icon: "🔥" },
        { name: "Node.js / Express",          level: 75, icon: "🟢" },
        { name: "Tailwind CSS",               level: 82, icon: "💨" },
        { name: "HTML / CSS",                 level: 88, icon: "🎨" },
      ],
    },
    {
      category: "Languages",
      icon: "💻",
      items: [
        { name: "Python",                     level: 90, icon: "🐍" },
        { name: "Dart",                       level: 85, icon: "💙" },
        { name: "Java",                       level: 80, icon: "☕" },
        { name: "C / C++",                    level: 78, icon: "⚙️" },
        { name: "JavaScript",                 level: 80, icon: "🟨" },
        { name: "SQL",                        level: 75, icon: "🗃️" },
      ],
    },
    {
      category: "Tools & Cloud",
      icon: "☁️",
      items: [
        { name: "Git / GitHub",               level: 90, icon: "🐙" },
        { name: "TensorFlow / Scikit-Learn",  level: 78, icon: "🔬" },
        { name: "OpenCV",                     level: 72, icon: "👁️" },
        { name: "Vercel / GCP",               level: 78, icon: "▲" },
        { name: "Oracle Cloud (OCI)",         level: 68, icon: "☁️" },
        { name: "Postman",                    level: 82, icon: "📮" },
      ],
    },
  ],

  projects: [
    {
      id: "delivery-app",
      title: "Delivery App",
      description: "A comprehensive mobile delivery platform built with Flutter and Firebase. Features real-time order tracking, secure authentication, and Cloud Firestore persistence. Optimised for smooth UI/UX.",
      longDescription: "Full-featured delivery platform: Firebase Auth for secure login, Cloud Firestore for real-time order tracking, Flutter for a silky-smooth cross-platform UI. Implemented state management patterns for complex order-state flows and optimised Firestore queries for performance.",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80",
      tags: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "Firebase Auth"],
      github: "https://github.com/Meet6338-X/delivery_app",
      demo: "",
      featured: true,
      year: 2024,
      metrics: "Real-time tracking · Cross-platform",
    },
    {
      id: "attendance-system",
      title: "Attendance Management System",
      description: "A robust Java desktop application for institutional attendance tracking. Clean Swing UI with full data persistence via MySQL/JDBC — handling students, faculty, and scheduling logic.",
      longDescription: "Built with Java Swing for the desktop GUI and JDBC+MySQL for persistence. Features role-based access (admin/faculty/student), automated report generation, and data export. Demonstrates solid OOP architecture and relational database design skills.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      tags: ["Java", "Swing", "MySQL", "JDBC", "OOP"],
      github: "https://github.com/Meet6338-X/Attendance-Management-System-java",
      demo: "",
      featured: true,
      year: 2023,
      metrics: "Full CRUD · Role-based access",
    },
    {
      id: "dsa-deep-dive",
      title: "DSA Deep Dive",
      description: "A comprehensive C++ repository implementing 50+ data structures and algorithms with focus on time/space optimisation. A living reference for competitive programming patterns.",
      longDescription: "Covers arrays, linked lists, trees, graphs, dynamic programming, sorting algorithms, and advanced STL usage. Each implementation includes complexity analysis and usage examples. Ongoing project — new patterns added regularly.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
      tags: ["C++", "DSA", "STL", "Algorithms", "Competitive Programming"],
      github: "https://github.com/Meet6338-X/data-structure",
      demo: "",
      featured: true,
      year: 2024,
      metrics: "50+ implementations · Ongoing",
    },
  ],

  experience: [
    {
      type: "work" as const,
      company: "Kodacy",
      role: "AI & Machine Learning Intern",
      period: "November 2025 – December 2025",
      location: "Remote",
      logo: "",
      description: "Gained hands-on experience in AI/ML fundamentals, deep learning, and NLP. Developed custom chatbots and regression models, focusing on practical deployment of AI solutions.",
      achievements: [
        "Built and deployed custom NLP chatbots using Python and transformer-based models",
        "Developed regression models for predictive analytics use cases",
        "Deepened expertise in TensorFlow and Scikit-Learn through real project delivery",
        "Applied deep learning concepts in production-style environments",
      ],
      tech: ["Python", "TensorFlow", "NLP", "Scikit-Learn", "Deep Learning"],
    },
    {
      type: "work" as const,
      company: "TechGigs LLP",
      role: "Flutter Developer Intern",
      period: "June 2024 – July 2024",
      location: "On-site, Pune",
      logo: "",
      description: "Built reactive mobile application modules using Flutter and Dart. Collaborated with senior engineers on code reviews and followed professional software development lifecycles.",
      achievements: [
        "Shipped production-grade Flutter UI components used in the live mobile app",
        "Participated in code reviews — learned industry standards for Dart/Flutter",
        "Implemented Firebase authentication and state management flows",
        "Followed Agile sprint cycles in a professional team environment",
      ],
      tech: ["Flutter", "Dart", "Firebase", "State Management", "Agile"],
    },
  ],

  education: [
    {
      institution: "Vishwakarma Institute of Technology (VIT), Pune",
      degree: "B.Tech in Information Technology",
      period: "2025 – 2028",
      gpa: "9.05 / 10.0",
      highlights: [
        "9.05 CGPA — consistently among top performers",
        "Focus areas: AI, LLMs, and modern software engineering",
        "Lateral entry via Diploma (direct 2nd year admission)",
      ],
    },
    {
      institution: "AISSMS Polytechnic, Pune",
      degree: "Diploma in Computer Engineering",
      period: "2022 – 2025",
      gpa: "94.12%",
      highlights: [
        "94.12% — distinction throughout all semesters",
        "Built foundation in Java, C++, databases, and networking",
        "Developed first real-world projects: Delivery App & Attendance System",
      ],
    },
  ],

  certifications: [
    { name: "CS50x: Introduction to Computer Science", issuer: "Harvard University (edX)", year: 2024, url: "" },
    { name: "Google Gemini Certified Student", issuer: "Google", year: 2025, url: "" },
    { name: "AI & Machine Learning Internship Certificate", issuer: "Kodacy", year: 2025, url: "" },
    { name: "Flutter Developer Internship Certificate", issuer: "TechGigs LLP", year: 2024, url: "" },
    { name: "40+ Certifications in AI, Web Dev & Cloud", issuer: "Google, Coursera, Udemy & more", year: 2024, url: "" },
  ],

  contact: {
    heading: "Let's Build Something Intelligent",
    subheading: "Whether you have an internship opportunity, a project to collaborate on, or just want to talk AI — I'd love to connect.",
    availability: "Available immediately for 6-month internships — remote or on-site in Pune.",
    formspreeId: "",
  },

  seo: {
    title: "Meet Shah — AI & LLM Developer | Flutter | VIT Pune",
    description: "20-year-old AI/LLM developer from Pune. B.Tech IT @ VIT Pune (9.05 CGPA). Specialising in GenAI, LLMs, Flutter, and full-stack web. Seeking 6-month internship.",
    keywords: "Meet Shah, AI developer, LLM developer, Flutter developer, VIT Pune, GenAI, internship, Python, React, machine learning, Pune developer",
    ogImage: "/og-image.png",
    twitterHandle: "@Meet6338-X",
  },
};

export type PortfolioConfig = typeof portfolioConfig;
export type Project = typeof portfolioConfig.projects[0];
export type Experience = typeof portfolioConfig.experience[0];
export type Skill = typeof portfolioConfig.skills[0];
