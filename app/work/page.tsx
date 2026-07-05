import type { Metadata } from "next";
import { AmbientCursor } from "@/components/AmbientCursor";
import { Navbar } from "@/components/Navbar";
import { WorksCTA } from "@/src/components/work/WorksCTA";
import { WorksContent } from "@/src/components/work/WorksContent";
import { WorksHero } from "@/src/components/work/WorksHero";
import { WorksTrustRow } from "@/src/components/work/WorksTrustRow";
import { projects } from "@/src/data/projects";

export const metadata: Metadata = {
  title: "Works",
  description:
    "A curated collection of AI systems, web applications, automation tools, and academic projects by Rafael.Dev.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Works | Rafael.Dev",
    description:
      "A curated collection of AI systems, web applications, automation tools, and academic projects by Rafael.Dev.",
    url: "/work",
  },
};

export default function WorksPage() {
  return (
    <>
      <AmbientCursor />
      <Navbar />
      <main className="relative min-h-screen overflow-hidden px-5 pb-16 pt-24 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-[7.5rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(37,99,235,0.12),transparent_30rem),radial-gradient(circle_at_86%_12%,rgba(124,58,237,0.18),transparent_34rem),radial-gradient(circle_at_78%_44%,rgba(59,130,246,0.08),transparent_24rem),linear-gradient(180deg,rgba(2,5,13,0.08),rgba(2,4,10,0.78))]" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />
        <div className="project-system-drift pointer-events-none absolute inset-x-0 top-14 h-[44rem] opacity-[0.06] [mask-image:radial-gradient(circle_at_50%_0%,black,transparent_72%)]" />

        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-7 sm:gap-8 lg:gap-10">
          <WorksHero />
          <WorksContent projects={projects} />
          <WorksCTA />
          <WorksTrustRow />
        </div>
      </main>
    </>
  );
}
