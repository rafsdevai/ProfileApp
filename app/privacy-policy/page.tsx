import type { Metadata } from "next";
import Link from "next/link";

import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Rafael.Dev, including the partner registration form.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Rafael.Dev",
    description: "Privacy Policy for Rafael.Dev, including the partner registration form.",
    type: "article",
    url: absoluteUrl("/privacy-policy"),
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains how Rafael.Dev handles personal data across the website, including the partner registration form, and how cookie-related processing connects to the Cookie Policy."
    >
      <h2>1. Controller details</h2>
      <p>
        Legal entity / owner: <strong>[TODO: legal entity or sole trader name]</strong>
      </p>
      <p>
        Registered address: <strong>[TODO: registered business address]</strong>
      </p>
      <p>
        Contact email: <strong>[TODO: privacy contact email]</strong>
      </p>
      <p>
        Contact phone: <strong>[TODO: privacy contact phone, if used for privacy requests]</strong>
      </p>

      <h2>2. What data we collect</h2>
      <p>The website may process the following categories of personal data:</p>
      <ul>
        <li>Contact details you actively provide, such as name, email address, and phone number.</li>
        <li>Professional and business information submitted through the partner application form.</li>
        <li>Technical data required for core website delivery and security.</li>
        <li>Optional analytics data only when you explicitly opt into analytics cookies.</li>
      </ul>

      <h2>3. Partner registration form</h2>
      <p>
        The partner registration form collects the information shown in the form itself, including
        identity details, location, referral potential, industries, professional profiles, and any
        optional notes you decide to submit.
      </p>
      <p>The data is used to:</p>
      <ul>
        <li>Review your suitability for the partner program.</li>
        <li>Contact you about your application and next steps.</li>
        <li>Maintain an internal record of applications and related communications.</li>
      </ul>
      <p>
        The legal basis for this processing is the need to take steps at your request before
        entering into a potential business relationship, together with the controller&apos;s legitimate
        interest in managing partnership applications. Submission of the form is not bundled with
        optional marketing consent.
      </p>

      <h2>4. Retention</h2>
      <p>
        Partner application records are retained for{" "}
        <strong>[TODO: define retention period, for example X months after last contact]</strong>.
        If an application is approved or converted into an active partner relationship, relevant
        records may be kept longer where needed for contract management, accounting, or legal
        compliance.
      </p>

      <h2>5. Recipients and processors</h2>
      <p>The repository indicates that the following processors or service providers may be involved:</p>
      <ul>
        <li>
          <strong>Vercel</strong> for hosting and, only with consent, website analytics.
        </li>
        <li>
          <strong>Supabase</strong> for storing partner-program application and lead data.
        </li>
        <li>
          <strong>Resend</strong> for transactional email delivery related to partner submissions.
        </li>
      </ul>
      <p>
        Add any missing processors here: <strong>[TODO: confirm full processor list]</strong>.
      </p>

      <h2>6. Cookies and similar technologies</h2>
      <p>
        Necessary storage is used to remember your cookie preferences. Optional analytics cookies
        remain disabled unless you opt in. See the{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> for more detail.
      </p>

      <h2>7. International transfers</h2>
      <p>
        If service providers process data outside the EEA, describe the transfer mechanism here:
        <strong> [TODO: confirm transfer destinations and safeguards]</strong>.
      </p>

      <h2>8. Your rights</h2>
      <p>Depending on applicable law, you may have the right to:</p>
      <ul>
        <li>Request access to your personal data.</li>
        <li>Request correction or deletion.</li>
        <li>Request restriction of processing.</li>
        <li>Object to certain processing.</li>
        <li>Request portability where applicable.</li>
        <li>Withdraw cookie consent at any time for optional categories.</li>
        <li>Lodge a complaint with your local supervisory authority.</li>
      </ul>

      <h2>9. How to contact us</h2>
      <p>
        Send privacy-related requests to <strong>[TODO: privacy contact email]</strong>.
      </p>

      <h2>10. Updates to this policy</h2>
      <p>
        This policy should be reviewed whenever processing activities, cookie settings, or third-party
        service providers change. The current version should include an internal review date:
        <strong> [TODO: add review date]</strong>.
      </p>
    </LegalDocumentLayout>
  );
}
