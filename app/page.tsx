import { AboutServices } from "@/components/AboutServices";
import { AmbientCursor } from "@/components/AmbientCursor";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { FreeConsultation } from "@/components/FreeConsultation";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PortfolioShell } from "@/components/PortfolioShell";
import { Projects } from "@/components/Projects";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Testimonials } from "@/components/Testimonials";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rafaeldev.ro/#person",
      name: "Rafael Stefanache",
      url: "https://rafaeldev.ro",
      image: "https://rafaeldev.ro/images/hero-rafael.png",
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
        addressCountry: "RO",
      },
      email: "rafs.dev.ai@gmail.com",
      sameAs: [
        "https://www.linkedin.com/in/rafael-stefanache-72a767288",
        "https://github.com/RafaelDevLabs",
      ],
      knowsAbout: [
        "AI Workflow Automation",
        "Custom Web Applications",
        "SaaS Development",
        "FastAPI Development",
        "RAG Systems",
        "Informatics Mentoring Romania",
        "Atestat Informatica Mentoring",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://rafaeldev.ro/#services",
      name: "Rafael Stefanache AI and Web Development Services",
      url: "https://rafaeldev.ro",
      provider: {
        "@id": "https://rafaeldev.ro/#person",
      },
      areaServed: "Romania",
      description:
        "AI automation, custom web applications, SaaS development, FastAPI development and Informatics mentoring for Atestat Informatica projects.",
      serviceType: [
        "AI Automation Developer",
        "Full-Stack Developer Romania",
        "FastAPI Developer",
        "Custom Web Applications",
        "SaaS Developer",
        "AI Consultant Romania",
        "AI Workflow Automation",
        "Informatics Mentoring Romania",
        "Atestat Informatica Mentor",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Core Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Workflow Automation and AI Solutions",
              description:
                "Practical AI systems, RAG workflows and automations for businesses.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Web Applications and SaaS Development",
              description:
                "Modern full-stack applications, FastAPI backends and scalable SaaS platforms.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Informatics Mentoring Romania",
              description:
                "Structured mentoring for Atestat Informatica certification projects.",
            },
          },
        ],
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmbientCursor />
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <PortfolioShell>
          <AboutServices />
          <Projects />
          <CTA />
          <Testimonials />
          <FreeConsultation />
          <Footer />
        </PortfolioShell>
      </main>
      <ScrollToTop />
    </>
  );
}
