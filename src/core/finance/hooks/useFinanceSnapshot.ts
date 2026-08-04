import { useEffect, useMemo } from "react";

import { useFinanceStore } from "../../../stores/financeStore";

import { useAssetStore } from "../../../modules/assets/store/assetStore";

import { useLiabilityStore } from "../../../modules/liabilities/store/liabilityStore";

import { buildFinanceSnapshot } from "../calculations/financeCalculations";



export function useFinanceSnapshot() {

  const {
    accounts,
    transactions,
    loadAccounts,
    loadTransactions,
    isLoading: financeLoading,
  } = useFinanceStore();



  const {
    assets,
    loadAssets,
    isLoading: assetsLoading,
  } = useAssetStore();



  const {
    liabilities,
    loadLiabilities,
    isLoading: liabilitiesLoading,
  } = useLiabilityStore();



  useEffect(() => {

    void loadAccounts();

    void loadTransactions();

    void loadAssets();

    void loadLiabilities();

  }, [
    loadAccounts,
    loadTransactions,
    loadAssets,
    loadLiabilities,
  ]);



  const snapshot = useMemo(

    () =>
      buildFinanceSnapshot(
        accounts,
        transactions,
        new Date(),
        assets,
        liabilities
      ),

    [
      accounts,
      transactions,
      assets,
      liabilities,
    ]

  );



  return {

    snapshot,

    accounts,

    transactions,

    assets,

    liabilities,

    isLoading:
      financeLoading ||
      assetsLoading ||
      liabilitiesLoading,

  };

}