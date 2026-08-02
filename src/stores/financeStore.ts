import { create } from "zustand";
import { db } from "../db/database";
import type { Transaction } from "../modules/transactions/types/transaction";

interface FinanceState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  loadTransactions: () => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  loadTransactions: async () => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await db.transactions.toArray();
      set({ transactions, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "No se pudieron cargar las transacciones",
        isLoading: false,
      });
    }
  },
}));