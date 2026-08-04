import { BarChart3, ChevronRight, LayoutGrid, PiggyBank, Settings, Wallet, Tags, Archive, Landmark, CreditCard, Repeat2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Resumen", icon: LayoutGrid },
  { to: "/accounts", label: "Cuentas", icon: Wallet },
  { to: "/transactions", label: "Movimientos", icon: BarChart3 },
  { to: "/categories", label: "Categorías", icon: Tags },
  { to: "/assets", label: "Activos", icon: Landmark },
  { to: "/liabilities", label: "Pasivos", icon: CreditCard },
  { to: "/recurring", label: "Recurrentes", icon: Repeat2 },
  { to: "/presupuesto", label: "Presupuesto", icon: Wallet },
  { to: "/objetivos", label: "Objetivos", icon: PiggyBank },
  { to: "/configuracion", label: "Configuración", icon: Settings },
  { to: "/backup", label: "Backup", icon: Archive },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-[280px] flex-col justify-between border-r border-slate-800 bg-slate-950/95 p-6 lg:flex">
      <div>
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">FinanceOS</p>
          <p className="mt-2 text-xl font-semibold text-white">Control financiero</p>
        </div>

        <nav className="mt-8 space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <span className="flex items-center gap-3">
                <Icon className="size-4" />
                {label}
              </span>
              <ChevronRight className="size-4" />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm text-slate-400">Progreso mensual</p>
        <p className="mt-2 text-2xl font-semibold text-white">82%</p>
        <div className="mt-3 h-2 rounded-full bg-slate-800">
          <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
        </div>
      </div>
    </aside>
  );
}
