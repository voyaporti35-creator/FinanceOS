import { useEffect, useMemo, useState } from "react";

import { financeService } from "../../../core/finance";
import { calculateFinancialHealth } from "../../../core/analytics";

import { recurringEngine } from "../../recurring/services/recurringEngine";
import { recurringExecutor } from "../../recurring/services/recurringExecutor";
import { recurringService } from "../../recurring/services/recurringService";

import { useAccountStore } from "../../accounts/store/accountStore";
import { useTransactionStore } from "../../transactions/store/transactionStore";
import { useAssetStore } from "../../assets/store/assetStore";
import { useLiabilityStore } from "../../liabilities/store/liabilityStore";

import type { DashboardViewModel } from "../types";

export function useDashboard() {
  const loadAccounts = useAccountStore(
    (state) => state.loadAccounts
  );

  const loadTransactions = useTransactionStore(
    (state) => state.loadTransactions
  );

  const loadAssets = useAssetStore(
    (state) => state.loadAssets
  );

  const loadLiabilities = useLiabilityStore(
    (state) => state.loadLiabilities
  );

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

        await Promise.all([
          loadAccounts(),
          loadTransactions(),
          loadAssets(),
          loadLiabilities(),
        ]);

        await recurringExecutor.execute();

        await Promise.all([
          loadAccounts(),
          loadTransactions(),
          loadAssets(),
          loadLiabilities(),
        ]);

        const snapshot =
          await financeService.getSnapshot();

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

        const monthlyCashflow =
          snapshot.monthlyIncome -
          snapshot.monthlyExpenses;

        const health =
          calculateFinancialHealth({
            income: snapshot.monthlyIncome,
            expenses: snapshot.monthlyExpenses,
            assets: snapshot.totalAssets,
            debts: snapshot.totalLiabilities,
            liquidity: snapshot.liquidityTotal,
          });

        const nextViewModel: DashboardViewModel = {
          netWorth: snapshot.netWorth,
          liquidity: snapshot.liquidityTotal,
          assets: snapshot.totalAssets,
          liabilities: snapshot.totalLiabilities,

          monthlyIncome: snapshot.monthlyIncome,
          monthlyExpenses: snapshot.monthlyExpenses,
          monthlySavings: monthlyCashflow,
          savingsRate: snapshot.savingsRate,

          financialHealth: health,

          accountCount: snapshot.accountCount,
          transactionCount: snapshot.transactionCount,
          lastTransactionDate:
            snapshot.lastTransactionDate,

          nextRecurringDate:
            nextRecurring?.nextExecution ?? null,

          pendingRecurringCount:
            pendingRecurring.length,

          mortgageDebt:
            snapshot.totalLiabilities,

          mortgageMonthlyPayment:
            snapshot.monthlyDebtPayment,

          mortgageFreeDate: null,

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
  }, [
    loadAccounts,
    loadTransactions,
    loadAssets,
    loadLiabilities,
  ]);

  return useMemo(
    () => ({
      viewModel,
      isLoading,
      error,
    }),
    [viewModel, isLoading, error]
  );
}