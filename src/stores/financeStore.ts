import { create } from "zustand";

import { db } from "../db/database";

import type { Account } from "../modules/accounts/types/account";
import type { Transaction } from "../modules/transactions/types/transaction";

interface FinanceState {
  accounts: Account[];
  transactions: Transaction[];

  isLoading: boolean;
  error: string | null;

  loadAccounts: () => Promise<void>;
  loadTransactions: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  accounts: [],
  transactions: [],

  isLoading: false,
  error: null,

  loadAccounts: async () => {
    set({ isLoading: true, error: null });

    try {
      const accounts = await db.accounts.toArray();

      set({
        accounts,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las cuentas",
        isLoading: false,
      });
    }
  },

  loadTransactions: async () => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await db.transactions.toArray();

      set({
        transactions,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las transacciones",
        isLoading: false,
      });
    }
  },

  refresh: async () => {
    set({ isLoading: true, error: null });

    try {
      const [accounts, transactions] = await Promise.all([
        db.accounts.toArray(),
        db.transactions.toArray(),
      ]);

      set({
        accounts,
        transactions,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los datos",
        isLoading: false,
      });
    }
  },
}));