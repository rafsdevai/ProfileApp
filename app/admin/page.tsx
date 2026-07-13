import { redirect } from "next/navigation";

import { getAdminSession } from "@/src/lib/admin-auth";

export default async function AdminPage() {
  const session = await getAdminSession();
  redirect(session ? "/admin/applications" : "/admin/login");
}
