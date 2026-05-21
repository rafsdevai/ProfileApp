export const en = {
  languageName: "English",
  nav: {
    aria: "Main navigation",
    openMenu: "Open navigation menu",
    items: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Mentoring", href: "#mentoring" },
    ],
    contact: "Contact",
  },
  hero: {
    badge: "AI Solutions • Web Applications • Informatics Mentoring",
    headline: [
      "AI Systems & Web Applications",
      "Built for Real Business Needs",
    ],
    subtitle:
      "I build practical AI systems, modern web applications and provide structured mentoring for Informatics certification projects.",
    primaryCta: "Book a Free Consultation",
    secondaryCta: "Discuss Your Project",
    trust: ["AI Systems", "Web Apps", "Automation", "Mentoring"],
    portraitAlt:
      "Portrait of Rafael Stefanache, AI Automation Developer and Full-Stack Developer Romania",
    portraitAria: "Hero portrait area",
    workflowLabel: "AI Flow",
    workflowSteps: [
      "User Input",
      "Embedding Search",
      "Vector Database",
      "LLM Response",
      "Automation Trigger",
    ],
    statusTitle: "System Status",
    statusOnline: "Online",
    statusProgress: "Building the future",
    mobileNote: "AI systems, polished interfaces",
  },
  about: {
    badges: ["Endava", "AI Engineer"],
    title: "About Me",
    paragraphs: [
      "I'm an AI Engineer and full-stack developer focused on building practical AI systems, custom web applications and structured technical solutions.",
      "I work with startups, businesses and students as a FastAPI Developer, SaaS Developer and Informatics mentor to create software that is clean, modern and outcome-driven.",
    ],
    stackTitle: "Tech Stack",
    currentStack: [
      "FastAPI",
      "OpenAI APIs",
      "LangChain",
      "React",
      "PostgreSQL",
      "RAG",
      "Automation",
    ],
    eyebrow: "Expertise",
    servicesTitle: "Core Services",
    servicesSubtitle:
      "Practical solutions for businesses, startups and students.",
    services: [
      {
        title: "AI Solutions",
        description:
          "Practical AI workflow automation systems that help businesses work faster and smarter.",
        cta: "Discuss Your Project",
        tags: ["AI", "Automation", "RAG"],
      },
      {
        title: "Web Applications",
        description:
          "Custom web applications and scalable SaaS platforms built for real business use.",
        cta: "Build Your Product",
        tags: ["React", "FastAPI", "SaaS"],
      },
      {
        title: "Informatics Mentoring",
        description:
          "Personalized Informatics mentoring in Romania for students building their Atestat Informatica project.",
        cta: "Start Mentoring",
        tags: ["Atestat", "Guidance", "Programming"],
      },
    ],
  },
  projects: {
    title: "Selected Work",
    viewAll: "View all projects ->",
    viewCaseStudy: "View Case Study",
    githubAria: "GitHub repository",
    liveAria: "live demo",
    items: [
      {
        title: "RAG Chatbot",
        category: "Featured AI System",
        statement:
          "AI-powered semantic retrieval system for faster internal knowledge search.",
        stack: ["RAG", "FastAPI", "React", "Vector Search"],
      },
      {
        title: "AI Medical Triage",
        category: "AI Workflow",
        statement:
          "Decision-support workflow for faster symptom triage and prioritization.",
        stack: ["AI", "NLP", "FastAPI"],
      },
      {
        title: "AI Team Matcher",
        category: "Automation",
        statement:
          "Matching automation that improves project-team fit using skill signals.",
        stack: ["AI", "React", "API"],
      },
      {
        title: "Smart Librarian AI",
        category: "AI Assistant",
        statement:
          "Automation platform for intelligent catalog search and recommendations.",
        stack: ["NLP", "Automation", "Python"],
      },
    ],
  },
  cta: {
    title: "Choose the service that fits your next step.",
    subtitle: "AI systems, web applications and Informatics mentoring, built with clarity and practical execution.",
    button: "Discuss Your Project",
    checklist: [
      "AI Solutions for automation and decision support",
      "Web Applications for products and internal tools",
      "Informatics Mentoring for certification preparation",
    ],
  },
  testimonials: {
    eyebrow: "Social proof",
    title: "Trusted by Students, Startups and Teams",
    items: [
      {
        name: "Alex Popa",
        role: "Startup Founder",
        context: "Early-stage HealthTech Startup",
        quote:
          "Rafael took our rough AI idea and helped us turn it into something we could actually test with users. He was fast, clear, and honest about what mattered.",
        initials: "AP",
        result: "AI MVP delivered",
      },
      {
        name: "Irina Matei",
        role: "Product Manager",
        context: "Client Project Collaboration",
        quote:
          "What I appreciated most was how calmly he handled the messy parts. He understood the product goal, explained options clearly, and delivered clean work.",
        initials: "IM",
        result: "Reliable delivery",
      },
      {
        name: "Andrei Marinescu",
        role: "Informatics Student",
        context: "Atestat Informatica Mentoring",
        quote:
          "The sessions were practical and easy to follow. I stopped just copying code and finally understood what my project was doing.",
        initials: "AM",
        result: "Certification ready",
      },
    ],
  },
  consultation: {
    badge: "30-minute free consultation",
    title: "Let's Discuss Your Project",
    description:
      "A focused consultation call for startups, businesses and students looking for guidance on AI systems, web applications or Informatics mentoring.",
    bullets: [
      "AI systems & automation",
      "Web application planning",
      "SaaS & API architecture",
      "Informatics mentoring",
    ],
    note: "Clear technical direction for your next step.",
    primaryCta: "Book a Free Consultation",
    secondaryCta: "View Services",
  },
  contact: {
    availabilityBadge: "Available for AI, web and mentoring inquiries",
    title: "Contact & Availability",
    subtitle:
      "Available for AI systems, web applications and Informatics mentoring.",
    responseTime: "Usually responds within 24 hours",
    primaryCta: "Book a Free Consultation",
    secondaryCta: "Discuss Your Project",
    details: [
      { label: "Email", value: "rafs.dev.ai@gmail.com" },
      { label: "Location", value: "Romania" },
      { label: "Availability", value: "Open for AI, web and mentoring work" },
      { label: "Response time", value: "Usually responds within 24 hours" },
    ],
    quickTitle: "Quick Contact",
    quickLinks: ["LinkedIn", "GitHub", "Calendly", "WhatsApp"],
    brandStatement: "AI engineering, product development and practical mentoring.",
    copyright: "© 2026 Rafael Stefanache. All rights reserved.",
    footerServices: "AI Solutions / Web Applications / Informatics Mentoring",
  },
} as const;
