import type { Metadata } from "next";
import Link from "next/link";

import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Rafael.Dev.",
  alternates: {
    canonical: "/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Rafael.Dev",
    description: "Cookie Policy for Rafael.Dev.",
    type: "article",
    url: absoluteUrl("/cookie-policy"),
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalDocumentLayout
      eyebrow="Legal"
      title="Cookie Policy"
      intro="This policy explains what cookies and similar technologies are, which categories this site uses, and how you can change or withdraw your choices at any time."
    >
      <h2>1. What cookies and similar technologies are</h2>
      <p>
        Cookies are small text files stored on your device. Similar technologies can include local
        storage, pixels, scripts, and identifiers that help a website remember settings or measure
        usage.
      </p>

      <h2>2. How consent works on this site</h2>
      <p>
        Optional cookies are off by default. The site shows a consent banner on first visit and
        does not activate non-essential services unless you make an explicit choice. Ignoring or
        dismissing the banner does not create a consent record.
      </p>
      <p>
        You can reopen the settings at any time using the <strong>Cookie preferences</strong>{" "}
        button shown in the lower-left corner of the website.
      </p>

      <h2>3. Categories used on this site</h2>
      <h3>Necessary</h3>
      <p>
        These are always active and are required for basic functionality, security, and storing
        your cookie preferences.
      </p>
      <ul>
        <li>
          <strong>Consent preference storage</strong> - first-party local storage entry used to
          remember your explicit cookie choices.
        </li>
        <li>
          <strong>Application security/session cookies</strong> - for example the admin session
          cookie used by the protected admin area where applicable.
        </li>
      </ul>

      <h3>Analytics</h3>
      <p>
        Disabled by default. If you opt in, the site loads Vercel Analytics to measure aggregate
        website usage.
      </p>
      <ul>
        <li>
          <strong>Provider:</strong> Vercel
        </li>
        <li>
          <strong>Purpose:</strong> Measure page usage and performance trends.
        </li>
        <li>
          <strong>Duration:</strong> <strong>[TODO: confirm exact Vercel Analytics cookie/storage duration]</strong>
        </li>
      </ul>

      <h3>Marketing</h3>
      <p>
        Disabled by default. No marketing, advertising, remarketing, or social-pixel tracking
        services were found in the current repository audit.
      </p>

      <h2>4. Providers discovered in the repository audit</h2>
      <ul>
        <li>
          <strong>Vercel Analytics</strong> was found in the root layout and is now blocked until
          analytics consent is granted.
        </li>
        <li>
          No Google Analytics, Google Tag Manager, Meta Pixel, Microsoft Clarity, Hotjar, Plausible,
          PostHog, Mixpanel, Segment, Matomo, or similar tracking snippets were found in the current
          codebase.
        </li>
      </ul>

      <h2>5. Cookie duration and storage</h2>
      <p>
        The site stores your explicit cookie choice in first-party local storage together with the
        consent version and timestamp. This record is used only to remember your choice until it is
        changed, removed, or invalidated by a consent-version update.
      </p>

      <h2>6. Withdrawing or changing consent</h2>
      <p>
        You can change or withdraw consent at any time by reopening the{" "}
        <strong>Cookie preferences</strong> control on the website. If optional consent is revoked,
        the site stops loading optional tracking services for subsequent activity and attempts to
        remove known first-party non-essential cookies where technically possible.
      </p>

      <h2>7. More information</h2>
      <p>
        For information about personal data processing and the partner registration form, read the{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalDocumentLayout>
  );
}
