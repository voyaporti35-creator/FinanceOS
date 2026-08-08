import { buildFinanceSnapshot } from "../calculations/financeCalculations";
import type { FinanceSnapshot } from "../types";

import { useAccountStore } from "../../../modules/accounts/store/accountStore";
import { useTransactionStore } from "../../../modules/transactions/store/transactionStore";
import { useAssetStore } from "../../../modules/assets/store/assetStore";
import { useLiabilityStore } from "../../../modules/liabilities/store/liabilityStore";

export const financeService = {

  async getSnapshot(): Promise<FinanceSnapshot> {

    await Promise.all([

      useAccountStore
        .getState()
        .loadAccounts(),

      useTransactionStore
        .getState()
        .loadTransactions(),

      useAssetStore
        .getState()
        .loadAssets(),

      useLiabilityStore
        .getState()
        .loadLiabilities(),

    ]);


    const {
      accounts,
    } =
      useAccountStore.getState();


    const {
      transactions,
    } =
      useTransactionStore.getState();


    const {
      assets,
    } =
      useAssetStore.getState();


    const {
      liabilities,
    } =
      useLiabilityStore.getState();



    if (import.meta.env.DEV) {

      console.log(
        "FINANCE SNAPSHOT",
        {
          accounts,
          transactions,
          assets,
          liabilities,
        }
      );

    }


    return buildFinanceSnapshot(
      accounts,
      transactions,
      new Date(),
      assets,
      liabilities
    );

  },

};