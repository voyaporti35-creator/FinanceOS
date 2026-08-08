import { useMemo } from "react";

import { useAccountStore } from "../store/accountStore";
import { useTransactionStore } from "../../transactions/store/transactionStore";

import {
  calculateAccountBalance,
} from "../../../core/finance/calculations/financeCalculations";


export function useAccountBalances() {

  const accounts =
    useAccountStore(
      (state) => state.accounts
    );

  const transactions =
    useTransactionStore(
      (state) => state.transactions
    );


  const balances =
    useMemo(() => {

      return accounts.reduce(
        (
          result,
          account
        ) => {

          result[account.id] =
            calculateAccountBalance(
              account,
              transactions
            );

          return result;

        },
        {} as Record<string, number>
      );

    }, [
      accounts,
      transactions,
    ]);


  return balances;

}