import type { ReactNode } from "react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/src/components/admin/AdminSidebar";
import { requireAdminSession } from "@/src/lib/admin-auth";
import { adminLogoutAction } from "@/src/lib/partner-program-actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#040712_0%,#07111f_50%,#040712_100%)]">
      <div className="mx-auto max-w-[1480px] px-5 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-5 shadow-[0_24px_90px_rgba(2,6,23,0.32)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
              Internal Admin
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white">Partner Program</h1>
            <p className="mt-2 text-sm text-slate-400">
              Signed in as {session.email}
            </p>
          </div>

          <form action={adminLogoutAction}>
            <Button type="submit" variant="outline" className="min-h-11 px-5">
              Log out
              <LogOut aria-hidden="true" />
            </Button>
          </form>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-4 shadow-[0_18px_70px_rgba(2,6,23,0.24)]">
            <AdminSidebar />
          </aside>

          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </main>
  );
}

