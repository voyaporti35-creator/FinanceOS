import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  detail: string;
  trend: string;
  icon: LucideIcon;
  tone?: "positive" | "neutral" | "negative";
}

const toneClasses: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  positive: "bg-emerald-500/15 text-emerald-300",
  neutral: "bg-sky-500/15 text-sky-300",
  negative: "bg-rose-500/15 text-rose-300",
};

const textToneClasses: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  positive: "text-emerald-300",
  neutral: "text-sky-300",
  negative: "text-rose-300",
};

export default function KpiCard({
  title,
  value,
  detail,
  trend,
  icon: Icon,
  tone = "neutral",
}: KpiCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
        </div>

        <div className={`rounded-xl p-2.5 ${toneClasses[tone]}`}>
          <Icon className="size-5" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-slate-400">{detail}</span>
        <span className={`font-medium ${textToneClasses[tone]}`}>{trend}</span>
      </div>
    </article>
  );
}
