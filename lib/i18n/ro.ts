export const ro = {
  languageName: "Romana",
  nav: {
    aria: "Navigare principala",
    openMenu: "Deschide meniul de navigare",
    items: [
      { label: "Acasa", href: "#home" },
      { label: "Despre", href: "#about" },
      { label: "Servicii", href: "#services" },
      { label: "Proiecte", href: "#work" },
      { label: "Parteneri", href: "#partners" },
    ],
    contact: "Contact",
  },
  hero: {
    badge: "Solutii AI • Aplicatii Web • Mentorat Informatica",
    headline: [
      "Sisteme AI si aplicatii web",
      "pentru nevoi reale de business",
    ],
    subtitle:
      "Construiesc sisteme AI practice, aplicatii web moderne si ofer mentorat structurat pentru proiecte de certificare la Informatica.",
    primaryCta: "Programeaza o consultatie gratuita",
    secondaryCta: "Discutam proiectul",
    trust: ["Sisteme AI", "Web Apps", "Automatizare", "Mentorat"],
    portraitAlt:
      "Portret Rafael Stefanache, AI Automation Developer si Full-Stack Developer Romania",
    portraitAria: "Zona portretului principal",
    workflowLabel: "Flux AI",
    workflowSteps: [
      "Input utilizator",
      "Cautare embeddings",
      "Baza vectoriala",
      "Raspuns LLM",
      "Trigger automatizare",
    ],
    statusTitle: "Status sistem",
    statusOnline: "Online",
    statusProgress: "Construiesc viitorul",
    mobileNote: "Sisteme AI, interfete rafinate",
  },
  about: {
    badges: ["Endava", "AI Engineer"],
    title: "Despre mine",
    paragraphs: [
      "Sunt AI Engineer si full-stack developer, concentrat pe sisteme AI practice, custom web applications si solutii tehnice structurate.",
      "Lucrez cu startup-uri, business-uri si elevi ca FastAPI Developer, SaaS Developer si mentor pentru Atestat Informatica, creand software curat, modern si orientat spre rezultate.",
    ],
    stackTitle: "Tech Stack",
    currentStack: [
      "FastAPI",
      "OpenAI APIs",
      "LangChain",
      "React",
      "PostgreSQL",
      "RAG",
      "Automatizare",
    ],
    eyebrow: "Expertiza",
    servicesTitle: "Servicii principale",
    servicesSubtitle:
      "Solutii practice pentru business-uri, startup-uri si elevi.",
    services: [
      {
        title: "Solutii AI",
        description:
          "Sisteme practice de AI workflow automation care ajuta business-urile sa lucreze mai rapid si mai inteligent.",
        cta: "Discutam proiectul",
        tags: ["AI", "Automatizare", "RAG"],
      },
      {
        title: "Aplicatii Web",
        description:
          "Custom web applications si platforme SaaS scalabile, construite pentru utilizare reala in business.",
        cta: "Construim produsul",
        tags: ["React", "FastAPI", "SaaS"],
      },
      {
        title: "Mentorat Informatica",
        description:
          "Informatics mentoring Romania pentru elevii care construiesc proiectul de Atestat Informatica.",
        cta: "Incepe mentoratul",
        tags: ["Atestat", "Ghidare", "Programare"],
      },
    ],
  },
  projects: {
    title: "Proiecte selectate",
    viewAll: "Vezi toate proiectele ->",
    viewCaseStudy: "Vezi studiul de caz",
    githubAria: "repository GitHub",
    liveAria: "demo live",
    items: [
      {
        title: "Medical RAG Chatbot",
        category: "DISSERTATION PROJECT",
        statement:
          "RAG-based medical support assistant for querying uploaded documents, retrieving grounded answers and storing validated solutions. The system compares plain LLM, RAG and validated-memory responses using FastAPI, ChromaDB, SQLite, Streamlit and local LLM support.",
        stack: ["FastAPI", "RAG", "ChromaDB", "SQLite", "Streamlit", "LM Studio"],
        githubHref: "https://github.com/RafaelDevLabs/MedicalRagChatbot",
        liveHref: "#",
        caseStudyHref: "#",
      },
      {
        title: "FitnessTrack",
        category: "NUTRITION TRACKER",
        statement:
          "Personal nutrition tracker for meal logging, private food products, weight tracking and dashboard analytics. It includes a Romanian-first meal assistant that prepares realistic meal suggestions from saved foods, using deterministic macro matching instead of invented nutrition values.",
        stack: ["Next.js 15", "TypeScript", "Supabase", "Recharts", "Zod", "Vitest"],
        githubHref: "https://github.com/RafaelDevLabs/FitnessTrack",
        liveHref: "#",
        caseStudyHref: "#",
      },
      {
        title: "Serele Ștefanache",
        category: "BUSINESS WEBSITE",
        statement:
          "Presentation website for a family flower greenhouse business, designed to showcase products and build trust with local customers. Creates a clean online presence for a local business and makes flower offerings easier to discover.",
        stack: ["React", "Web Design", "Business", "Presentation Site"],
        githubHref: "https://github.com/RafaelDevLabs/SereStefanache",
        liveHref: "https://serele-stefanache.ro/",
        caseStudyHref: "#",
      },
      {
        title: "Restaurant QR Menu App",
        category: "RESTAURANT SYSTEM",
        statement:
          "Digital restaurant menu application with QR access and an admin panel for managing menu products. Allows restaurant staff to update products, prices and menu items through an admin interface backed by Supabase.",
        stack: ["React", "Supabase", "Admin Panel", "QR Menu"],
        githubHref: "https://github.com/RafaelDevLabs/Restaurant",
        liveHref: "#",
        caseStudyHref: "#",
      },
    ],
  },
  cta: {
    title: "Alege serviciul potrivit pentru urmatorul pas.",
    subtitle:
      "Sisteme AI, aplicatii web si mentorat la Informatica, construite cu claritate si executie practica.",
    button: "Discutam proiectul",
    checklist: [
      "Solutii AI pentru automatizare si suport decizional",
      "Aplicatii Web pentru produse si instrumente interne",
      "Mentorat Informatica pentru pregatirea certificarii",
    ],
  },
  testimonials: {
    eyebrow: "Dovada sociala",
    title: "De incredere pentru elevi, startup-uri si echipe",
    items: [
      {
        name: "Alex Popa",
        role: "Fondator startup",
        context: "Startup HealthTech la inceput",
        quote:
          "Rafael a luat ideea noastra AI destul de neclara si ne-a ajutat sa o transformam in ceva ce puteam testa cu utilizatori. A fost rapid, clar si sincer despre ce conta.",
        initials: "AP",
        result: "MVP AI livrat",
      },
      {
        name: "Irina Matei",
        role: "Product Manager",
        context: "Colaborare pe proiect client",
        quote:
          "Mi-a placut cel mai mult cat de calm a gestionat partile neclare. A inteles obiectivul produsului, a explicat optiunile clar si a livrat curat.",
        initials: "IM",
        result: "Livrare de incredere",
      },
      {
        name: "Andrei Marinescu",
        role: "Elev la informatica",
        context: "Mentorat Atestat Informatica",
        quote:
          "Sedintele au fost practice si usor de urmarit. Am incetat sa copiez cod si am inceput sa inteleg cu adevarat ce face proiectul meu.",
        initials: "AM",
        result: "Pregatit pentru atestat",
      },
    ],
  },
  consultation: {
    badge: "Consultatie gratuita de 30 de minute",
    title: "Hai sa discutam proiectul tau",
    description:
      "Un call concentrat pentru startup-uri, business-uri si elevi care au nevoie de ghidare pentru sisteme AI, aplicatii web sau mentorat la Informatica.",
    bullets: [
      "Sisteme AI & automatizare",
      "Planificare aplicatii web",
      "Arhitectura SaaS & API",
      "Mentorat Informatica",
    ],
    note: "Directie tehnica clara pentru urmatorul tau pas.",
    primaryCta: "Programeaza o consultatie gratuita",
    secondaryCta: "Vezi serviciile",
  },
  contact: {
    availabilityBadge: "Disponibil pentru AI, web si mentorat",
    title: "Contact & Disponibilitate",
    subtitle:
      "Disponibil pentru sisteme AI, aplicatii web si mentorat la Informatica.",
    responseTime: "Raspund de obicei in maximum 24 de ore",
    primaryCta: "Programeaza o consultatie gratuita",
    secondaryCta: "Discutam proiectul",
    details: [
      { label: "Email", value: "rafs.dev.ai@gmail.com" },
      { label: "Locatie", value: "Romania" },
      { label: "Disponibilitate", value: "Deschis pentru proiecte & mentorat" },
      { label: "Timp de raspuns", value: "De obicei in maximum 24 de ore" },
    ],
    quickTitle: "Contact rapid",
    quickLinks: ["LinkedIn", "GitHub", "Calendly", "WhatsApp"],
    brandStatement: "AI engineering, product development si mentorat practic.",
    copyright: "© 2026 Rafael Stefanache. Toate drepturile rezervate.",
    footerServices: "Solutii AI / Aplicatii Web / Mentorat Informatica",
  },
} as const;
