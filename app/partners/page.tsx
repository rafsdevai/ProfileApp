import type { Metadata } from "next";

import { AmbientCursor } from "@/components/AmbientCursor";
import { Navbar } from "@/components/Navbar";
import { absoluteUrl } from "@/lib/seo";
import { PartnerApplicationForm } from "@/src/components/partners/PartnerApplicationForm";
import { PartnerEligibility } from "@/src/components/partners/PartnerEligibility";
import { PartnerHero } from "@/src/components/partners/PartnerHero";
import { PartnershipSteps } from "@/src/components/partners/PartnershipSteps";

export const metadata: Metadata = {
  title: "Partner Program | Rafael.Dev",
  description:
    "Join the Rafael.Dev Partner Program and earn 10%-20% commission for every successful client referral.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Partner Program | Rafael.Dev",
    description:
      "Join the Rafael.Dev Partner Program and earn 10%-20% commission for every successful client referral.",
    type: "website",
    url: absoluteUrl("/partners"),
    siteName: "Rafael.Dev",
    images: [
      {
        url: absoluteUrl("/og/home-og.png?v=2"),
        width: 1200,
        height: 630,
        alt: "Rafael.Dev partner program preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Program | Rafael.Dev",
    description:
      "Join the Rafael.Dev Partner Program and earn 10%-20% commission for every successful client referral.",
    images: [absoluteUrl("/og/home-og.png?v=2")],
  },
};

export default function PartnersPage() {
  return (
    <>
      <AmbientCursor />
      <Navbar />
      <main className="relative min-h-screen overflow-x-clip pt-[76px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.15),transparent_30rem),radial-gradient(circle_at_10%_30%,rgba(37,99,235,0.1),transparent_28rem),linear-gradient(180deg,rgba(2,5,13,0.08),rgba(2,4,10,0.86))]" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />
        <div className="project-system-drift pointer-events-none absolute inset-x-0 top-20 h-[48rem] opacity-[0.06] [mask-image:radial-gradient(circle_at_50%_0%,black,transparent_72%)]" />

        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <PartnerHero />
          <PartnershipSteps />

          <section className="pb-16 pt-2 sm:pb-20 sm:pt-4 lg:pb-24">
            <div className="grid gap-5 md:gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-8">
              <PartnerEligibility />
              <div className="lg:border-l lg:border-white/[0.06] lg:pl-8">
                <PartnerApplicationForm />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
