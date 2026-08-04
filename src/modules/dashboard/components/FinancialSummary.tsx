import {
  Euro,
  Landmark,
  TrendingDown,
  TrendingUp,
  Wallet,
  PiggyBank,
} from "lucide-react";

import { EmptyState } from "../../../components/ui/EmptyState";
import { Spinner } from "../../../components/ui/Spinner";
import { Card } from "../../../components/ui/Card";
import { StatCard } from "../../../components/ui/StatCard";

import type { DashboardViewModel } from "../types";

interface FinancialSummaryProps {
  data: DashboardViewModel | null;
  isLoading: boolean;
  error?: string | null;
}

function formatAmount(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

export function FinancialSummary({
  data,
  isLoading,
  error,
}: FinancialSummaryProps) {

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <EmptyState
        title="No se pudo cargar el resumen"
        description={error}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="Sin datos todavía"
        description="Registra cuentas y movimientos para comenzar."
      />
    );
  }

  return (

    <Card
      title="Executive Dashboard"
      subtitle="Resumen global de tu situación financiera"
    >

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Patrimonio Neto"
          value={formatAmount(data.netWorth)}
          subtitle="Activos - Pasivos"
          icon={Landmark}
        />

        <StatCard
          title="Liquidez"
          value={formatAmount(data.liquidity)}
          subtitle="Disponible en cuentas"
          icon={Wallet}
        />

        <StatCard
          title="Ingresos"
          value={formatAmount(data.monthlyIncome)}
          subtitle="Mes actual"
          icon={TrendingUp}
        />

        <StatCard
          title="Gastos"
          value={formatAmount(data.monthlyExpenses)}
          subtitle="Mes actual"
          icon={TrendingDown}
        />

        <StatCard
          title="Ahorro"
          value={formatAmount(data.monthlySavings)}
          subtitle={`${(data.savingsRate * 100).toFixed(1)} % del ingreso`}
          icon={PiggyBank}
        />

        <StatCard
          title="Activos"
          value={formatAmount(data.assets)}
          icon={Euro}
        />

        <StatCard
          title="Pasivos"
          value={formatAmount(data.liabilities)}
          icon={TrendingDown}
        />

        <StatCard
          title="Movimientos"
          value={data.transactionCount.toString()}
          subtitle={
            data.lastTransactionDate ?? "Sin movimientos"
          }
          icon={Wallet}
        />

      </div>

    </Card>

  );

}