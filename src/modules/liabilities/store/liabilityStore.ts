import { create } from "zustand";
import { liabilityService } from "../services/liabilityService";
import type { Liability } from "../types/liability";

interface LiabilityStoreState {

  liabilities: Liability[];

  isLoading: boolean;

  error: string | null;

  loadLiabilities: () => Promise<void>;

  createLiability: (
    liability: Omit<
      Liability,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;

  updateLiability: (
    liability: Liability
  ) => Promise<void>;

  deleteLiability: (
    id: string
  ) => Promise<void>;

  clearLiabilities: () => Promise<void>;

  clearError: () => void;

}

export const useLiabilityStore =
  create<LiabilityStoreState>((set) => ({

    liabilities: [],

    isLoading: false,

    error: null,

    clearError: () =>
      set({
        error: null,
      }),

    loadLiabilities: async () => {

      set({

        isLoading: true,

        error: null,

      });

      try {

        const liabilities =
          await liabilityService.getAll();

        if (import.meta.env.DEV) {

          console.log(
            "LIABILITY STORE",
            liabilities
          );

        }

        set({

          liabilities,

          isLoading: false,

        });

      } catch (error) {

        set({

          error:

            error instanceof Error

              ? error.message

              : "No se pudieron cargar los pasivos",

          isLoading: false,

        });

      }

    },

    createLiability: async (liability) => {

      try {

        const createdLiability =
          await liabilityService.create(
            liability
          );

        set((state) => ({

          liabilities: [

            createdLiability,

            ...state.liabilities,

          ],

        }));

      } catch (error) {

        set({

          error:

            error instanceof Error

              ? error.message

              : "No se pudo crear el pasivo",

        });

      }

    },

    updateLiability: async (liability) => {

      try {

        await liabilityService.update(
          liability
        );

        set((state) => ({

          liabilities:

            state.liabilities.map(
              (item) =>

                item.id === liability.id

                  ? liability

                  : item

            ),

        }));

      } catch (error) {

        set({

          error:

            error instanceof Error

              ? error.message

              : "No se pudo actualizar el pasivo",

        });

      }

    },

    deleteLiability: async (id) => {

      try {

        await liabilityService.delete(
          id
        );

        set((state) => ({

          liabilities:

            state.liabilities.filter(
              (item) =>
                item.id !== id
            ),

        }));

      } catch (error) {

        set({

          error:

            error instanceof Error

              ? error.message

              : "No se pudo eliminar el pasivo",

        });

      }

    },

    clearLiabilities: async () => {

      try {

        await liabilityService.clear();

        set({

          liabilities: [],

        });

      } catch (error) {

        set({

          error:

            error instanceof Error

              ? error.message

              : "No se pudieron limpiar los pasivos",

        });

      }

    },

  }));