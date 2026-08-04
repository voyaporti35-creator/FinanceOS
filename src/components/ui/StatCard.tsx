import type { LucideIcon } from "lucide-react";

interface StatCardProps {

  title: string;

  value: string;

  subtitle?: string;

  icon?: LucideIcon;

  trend?: string;

}

export function StatCard({

  title,

  value,

  subtitle,

  icon: Icon,

  trend,

}: StatCardProps) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-400">

            {title}

          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">

            {value}

          </h3>

          {subtitle && (

            <p className="mt-2 text-sm text-slate-500">

              {subtitle}

            </p>

          )}

        </div>

        {Icon && (

          <div className="rounded-xl bg-cyan-500/10 p-3">

            <Icon className="h-6 w-6 text-cyan-300" />

          </div>

        )}

      </div>

      {trend && (

        <div className="mt-4 border-t border-slate-800 pt-3">

          <span className="text-sm text-emerald-400">

            {trend}

          </span>

        </div>

      )}

    </div>

  );

}