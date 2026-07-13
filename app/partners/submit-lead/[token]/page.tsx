import { hashPartnerToken } from "@/src/lib/partner-program";
import { submitPartnerLeadFormAction } from "@/src/lib/partner-program-actions";
import { getPartnerByTokenHash } from "@/src/lib/supabase-admin";
import { PartnerLeadSubmissionForm } from "@/src/components/partners/PartnerLeadSubmissionForm";

export default async function SubmitPartnerLeadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const partner = await getPartnerByTokenHash(hashPartnerToken(token));

  const submitAction = async (
    _state: {
      ok: boolean;
      message: string;
      fieldErrors: Record<string, string | undefined>;
    },
    formData: FormData,
  ) => {
    "use server";

    return submitPartnerLeadFormAction(token, formData);
  };

  if (!partner || !partner.is_active) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#040712_0%,#07111f_50%,#040712_100%)] px-5 py-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-rose-400/16 bg-rose-500/[0.05] p-6 text-center shadow-[0_18px_70px_rgba(2,6,23,0.24)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-200">
            Private partner area
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">Invalid private link</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            This lead submission URL is invalid, inactive or has been revoked. Contact Rafael.Dev if you need a new private link.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#040712_0%,#07111f_50%,#040712_100%)] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-6 shadow-[0_24px_90px_rgba(2,6,23,0.32)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
          Private partner area
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">Submit a lead</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Signed in as <span className="font-semibold text-white">{partner.full_name}</span>. Share the client details below and the lead will be linked to your partner account automatically.
        </p>

        <div className="mt-8">
          <PartnerLeadSubmissionForm action={submitAction} />
        </div>
      </div>
    </main>
  );
}

