"use client";

import type { CSSProperties, PointerEvent } from "react";
import { Linkedin, Quote } from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";

const testimonialTones = [
  {
    tone: "from-blue-500 to-violet-500",
  },
  {
    tone: "from-cyan-500 to-blue-600",
  },
  {
    tone: "from-emerald-500 to-sky-500",
  },
];

function TestimonialCard({
  testimonial,
  tone,
}: {
  testimonial: {
    name: string;
    role: string;
    context: string;
    quote: string;
    initials: string;
    result: string;
  };
  tone: string;
}) {
  const cardStyle = {
    "--testimonial-card-x": "50%",
    "--testimonial-card-y": "20%",
    "--testimonial-card-glow-opacity": "0",
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--testimonial-card-x", `${x}px`);
    event.currentTarget.style.setProperty("--testimonial-card-y", `${y}px`);
    event.currentTarget.style.setProperty("--testimonial-card-glow-opacity", "1");
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--testimonial-card-glow-opacity", "0");
  };

  return (
    <Card
      style={cardStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="testimonial-card group relative flex h-full min-h-[270px] flex-col overflow-hidden p-5 transition duration-[720ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300/22 hover:bg-blue-500/[0.025] hover:shadow-[0_22px_60px_rgba(2,6,23,0.28),0_0_28px_rgba(37,99,235,0.075)] sm:p-6"
    >
      <div className="testimonial-card-cursor-light pointer-events-none absolute inset-0 rounded-lg" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tone} text-base font-bold text-white shadow-blue-glow ring-1 ring-white/15 transition duration-500 group-hover:scale-[1.035]`}
          >
            {testimonial.initials}
          </div>
          <div>
            <h3 className="text-base font-semibold leading-6 text-white">
              {testimonial.name}
            </h3>
            <p className="text-sm font-medium text-slate-300">
              {testimonial.role}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {testimonial.context}
            </p>
          </div>
        </div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-slate-950/25 text-blue-200/45 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:border-blue-300/18 group-hover:bg-blue-500/[0.045] group-hover:text-blue-200/80">
          <Linkedin className="size-3.5" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <div>
          <Quote className="mb-3 size-5 text-blue-300/65" aria-hidden="true" />
          <p className="text-[15px] leading-7 text-slate-300">
            &quot;{testimonial.quote}&quot;
          </p>
        </div>
        <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/18 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-200 transition duration-300 group-hover:border-blue-300/28 group-hover:bg-blue-500/[0.13]">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {testimonial.result}
        </div>
      </div>
    </Card>
  );
}

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="relative border-b border-white/10 p-7 sm:p-9 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/[0.025] via-transparent to-transparent" />
      <Reveal className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-blue-300">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="mt-2 max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl">
            {t.testimonials.title}
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {t.testimonials.items.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={0.06 + index * 0.08}>
            <TestimonialCard
              testimonial={testimonial}
              tone={testimonialTones[index].tone}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
