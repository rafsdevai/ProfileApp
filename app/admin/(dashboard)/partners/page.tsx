import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AdminStatusBadge } from "@/src/components/admin/AdminStatusBadge";
import { listLeads, listPartners } from "@/src/lib/supabase-admin";

export default async function AdminPartnersPage() {
  const [partners, leads] = await Promise.all([listPartners(), listLeads()]);

  const leadStats = new Map<
    string,
    {
      total: number;
      won: number;
    }
  >();

  for (const lead of leads) {
    const current = leadStats.get(lead.partnerId) ?? { total: 0, won: 0 };
    current.total += 1;
    if (lead.status === "WON") {
      current.won += 1;
    }
    leadStats.set(lead.partnerId, current);
  }

  return (
    <div className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-5 shadow-[0_18px_70px_rgba(2,6,23,0.24)] sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
        Partners
      </p>
      <h2 className="mt-2 text-2xl font-bold text-white">Approved partners</h2>
      <p className="mt-2 text-sm text-slate-400">
        Manage partner settings, commission rates and private lead URLs.
      </p>

      {partners.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center text-sm text-slate-400">
          No partners yet.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 font-medium">Partner name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Commission %</th>
                <th className="px-4 py-3 font-medium">Total leads</th>
                <th className="px-4 py-3 font-medium">Won leads</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => {
                const stats = leadStats.get(partner.id) ?? { total: 0, won: 0 };

                return (
                  <tr key={partner.id} className="border-b border-white/[0.05]">
                    <td className="px-4 py-4 text-white">{partner.fullName}</td>
                    <td className="px-4 py-4 text-slate-300">{partner.email}</td>
                    <td className="px-4 py-4 text-slate-300">{partner.commissionPercent}%</td>
                    <td className="px-4 py-4 text-slate-300">{stats.total}</td>
                    <td className="px-4 py-4 text-slate-300">{stats.won}</td>
                    <td className="px-4 py-4">
                      <AdminStatusBadge
                        label={partner.isActive ? "ACTIVE" : "INACTIVE"}
                        tone={partner.isActive ? "success" : "neutral"}
                      />
                    </td>
                    <td className="px-4 py-4 text-slate-400">
                      {new Date(partner.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/partners/${partner.id}`}>
                          View
                        </Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
