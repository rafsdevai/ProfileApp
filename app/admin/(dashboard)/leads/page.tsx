import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AdminStatusBadge } from "@/src/components/admin/AdminStatusBadge";
import { listLeads, listPartners } from "@/src/lib/supabase-admin";
import { leadStatuses } from "@/src/types/partner-program";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const status =
    typeof params.status === "string" && leadStatuses.includes(params.status as never)
      ? (params.status as (typeof leadStatuses)[number])
      : undefined;
  const partnerId = typeof params.partnerId === "string" ? params.partnerId : undefined;

  const [partners, leads] = await Promise.all([
    listPartners(),
    listLeads({ status, partnerId }),
  ]);

  const partnersMap = new Map(partners.map((partner) => [partner.id, partner]));

  return (
    <div className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-5 shadow-[0_18px_70px_rgba(2,6,23,0.24)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
            Leads
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Partner leads</h2>
          <p className="mt-2 text-sm text-slate-400">
            Review submitted referrals and update their commercial status.
          </p>
        </div>

        <form className="grid gap-2 sm:grid-cols-2">
          <select
            name="status"
            defaultValue={status ?? ""}
            className="rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
          >
            <option value="">All statuses</option>
            {leadStatuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name="partnerId"
            defaultValue={partnerId ?? ""}
            className="rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white outline-none focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
          >
            <option value="">All partners</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.fullName}
              </option>
            ))}
          </select>
          <div className="sm:col-span-2">
            <Button type="submit" variant="outline" size="sm">
              Apply filters
            </Button>
          </div>
        </form>
      </div>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center text-sm text-slate-400">
          No leads found for this filter.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Partner</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Project value</th>
                <th className="px-4 py-3 font-medium">Client paid</th>
                <th className="px-4 py-3 font-medium">Commission</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/[0.05]">
                  <td className="px-4 py-4 text-white">{lead.companyName}</td>
                  <td className="px-4 py-4 text-slate-300">{lead.contactName}</td>
                  <td className="px-4 py-4 text-slate-300">
                    {partnersMap.get(lead.partnerId)?.fullName ?? "Unknown partner"}
                  </td>
                  <td className="px-4 py-4 text-slate-300">{lead.serviceNeeded}</td>
                  <td className="px-4 py-4">
                    <AdminStatusBadge label={lead.status} tone="info" />
                  </td>
                  <td className="px-4 py-4 text-slate-300">{lead.projectValue ?? "-"}</td>
                  <td className="px-4 py-4 text-slate-300">{lead.clientPaidAmount ?? "-"}</td>
                  <td className="px-4 py-4 text-slate-300">{lead.commissionAmount ?? "-"}</td>
                  <td className="px-4 py-4 text-slate-400">
                    {new Date(lead.submittedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/leads/${lead.id}`}>
                        View
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
