import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getAdminSession } from "@/src/lib/admin-auth";
import { adminLoginAction } from "@/src/lib/partner-program-actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/applications");
  }

  const params = await searchParams;
  const hasError = params.error === "invalid";
  const isRateLimited = params.error === "rate-limited";
  const retryAfter =
    typeof params.retryAfter === "string" ? Number.parseInt(params.retryAfter, 10) : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#040712_0%,#07111f_50%,#040712_100%)] px-5 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(6,10,20,0.82))] p-6 shadow-[0_24px_90px_rgba(2,6,23,0.32)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
          Rafael.Dev Admin
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">Sign in</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          Use your internal admin credentials to access applications, partners and leads.
        </p>

        <form action={adminLoginAction} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition duration-300 placeholder:text-slate-500 focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition duration-300 placeholder:text-slate-500 focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30"
            />
          </div>

          {hasError ? (
            <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              Invalid admin credentials.
            </div>
          ) : null}

          {isRateLimited ? (
            <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              Too many login attempts. Please try again
              {retryAfter && retryAfter > 0 ? ` in about ${retryAfter} seconds.` : " later."}
            </div>
          ) : null}

          <Button type="submit" size="lg" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  );
}
