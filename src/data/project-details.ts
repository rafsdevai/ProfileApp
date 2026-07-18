import { type ProjectDetail } from "@/src/types/project";

export const projectDetails: readonly ProjectDetail[] = [
  {
    slug: "restaurant-qr-menu",
    title: "Restaurant QR Menu",
    category: "food-hospitality",
    categoryLabel: "Restaurant & Event Platform",
    description:
      "A modern restaurant QR menu platform with digital menu presentation, category management, gallery content, inquiries and a clean admin dashboard for fast updates.",
    cardImage: "/projects/restaurant.png",
    cardImageAlt: "Restaurant QR Menu project preview",
    tags: ["Restaurant Website", "Events", "Admin Platform"],
    technologies: ["React", "Supabase", "QR Codes", "Admin Dashboard"],
    featured: true,
    heroImage: "/works/restaurant-qr/herosection-restaurant.png",
    heroImageAlt: "Restaurant QR Menu hero preview",
    heroTitleLines: ["Restaurant QR", "Menu"],
    overview: {
      problemTitle: "The Problem",
      problemPoints: [
        "Restaurants need a simple way to present their menu digitally without relying only on printed menus.",
        "Printed menus and manual updates are harder to maintain when products, prices or categories change.",
        "Staff need a clean admin workflow for menu items, gallery content and customer inquiries.",
        "The platform needs to stay presentation-first while still supporting practical day-to-day content administration.",
      ],
      solutionTitle: "The Solution",
      solutionDescription:
        "I built Restaurant QR Menu as a digital menu and administration platform that helps restaurants present their offerings clearly and update content quickly from one dashboard.",
      solutionPoints: [
        "Digital menu accessible from any device",
        "Menu category and product presentation",
        "Admin dashboard for menu and content management",
        "Category, gallery and inquiry administration",
        "Responsive experience for desktop and mobile",
      ],
      snapshot: [
        {
          label: "Industry",
          value: "Food & Hospitality",
          icon: "badge-check",
        },
        {
          label: "Platform",
          value: "Web Application",
          icon: "layout-dashboard",
        },
        {
          label: "Role",
          value: "Full Stack Developer",
          icon: "workflow",
        },
        {
          label: "Duration",
          value: "3 weeks",
          icon: "clock-3",
        },
        {
          label: "Status",
          value: "Production Ready",
          icon: "shield-check",
        },
        {
          label: "Team",
          value: "Solo Project",
          icon: "users",
        },
      ],
    },
    screenshots: [
      {
        id: "homepage",
        title: "Homepage",
        description:
          "A polished homepage that introduces the restaurant experience and the digital menu flow.",
        image: "/works/restaurant-qr/1.png",
      },
      {
        id: "menu-page",
        title: "Menu Page",
        description:
          "The digital menu presents categories and products clearly, making the latest offerings easy to explore.",
        image: "/works/restaurant-qr/8.png",
      },
      {
        id: "events-page",
        title: "Events Page",
        description:
          "A presentation page that showcases restaurant atmosphere, promotions and content sections.",
        image: "/works/restaurant-qr/10.png",
      },
      {
        id: "admin-dashboard",
        title: "Admin Dashboard",
        description:
          "The administration dashboard gives staff a clean overview of content, requests, and business updates.",
        image: "/works/restaurant-qr/14.png",
      },
      {
        id: "products-management",
        title: "Products Management",
        description:
          "A management view for updating menu items, organizing categories, and keeping product content current.",
        image: "/works/restaurant-qr/15.png",
      },
      {
        id: "inquiries-requests",
        title: "Inquiries & Requests",
        description:
          "A centralized area for handling customer inquiries, special requests, and communication details.",
        image: "/works/restaurant-qr/16.png",
      },
    ],
    features: [
      {
        title: "Responsive Design",
        description:
          "The entire platform adapts smoothly across desktop, tablet, and mobile for guests and administrators alike.",
        icon: "monitor-smartphone",
      },
      {
        title: "Menu Management",
        description:
          "Administrators can update products, categories, pricing, and availability from one organized workspace.",
        icon: "utensils",
      },
      {
        title: "Event Management",
        description:
          "Special events and restaurant experiences can be published and maintained without extra tooling.",
        icon: "calendar-range",
      },
      {
        title: "Gallery Management",
        description:
          "The team can curate atmosphere, dishes, and venue imagery through a clean visual content flow.",
        icon: "images",
      },
      {
        title: "Review Management",
        description:
          "Customer feedback and testimonials are surfaced in a structured way that supports trust and credibility.",
        icon: "star",
      },
      {
        title: "Reservation System",
        description:
          "Guests can send reservation or inquiry requests through a straightforward venue contact experience.",
        icon: "calendar-range",
      },
      {
        title: "Admin Dashboard",
        description:
          "A central dashboard gives the restaurant team visibility into content, requests, and day-to-day operations.",
        icon: "layout-dashboard",
      },
      {
        title: "Role-Based Access",
        description:
          "Access controls help separate responsibilities so admins and team members only see what they need.",
        icon: "lock-keyhole",
      },
    ],
    challenges: [
      {
        title: "Balancing guest simplicity with staff control",
        description:
          "The experience needed to feel elegant and simple for guests while still giving staff strong control over content and administration.",
      },
      {
        title: "Designing for peak-hour clarity",
        description:
          "The information hierarchy had to remain clear across menu updates, event content, gallery media, and guest inquiries.",
      },
    ],
    results: [
      {
        title: "Modern Digital Menu",
        description:
          "Guests always access the latest menu through a simple QR code without outdated printed menus.",
      },
      {
        title: "Faster Content Updates",
        description:
          "Products, categories and images can be updated instantly from the admin dashboard without reprinting menus.",
      },
      {
        title: "Centralized Administration",
        description:
          "Restaurant staff manages menu content, categories and media from one intuitive administration dashboard.",
      },
    ],
    cta: {
      title: "Ready to build something similar?",
      description:
        "Let’s turn your idea into a polished product with thoughtful UX, scalable code, and production-ready delivery.",
      buttonLabel: "Book a Free Consultation",
      buttonHref: "/#contact",
    },
    trustSignals: [
      {
        title: "Production Ready",
        description: "Built for real users and real-world impact.",
        icon: "shield-check",
      },
      {
        title: "Clean & Scalable Code",
        description: "Modern architecture and best practices.",
        icon: "workflow",
      },
      {
        title: "Performance Optimized",
        description: "Fast, responsive experiences tuned for reliability.",
        icon: "zap",
      },
      {
        title: "Ongoing Support",
        description: "Long-term maintenance and continuous improvement.",
        icon: "users",
      },
    ],
  },
  {
    slug: "studio-hair-booking",
    title: "Studio Hair Booking",
    category: "beauty-wellness",
    categoryLabel: "Booking Platform",
    description:
      "A salon booking platform with online reservations, service management, appointment scheduling, client management, email confirmations, cancellation links and an admin dashboard.",
    cardImage: "/projects/hair_saloon.png",
    cardImageAlt: "Studio Hair Booking project preview",
    tags: ["Booking Platform", "Salon Scheduling", "Admin Dashboard"],
    technologies: ["Next.js", "TypeScript", "Scheduling", "Supabase"],
    featured: true,
    heroImage: "/works/hair-booking-app/herosection_hair-booking.png",
    heroImageAlt: "Studio Hair Booking hero preview",
    heroTitleLines: ["Studio Hair", "Booking"],
    overview: {
      problemTitle: "The Problem",
      problemPoints: [
        "Salons often manage appointments manually through phone calls, messages or notebooks.",
        "Clients need a simple way to see services and book available time slots online.",
        "Appointment cancellations and schedule changes can become hard to track.",
        "Salon owners need one place to manage services, clients, working hours and reservations.",
      ],
      solutionTitle: "The Solution",
      solutionDescription:
        "Built a complete online booking platform for a hair salon.",
      solutionPoints: [
        "Added service selection, date selection, available time slots and client details flow.",
        "Added email confirmation with secure cancellation link.",
        "Built an admin panel for appointments, clients, services, working hours, blocked intervals and settings.",
        "Added insights for appointments, revenue estimation, top services and client activity.",
      ],
      snapshot: [
        {
          label: "Industry",
          value: "Beauty & Wellness",
          icon: "badge-check",
        },
        {
          label: "Platform",
          value: "Web Application",
          icon: "layout-dashboard",
        },
        {
          label: "Role",
          value: "Full Stack Developer",
          icon: "workflow",
        },
        {
          label: "Duration",
          value: "3-4 weeks",
          icon: "clock-3",
        },
        {
          label: "Status",
          value: "Production Ready",
          icon: "shield-check",
        },
        {
          label: "Team",
          value: "Solo Project",
          icon: "users",
        },
      ],
    },
    screenshots: [
      {
        id: "homepage",
        title: "Homepage",
        description:
          "A polished landing experience presenting the salon, services and online booking entry points.",
        image: "/works/hair-booking-app/home.png",
      },
      {
        id: "booking-flow",
        title: "Booking Flow",
        description:
          "Clients can choose services, dates and available time slots in a simple reservation flow.",
        image: "/works/hair-booking-app/programari.png",
      },
      {
        id: "email-confirmation",
        title: "Email Confirmation",
        description:
          "Each reservation is confirmed by email with the full appointment details and secure cancellation link.",
        image: "/works/hair-booking-app/confirmare-mail-programare.png",
      },
      {
        id: "admin-dashboard",
        title: "Admin Dashboard",
        description:
          "The admin panel centralizes reservations, clients, services and day-to-day salon operations.",
        image: "/works/hair-booking-app/dashboard.png",
      },
      {
        id: "insights-dashboard",
        title: "Insights Dashboard",
        description:
          "Salon insights show appointment counts, estimated revenue, top services and client activity.",
        image: "/works/hair-booking-app/dashboard-insights.png",
      },
      {
        id: "services-management",
        title: "Services Management",
        description:
          "Admins can manage service offerings, presentation details and availability from one place.",
        image: "/works/hair-booking-app/about-galerie.png",
      },
    ],
    features: [
      {
        title: "Online Booking",
        description:
          "Clients can select a service, date, available time slot and submit their appointment details.",
        icon: "calendar-range",
      },
      {
        title: "Service Management",
        description:
          "Admins can manage salon services, duration, prices and availability.",
        icon: "settings-2",
      },
      {
        title: "Appointment Calendar",
        description:
          "The salon can view, create and manage appointments from the admin panel.",
        icon: "calendar-range",
      },
      {
        title: "Email Confirmation",
        description:
          "Clients receive booking confirmation details directly by email.",
        icon: "badge-check",
      },
      {
        title: "Secure Cancellation",
        description:
          "Each booking includes a secure cancellation link for client-side cancellation.",
        icon: "lock-keyhole",
      },
      {
        title: "Working Hours",
        description:
          "Admins can configure business hours and availability rules.",
        icon: "clock-3",
      },
      {
        title: "Blocked Intervals",
        description:
          "Unavailable time slots can be blocked to prevent invalid bookings.",
        icon: "shield-check",
      },
      {
        title: "Business Insights",
        description:
          "The admin dashboard shows appointment counts, estimated revenue, top services and client activity.",
        icon: "bar-chart-3",
      },
    ],
    architecture: [
      {
        title: "Clients",
        description: "Booking requests",
        icon: "users",
      },
      {
        title: "Next.js Frontend",
        description: "Application UI",
        icon: "nextjs",
      },
      {
        title: "API Layer",
        description: "Business logic",
        icon: "api",
      },
      {
        title: "Supabase",
        description: "Database layer",
        icon: "database",
      },
      {
        title: "Email Service",
        description: "Confirmation workflow",
        icon: "badge-check",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "Backend",
        items: ["Next.js API / Server Actions", "REST-style application logic"],
      },
      {
        label: "Database",
        items: ["Supabase", "PostgreSQL"],
      },
      {
        label: "Email",
        items: ["Email confirmation system"],
      },
      {
        label: "Deployment",
        items: ["Vercel"],
      },
    ],
    challenges: [
      {
        title: "Balancing simplicity with real scheduling constraints",
        description:
          "The booking flow had to stay easy for clients while still supporting the salon’s operational rules.",
      },
      {
        title: "Preventing invalid appointment slots",
        description:
          "Availability needed to respect working hours, service duration and blocked intervals.",
      },
      {
        title: "Supporting secure cancellation without accounts",
        description:
          "Clients needed a reliable cancellation flow through secure links without forcing sign-ups.",
      },
      {
        title: "Keeping the admin panel focused",
        description:
          "The internal dashboard had to stay useful for salon operations without turning into an overcomplicated CRM.",
      },
    ],
    results: [
      {
        title: "Faster appointment booking",
        description:
          "Clients can book appointments online without needing phone calls or manual back-and-forth messages.",
      },
      {
        title: "Better schedule control",
        description:
          "The salon can manage services, hours, blocked intervals and appointments from one admin area.",
      },
      {
        title: "Cleaner client communication",
        description:
          "Confirmation emails and secure cancellation links reduce confusion around bookings.",
      },
      {
        title: "Operational visibility",
        description:
          "The insights dashboard gives the salon a clear view of bookings, revenue estimates and top services.",
      },
    ],
    cta: {
      title: "Building a booking platform?",
      description:
        "Let's create a clean reservation system with online scheduling, admin workflows and production-ready architecture.",
      buttonLabel: "Book a Free Consultation",
      buttonHref: "/#contact",
    },
    trustSignals: [
      {
        title: "Production Ready",
        description: "Built for real users and real-world impact.",
        icon: "shield-check",
      },
      {
        title: "Clean & Scalable Code",
        description: "Modern architecture and best practices.",
        icon: "workflow",
      },
      {
        title: "Performance Optimized",
        description: "Fast, responsive experiences tuned for reliability.",
        icon: "zap",
      },
      {
        title: "Ongoing Support",
        description: "Long-term maintenance and continuous improvement.",
        icon: "users",
      },
    ],
  },
  {
    slug: "fitness-track",
    title: "FitnessTrack",
    category: "health-fitness",
    categoryLabel: "HealthTech SaaS",
    description:
      "A full-stack nutrition and fitness tracking platform that helps users monitor calories, macronutrients, weight progress and health analytics while generating deterministic meal suggestions from their own food database.",
    cardImage: "/projects/fitnessTracker.png",
    cardImageAlt: "FitnessTrack project preview",
    tags: ["HealthTech SaaS", "Nutrition Tracking", "Analytics"],
    technologies: ["Next.js", "TypeScript", "Supabase", "Recharts", "PostgreSQL"],
    featured: true,
    heroImage: "/works/fitness-tracker/herosection.png",
    heroImageAlt: "FitnessTrack hero preview",
    heroTitleLines: ["FitnessTrack"],
    overview: {
      problemTitle: "The Problem",
      problemPoints: [
        "Most nutrition applications either rely on generic food databases or AI-generated suggestions that cannot be trusted.",
        "Users struggle with inaccurate nutrition values and inconsistent meal planning.",
        "Progress visualization often feels weak, fragmented, or difficult to interpret over time.",
        "People rarely have proper ownership over their private nutrition data and product base.",
      ],
      solutionTitle: "The Solution",
      solutionDescription:
        "FitnessTrack is a complete HealthTech platform that combines calorie tracking, macronutrient tracking, weight tracking, nutrition analytics, deterministic meal generation, a secure personal food database, and an AI nutrition assistant.",
      solutionPoints: [
        "Calorie tracking",
        "Macronutrient tracking",
        "Weight tracking",
        "Nutrition analytics",
        "Deterministic meal generation",
        "Secure personal food database",
        "AI nutrition assistant",
        "Explainable meal suggestions using only validated user-owned products",
      ],
      snapshot: [
        {
          label: "Industry",
          value: "Health & Fitness",
          icon: "badge-check",
        },
        {
          label: "Platform",
          value: "Web Application",
          icon: "layout-dashboard",
        },
        {
          label: "Role",
          value: "Full Stack Developer",
          icon: "workflow",
        },
        {
          label: "Duration",
          value: "4 Weeks",
          icon: "clock-3",
        },
        {
          label: "Status",
          value: "Production Ready",
          icon: "shield-check",
        },
      ],
    },
    screenshots: [
      {
        id: "dashboard",
        title: "Dashboard",
        description:
          "Quick overview of calories, macros, charts and weight progress.",
        image: "/works/fitness-tracker/dashboard.png",
      },
      {
        id: "nutrition-diary",
        title: "Nutrition Diary",
        description:
          "Daily meal logging with macro tracking.",
        image: "/works/fitness-tracker/diary.png",
      },
      {
        id: "ai-meal-planner",
        title: "AI Meal Planner",
        description:
          "Deterministic nutrition assistant generating realistic meals.",
        image: "/works/fitness-tracker/assistant.png",
      },
      {
        id: "weight-tracking",
        title: "Weight Tracking",
        description:
          "Weight evolution and trend visualization.",
        image: "/works/fitness-tracker/weights.png",
      },
      {
        id: "product-management",
        title: "Product Management",
        description:
          "Private nutrition database with validated products.",
        image: "/works/fitness-tracker/products.png",
      },
      {
        id: "nutrition-analytics",
        title: "Nutrition Analytics",
        description:
          "Charts, adherence metrics and long-term progress.",
        image: "/works/fitness-tracker/lmStudio-qwen.png",
      },
    ],
    features: [
      {
        title: "Responsive Design",
        description:
          "The application adapts cleanly across desktop, tablet, and mobile for daily nutrition workflows.",
        icon: "monitor-smartphone",
      },
      {
        title: "Nutrition Diary",
        description:
          "Users can log meals daily and maintain a structured nutrition history.",
        icon: "workflow",
      },
      {
        title: "Calorie Tracking",
        description:
          "Calorie intake is tracked accurately using validated nutrition data.",
        icon: "bar-chart-3",
      },
      {
        title: "Macro Tracking",
        description:
          "Protein, carbs, and fats are monitored with clear visual balance.",
        icon: "layout-dashboard",
      },
      {
        title: "Weight Tracking",
        description:
          "Weight progress is recorded over time with trend-based visualization.",
        icon: "calendar-range",
      },
      {
        title: "Meal Planner",
        description:
          "Meal planning stays deterministic and grounded in real product data.",
        icon: "workflow",
      },
      {
        title: "AI Nutrition Assistant",
        description:
          "An assistant layer supports smarter analysis without relying on hallucinated values.",
        icon: "zap",
      },
      {
        title: "Private Food Database",
        description:
          "Users maintain a secure product database tailored to their own nutrition ecosystem.",
        icon: "database",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Long-term charts and adherence metrics give a clear view of performance.",
        icon: "layout-dashboard",
      },
      {
        title: "Secure Authentication",
        description:
          "User access and private nutrition data stay isolated and protected.",
        icon: "lock-keyhole",
      },
    ],
    challenges: [
      {
        title: "Building a deterministic meal planning engine",
        description:
          "The recommendation system needed to generate realistic meals from validated data rather than approximate or fabricated suggestions.",
      },
      {
        title: "Designing strict nutrition validation",
        description:
          "Nutrition data had to stay consistent and trustworthy across products, meals, and analytics.",
      },
      {
        title: "Ensuring secure multi-user isolation using Supabase RLS",
        description:
          "Each user’s health data and private product database needed strong ownership boundaries and safe access rules.",
      },
      {
        title: "Maintaining explainable recommendations without hallucinated nutrition values",
        description:
          "The platform had to stay transparent and deterministic even when adding assistant-style intelligence.",
      },
    ],
    results: [
      {
        title: "Deterministic meal suggestions",
        description:
          "Validated food data powers realistic nutrition suggestions without unreliable generated values.",
      },
      {
        title: "Secure multi-user nutrition platform",
        description:
          "Each user can manage private products, tracking history, and health data safely inside their own workspace.",
      },
      {
        title: "Comprehensive health analytics dashboard",
        description:
          "Calories, macros, weight progress, and long-term adherence metrics are centralized in one clear interface.",
      },
      {
        title: "Scalable architecture ready for AI extensions",
        description:
          "The technical foundation supports future intelligence layers without compromising determinism or data quality.",
      },
    ],
    cta: {
      title: "Ready to build something similar?",
      description:
        "Let's create intelligent software that combines modern UX, analytics and AI into production-ready applications.",
      buttonLabel: "Book a Free Consultation",
      buttonHref: "/#contact",
    },
    trustSignals: [
      {
        title: "Production Ready",
        description: "Built for real users and real-world impact.",
        icon: "shield-check",
      },
      {
        title: "Clean & Scalable Code",
        description: "Modern architecture and best practices.",
        icon: "workflow",
      },
      {
        title: "Performance Optimized",
        description: "Fast, responsive experiences tuned for reliability.",
        icon: "zap",
      },
      {
        title: "Ongoing Support",
        description: "Long-term maintenance and continuous improvement.",
        icon: "users",
      },
    ],
  },
  {
    slug: "medical-technical-assistance",
    title: "Medical Technical Assistance",
    category: "ai-healthcare",
    categoryLabel: "AI & Healthcare",
    description:
      "An AI-powered medical support platform that combines Retrieval-Augmented Generation (RAG), validated memory, local LLMs and evaluation tooling to help healthcare professionals troubleshoot medical equipment faster and more accurately.",
    cardImage: "/projects/MedicRag.png",
    cardImageAlt: "Medical Technical Assistance project preview",
    tags: ["RAG", "Healthcare AI", "Evaluation"],
    technologies: ["FastAPI", "Python", "ChromaDB", "SQLite", "Streamlit"],
    featured: true,
    heroImage: "/works/medical-chatbot/herosection_medical.png",
    heroImageAlt: "Medical Technical Assistance hero preview",
    heroTitleLines: ["Medical", "Technical Assistance"],
    overview: {
      problemTitle: "The Problem",
      problemPoints: [
        "Healthcare technicians often spend significant time searching through lengthy medical equipment manuals.",
        "Traditional documentation is difficult to search.",
        "General-purpose LLMs may hallucinate when answering technical questions.",
        "Organizations need a reliable way to reuse previously validated troubleshooting knowledge.",
      ],
      solutionTitle: "The Solution",
      solutionDescription:
        "Built an AI-powered troubleshooting assistant that combines Retrieval-Augmented Generation, local LLM inference, validated memory and structured evaluation tooling.",
      solutionPoints: [
        "Retrieval-Augmented Generation (RAG)",
        "Local LLM inference through LM Studio",
        "Validated memory for previously confirmed answers",
        "Semantic document search",
        "Automated evaluation comparing Plain LLM, RAG and RAG+Memory",
      ],
      snapshot: [
        {
          label: "Industry",
          value: "Healthcare AI",
          icon: "badge-check",
        },
        {
          label: "Platform",
          value: "AI Web Application",
          icon: "layout-dashboard",
        },
        {
          label: "Role",
          value: "AI Engineer / Full Stack Developer",
          icon: "workflow",
        },
        {
          label: "Duration",
          value: "3 Weeks",
          icon: "clock-3",
        },
        {
          label: "Status",
          value: "Production Ready",
          icon: "shield-check",
        },
      ],
    },
    screenshots: [
      {
        id: "documents-upload",
        title: "Documents Upload",
        description:
          "Upload PDF manuals and process them into searchable knowledge.",
        image: "/works/medical-chatbot/upload_doc.png",
      },
      {
        id: "ask-assistant",
        title: "Ask Assistant",
        description:
          "Ask technical questions with configurable retrieval settings.",
        image: "/works/medical-chatbot/ask_question.png",
      },
      {
        id: "validated-memory",
        title: "Validated Memory",
        description:
          "Store expert-approved answers for future reuse.",
        image: "/works/medical-chatbot/validated_memory.png",
      },
      {
        id: "evaluation-runner",
        title: "Evaluation Runner",
        description:
          "Configure evaluation runs comparing Plain LLM, RAG and RAG Memory.",
        image: "/works/medical-chatbot/evaluation.png",
      },
      {
        id: "evaluation-results",
        title: "Evaluation Results",
        description:
          "Review generated answers, latency and evaluation metrics.",
        image: "/works/medical-chatbot/results.png",
      },
      {
        id: "run-comparison",
        title: "Run Comparison",
        description:
          "Compare different AI strategies side by side.",
        image: "/works/medical-chatbot/compare_zone.png",
      },
    ],
    features: [
      {
        title: "PDF Upload",
        description:
          "Upload technical manuals and process them into structured searchable knowledge.",
        icon: "search",
      },
      {
        title: "Automatic Document Chunking",
        description:
          "Long manuals are transformed into retrieval-friendly chunks for grounded answers.",
        icon: "workflow",
      },
      {
        title: "Semantic Search",
        description:
          "Questions are matched against the most relevant technical content using embeddings.",
        icon: "search",
      },
      {
        title: "Retrieval-Augmented Generation",
        description:
          "Answers are generated using retrieved evidence instead of relying on raw model memory.",
        icon: "zap",
      },
      {
        title: "Validated Memory Reuse",
        description:
          "Previously confirmed technical solutions can be stored and reused across future queries.",
        icon: "database",
      },
      {
        title: "Local LLM Support",
        description:
          "The platform supports local inference through LM Studio for private deployment setups.",
        icon: "nextjs",
      },
      {
        title: "GPT Fallback",
        description:
          "Alternative answering flows can be compared when local and remote strategies differ.",
        icon: "badge-check",
      },
      {
        title: "Evaluation Framework",
        description:
          "Structured evaluation compares Plain LLM, RAG and memory-enhanced pipelines.",
        icon: "bar-chart-3",
      },
      {
        title: "Run Comparison Dashboard",
        description:
          "Experiments can be inspected side by side for latency, quality and grounding behavior.",
        icon: "layout-dashboard",
      },
      {
        title: "Confidence Scoring",
        description:
          "Generated answers can be reviewed with confidence-oriented signals and traceability.",
        icon: "shield-check",
      },
      {
        title: "Manual Evaluation Workflow",
        description:
          "Groundedness, hallucination and relevance can be assessed through human review.",
        icon: "users",
      },
      {
        title: "Research Metrics",
        description:
          "The platform supports experiment tracking and benchmark-driven iteration.",
        icon: "bar-chart-3",
      },
    ],
    architecture: [
      {
        title: "Medical Manual PDF",
        description: "Input documents",
        icon: "search",
      },
      {
        title: "PDF Extraction",
        description: "Text processing",
        icon: "workflow",
      },
      {
        title: "Chunking",
        description: "Knowledge slices",
        icon: "workflow",
      },
      {
        title: "Embeddings",
        description: "Semantic vectors",
        icon: "database",
      },
      {
        title: "ChromaDB",
        description: "Vector database",
        icon: "database",
      },
      {
        title: "Retriever",
        description: "Relevant context",
        icon: "search",
      },
      {
        title: "Validated Memory",
        description: "Confirmed answers",
        icon: "badge-check",
      },
      {
        title: "Local LLM (LM Studio)",
        description: "Inference layer",
        icon: "zap",
      },
      {
        title: "Answer",
        description: "Grounded output",
        icon: "shield-check",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: ["Streamlit"],
      },
      {
        label: "Backend",
        items: ["FastAPI", "Python"],
      },
      {
        label: "Database",
        items: ["SQLite"],
      },
      {
        label: "Vector Database",
        items: ["ChromaDB"],
      },
      {
        label: "Embeddings",
        items: ["Sentence Transformers"],
      },
      {
        label: "AI",
        items: ["LM Studio", "OpenAI Compatible API", "Local LLM"],
      },
      {
        label: "Evaluation",
        items: ["RAG", "Validated Memory", "Semantic Search"],
      },
    ],
    challenges: [
      {
        title: "Designing a reliable retrieval pipeline",
        description:
          "The system needed to minimize hallucinations while still retrieving enough context for accurate technical guidance.",
      },
      {
        title: "Building a validated memory system",
        description:
          "Previously confirmed troubleshooting solutions had to remain reusable without polluting future answers.",
      },
      {
        title: "Balancing confidence thresholds",
        description:
          "Retrieval confidence needed careful tuning to preserve both response quality and groundedness.",
      },
      {
        title: "Supporting local LLM inference",
        description:
          "The platform had to work with local models through LM Studio instead of relying only on cloud providers.",
      },
    ],
    results: [
      {
        title: "Reduced hallucinations",
        description:
          "Grounded document retrieval improves reliability for medical technical troubleshooting.",
      },
      {
        title: "Reusable validated knowledge",
        description:
          "Previously confirmed answers can be stored and reused to improve future assistance.",
      },
      {
        title: "Fast semantic search",
        description:
          "Technical manuals become easier to query and navigate through semantic retrieval.",
      },
      {
        title: "Complete evaluation framework",
        description:
          "The platform supports dissertation-style comparisons across multiple AI answer strategies.",
      },
      {
        title: "Scalable architecture",
        description:
          "The system is ready to extend toward larger medical datasets and future experiments.",
      },
    ],
    cta: {
      title: "Ready to build AI-powered assistants?",
      description:
        "Let's build intelligent applications using RAG, LLMs and modern AI architectures.",
      buttonLabel: "Book a Free Consultation",
      buttonHref: "/#contact",
    },
    trustSignals: [
      {
        title: "Production Ready",
        description: "Built for real users and real-world impact.",
        icon: "shield-check",
      },
      {
        title: "Research Driven",
        description: "Designed around evaluation, benchmarking and grounded iteration.",
        icon: "bar-chart-3",
      },
      {
        title: "FastAPI Architecture",
        description: "Structured backend logic for reliable AI workflows.",
        icon: "api",
      },
      {
        title: "AI Powered",
        description: "RAG, embeddings and local LLMs combined in one workflow.",
        icon: "zap",
      },
    ],
  },
  {
    slug: "deco-casa-ecommerce",
    title: "Deco Casa E-commerce",
    category: "ecommerce",
    categoryLabel: "E-commerce / Interior Design",
    description:
      "A premium interior design e-commerce and admin platform with product catalog, quote list, consultation requests, showroom appointments, lead tracking and catalog management.",
    cardImage: "/projects/DecoCasa.png",
    cardImageAlt: "Deco Casa E-commerce project preview",
    tags: ["Interior Design", "Quote Flow", "Admin Platform"],
    technologies: ["Next.js", "TypeScript", "Supabase", "Product Catalog"],
    heroImage: "/works/deco-casa/herosection_deco-casa.png",
    heroImageAlt: "Deco Casa E-commerce hero preview",
    heroTitleLines: ["Deco Casa", "E-commerce"],
    overview: {
      problemTitle: "The Problem",
      problemPoints: [
        "Premium interior design brands need a more refined way to present curated materials and product categories online.",
        "Clients often need consultation before deciding, so a simple checkout flow is not enough.",
        "Quote requests, consultation leads and showroom appointments can become difficult to manage manually.",
        "Product catalogs need to stay organized by category, brand, material and collection.",
      ],
      solutionTitle: "The Solution",
      solutionDescription:
        "Built a premium Deco Casa web platform with product catalog, collections and project presentation.",
      solutionPoints: [
        "Added quote-list flow instead of direct checkout, better suited for interior design sales.",
        "Added consultation and showroom appointment request flows.",
        "Added an admin MVP for managing products, leads, appointments, collections and projects.",
        "Created a clean editorial UI aligned with a luxury interior design brand.",
      ],
      snapshot: [
        {
          label: "Industry",
          value: "Interior Design / E-commerce",
          icon: "badge-check",
        },
        {
          label: "Platform",
          value: "Web Application",
          icon: "layout-dashboard",
        },
        {
          label: "Role",
          value: "Full Stack Developer",
          icon: "workflow",
        },
        {
          label: "Duration",
          value: "3-4 weeks",
          icon: "clock-3",
        },
        {
          label: "Status",
          value: "Production Ready",
          icon: "shield-check",
        },
        {
          label: "Team",
          value: "Solo Project",
          icon: "users",
        },
      ],
    },
    screenshots: [
      {
        id: "homepage",
        title: "Homepage",
        description:
          "A premium landing experience for curated materials, collections and design-led presentation.",
        image: "/works/deco-casa/home.jpeg",
      },
      {
        id: "product-catalog",
        title: "Product Catalog",
        description:
          "Structured browsing for premium products, categories, materials and curated collections.",
        image: "/works/deco-casa/catalog.png",
      },
      {
        id: "consultation-request",
        title: "Consultation Request",
        description:
          "A guided request flow for clients who need design advice, budgeting and project support.",
        image: "/works/deco-casa/formulare_proiectare3D.jpeg",
      },
      {
        id: "admin-dashboard",
        title: "Admin Dashboard",
        description:
          "A simple internal overview for lead activity, appointments and platform management.",
        image: "/works/deco-casa/dashboard.jpeg",
      },
      {
        id: "product-management",
        title: "Product Management",
        description:
          "Admins can manage product status, categories, brands, collections and catalog visibility.",
        image: "/works/deco-casa/management_catalog.jpeg",
      },
      {
        id: "leads-management",
        title: "Leads Management",
        description:
          "Quote requests, consultations and appointment leads are centralized for easier follow-up.",
        image: "/works/deco-casa/leads.jpeg",
      },
    ],
    features: [
      {
        title: "Product Catalog",
        description:
          "Structured browsing for premium materials, finishes and interior products.",
        icon: "search",
      },
      {
        title: "Quote Request Flow",
        description:
          "Users can collect products into an offer list and request a custom quote.",
        icon: "star",
      },
      {
        title: "Consultation Requests",
        description:
          "Clients can submit project details, budget, preferred style and contact preferences.",
        icon: "calendar-range",
      },
      {
        title: "Showroom Appointments",
        description:
          "The platform supports appointment requests for showroom visits.",
        icon: "calendar-range",
      },
      {
        title: "Admin Dashboard",
        description:
          "A simple internal dashboard for tracking leads, appointments and catalog activity.",
        icon: "layout-dashboard",
      },
      {
        title: "Product Management",
        description:
          "Admins can manage product status, categories, brands, collections and pricing.",
        icon: "layout-dashboard",
      },
      {
        title: "Lead Management",
        description:
          "Quote and consultation requests are centralized for easier follow-up.",
        icon: "users",
      },
      {
        title: "Premium Responsive UI",
        description:
          "A polished interface designed for desktop and mobile presentation.",
        icon: "monitor-smartphone",
      },
    ],
    architecture: [
      {
        title: "Users",
        description: "Client requests",
        icon: "users",
      },
      {
        title: "Next.js Frontend",
        description: "Application UI",
        icon: "nextjs",
      },
      {
        title: "API Layer",
        description: "Business logic",
        icon: "api",
      },
      {
        title: "Supabase",
        description: "Database layer",
        icon: "database",
      },
      {
        title: "Storage",
        description: "Assets and files",
        icon: "images",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "Backend",
        items: ["Next.js API / Server Actions", "REST-style application logic"],
      },
      {
        label: "Database",
        items: ["Supabase", "PostgreSQL"],
      },
      {
        label: "Storage",
        items: ["Supabase Storage"],
      },
      {
        label: "Deployment",
        items: ["Vercel"],
      },
    ],
    challenges: [
      {
        title: "Designing a premium interface",
        description:
          "The experience needed to feel closer to a luxury catalog than a generic shop.",
      },
      {
        title: "Replacing checkout with a quote-list flow",
        description:
          "The platform had to support consultation-driven sales suitable for high-value interior products.",
      },
      {
        title: "Keeping catalog structure manageable",
        description:
          "Filters, categories, brands and materials needed to stay organized and easy to maintain.",
      },
      {
        title: "Building a useful admin MVP",
        description:
          "The admin had to cover leads, products and appointments without overengineering a full CRM.",
      },
    ],
    results: [
      {
        title: "Premium product presentation experience",
        description:
          "The platform gives Deco Casa a polished digital presence for curated materials and interior products.",
      },
      {
        title: "Better lead capture",
        description:
          "Quote requests, consultation forms and appointment requests are captured in one flow.",
      },
      {
        title: "Easier catalog management",
        description:
          "Products, brands, collections and visibility can be managed from the admin area.",
      },
      {
        title: "Sales-oriented structure",
        description:
          "The experience supports consultation-driven sales instead of forcing a direct checkout model.",
      },
    ],
    cta: {
      title: "Building a premium product platform?",
      description:
        "Let's create a polished web experience with catalog management, lead capture and a scalable admin workflow.",
      buttonLabel: "Book a Free Consultation",
      buttonHref: "/#contact",
    },
    trustSignals: [
      {
        title: "Production Ready",
        description: "Built for real users and real-world impact.",
        icon: "shield-check",
      },
      {
        title: "Clean & Scalable Code",
        description: "Modern architecture and best practices.",
        icon: "workflow",
      },
      {
        title: "Performance Optimized",
        description: "Fast, responsive experiences tuned for reliability.",
        icon: "zap",
      },
      {
        title: "Ongoing Support",
        description: "Long-term maintenance and continuous improvement.",
        icon: "users",
      },
    ],
  },
  {
    slug: "serele-stefanache",
    title: "Serele Stefanache",
    category: "business",
    categoryLabel: "Agriculture & Family Business",
    description:
      "A modern presentation website for a family-owned greenhouse business showcasing flowers, seedlings, vegetables and seasonal products with an elegant gallery, responsive design and direct WhatsApp contact.",
    cardImage: "/projects/serele.png",
    cardImageAlt: "Serele Stefanache project preview",
    tags: ["Agriculture", "Family Business", "Presentation Website"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    featured: true,
    heroImage: "/works/serele-stefanache/herosection_serele.png",
    heroImageAlt: "Serele Stefanache hero preview",
    heroTitleLines: ["Serele", "Stefanache"],
    liveDemoUrl: "https://serele-stefanache.ro/",
    githubUrl: "https://github.com/RafaelDevLabs/SereStefanache",
    overview: {
      problemTitle: "The Problem",
      problemPoints: [
        "Traditional greenhouse businesses often rely on Facebook posts or word of mouth, making it difficult for customers to discover products and seasonal availability.",
        "Customers need a simple way to explore flowers, seedlings and vegetables before visiting.",
        "The business lacked a modern online presence that reflected the quality of its products.",
        "There was no structured gallery or easy way to contact the business directly.",
      ],
      solutionTitle: "The Solution",
      solutionDescription:
        "Designed and developed a modern presentation website focused on showcasing seasonal products and improving customer trust.",
      solutionPoints: [
        "Elegant responsive landing page",
        "Seasonal product presentation",
        "Flower and vegetable galleries",
        "Family business presentation",
        "WhatsApp integration",
        "Mobile-first responsive experience",
        "Fast loading performance",
        "SEO friendly structure",
      ],
      snapshot: [
        {
          label: "Industry",
          value: "Agriculture",
          icon: "badge-check",
        },
        {
          label: "Platform",
          value: "Business Website",
          icon: "layout-dashboard",
        },
        {
          label: "Role",
          value: "Full Stack Developer",
          icon: "workflow",
        },
        {
          label: "Duration",
          value: "1 Week",
          icon: "clock-3",
        },
        {
          label: "Status",
          value: "Production Ready",
          icon: "shield-check",
        },
        {
          label: "Team",
          value: "Solo Project",
          icon: "users",
        },
      ],
    },
    screenshots: [
      {
        id: "homepage",
        title: "Homepage",
        description:
          "A clean landing page introducing the greenhouse business and its seasonal offer.",
        image: "/works/serele-stefanache/home-serele.png",
      },
      {
        id: "about-us",
        title: "About Us",
        description:
          "A family-business presentation designed to build trust and communicate the story behind the greenhouse.",
        image: "/works/serele-stefanache/about-serele.png",
      },
      {
        id: "greenhouse-gallery",
        title: "Greenhouse Gallery",
        description:
          "An elegant visual gallery showcasing the greenhouse environment and product quality.",
        image: "/works/serele-stefanache/galerie.png",
      },
      {
        id: "seasonal-products",
        title: "Seasonal Products",
        description:
          "Seasonal collections help customers explore flowers, seedlings and vegetables more easily.",
        image: "/works/serele-stefanache/colectii.png",
      },
      {
        id: "contact",
        title: "Contact",
        description:
          "Direct contact options and WhatsApp integration make communication simple and immediate.",
        image: "/works/serele-stefanache/contact.png",
      },
    ],
    features: [
      {
        title: "Responsive Website",
        description:
          "The website adapts smoothly across desktop, tablet and mobile for local customers on any device.",
        icon: "monitor-smartphone",
      },
      {
        title: "Seasonal Product Showcase",
        description:
          "Seasonal products are presented clearly so customers can explore current offerings before visiting.",
        icon: "images",
      },
      {
        title: "Flowers Gallery",
        description:
          "A dedicated visual presentation highlights flowers and decorative arrangements with a polished look.",
        icon: "images",
      },
      {
        title: "Vegetable Presentation",
        description:
          "Vegetables and seedlings are organized in a simple presentation flow that improves discoverability.",
        icon: "images",
      },
      {
        title: "Family Business Story",
        description:
          "The brand story builds trust and gives the business a warmer, more personal digital presence.",
        icon: "users",
      },
      {
        title: "WhatsApp Contact",
        description:
          "Direct WhatsApp contact gives customers a fast and familiar way to get in touch.",
        icon: "smartphone",
      },
      {
        title: "SEO Optimized",
        description:
          "The structure is prepared for discoverability with search-friendly pages and content hierarchy.",
        icon: "search",
      },
      {
        title: "Fast Performance",
        description:
          "A lightweight implementation keeps the browsing experience quick and responsive.",
        icon: "zap",
      },
      {
        title: "Mobile Friendly",
        description:
          "The presentation and galleries remain easy to browse on smaller screens.",
        icon: "monitor-smartphone",
      },
    ],
    architecture: [
      {
        title: "Users",
        description: "Site visitors",
        icon: "users",
      },
      {
        title: "Next.js",
        description: "Frontend framework",
        icon: "nextjs",
      },
      {
        title: "Application Layer",
        description: "Presentation logic",
        icon: "workflow",
      },
      {
        title: "Static Assets",
        description: "Images and content",
        icon: "images",
      },
      {
        title: "Deployment",
        description: "Production hosting",
        icon: "shield-check",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "Backend",
        items: ["Next.js"],
      },
      {
        label: "Database",
        items: ["None"],
      },
      {
        label: "Deployment",
        items: ["Vercel"],
      },
    ],
    challenges: [
      {
        title: "Keeping the presentation elegant and lightweight",
        description:
          "The site needed to feel polished without becoming heavy or slow for everyday visitors.",
      },
      {
        title: "Organizing seasonal content clearly",
        description:
          "Seasonal products had to be easy to browse without overwhelming the user with too much information.",
      },
      {
        title: "Designing a responsive gallery experience",
        description:
          "The gallery needed to stay visually strong across desktop and mobile screens.",
      },
      {
        title: "Building trust for a local family business",
        description:
          "The website had to communicate quality, warmth and credibility for first-time customers.",
      },
    ],
    results: [
      {
        title: "Professional online presence",
        description:
          "The business now has a polished digital presence aligned with the quality of its products.",
      },
      {
        title: "Improved customer trust",
        description:
          "Clear presentation and business storytelling help customers feel more confident before visiting.",
      },
      {
        title: "Better product presentation",
        description:
          "Flowers, seedlings, vegetables and seasonal products are easier to discover and explore.",
      },
      {
        title: "Easy communication through WhatsApp",
        description:
          "Direct contact options reduce friction for customers who want fast answers.",
      },
      {
        title: "Mobile friendly experience",
        description:
          "The site remains easy to browse on phones, where many local visitors first discover the business.",
      },
      {
        title: "SEO ready website",
        description:
          "The structure supports better discoverability and a stronger search presence over time.",
      },
    ],
    cta: {
      title: "Ready to build something similar?",
      description:
        "Let's create a polished business website with clear product presentation, direct contact flows and production-ready performance.",
      buttonLabel: "Book a Free Consultation",
      buttonHref: "/#contact",
    },
    trustSignals: [
      {
        title: "Production Ready",
        description: "Built for real users and real-world impact.",
        icon: "shield-check",
      },
      {
        title: "Responsive Design",
        description: "Optimized for desktop, tablet and mobile browsing.",
        icon: "monitor-smartphone",
      },
      {
        title: "SEO Optimized",
        description: "Structured for search visibility and clean discoverability.",
        icon: "search",
      },
      {
        title: "Fast Loading",
        description: "Lightweight implementation focused on quick page delivery.",
        icon: "zap",
      },
    ],
  },
  {
    slug: "tamysweetuk-breeder-platform",
    title: "TamysweetUK Breeder Platform",
    category: "business",
    categoryLabel: "Web Application",
    description:
      "A complete breeder management platform featuring a public website, kitten listings, enquiries and a custom admin dashboard for managing content, availability and featured listings.",
    cardImage: "/projects/tamysweetuk.png",
    cardImageAlt: "TamysweetUK Breeder Platform project preview",
    tags: ["Breeder Platform", "Kitten Listings", "Admin Dashboard"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    featured: true,
    heroImage: "/works/tamysweetuk/hero-section.png",
    heroImageAlt: "TamysweetUK Breeder Platform hero preview",
    heroBadgeLabel: "BREEDER MANAGEMENT PLATFORM",
    heroDescription:
      "A complete breeder management platform combining a premium public website with a powerful administration dashboard for managing kitten listings, featured content, availability and breeder operations.",
    liveDemoUrl: "https://www.tamysweetuk.co.uk/",
    overview: {
      problemTitle: "The Problem",
      problemPoints: [
        "Breeders often rely on social media and manual communication to showcase available kittens, making updates time-consuming and enquiries difficult to manage.",
        "Managing listings, featured kittens, availability and website content across multiple tools creates unnecessary complexity.",
        "Without a centralized system, keeping the website accurate and up to date becomes inefficient.",
      ],
      solutionTitle: "The Solution",
      solutionDescription:
        "I designed and built a complete breeder platform consisting of a customer-facing website and a secure administration dashboard.",
      solutionPoints: [
        "Public breeder website",
        "Custom admin dashboard",
        "Kitten management",
        "Gallery management",
        "Featured homepage listings",
        "Responsive design",
      ],
      snapshot: [
        {
          label: "Industry",
          value: "Pet Services",
          icon: "badge-check",
        },
        {
          label: "Platform",
          value: "Full Stack Web Application",
          icon: "layout-dashboard",
        },
        {
          label: "Role",
          value: "Full Stack Developer",
          icon: "workflow",
        },
        {
          label: "Duration",
          value: "4 Weeks",
          icon: "clock-3",
        },
        {
          label: "Status",
          value: "Production Ready",
          icon: "shield-check",
        },
        {
          label: "Team",
          value: "Solo Project",
          icon: "users",
        },
      ],
    },
    screenshots: [
      {
        id: "homepage",
        title: "Homepage",
        description: "Beautiful landing page introducing the breeder.",
        image: "/works/tamysweetuk/home-herozone.png",
      },
      {
        id: "featured-kittens",
        title: "Featured Kittens",
        description: "Homepage section showcasing featured kittens.",
        image: "/works/tamysweetuk/home-kittensview.png",
      },
      {
        id: "kitten-listing",
        title: "Kitten Listing",
        description: "Advanced listing page with filtering and sorting.",
        image: "/works/tamysweetuk/kittens-sorts.png",
      },
      {
        id: "admin-dashboard",
        title: "Admin Dashboard",
        description: "Overview dashboard for breeder management.",
        image: "/works/tamysweetuk/admin-dashboard.png",
      },
      {
        id: "add-new-kitten",
        title: "Add New Kitten",
        description: "Multi-step creation workflow.",
        image: "/works/tamysweetuk/admin-addkitten.png",
      },
    ],
    features: [
      {
        title: "Responsive Design",
        description:
          "The platform adapts smoothly across desktop, tablet and mobile for customers and administrators.",
        icon: "monitor-smartphone",
      },
      {
        title: "Kitten Management",
        description:
          "Breeders can create, update and organize kitten listings from the admin dashboard.",
        icon: "settings-2",
      },
      {
        title: "Availability Tracking",
        description:
          "Availability states help keep public listings accurate as kittens become reserved or adopted.",
        icon: "calendar-range",
      },
      {
        title: "Featured Homepage Listings",
        description:
          "Selected kittens can be highlighted on the homepage to guide visitors toward current availability.",
        icon: "star",
      },
      {
        title: "Gallery Management",
        description:
          "Image galleries can be maintained from the dashboard for richer kitten and breeder presentation.",
        icon: "images",
      },
      {
        title: "Admin Dashboard",
        description:
          "A centralized dashboard gives the breeder control over listings, content and day-to-day updates.",
        icon: "layout-dashboard",
      },
      {
        title: "Dynamic Filtering",
        description:
          "Visitors can explore available kittens with filtering and sorting designed for fast discovery.",
        icon: "search",
      },
      {
        title: "SEO Friendly Pages",
        description:
          "Structured public pages support discoverability and a professional search presence.",
        icon: "search",
      },
      {
        title: "Secure Authentication",
        description:
          "Protected admin access keeps management tools and breeder operations secure.",
        icon: "lock-keyhole",
      },
      {
        title: "Supabase Database",
        description:
          "Supabase provides the database foundation for listings, galleries, enquiries and content updates.",
        icon: "database",
      },
    ],
    architecture: [
      {
        title: "Visitors",
        description: "Public website users",
        icon: "users",
      },
      {
        title: "Next.js",
        description: "Public site and admin UI",
        icon: "nextjs",
      },
      {
        title: "Application Layer",
        description: "Listing and content logic",
        icon: "workflow",
      },
      {
        title: "Supabase",
        description: "Database and authentication",
        icon: "database",
      },
      {
        title: "Media Assets",
        description: "Kitten galleries and uploads",
        icon: "images",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "Backend",
        items: ["Next.js", "Supabase"],
      },
      {
        label: "Database",
        items: ["Supabase", "PostgreSQL"],
      },
      {
        label: "Authentication",
        items: ["Supabase Auth"],
      },
      {
        label: "Deployment",
        items: ["Vercel"],
      },
    ],
    challenges: [
      {
        title: "Designing for customers and breeders",
        description:
          "Designing an experience suitable for both customers and breeders while keeping the interface simple.",
      },
      {
        title: "Synchronizing public content",
        description:
          "Keeping public website content synchronized with dashboard updates.",
      },
      {
        title: "Keeping management simple",
        description:
          "Creating a clean management workflow without unnecessary complexity.",
      },
    ],
    results: [
      {
        title: "Modern breeder website",
        description:
          "Modern breeder website replacing manual social media listings.",
      },
      {
        title: "Fast content updates",
        description:
          "Fast content updates through the admin dashboard.",
      },
      {
        title: "Centralized management",
        description:
          "Centralized management for kittens, galleries and featured content.",
      },
      {
        title: "Professional responsive experience",
        description:
          "Professional responsive experience across desktop and mobile.",
      },
    ],
    cta: {
      title: "Future Improvements",
      description:
        "Online reservation workflow, payment integration, customer accounts, email notifications, analytics dashboard and multi-language support.",
      buttonLabel: "Book a Free Consultation",
      buttonHref: "/#contact",
    },
    trustSignals: [
      {
        title: "Production Ready",
        description: "Built for real users and real-world impact.",
        icon: "shield-check",
      },
      {
        title: "Admin Dashboard",
        description: "Centralized breeder management in one secure workspace.",
        icon: "layout-dashboard",
      },
      {
        title: "Responsive Design",
        description: "Optimized for desktop, tablet and mobile browsing.",
        icon: "monitor-smartphone",
      },
      {
        title: "Supabase Backend",
        description: "Database-backed content, listings and platform state.",
        icon: "database",
      },
    ],
  },
  {
    slug: "studytask",
    title: "StudyTask",
    category: "academic",
    categoryLabel: "Education Platform",
    description:
      "An educational task management web application built as an Informatics Atestat project for a 12th grade student, featuring teacher and student roles, task assignment, progress tracking, calendar view and authentication.",
    cardImage: "/projects/studytask.png",
    cardImageAlt: "StudyTask project preview",
    tags: ["Education", "Assignments", "Teacher Dashboard"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    heroImage: "/works/studytask/herosection-studytask.png",
    heroImageAlt: "StudyTask hero preview",
    heroTitleLines: ["StudyTask"],
    overview: {
      problemTitle: "The Problem",
      problemPoints: [
        "The student needed a complete web application suitable for an Informatics Atestat presentation.",
        "The project had to demonstrate authentication, role-based access and database-backed functionality.",
        "The application needed a clear use case that could be explained easily during the exam presentation.",
        "The UI had to be simple, modern and easy to navigate.",
      ],
      solutionTitle: "The Solution",
      solutionDescription:
        "Built a StudyTask web application where teachers can assign tasks and students can track their school work from one dashboard.",
      solutionPoints: [
        "Teacher and student dashboards",
        "Task creation and assignment",
        "Task status tracking",
        "Calendar view for deadlines",
        "User authentication",
        "Role-based access",
        "Clean responsive interface",
      ],
      snapshot: [
        {
          label: "Industry",
          value: "Education",
          icon: "badge-check",
        },
        {
          label: "Platform",
          value: "Web Application",
          icon: "layout-dashboard",
        },
        {
          label: "Use Case",
          value: "Informatics Atestat Project",
          icon: "badge-check",
        },
        {
          label: "Client",
          value: "12th Grade Student",
          icon: "users",
        },
        {
          label: "Role",
          value: "Full Stack Developer",
          icon: "workflow",
        },
        {
          label: "Status",
          value: "Completed",
          icon: "shield-check",
        },
        {
          label: "Team",
          value: "Solo Project",
          icon: "users",
        },
      ],
    },
    screenshots: [
      {
        id: "login",
        title: "Login",
        description: "A clean authentication entry point for students and teachers.",
        image: "/works/studytask/login.png",
      },
      {
        id: "student-dashboard",
        title: "Student Dashboard",
        description: "Students get a clear overview of assignments, deadlines and school activity.",
        image: "/works/studytask/dashboard-elev.png",
      },
      {
        id: "my-tasks",
        title: "My Tasks",
        description: "Assignments are organized into a focused task management workflow.",
        image: "/works/studytask/tasks.png",
      },
      {
        id: "calendar",
        title: "Calendar",
        description: "A calendar view helps students manage deadlines and upcoming work.",
        image: "/works/studytask/calendar.png",
      },
      {
        id: "student-profile",
        title: "Student Profile",
        description: "Students can manage their personal information and platform presence.",
        image: "/works/studytask/profile.png",
      },
      {
        id: "teacher-dashboard",
        title: "Teacher Dashboard",
        description: "Teachers can create assignments and manage classroom workflows from one place.",
        image: "/works/studytask/dashboard-prof.png",
      },
    ],
    features: [
      {
        title: "Teacher Dashboard",
        description:
          "Teachers get a dedicated workspace for assigning tasks and reviewing student activity.",
        icon: "layout-dashboard",
      },
      {
        title: "Student Dashboard",
        description:
          "Students can track tasks, deadlines and overall progress from a single organized workspace.",
        icon: "layout-dashboard",
      },
      {
        title: "Task Assignment",
        description:
          "Tasks can be created, assigned and organized through a clear teacher workflow.",
        icon: "workflow",
      },
      {
        title: "Task Tracking",
        description:
          "Students can monitor task progress and completion status from one place.",
        icon: "badge-check",
      },
      {
        title: "Calendar View",
        description:
          "Deadlines and upcoming work are easier to follow through a calendar-based interface.",
        icon: "calendar-range",
      },
      {
        title: "User Profiles",
        description:
          "Each role has its own clear identity and workspace inside the application.",
        icon: "users",
      },
      {
        title: "Authentication",
        description:
          "Secure authentication supports protected access for both students and teachers.",
        icon: "lock-keyhole",
      },
      {
        title: "Responsive Design",
        description:
          "The platform adapts smoothly across desktop and mobile for everyday academic use.",
        icon: "monitor-smartphone",
      },
      {
        title: "Role Based Access",
        description:
          "Separate teacher and student experiences keep workflows focused and easier to use.",
        icon: "users",
      },
    ],
    architecture: [
      {
        title: "Users",
        description: "Students and teachers",
        icon: "users",
      },
      {
        title: "Next.js",
        description: "Application frontend",
        icon: "nextjs",
      },
      {
        title: "Application Layer",
        description: "Platform logic",
        icon: "workflow",
      },
      {
        title: "Supabase",
        description: "Data layer",
        icon: "database",
      },
      {
        title: "Authentication",
        description: "Access control",
        icon: "lock-keyhole",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "Backend",
        items: ["Next.js", "Supabase"],
      },
      {
        label: "Database",
        items: ["PostgreSQL"],
      },
      {
        label: "Deployment",
        items: ["Vercel"],
      },
    ],
    challenges: [
      {
        title: "Building a complete application that was simple enough to present clearly",
        description:
          "The project needed enough real functionality to impress during the exam without becoming too complex to explain.",
      },
      {
        title: "Implementing separate teacher and student flows",
        description:
          "The application needed distinct user experiences without making navigation or permissions confusing.",
      },
      {
        title: "Connecting tasks, users and deadlines in a clean structure",
        description:
          "Tasks, users and deadlines had to stay linked in a way that remained easy to understand and present.",
      },
      {
        title: "Keeping the UI modern while avoiding unnecessary complexity",
        description:
          "The interface had to feel polished enough for a strong presentation while staying simple and navigable.",
      },
    ],
    results: [
      {
        title: "Delivered a complete Atestat-ready web application",
        description:
          "The project resulted in a full working application suitable for an Informatics Atestat presentation.",
      },
      {
        title: "Demonstrated authentication, database usage and role-based functionality",
        description:
          "The app showcases core full stack concepts expected from a final high school Informatics project.",
      },
      {
        title: "Provided a clear project use case for the final presentation",
        description:
          "The teacher-student workflow makes the application easy to present and justify during the exam.",
      },
      {
        title: "Created a simple and modern educational platform suitable for a high school Informatics project",
        description:
          "StudyTask combines practical features with a clean interface that fits the scope of an Atestat project well.",
      },
    ],
    cta: {
      title: "Ready to build an education platform?",
      description:
        "Let's create a modern learning experience with dashboards, task workflows and production-ready architecture.",
      buttonLabel: "Book a Free Consultation",
      buttonHref: "/#contact",
    },
    trustSignals: [
      {
        title: "Atestat Project",
        description: "Built as a complete web application for a Romanian Informatics graduation presentation.",
        icon: "badge-check",
      },
      {
        title: "Role Based Access",
        description: "Separate teacher and student experiences with clear permissions.",
        icon: "users",
      },
      {
        title: "Full Stack App",
        description: "Authentication, database-backed logic and dashboards combined in one application.",
        icon: "workflow",
      },
      {
        title: "Education Platform",
        description: "A clean modern educational workflow for students and teachers.",
        icon: "layout-dashboard",
      },
    ],
  },
];

export function getProjectDetailBySlug(slug: string) {
  return projectDetails.find((project) => project.slug === slug);
}
