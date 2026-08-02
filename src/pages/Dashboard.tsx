import { ArrowDownRight, ArrowUpRight, CreditCard, PiggyBank, Wallet2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import KpiCard from "../components/ui/KpiCard";
import { PanelCard } from "../components/ui/PanelCard";
import { useFinanceStore } from "../stores/financeStore";

export default function Dashboard() {
  const { transactions, loadTransactions } = useFinanceStore();

  useEffect(() => {
    void loadTransactions();
  }, [loadTransactions]);

  const balance = useMemo(() =>
    transactions.reduce((sum, transaction) => {
      if (transaction.type === "income") {
        return sum + transaction.amount;
      }

      if (transaction.type === "expense") {
        return sum - transaction.amount;
      }

      return sum;
    }, 0),
    [transactions],
  );

  const kpis = [
    {
      title: "Patrimonio Neto",
      value: "€128.450",
      detail: "+12.4% vs. mes anterior",
      trend: "+12.4%",
      icon: Wallet2,
      tone: "positive" as const,
    },
    {
      title: "Liquidez",
      value: "€18.240",
      detail: "Cobertura de 6 meses",
      trend: "Alta",
      icon: CreditCard,
      tone: "neutral" as const,
    },
    {
      title: "Deuda",
      value: "€42.100",
      detail: "Reducida 8% este año",
      trend: "-8%",
      icon: ArrowDownRight,
      tone: "negative" as const,
    },
    {
      title: "Ahorro Mensual",
      value: "€2.350",
      detail: "Meta superada este mes",
      trend: "+€350",
      icon: PiggyBank,
      tone: "positive" as const,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Dashboard</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">Tu salud financiera en un vistazo</h2>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <span className="font-medium">Saldo actual:</span> {balance.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <PanelCard title="Flujo de caja" subtitle="Tu evolución mensual en los últimos 6 meses">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-end gap-3">
              {[38, 46, 41, 58, 62, 74].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-600 to-emerald-400" style={{ height: `${height}px` }} />
              ))}
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Acciones recomendadas" subtitle="Sugerencias para mejorar tu situación">
          <div className="space-y-3">
            {[
              { label: "Aumentar ahorro automático", icon: ArrowUpRight },
              { label: "Revisar gastos recurrentes", icon: ArrowDownRight },
              { label: "Priorizar reducción de deuda", icon: ArrowUpRight },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <span className="text-sm text-slate-300">{label}</span>
                <Icon className="size-4 text-cyan-300" />
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </section>
  );
}