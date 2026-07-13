"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Handshake, Layers3 } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  {
    href: "/admin/applications",
    label: "Applications",
    icon: FileText,
  },
  {
    href: "/admin/partners",
    label: "Partners",
    icon: Handshake,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: Layers3,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2" aria-label="Admin sections">
      {items.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition duration-300",
              isActive
                ? "border-blue-300/20 bg-gradient-to-r from-blue-500/15 to-violet-500/15 text-white shadow-[0_0_28px_rgba(37,99,235,0.16)]"
                : "border-white/[0.08] bg-white/[0.025] text-slate-300 hover:border-blue-300/16 hover:bg-blue-400/[0.04] hover:text-white",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

