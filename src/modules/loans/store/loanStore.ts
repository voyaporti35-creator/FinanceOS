import { create } from "zustand";

import { loanService } from "../services/loanService";

import type { Loan } from "../types/loan";

interface LoanStoreState {

  loans: Loan[];

  isLoading: boolean;

  error: string | null;

  loadLoans: () => Promise<void>;

  createLoan: (
    loan: Omit<
      Loan,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;

  updateLoan: (
    loan: Loan
  ) => Promise<void>;

  deleteLoan: (
    id: string
  ) => Promise<void>;

}

export const useLoanStore =
  create<LoanStoreState>((set) => ({

    loans: [],

    isLoading: false,

    error: null,

    loadLoans: async () => {

      set({
        isLoading: true,
        error: null,
      });

      try {

        const loans =
          await loanService.getAll();

        set({
          loans,
          isLoading: false,
        });

      } catch (error) {

        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudieron cargar los préstamos",
          isLoading: false,
        });

      }

    },

    createLoan: async (
      loan
    ) => {

      try {

        const created =
          await loanService.create(loan);

        set((state) => ({

          loans: [
            created,
            ...state.loans,
          ],

        }));

      } catch (error) {

        set({

          error:
            error instanceof Error
              ? error.message
              : "No se pudo crear el préstamo",

        });

      }

    },

    updateLoan: async (
      loan
    ) => {

      try {

        await loanService.update(
          loan
        );

        set((state) => ({

          loans:
            state.loans.map(
              (item) =>
                item.id === loan.id
                  ? loan
                  : item
            ),

        }));

      } catch (error) {

        set({

          error:
            error instanceof Error
              ? error.message
              : "No se pudo actualizar el préstamo",

        });

      }

    },

    deleteLoan: async (
      id
    ) => {

      try {

        await loanService.delete(id);

        set((state) => ({

          loans:
            state.loans.filter(
              (item) =>
                item.id !== id
            ),

        }));

      } catch (error) {

        set({

          error:
            error instanceof Error
              ? error.message
              : "No se pudo eliminar el préstamo",

        });

      }

    },

  }));