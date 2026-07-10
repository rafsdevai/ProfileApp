import {
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  Network,
  Quote,
  UserRoundPlus,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const eligibilityGroups = [
  {
    title: "Freelancers & Consultants",
    description: "Marketing, Design, Content, Ads, SEO, etc.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Entrepreneurs & Business Owners",
    description: "With a network of contacts in various industries.",
    icon: Network,
  },
  {
    title: "Students & Ambitious People",
    description: "Who want to learn and earn at the same time.",
    icon: GraduationCap,
  },
  {
    title: "Anyone with Connections",
    description: "Small businesses, startups, professionals, agencies, etc.",
    icon: UserRoundPlus,
  },
] as const;

const reasons = [
  "Attractive commission: 10% - 20%",
  "No time commitment",
  "No targets, no pressure",
  "High-quality services that sell themselves",
  "Real partnership & long-term relationships",
] as const;

export function PartnerEligibility() {
  return (
    <div className="space-y-5">
      <Reveal>
        <Card className="rounded-2xl border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.8),rgba(6,10,20,0.62))]">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-2xl text-white">Who can apply?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-6 pt-0">
            {eligibilityGroups.map((group) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.title}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-blue-300/14 bg-blue-400/[0.05] text-blue-200">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {group.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {group.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <Card className="rounded-2xl border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.8),rgba(6,10,20,0.62))]">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-2xl text-white">
              Why partner with us?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-6 pt-0">
            {reasons.map((reason) => (
              <div key={reason} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-300">
                  <BadgeCheck className="size-4" aria-hidden="true" />
                </span>
                <p className="text-sm leading-6 text-slate-300">{reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.14}>
        <Card className="rounded-2xl border-violet-300/12 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.15),rgba(10,14,26,0.86))] shadow-[0_20px_60px_rgba(76,29,149,0.18)]">
          <CardContent className="p-6">
            <Quote className="size-8 text-violet-200" aria-hidden="true" />
            <div className="mt-4 space-y-1.5">
              <p className="text-lg font-medium leading-8 text-white sm:whitespace-nowrap">
                Our partners are an extension of our team.
              </p>
              <p className="text-lg font-medium leading-8 text-white sm:whitespace-nowrap">
                We win when you win.
              </p>
            </div>
            <div className="mt-5 text-sm leading-6 text-blue-100/90">
              <p>- Rafael</p>
              <p>Founder & AI Engineer</p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
