import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CopyTextButton } from "@/src/components/admin/CopyTextButton";
import { AdminStatusBadge } from "@/src/components/admin/AdminStatusBadge";
import {
  buildPartnerLeadUrl,
  decryptPartnerToken,
} from "@/src/lib/partner-program";
import {
  regeneratePartnerTokenAction,
  updatePartnerAction,
} from "@/src/lib/partner-program-actions";
import {
  getPartnerWithSecretsById,
  listLeads,
} from "@/src/lib/supabase-admin";

export default async function AdminPartnerDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const partner = await getPartnerWithSecretsById(id);

  if (!partner) {
    notFound();
  }

  const leadUrl = buildPartnerLeadUrl(decryptPartnerToken(partner.token_encrypted));
  const partnerLeads = (await listLeads({ partnerId: partner.id })).slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-5 shadow-[0_18px_70px_rgba(2,6,23,0.24)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/admin/partners" className="text-sm text-blue-200 hover:text-white">
              Back to partners
            </Link>
            <h2 className="mt-3 text-2xl font-bold text-white">{partner.full_name}</h2>
            <p className="mt-2 text-sm text-slate-400">{partner.email}</p>
          </div>

          <AdminStatusBadge
            label={partner.is_active ? "ACTIVE" : "INACTIVE"}
            tone={partner.is_active ? "success" : "neutral"}
          />
        </div>

        {query.warning === "email-failed" ? (
          <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Token updated, but the partner email failed to send.
          </div>
        ) : null}

        {typeof query.error === "string" ? (
          <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            We couldn&apos;t complete that action. Please try again.
          </div>
        ) : null}

        {typeof query.success === "string" ? (
          <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            Partner settings saved successfully.
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-white">Private lead URL</h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                This URL identifies the partner automatically. Treat it as secret.
              </p>
              <div className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                <p className="break-all text-sm text-white">{leadUrl}</p>
                <div className="mt-3">
                  <CopyTextButton value={leadUrl} label="Copy private URL" />
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-white">Recent leads</h3>
              {partnerLeads.length === 0 ? (
                <p className="mt-4 text-sm text-slate-400">No leads submitted yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {partnerLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/admin/leads/${lead.id}`}
                      className="block rounded-2xl border border-white/[0.08] bg-slate-950/40 px-4 py-3 transition hover:border-blue-300/18 hover:bg-blue-500/[0.04]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{lead.companyName}</p>
                          <p className="mt-1 text-sm text-slate-400">{lead.serviceNeeded}</p>
                        </div>
                        <AdminStatusBadge label={lead.status} tone="info" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-5">
              <h3 className="text-lg font-semibold text-white">Partner settings</h3>
              <form action={updatePartnerAction} className="mt-5 space-y-4">
                <input type="hidden" name="partnerId" value={partner.id} />
                <div className="space-y-2">
                  <label htmlFor="commissionPercent" className="text-sm font-medium text-slate-200">
                    Commission percentage
                  </label>
                  <input
                    id="commissionPercent"
                    name="commissionPercent"
                    type="number"
                    min={10}
                    max={20}
                    defaultValue={partner.commission_percent}
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="isActive" className="text-sm font-medium text-slate-200">
                    Status
                  </label>
                  <select
                    id="isActive"
                    name="isActive"
                    defaultValue={partner.is_active ? "true" : "false"}
                    className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <Button type="submit" className="w-full">
                  Save partner settings
                </Button>
              </form>
            </div>

            <div className="rounded-[24px] border border-violet-400/16 bg-violet-500/[0.05] p-5">
              <h3 className="text-lg font-semibold text-white">Regenerate token</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Regenerating invalidates the previous private URL immediately.
              </p>
              <form action={regeneratePartnerTokenAction} className="mt-5 space-y-4">
                <input type="hidden" name="partnerId" value={partner.id} />
                <label className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-4">
                  <input
                    type="checkbox"
                    name="sendEmail"
                    value="true"
                    className="mt-1 size-4 rounded border-white/10 bg-slate-950/40 text-blue-500 focus:ring-2 focus:ring-blue-400/40"
                  />
                  <span className="text-sm leading-6 text-slate-300">
                    Email the updated URL to the partner
                  </span>
                </label>
                <Button type="submit" variant="outline" className="w-full">
                  Regenerate token
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
