import { create } from "zustand";
import { recurringService } from "../services/recurringService";
import type { RecurringTransaction } from "../types/recurringTransaction";

interface RecurringStoreState {
  recurringTransactions: RecurringTransaction[];
  isLoading: boolean;
  error: string | null;

  loadRecurringTransactions: () => Promise<void>;

  createRecurringTransaction: (
    recurring: Omit<
      RecurringTransaction,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;

  updateRecurringTransaction: (
    recurring: RecurringTransaction
  ) => Promise<void>;

  deleteRecurringTransaction: (
    id: string
  ) => Promise<void>;
}

export const useRecurringStore =
  create<RecurringStoreState>((set) => ({

    recurringTransactions: [],

    isLoading: false,

    error: null,

    loadRecurringTransactions: async () => {

      set({
        isLoading: true,
        error: null,
      });

      try {

        const recurringTransactions =
          await recurringService.getAll();

        set({
          recurringTransactions,
          isLoading: false,
        });

      } catch (error) {

        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudieron cargar las operaciones recurrentes",
          isLoading: false,
        });

      }

    },

    createRecurringTransaction: async (
      recurring
    ) => {

      try {

        const created =
          await recurringService.create(recurring);

        set((state) => ({
          recurringTransactions: [
            created,
            ...state.recurringTransactions,
          ],
        }));

      } catch (error) {

        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudo crear la operación recurrente",
        });

      }

    },

    updateRecurringTransaction: async (
      recurring
    ) => {

      try {

        await recurringService.update(recurring);

        set((state) => ({
          recurringTransactions:
            state.recurringTransactions.map(
              (item) =>
                item.id === recurring.id
                  ? recurring
                  : item
            ),
        }));

      } catch (error) {

        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudo actualizar la operación recurrente",
        });

      }

    },

    deleteRecurringTransaction: async (
      id
    ) => {

      try {

        await recurringService.delete(id);

        set((state) => ({
          recurringTransactions:
            state.recurringTransactions.filter(
              (item) => item.id !== id
            ),
        }));

      } catch (error) {

        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudo eliminar la operación recurrente",
        });

      }

    },

  }));