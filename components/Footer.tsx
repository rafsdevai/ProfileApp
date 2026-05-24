"use client";

import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/seo";

const whatsappHref =
  "https://wa.me/40745238045?text=Hi%20Rafael%2C%20I%27d%20like%20to%20discuss%20a%20project%20or%20mentoring.";

const detailIcons = [
  {
    icon: Mail,
  },
  {
    icon: MapPin,
  },
  {
    icon: CircleCheck,
  },
  {
    icon: Clock3,
  },
];

const quickLinks = [
  {
    href: siteConfig.linkedinUrl,
    icon: Linkedin,
    rel: "me noopener noreferrer",
  },
  {
    href: siteConfig.githubUrl,
    icon: Github,
    rel: "me noopener noreferrer",
  },
  {
    href: siteConfig.calendlyUrl,
    icon: CalendarDays,
    rel: "noopener noreferrer",
  },
  {
    href: whatsappHref,
    icon: MessageCircle,
    rel: "noopener noreferrer",
  },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative p-7 sm:p-9 lg:p-10"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.08),transparent_44%),linear-gradient(to_bottom,transparent,rgba(2,6,23,0.72))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative grid items-start gap-9 lg:grid-cols-[0.85fr_1fr_0.9fr] lg:gap-10">
        <Reveal>
          <div className="mb-5 inline-flex rounded-full border border-blue-300/18 bg-blue-300/[0.065] px-3 py-1.5 text-xs font-semibold text-blue-100 shadow-[0_0_18px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            {t.contact.availabilityBadge}
          </div>

          <h2 id="contact-heading" className="text-3xl font-bold text-white">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-sm text-base leading-7 text-slate-300">
            {t.contact.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <address className="grid gap-4 not-italic sm:grid-cols-2 lg:grid-cols-1">
            {t.contact.details.map((detail, index) => {
              const Icon = detailIcons[index].icon;

              return (
                <div key={detail.label} className="flex gap-4">
                  <Icon
                    className="mt-1 size-5 shrink-0 text-blue-400 drop-shadow-[0_0_14px_rgba(96,165,250,0.28)]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm text-slate-400">{detail.label}</p>
                    <p className="break-words text-sm font-medium text-slate-100">
                      {detail.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </address>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="rounded-xl border border-white/[0.07] bg-slate-950/32 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-400">
              {t.contact.quickTitle}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                const label = t.contact.quickLinks[index];

                return (
                  <a
                    key={label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? link.rel : undefined}
                    className="group flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.035] px-2.5 py-2.5 text-sm font-medium text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/22 hover:bg-blue-300/[0.055] hover:text-blue-100"
                  >
                    <Icon
                      className="size-4 transition duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-10 border-t border-white/10 pt-6">
        <p className="mb-4 text-sm font-medium text-slate-400">
          {t.contact.brandStatement}
        </p>
        <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.contact.copyright}</p>
          <p>{t.contact.footerServices}</p>
        </div>
      </div>
    </footer>
  );
}
