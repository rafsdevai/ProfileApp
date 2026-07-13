import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AdminStatusBadge } from "@/src/components/admin/AdminStatusBadge";
import { updateLeadAction } from "@/src/lib/partner-program-actions";
import { getLeadById, getPartnerById } from "@/src/lib/supabase-admin";
import {
  commissionStatuses,
  leadStatuses,
} from "@/src/types/partner-program";

function InfoRow({
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

export default async function AdminLeadDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  const partner = await getPartnerById(lead.partnerId);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-5 shadow-[0_18px_70px_rgba(2,6,23,0.24)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/admin/leads" className="text-sm text-blue-200 hover:text-white">
              Back to leads
            </Link>
            <h2 className="mt-3 text-2xl font-bold text-white">{lead.companyName}</h2>
            <p className="mt-2 text-sm text-slate-400">{lead.contactName}</p>
          </div>

          <AdminStatusBadge label={lead.status} tone="info" />
        </div>

        {typeof query.success === "string" ? (
          <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            Lead updated successfully.
          </div>
        ) : null}

        {typeof query.error === "string" ? (
          <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            We couldn&apos;t update this lead. Please try again.
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-white">Client information</h3>
              <div className="mt-5">
                <InfoRow label="Company" value={lead.companyName} />
                <InfoRow label="Contact name" value={lead.contactName} />
                <InfoRow label="Email" value={lead.email} />
                <InfoRow label="Phone" value={lead.phone || "-"} />
                <InfoRow label="Website" value={lead.website || "-"} />
                <InfoRow label="Country / City" value={lead.countryCity || "-"} />
                <InfoRow label="Requested service" value={lead.serviceNeeded} />
                <InfoRow label="Estimated budget" value={lead.estimatedBudget || "-"} />
                <InfoRow label="Partner notes" value={lead.partnerNotes || "-"} />
              </div>
            </div>

            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-white">Referral information</h3>
              <div className="mt-5">
                <InfoRow label="Partner" value={partner?.fullName ?? "Unknown partner"} />
                <InfoRow
                  label="Commission snapshot"
                  value={`${lead.commissionPercentSnapshot}%`}
                />
                <InfoRow
                  label="Submitted"
                  value={new Date(lead.submittedAt).toLocaleString("en-GB")}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-emerald-400/12 bg-[linear-gradient(180deg,rgba(16,185,129,0.025),rgba(15,23,42,0.01))] p-5">
            <h3 className="text-lg font-semibold text-white">Lead management</h3>
            <form action={updateLeadAction} className="mt-5 space-y-4">
              <input type="hidden" name="leadId" value={lead.id} />

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium text-slate-200">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={lead.status}
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                >
                  {leadStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="projectValue" className="text-sm font-medium text-slate-200">
                  Project value
                </label>
                <input
                  id="projectValue"
                  name="projectValue"
                  defaultValue={lead.projectValue ?? ""}
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="clientPaidAmount"
                  className="text-sm font-medium text-slate-200"
                >
                  Client paid amount
                </label>
                <input
                  id="clientPaidAmount"
                  name="clientPaidAmount"
                  defaultValue={lead.clientPaidAmount ?? ""}
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="commissionStatus"
                  className="text-sm font-medium text-slate-200"
                >
                  Commission status
                </label>
                <select
                  id="commissionStatus"
                  name="commissionStatus"
                  defaultValue={lead.commissionStatus}
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                >
                  {commissionStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-slate-950/40 p-4 text-sm text-slate-300">
                Current commission amount:{" "}
                <span className="font-semibold text-white">{lead.commissionAmount ?? "-"}</span>
              </div>

              <div className="space-y-2">
                <label htmlFor="internalNotes" className="text-sm font-medium text-slate-200">
                  Internal notes
                </label>
                <textarea
                  id="internalNotes"
                  name="internalNotes"
                  rows={5}
                  defaultValue={lead.internalNotes ?? ""}
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                />
              </div>

              <Button type="submit" className="w-full">
                Save lead updates
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
