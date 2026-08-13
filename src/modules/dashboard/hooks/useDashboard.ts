import { useEffect, useMemo, useState } from "react";

import { financeService } from "../../../core/finance";
import { calculateFinancialHealth } from "../../../core/analytics";

import { recurringEngine } from "../../recurring/services/recurringEngine";
import { recurringExecutor } from "../../recurring/services/recurringExecutor";
import { recurringService } from "../../recurring/services/recurringService";

import type { DashboardViewModel } from "../types";

export function useDashboard() {
  const [viewModel, setViewModel] =
    useState<DashboardViewModel | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        /*
         * Ejecutamos primero las operaciones recurrentes.
         *
         * El executor trabaja directamente sobre Dexie,
         * por lo que no necesitamos cargar los stores antes.
         */
        await recurringExecutor.execute();

        /*
         * financeService es la fuente única del snapshot financiero.
         *
         * Internamente carga:
         * - cuentas
         * - transacciones
         * - activos
         * - pasivos
         */
        const snapshot =
          await financeService.getSnapshot();

        /*
         * Recurrentes para información del Dashboard.
         */
        const recurringTransactions =
          await recurringService.getAll();

        const pendingRecurring =
          await recurringEngine.getPendingTransactions(
            recurringTransactions
          );

        const nextRecurring =
          recurringTransactions
            .filter((item) => item.enabled)
            .sort((a, b) =>
              a.nextExecution.localeCompare(
                b.nextExecution
              )
            )[0] ?? null;

        /*
         * Salud financiera calculada desde
         * el snapshot real del core financiero.
         */
        const health =
          calculateFinancialHealth({
            income: snapshot.monthlyIncome,
            expenses: snapshot.monthlyExpenses,
            assets: snapshot.totalAssets,
            debts: snapshot.totalLiabilities,
            liquidity: snapshot.liquidityTotal,
          });

        const nextViewModel: DashboardViewModel = {
          /*
           * Patrimonio
           */
          netWorth:
            snapshot.netWorth,

          liquidity:
            snapshot.liquidityTotal,

          assets:
            snapshot.totalAssets,

          liabilities:
            snapshot.totalLiabilities,

          /*
           * Flujo mensual
           */
          monthlyIncome:
            snapshot.monthlyIncome,

          monthlyExpenses:
            snapshot.monthlyExpenses,

          monthlySavings:
            snapshot.monthlySavings,

          savingsRate:
            snapshot.savingsRate,

          /*
           * Salud financiera
           */
          financialHealth:
            health,

          /*
           * Actividad
           */
          accountCount:
            snapshot.accountCount,

          transactionCount:
            snapshot.transactionCount,

          lastTransactionDate:
            snapshot.lastTransactionDate,

          /*
           * Recurrentes
           */
          nextRecurringDate:
            nextRecurring?.nextExecution ?? null,

          pendingRecurringCount:
            pendingRecurring.length,

          /*
           * Hipoteca / deuda
           *
           * Actualmente utilizamos el total de pasivos.
           * Cuando el módulo hipotecario esté más desarrollado
           * podremos separar específicamente la hipoteca.
           */
          mortgageDebt:
            snapshot.totalLiabilities,

          mortgageMonthlyPayment:
            snapshot.monthlyDebtPayment,

          mortgageFreeDate:
            null,

          /*
           * Metadatos
           */
          updatedAt:
            new Date().toLocaleString("es-ES"),
        };

        if (isActive) {
          setViewModel(nextViewModel);
        }
      } catch (caughtError) {
        if (!isActive) {
          return;
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "No se pudo cargar el dashboard"
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isActive = false;
    };
  }, []);

  return useMemo(
    () => ({
      viewModel,
      isLoading,
      error,
    }),
    [
      viewModel,
      isLoading,
      error,
    ]
  );
}