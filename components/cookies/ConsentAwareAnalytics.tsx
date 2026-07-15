"use client";

import { Analytics } from "@vercel/analytics/next";

import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

export function ConsentAwareAnalytics() {
  const { canUseAnalytics, isReady } = useCookieConsent();

  if (!isReady || !canUseAnalytics) {
    return null;
  }

  return <Analytics />;
}
