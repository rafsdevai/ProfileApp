import { cleanEnvValue } from "@/src/lib/partner-program";

const resendApiUrl = "https://api.resend.com/emails";

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const resendApiKey = cleanEnvValue(process.env.RESEND_API_KEY);
  const fromEmail = cleanEnvValue(process.env.PARTNER_PROGRAM_FROM_EMAIL);

  if (!resendApiKey || !fromEmail) {
    throw new Error(
      "Email sending is not configured. Set RESEND_API_KEY and PARTNER_PROGRAM_FROM_EMAIL.",
    );
  }

  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Resend request failed (${response.status}): ${errorText || "Unknown error"}`,
    );
  }

  return (await response.json()) as { id?: string };
}

