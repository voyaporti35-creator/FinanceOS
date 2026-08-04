import { Card, EmptyState } from "../../../components/ui";
import type { DashboardViewModel } from "../types";

interface CashFlowCardProps {
  data: DashboardViewModel | null;
}

function formatAmount(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

export function CashFlowCard({ data }: CashFlowCardProps) {
  if (!data) {
    return <EmptyState title="Sin flujo de caja" description="No hay movimientos disponibles para mostrar." />;
  }

  return (
    <Card title="Flujo de caja" subtitle="Balance mensual derivado del core financiero">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="flex items-end gap-3">
          {[35, 40, 30, 55, 45, 70].map((height, index) => (
            <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-600 to-emerald-400" style={{ height: `${height}px` }} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>Ingresos: {formatAmount(data.monthlyIncome)}</span>
          <span>Gastos: {formatAmount(data.monthlyExpenses)}</span>
        </div>
      </div>
    </Card>
  );
}
