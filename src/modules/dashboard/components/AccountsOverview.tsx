import { Card, EmptyState } from "../../../components/ui";
import type { DashboardViewModel } from "../types";

interface AccountsOverviewProps {
  data: DashboardViewModel | null;
}

function formatAmount(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

export function AccountsOverview({ data }: AccountsOverviewProps) {
  if (!data) {
    return <EmptyState title="Sin cuentas" description="Crea cuentas para ver el resumen de tu cartera." />;
  }

  return (
    <Card title="Resumen de cuentas" subtitle="Información básica sobre la cartera actual">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Cuentas</span>
          <span className="font-semibold text-white">{data.accountCount}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Liquidez</span>
          <span className="font-semibold text-white">{formatAmount(data.liquidity)}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Activos</span>
          <span className="font-semibold text-white">{formatAmount(data.assets)}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Pasivos</span>
          <span className="font-semibold text-white">{formatAmount(data.liabilities)}</span>
        </div>
      </div>
    </Card>
  );
}
