import type { FinanceSnapshot } from "./types";

export {
  calculateAccountBalance,
  calculateLiquidity,
  calculateNetWorth,
  calculateMonthlyIncome,
  calculateMonthlyExpenses,
  calculateMonthlySavings,
  calculateSavingsRate,
  calculateInitialNetWorth,
  calculateAccountCount,
  calculateTransactionCount,
  calculateLastTransactionDate,
  buildFinanceSnapshot,
} from "./calculations/financeCalculations";


import { buildFinanceSnapshot } from "./calculations/financeCalculations";

import { useAccountStore } from "../../modules/accounts/store/accountStore";
import { useTransactionStore } from "../../modules/transactions/store/transactionStore";
import { useAssetStore } from "../../modules/assets/store/assetStore";
import { useLiabilityStore } from "../../modules/liabilities/store/liabilityStore";


export interface FinancialHealth {

  score: number;

  savingsScore: number;

  debtScore: number;

  wealthScore: number;

  liquidityScore: number;

}


export const financeService = {

  getSnapshot(): FinanceSnapshot {

    return buildFinanceSnapshot(

      useAccountStore.getState().accounts,

      useTransactionStore.getState().transactions,

      new Date(),

      useAssetStore.getState().assets,

      useLiabilityStore.getState().liabilities

    );

  },

};