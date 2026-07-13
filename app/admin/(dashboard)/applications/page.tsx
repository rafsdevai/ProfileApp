import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AdminStatusBadge } from "@/src/components/admin/AdminStatusBadge";
import {
  approveApplicationAction,
  rejectApplicationAction,
} from "@/src/lib/partner-program-actions";
import { listPartnerApplications } from "@/src/lib/supabase-admin";
import { partnerApplicationStatuses } from "@/src/types/partner-program";

function statusTone(status: string) {
  if (status === "APPROVED") return "success" as const;
  if (status === "REJECTED") return "danger" as const;
  return "warning" as const;
}

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const statusParam =
    typeof params.status === "string" &&
    partnerApplicationStatuses.includes(params.status as never)
      ? (params.status as (typeof partnerApplicationStatuses)[number])
      : undefined;

  const applications = await listPartnerApplications(statusParam);

  return (
    <div className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-5 shadow-[0_18px_70px_rgba(2,6,23,0.24)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
            Applications
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Partner applications</h2>
          <p className="mt-2 text-sm text-slate-400">
            Review submitted applications and approve or reject them.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant={statusParam ? "outline" : "default"} size="sm">
            <Link href="/admin/applications">
              All
            </Link>
          </Button>
          {partnerApplicationStatuses.map((status) => (
            <Button
              key={status}
              asChild
              variant={statusParam === status ? "default" : "outline"}
              size="sm"
            >
              <Link href={`/admin/applications?status=${status}`}>
                {status}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center text-sm text-slate-400">
          No applications found for this filter.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Country / City</th>
                <th className="px-4 py-3 font-medium">Potential clients</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-b border-white/[0.05] align-top">
                  <td className="px-4 py-4 text-white">{application.fullName}</td>
                  <td className="px-4 py-4 text-slate-300">{application.email}</td>
                  <td className="px-4 py-4 text-slate-300">{application.role}</td>
                  <td className="px-4 py-4 text-slate-300">{application.countryCity}</td>
                  <td className="px-4 py-4 text-slate-300">{application.potentialClients}</td>
                  <td className="px-4 py-4">
                    <AdminStatusBadge
                      label={application.status}
                      tone={statusTone(application.status)}
                    />
                  </td>
                  <td className="px-4 py-4 text-slate-400">
                    {new Date(application.submittedAt).toLocaleString("en-GB")}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex min-w-[280px] flex-wrap gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/applications/${application.id}`}>
                          View
                        </Link>
                      </Button>

                      {application.status === "PENDING" ? (
                        <>
                          <form action={approveApplicationAction}>
                            <input type="hidden" name="applicationId" value={application.id} />
                            <input type="hidden" name="commissionPercent" value="10" />
                            <Button size="sm" type="submit">
                              Approve
                            </Button>
                          </form>
                          <form action={rejectApplicationAction}>
                            <input type="hidden" name="applicationId" value={application.id} />
                            <Button variant="outline" size="sm" type="submit">
                              Reject
                            </Button>
                          </form>
                        </>
                      ) : null}
                    </div>
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
