import { create } from "zustand";

import { categoryService } from "../services/categoryService";
import type { Category } from "../types/category";

interface CategoryStoreState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  loadCategories: () => Promise<void>;

  createCategory: (
    category: Omit<
      Category,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;

  updateCategory: (
    category: Category
  ) => Promise<void>;

  deleteCategory: (
    id: string
  ) => Promise<void>;

  ensureSystemCategories: () => Promise<{
    created: number;
    total: number;
  }>;

  cleanupDuplicates: () => Promise<{
    removed: number;
    reassignedTransactions: number;
  }>;
}

const SYSTEM_CATEGORIES: Array<
  Omit<
    Category,
    "id" | "createdAt" | "updatedAt"
  >
> = [
  {
    name: "Nómina",
    type: "income",
    icon: "💼",
    color: "#10b981",
  },
  {
    name: "Dividendos",
    type: "income",
    icon: "📈",
    color: "#3b82f6",
  },
  {
    name: "Intereses",
    type: "income",
    icon: "💰",
    color: "#f59e0b",
  },
  {
    name: "Devoluciones",
    type: "income",
    icon: "↩️",
    color: "#14b8a6",
  },
  {
    name: "Otros ingresos",
    type: "income",
    icon: "➕",
    color: "#8b5cf6",
  },
  {
    name: "Vivienda",
    type: "expense",
    icon: "🏠",
    color: "#ef4444",
  },
  {
    name: "Alimentación",
    type: "expense",
    icon: "🥑",
    color: "#f97316",
  },
  {
    name: "Transporte",
    type: "expense",
    icon: "🚗",
    color: "#64748b",
  },
  {
    name: "Salud",
    type: "expense",
    icon: "🩺",
    color: "#06b6d4",
  },
  {
    name: "Ocio",
    type: "expense",
    icon: "🎉",
    color: "#ec4899",
  },
  {
    name: "Restaurantes",
    type: "expense",
    icon: "🍽️",
    color: "#84cc16",
  },
  {
    name: "Suscripciones",
    type: "expense",
    icon: "📱",
    color: "#6b7280",
  },
  {
    name: "Impuestos",
    type: "expense",
    icon: "🧾",
    color: "#f59e0b",
  },
  {
    name: "Seguros",
    type: "expense",
    icon: "🛡️",
    color: "#8b5cf6",
  },
  {
    name: "Educación",
    type: "expense",
    icon: "🎓",
    color: "#3b82f6",
  },
  {
    name: "Compras",
    type: "expense",
    icon: "🛍️",
    color: "#a855f7",
  },
  {
    name: "Viajes",
    type: "expense",
    icon: "✈️",
    color: "#0f766e",
  },
  {
    name: "Mascotas",
    type: "expense",
    icon: "🐶",
    color: "#fb923c",
  },
  {
    name: "Regalos",
    type: "expense",
    icon: "🎁",
    color: "#e11d48",
  },
  {
    name: "Otros gastos",
    type: "expense",
    icon: "➖",
    color: "#64748b",
  },
  {
    name: "Entre cuentas",
    type: "transfer",
    icon: "🔄",
    color: "#38bdf8",
  },
  {
    name: "Ajuste de saldo",
    type: "system",
    icon: "⚙️",
    color: "#475569",
  },
];

export const useCategoryStore =
  create<CategoryStoreState>((set) => ({
    categories: [],
    isLoading: false,
    error: null,

    loadCategories: async () => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const categories =
          await categoryService.getAll();

        set({
          categories,
          isLoading: false,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudieron cargar categorías",
          isLoading: false,
        });
      }
    },

    createCategory: async (category) => {
      try {
        const createdCategory =
          await categoryService.create(
            category
          );

        set((state) => ({
          categories: [
            createdCategory,
            ...state.categories,
          ],
          error: null,
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudo crear la categoría",
        });
      }
    },

    updateCategory: async (category) => {
      try {
        await categoryService.update(
          category
        );

        set((state) => ({
          categories:
            state.categories.map(
              (item) =>
                item.id === category.id
                  ? {
                      ...category,
                      updatedAt: Date.now(),
                    }
                  : item
            ),
          error: null,
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudo actualizar la categoría",
        });
      }
    },

    deleteCategory: async (id) => {
      try {
        await categoryService.delete(id);

        set((state) => ({
          categories:
            state.categories.filter(
              (item) =>
                item.id !== id
            ),
          error: null,
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "No se pudo eliminar la categoría",
        });
      }
    },

    ensureSystemCategories: async () => {
      try {
        const existing =
          await categoryService.getAll();

        const existingKeys = new Set(
          existing.map(
            (category) =>
              `${category.type}:${category.name
                .trim()
                .toLowerCase()}`
          )
        );

        let created = 0;

        for (const category of SYSTEM_CATEGORIES) {
          const key =
            `${category.type}:${category.name
              .trim()
              .toLowerCase()}`;

          if (existingKeys.has(key)) {
            continue;
          }

          await categoryService.create(
            category
          );

          existingKeys.add(key);
          created++;
        }

        const categories =
          await categoryService.getAll();

        set({
          categories,
          error: null,
        });

        return {
          created,
          total: categories.length,
        };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "No se pudieron crear las categorías del sistema";

        set({
          error: message,
        });

        throw error;
      }
    },

    cleanupDuplicates: async () => {
      try {
        const result =
          await categoryService.cleanupDuplicates();

        const categories =
          await categoryService.getAll();

        set({
          categories,
          error: null,
        });

        return result;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "No se pudieron limpiar los duplicados";

        set({
          error: message,
        });

        throw error;
      }
    },
  }));