import { useMemo } from "react";

import { useFinanceSnapshot } from "../../finance/hooks/useFinanceSnapshot";

import {
  calculateCashflow,
  calculateDebtAnalytics,
  calculateFinancialHealth,
  calculateWealthAnalytics,
  generateRecommendations,
  buildNetWorthHistory,
  buildCashflowHistory,
} from "../index";


export function useAnalytics() {


  const {
    snapshot,
    isLoading,
  } = useFinanceSnapshot();



  const analytics = useMemo(() => {


    const cashflow =
      calculateCashflow(
        snapshot.monthlyIncome,
        snapshot.monthlyExpenses
      );



    const debt =
      calculateDebtAnalytics(
        snapshot.totalLiabilities,
        snapshot.monthlyDebtPayment,
        snapshot.monthlyIncome
      );



    const wealth =
      calculateWealthAnalytics(
        snapshot.totalAssets,
        snapshot.totalLiabilities
      );



    const health =
      calculateFinancialHealth({

        income:
          snapshot.monthlyIncome,

        expenses:
          snapshot.monthlyExpenses,

        assets:
          snapshot.totalAssets,

        debts:
          debt.totalDebt,

        liquidity:
          snapshot.liquidityTotal,

      });



    const recommendations =
      generateRecommendations(

        cashflow.savingsRate,

        debt.debtRatio,

        wealth.netWorth

      );



    const netWorthHistory =
      buildNetWorthHistory(

        wealth.netWorth

      );



    const cashflowHistory =
      buildCashflowHistory(

        cashflow.monthlyIncome,

        cashflow.monthlyExpenses

      );



    return {

      cashflow,

      debt,

      wealth,

      health,

      recommendations,

      netWorthHistory,

      cashflowHistory,

    };


  }, [snapshot]);



  return {

    snapshot,

    analytics,

    isLoading,

  };


}