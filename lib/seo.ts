import type { Metadata } from "next";

import { en } from "@/lib/i18n/en";

export const siteConfig = {
  name: "Rafael.Dev",
  legalName: "Rafael Stefanache",
  url: "https://rafaeldev.ro",
  title:
    "Rafael.Dev | AI Automation Developer & Full-Stack Developer Romania",
  description:
    "Rafael Stefanache builds practical AI systems, FastAPI backends, custom web applications, SaaS products and Informatics mentoring support in Romania.",
  shortDescription:
    "AI systems, custom web applications, FastAPI development, SaaS products and Informatics mentoring by Rafael Stefanache.",
  locale: "en_US",
  country: "RO",
  email: "rafs.dev.ai@gmail.com",
  phone: "+40745238045",
  calendlyUrl: "https://calendly.com/rafstefanache",
  linkedinUrl: "https://www.linkedin.com/in/rafael-stefanache-72a767288",
  githubUrl: "https://github.com/RafaelDevLabs",
  githubReposUrl: "https://github.com/orgs/RafaelDevLabs/repositories",
  heroImage: "/images/hero-rafael.png",
  ogImage: "/opengraph-image",
  appIcon: "/icon",
  keywords: [
    "Rafael.Dev",
    "Rafael Stefanache",
    "AI Automation Developer",
    "AI Engineer Romania",
    "Full-Stack Developer Romania",
    "FastAPI Developer",
    "Python Developer Romania",
    "Custom Web Applications",
    "SaaS Developer",
    "AI Consultant Romania",
    "AI Workflow Automation",
    "RAG Systems",
    "Informatics Mentoring Romania",
    "Atestat Informatica Mentor",
  ],
  services: [
    "AI workflow automation",
    "Custom web application development",
    "FastAPI backend development",
    "SaaS product development",
    "RAG systems and AI assistants",
    "Informatics mentoring for Atestat projects",
  ],
  sameAs: [
    "https://www.linkedin.com/in/rafael-stefanache-72a767288",
    "https://github.com/RafaelDevLabs",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "technology",
  classification:
    "AI automation, full-stack web development, FastAPI, SaaS, informatics mentoring",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Rafael.Dev portfolio for AI automation, Python, FastAPI and full-stack web development",
      },
    ],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: siteConfig.appIcon,
    apple: siteConfig.appIcon,
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.heroImage),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      jobTitle: [
        "AI Automation Developer",
        "Full-Stack Developer",
        "FastAPI Developer",
        "SaaS Developer",
        "AI Consultant",
        "Informatics Mentor",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: siteConfig.country,
      },
      sameAs: [...siteConfig.sameAs],
      knowsAbout: [
        "AI Workflow Automation",
        "Python",
        "FastAPI Development",
        "Custom Web Applications",
        "SaaS Development",
        "RAG Systems",
        "Informatics Mentoring Romania",
        "Atestat Informatica Mentoring",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      alternateName: siteConfig.legalName,
      url: siteConfig.url,
      inLanguage: "en",
      publisher: {
        "@id": `${siteConfig.url}/#person`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      about: {
        "@id": `${siteConfig.url}/#person`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.heroImage),
      },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#services`,
      name: "Rafael.Dev AI and Web Development Services",
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.heroImage),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      priceRange: "Project-based pricing",
      address: {
        "@type": "PostalAddress",
        addressCountry: siteConfig.country,
      },
      founder: {
        "@id": `${siteConfig.url}/#person`,
      },
      areaServed: {
        "@type": "Country",
        name: "Romania",
      },
      description:
        "AI automation, custom web applications, SaaS development, FastAPI development and Informatics mentoring for Atestat Informatica projects.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Core Services",
        itemListElement: en.about.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@id": `${siteConfig.url}/#person`,
            },
          },
        })),
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/#projects`,
      name: "Selected AI, data, Python and web development projects",
      itemListElement: en.projects.items.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.statement,
          genre: project.category,
          url:
            project.liveHref && project.liveHref !== "#"
              ? project.liveHref
              : project.githubHref,
          creator: {
            "@id": `${siteConfig.url}/#person`,
          },
          keywords: project.stack.join(", "),
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
      ],
    },
  ],
} as const;
