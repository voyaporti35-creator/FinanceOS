import { create } from "zustand";

import { transactionService } from "../services/transactionService";

import type { Transaction } from "../types/transaction";

interface TransactionStoreState {

  transactions: Transaction[];

  isLoading: boolean;

  error: string | null;

  loadTransactions: () => Promise<void>;

  createTransaction: (
    transaction: Omit<
      Transaction,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;

  updateTransaction: (
    transaction: Transaction
  ) => Promise<void>;

  deleteTransaction: (
    id: string
  ) => Promise<void>;

  clearTransactions: () => Promise<void>;

  clearError: () => void;

}

export const useTransactionStore =
  create<TransactionStoreState>((set) => ({

    transactions: [],

    isLoading: false,

    error: null,

    clearError: () =>
      set({
        error: null,
      }),

    loadTransactions: async () => {

      set({
        isLoading: true,
        error: null,
      });

      try {

        const transactions =
          await transactionService.getAll();

        if (import.meta.env.DEV) {

          console.log(
            "TRANSACTION STORE",
            transactions
          );

        }

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

    createTransaction: async (transaction) => {

      try {

        const createdTransaction =
          await transactionService.create(
            transaction
          );

        set((state) => ({

          transactions: [

            createdTransaction,

            ...state.transactions,

          ],

        }));

      } catch (error) {

        set({

          error:
            error instanceof Error
              ? error.message
              : "No se pudo crear la transacción",

        });

      }

    },

    updateTransaction: async (transaction) => {

      try {

        await transactionService.update(
          transaction
        );

        set((state) => ({

          transactions:

            state.transactions.map(
              (item) =>

                item.id === transaction.id

                  ? transaction

                  : item

            ),

        }));

      } catch (error) {

        set({

          error:

            error instanceof Error

              ? error.message

              : "No se pudo actualizar la transacción",

        });

      }

    },

    deleteTransaction: async (id) => {

      try {

        await transactionService.delete(
          id
        );

        set((state) => ({

          transactions:

            state.transactions.filter(
              (item) =>
                item.id !== id
            ),

        }));

      } catch (error) {

        set({

          error:

            error instanceof Error

              ? error.message

              : "No se pudo eliminar la transacción",

        });

      }

    },

    clearTransactions: async () => {

      try {

        await transactionService.clear();

        set({

          transactions: [],

        });

      } catch (error) {

        set({

          error:

            error instanceof Error

              ? error.message

              : "No se pudieron eliminar las transacciones",

        });

      }

    },

  }));