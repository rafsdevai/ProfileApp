import type { ReactNode } from "react";

import { AmbientCursor } from "@/components/AmbientCursor";
import { Navbar } from "@/components/Navbar";

export function LegalDocumentLayout({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <AmbientCursor />
      <Navbar />
      <main className="relative min-h-screen overflow-x-clip pt-[76px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.15),transparent_30rem),radial-gradient(circle_at_10%_30%,rgba(37,99,235,0.1),transparent_28rem),linear-gradient(180deg,rgba(2,5,13,0.08),rgba(2,4,10,0.86))]" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />
        <div className="project-system-drift pointer-events-none absolute inset-x-0 top-20 h-[48rem] opacity-[0.06] [mask-image:radial-gradient(circle_at_50%_0%,black,transparent_72%)]" />

        <div className="relative mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.86),rgba(6,10,20,0.78))] p-6 shadow-[0_24px_90px_rgba(2,6,23,0.32)] backdrop-blur-2xl sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              {intro}
            </p>

            <div className="prose prose-invert mt-10 max-w-none prose-headings:scroll-mt-28 prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-a:text-blue-200 prose-li:text-slate-300">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
