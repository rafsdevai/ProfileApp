import { cn } from "@/lib/utils";

type Tone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "violet";

export function AdminStatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold tracking-[0.04em]",
        tone === "neutral" && "border-white/10 bg-white/[0.04] text-slate-300",
        tone === "info" && "border-blue-400/20 bg-blue-500/10 text-blue-100",
        tone === "success" && "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
        tone === "warning" && "border-amber-400/20 bg-amber-500/10 text-amber-100",
        tone === "danger" && "border-rose-400/20 bg-rose-500/10 text-rose-100",
        tone === "violet" && "border-violet-400/20 bg-violet-500/10 text-violet-100",
      )}
    >
      {label}
    </span>
  );
}

