// ============================================================
//  PORTFOLIO CONFIGURATION - Meet Shah
//  Edit this file to update your entire portfolio.
//  GitHub auto-sync: set githubUsername below.
// ============================================================

export const portfolioConfig = {
  name: "Meet Shah",
  fullName: "Meet Vidyut Shah",
  nickname: "Meet",
  title: "AI Developer & Software Engineer | Pune, India",
  tagline: "Building AI, backend, data intelligence, and mobile systems from Pune.",
  bio: `I'm Meet, a data-driven AI Developer and Software Engineer from Pune, India,
currently pursuing B.Tech Information Technology at VIT Pune with a 9.29 CGPA.
I build scalable systems across AI engineering, REST APIs, Flutter, Firebase,
machine learning analytics pipelines, and real-time backend logic. My work spans
logistics platforms, data intelligence dashboards, agent frameworks, and predictive
agricultural AI systems.`,

  elevatorPitch: `I'm Meet Shah, an AI Developer and Software Engineer in Pune, India, currently pursuing B.Tech IT at VIT Pune with a 9.29 CGPA. I work across LLMs, RAG, agentic AI, Python, TypeScript, REST APIs, Flutter, Firebase, and machine learning pipelines. My resume includes a state-level 1st prize logistics platform, DRISHYA data intelligence system, MeetKit AI agent framework, Kalpataru agricultural AI platform, and hands-on software engineering simulations from Walmart, Citi, Mastercard, Tata, NVIDIA, Harvard CS50x, and Google Gemini. I'm seeking a summer internship in AI engineering, software engineering, backend, data science, or full-stack development.`,

  email: "shahmeet644@gmail.com",
  phone: "+91 8080037798",
  location: "Pune, Maharashtra, India",
  availability: "Seeking summer internship - Available now",
  resumeURL: "https://drive.google.com/drive/folders/1xQUTthMHDokDid00l1y2SXnD6ShH6dld?usp=sharing",
  avatarURL: "/meet-shah-profile.png",

  social: {
    github:   "https://github.com/Meet6338-X",
    linkedin: "https://www.linkedin.com/in/meet-shah-co",
    twitter:  "https://x.com/Meet_644",
    website:  "https://meet.is-a.dev",
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
    welcomeMessage: "Hey! I'm Meet's AI assistant. I can tell you everything about him - skills, projects, internships, and what he's looking for.\n\nAre you a **recruiter**, a **fellow developer**, or just **exploring**?",
    botName: "Meet's AI",
    avatarInitial: "M",
  },

  stats: [
    { value: 9,  suffix: ".29",  label: "CGPA at VIT Pune" },
    { value: 45, suffix: "+",    label: "Certifications & simulations" },
    { value: 2,  suffix: "",     label: "Prize-winning builds" },
    { value: 20, suffix: " yrs", label: "Young & Hungry" },
  ],

  about: {
    paragraphs: [
      "I started programming during my Diploma in Computer Engineering and moved quickly toward systems that combine **AI, backend engineering, data, and mobile interfaces**.",
      "Today I pair a 9.29 CGPA at **VIT Pune** with project work across logistics optimization, Aadhaar-scale data intelligence, autonomous agent orchestration, and agricultural prediction models.",
      "My focus is practical software engineering: build reliable APIs, structure clean data pipelines, ship usable products, and turn AI capabilities into real workflows for people and businesses.",
    ],
    interests: [
      "Generative AI & LLMs",
      "Software Engineering",
      "Open Source",
      "Data Intelligence",
      "Backend APIs",
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
      icon: "AI",
      items: [
        { name: "Large Language Models",      level: 88, icon: "LLM" },
        { name: "Generative AI",              level: 88, icon: "Gen" },
        { name: "Prompt Engineering",         level: 91, icon: "Pr" },
        { name: "RAG Pipelines",              level: 82, icon: "RAG" },
        { name: "Agentic AI Architectures",   level: 80, icon: "Ag" },
        { name: "Model Fine-Tuning",          level: 74, icon: "FT" },
      ],
    },
    {
      category: "Software & Web",
      icon: "SW",
      items: [
        { name: "REST API Development",       level: 86, icon: "API" },
        { name: "Flutter / Dart",             level: 88, icon: "Fl" },
        { name: "Firebase / Firestore",       level: 86, icon: "Fb" },
        { name: "Node.js / TypeScript",       level: 80, icon: "TS" },
        { name: "React.js / Next.js",         level: 81, icon: "Re" },
        { name: "Tailwind CSS",               level: 82, icon: "Tw" },
      ],
    },
    {
      category: "Languages",
      icon: "CS",
      items: [
        { name: "Python",                     level: 90, icon: "Py" },
        { name: "Dart",                       level: 85, icon: "Da" },
        { name: "Java",                       level: 80, icon: "Ja" },
        { name: "C / C++",                    level: 78, icon: "C" },
        { name: "JavaScript / TypeScript",    level: 82, icon: "JS" },
        { name: "SQL",                        level: 77, icon: "SQL" },
      ],
    },
    {
      category: "Data & Tools",
      icon: "DT",
      items: [
        { name: "Git / GitHub",               level: 90, icon: "Git" },
        { name: "Pandas / NumPy",             level: 82, icon: "Pd" },
        { name: "Scikit-Learn / XGBoost",     level: 78, icon: "ML" },
        { name: "Docker / Vercel",            level: 76, icon: "Dv" },
        { name: "Postman / API Testing",      level: 84, icon: "Po" },
        { name: "System Design",              level: 75, icon: "SD" },
      ],
    },
  ],

  projects: [
    {
      id: "integrated-parcel-transportation",
      title: "Integrated Parcel Transportation Management System",
      description: "State-level 1st prize logistics platform for real-time parcel tracking, supply-chain monitoring, and route optimization using Flutter, Firebase, and Python.",
      longDescription: "Engineered a real-time logistics mapping platform to monitor supply chains and won 1st Prize out of 450+ entries at a State Level Project Competition. Integrated location tracking modules with an algorithmic route optimization engine, minimizing transit delay simulations by 40%.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      tags: ["Flutter", "Firebase", "Python", "Route Optimization", "Logistics"],
      github: "https://github.com/Meet6338-X/delivery_app",
      demo: "",
      featured: true,
      year: 2025,
      metrics: "1st prize out of 450+ entries",
    },
    {
      id: "drishya-data-intelligence",
      title: "DRISHYA - Data Intelligence System",
      description: "Enterprise-style decision intelligence platform processing Aadhaar transaction datasets with Python, Pandas, Scikit-learn, and Streamlit.",
      longDescription: "Developed a decision intelligence platform that processes high-volume Aadhaar transaction datasets to surface operational insights. Streamlined analytics using vectorized Pandas pipelines, reducing rendering delays by 25% across 8 tracking modules.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Data Analysis"],
      github: "",
      demo: "",
      featured: true,
      year: 2026,
      metrics: "25% faster analytics rendering",
    },
    {
      id: "meetkit-ai",
      title: "MeetKit AI - Agent Framework",
      description: "Agent framework and productivity layer built with Node.js, TypeScript, and REST APIs to orchestrate 50+ autonomous agents.",
      longDescription: "Architected asynchronous API networking layers to coordinate communication across 50+ autonomous agents, improving microservice execution velocity and development iteration speed.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      tags: ["Node.js", "TypeScript", "REST APIs", "Agentic AI", "Microservices"],
      github: "",
      demo: "",
      featured: true,
      year: 2026,
      metrics: "50+ autonomous agents",
    },
    {
      id: "kalpataru-agricultural-ai",
      title: "Kalpataru - Agricultural AI Platform",
      description: "Predictive agricultural AI system combining disease classification, market forecasting, and irrigation scheduling.",
      longDescription: "Built a predictive analytics engine combining MobileNetV2 disease classification, LSTM forecasting, XGBoost, Prophet, and Random Forest models to project market rates and optimize irrigation schedules.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
      tags: ["Python", "MobileNetV2", "LSTM", "XGBoost", "Forecasting"],
      github: "",
      demo: "",
      featured: true,
      year: 2025,
      metrics: "Disease + market prediction",
    },
    {
      id: "attendance-system",
      title: "Attendance Management System",
      description: "Java desktop application for institutional attendance tracking with Swing UI, MySQL/JDBC persistence, role-based access, and reports.",
      longDescription: "Built with Java Swing for the desktop GUI and JDBC+MySQL for persistence. Features role-based access, automated report generation, and data export. Demonstrates OOP architecture and relational database design skills.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      tags: ["Java", "Swing", "MySQL", "JDBC", "OOP"],
      github: "https://github.com/Meet6338-X/Attendance-Management-System-java",
      demo: "",
      featured: false,
      year: 2023,
      metrics: "Full CRUD + role-based access",
    },
    {
      id: "dsa-deep-dive",
      title: "DSA Deep Dive",
      description: "C++ repository implementing 50+ data structures and algorithms with focus on time and space optimization.",
      longDescription: "Covers arrays, linked lists, trees, graphs, dynamic programming, sorting algorithms, and advanced STL usage. Each implementation includes complexity notes and usage examples.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
      tags: ["C++", "DSA", "STL", "Algorithms", "Competitive Programming"],
      github: "https://github.com/Meet6338-X/data-structure",
      demo: "",
      featured: false,
      year: 2024,
      metrics: "50+ implementations",
    },
  ],

  experience: [
    {
      type: "work" as const,
      company: "TechGigs LLP",
      role: "Flutter Developer Intern",
      period: "June 2024 - July 2024",
      location: "On-site, Pune",
      logo: "",
      description: "Developed cross-platform mobile interfaces, backend integrations, and Firebase-powered application flows for production-style Flutter modules.",
      achievements: [
        "Developed modular Flutter interfaces integrated with external REST APIs, improving client response latency metrics by 35%",
        "Architected a secure backend layer using Firebase Authentication, Cloud Functions, and Firestore, decreasing user onboarding drop-off by 25%",
        "Engineered asynchronous background triggers and caching rules, reducing database read/write operation overhead by 22%",
        "Maintained synchronized codebases using multi-developer Git workflows",
      ],
      tech: ["Flutter", "Dart", "Firebase", "REST APIs", "Cloud Functions", "Git"],
    },
    {
      type: "work" as const,
      company: "Kodacy",
      role: "AI & Machine Learning Intern",
      period: "November 2025 - December 2025",
      location: "Remote",
      logo: "",
      description: "Gained hands-on experience in AI/ML fundamentals, deep learning, NLP, chatbot development, and regression modeling.",
      achievements: [
        "Built and deployed custom NLP chatbots using Python and transformer-based models",
        "Developed regression models for predictive analytics use cases",
        "Deepened expertise in TensorFlow and Scikit-Learn through real project delivery",
        "Applied deep learning concepts in production-style environments",
      ],
      tech: ["Python", "TensorFlow", "NLP", "Scikit-Learn", "Deep Learning"],
    },
  ],

  education: [
    {
      institution: "Vishwakarma Institute of Technology (VIT), Pune",
      degree: "B.Tech in Information Technology",
      period: "2025 - Present",
      gpa: "9.29 / 10.0",
      highlights: [
        "9.29 CGPA with focus on AI, software engineering, and modern systems",
        "Hackspiration Hackathon 2nd place winner at VIT Pune",
        "Lateral entry via Diploma in Computer Engineering",
      ],
    },
    {
      institution: "AISSMS Polytechnic, Pune",
      degree: "Diploma in Computer Engineering",
      period: "2022 - 2025",
      gpa: "94.12%",
      highlights: [
        "94.12% score with distinction-level performance",
        "Built foundation in Java, C++, databases, operating systems, and networking",
        "Developed early real-world systems including logistics and attendance projects",
      ],
    },
  ],

  certifications: [
    { name: "Tata - Data Visualisation: Empowering Business with Effective Insights Job Simulation", issuer: "Forage", year: 2026, url: "https://www.theforage.com/" },
    { name: "Mastercard - Cybersecurity Job Simulation", issuer: "Forage", year: 2026, url: "https://www.theforage.com/" },
    { name: "Citi - Technology Software Development Job Simulation", issuer: "Forage", year: 2026, url: "https://www.theforage.com/" },
    { name: "Walmart USA - Advanced Software Engineering Job Simulation", issuer: "Forage", year: 2026, url: "https://www.theforage.com/" },
    { name: "Fine-tuning LLM", issuer: "Hugging Face", year: 2026, url: "" },
    { name: "Getting Started with Deep Learning", issuer: "NVIDIA DLI", year: 2026, url: "" },
    { name: "Introduction to Transformer-Based NLP Applications", issuer: "NVIDIA DLI", year: 2026, url: "" },
    { name: "CS50x: Introduction to Computer Science", issuer: "Harvard University (edX)", year: 2024, url: "" },
    { name: "Google Gemini Certified Student", issuer: "Google for Education", year: 2025, url: "" },
  ],

  achievements: [
    "1st Prize Winner - State Level Project Competition at MM Polytechnic for logistics and machine learning domain work",
    "2nd Place Winner - Hackspiration Hackathon at VIT Pune for Algorand blockchain integration with AI decision workflows",
    "National Level Finalist - DIPEX 2025 National Level Project Expo",
  ],

  contact: {
    heading: "Let's Build Something Intelligent",
    subheading: "Whether you have a summer internship opportunity, software engineering role, AI project, or collaboration idea - I'd love to connect.",
    availability: "Available for summer internships in AI engineering, software engineering, backend, data science, or full-stack development.",
    formspreeId: "",
  },

  seo: {
    title: "Meet Shah | AI Developer & Software Engineer in Pune, India",
    description: "Meet Shah is an AI Developer and Software Engineer in Pune, India, studying B.Tech IT at VIT Pune with a 9.29 CGPA. Portfolio covering LLMs, RAG, REST APIs, Flutter, Firebase, Python, data science, backend engineering, and full-stack projects.",
    keywords: "Meet Shah, Meet Vidyut Shah, Meet Shah portfolio, Meet Shah Pune, Meet Shah VIT Pune, Meet Shah AI developer, Meet Shah software engineer, software engineer in Pune India, AI engineer in Pune, AI developer in Pune, LLM developer India, GenAI developer Pune, Flutter developer Pune, backend developer Pune, Python developer Pune, full stack developer Pune, REST API developer, data science portfolio, machine learning engineer Pune, VIT Pune software engineer, BTech IT VIT Pune, summer internship AI engineer, summer internship software engineer, agentic AI developer, RAG developer, Firebase Flutter developer",
    ogImage: "/meet-shah-profile.png",
    twitterHandle: "@Meet_644",
  },
};

export type PortfolioConfig = typeof portfolioConfig;
export type Project = typeof portfolioConfig.projects[0];
export type Experience = typeof portfolioConfig.experience[0];
export type Skill = typeof portfolioConfig.skills[0];
