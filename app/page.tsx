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
import { jsonLd } from "@/lib/seo";

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
