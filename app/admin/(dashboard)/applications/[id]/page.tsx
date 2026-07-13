import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AdminStatusBadge } from "@/src/components/admin/AdminStatusBadge";
import {
  approveApplicationAction,
  rejectApplicationAction,
} from "@/src/lib/partner-program-actions";
import { getPartnerApplicationById } from "@/src/lib/supabase-admin";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 border-b border-white/[0.06] py-4 sm:grid-cols-[180px_minmax(0,1fr)]">
      <div className="text-sm font-medium text-slate-400">{label}</div>
      <div className="text-sm leading-7 text-slate-100">{value || "-"}</div>
    </div>
  );
}

export default async function AdminApplicationDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const application = await getPartnerApplicationById(id);

  if (!application) {
    notFound();
  }

  const generatedLeadUrl =
    typeof query.generatedLeadUrl === "string" ? query.generatedLeadUrl : "";
  const warning = query.warning === "email-failed";
  const hasActionError = typeof query.error === "string";

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-5 shadow-[0_18px_70px_rgba(2,6,23,0.24)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/admin/applications" className="text-sm text-blue-200 hover:text-white">
              Back to applications
            </Link>
            <h2 className="mt-3 text-2xl font-bold text-white">{application.fullName}</h2>
            <p className="mt-2 text-sm text-slate-400">{application.email}</p>
          </div>

          <AdminStatusBadge
            label={application.status}
            tone={
              application.status === "APPROVED"
                ? "success"
                : application.status === "REJECTED"
                  ? "danger"
                  : "warning"
            }
          />
        </div>

        {warning ? (
          <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Partner approved, but the welcome email failed. Copy the generated private URL below and retry manually if needed.
          </div>
        ) : null}

        {hasActionError ? (
          <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            We couldn&apos;t complete that action. Please refresh and try again.
          </div>
        ) : null}

        {generatedLeadUrl ? (
          <div className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">
              Generated private lead URL
            </p>
            <p className="mt-2 break-all text-sm text-white">{generatedLeadUrl}</p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white">Application details</h3>
            <div className="mt-5">
              <DetailRow label="Phone" value={application.phone} />
              <DetailRow label="Country / City" value={application.countryCity} />
              <DetailRow label="Role" value={application.role} />
              <DetailRow label="Company Status" value={application.companyStatus} />
              <DetailRow label="Discovery Source" value={application.discoverySource} />
              <DetailRow label="Potential Clients" value={application.potentialClients} />
              <DetailRow label="Industries" value={application.industries.join(", ")} />
              <DetailRow
                label="Client Acquisition Plan"
                value={application.clientAcquisitionPlan}
              />
              <DetailRow label="LinkedIn" value={application.linkedinUrl || "-"} />
              <DetailRow label="Instagram" value={application.instagramUrl || "-"} />
              <DetailRow label="Facebook" value={application.facebookUrl || "-"} />
              <DetailRow label="YouTube" value={application.youtubeUrl || "-"} />
              <DetailRow label="TikTok" value={application.tiktokUrl || "-"} />
              <DetailRow label="X / Twitter" value={application.twitterUrl || "-"} />
              <DetailRow label="Website" value={application.websiteUrl || "-"} />
              <DetailRow
                label="Additional Information"
                value={application.additionalInformation || "-"}
              />
              <DetailRow
                label="Submitted"
                value={new Date(application.submittedAt).toLocaleString("en-GB")}
              />
              <DetailRow
                label="Reviewed"
                value={
                  application.reviewedAt
                    ? new Date(application.reviewedAt).toLocaleString("en-GB")
                    : "-"
                }
              />
            </div>
          </div>

          <div className="space-y-5">
            {application.status === "PENDING" ? (
              <>
                <div className="rounded-[24px] border border-emerald-400/16 bg-emerald-500/[0.06] p-5">
                  <h3 className="text-lg font-semibold text-white">Approve application</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Set the partner commission percentage and generate a private lead URL.
                  </p>
                  <form action={approveApplicationAction} className="mt-5 space-y-4">
                    <input type="hidden" name="applicationId" value={application.id} />
                    <div className="space-y-2">
                      <label
                        htmlFor="commissionPercent"
                        className="text-sm font-medium text-slate-200"
                      >
                        Commission percentage
                      </label>
                      <input
                        id="commissionPercent"
                        name="commissionPercent"
                        type="number"
                        min={10}
                        max={20}
                        defaultValue={10}
                        className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Approve and create partner
                    </Button>
                  </form>
                </div>

                <div className="rounded-[24px] border border-rose-400/16 bg-rose-500/[0.04] p-5">
                  <h3 className="text-lg font-semibold text-white">Reject application</h3>
                  <form action={rejectApplicationAction} className="mt-5 space-y-4">
                    <input type="hidden" name="applicationId" value={application.id} />
                    <div className="space-y-2">
                      <label
                        htmlFor="rejectionNote"
                        className="text-sm font-medium text-slate-200"
                      >
                        Internal rejection note
                      </label>
                      <textarea
                        id="rejectionNote"
                        name="rejectionNote"
                        rows={4}
                        className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                      />
                    </div>
                    <Button type="submit" variant="outline" className="w-full">
                      Reject application
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5 text-sm leading-7 text-slate-300">
                This application has already been reviewed.
                {application.rejectionNote ? (
                  <div className="mt-4 rounded-2xl border border-white/[0.08] bg-slate-950/45 p-4 text-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Rejection note
                    </p>
                    <p className="mt-2">{application.rejectionNote}</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
