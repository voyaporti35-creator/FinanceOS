import { db } from "../../../db/database";
import type { Category } from "../types/category";

const SYSTEM_CATEGORY_IDS = new Set<string>();

function buildCategoryPayload(
  category: Omit<Category, "id" | "createdAt" | "updatedAt">
): Category {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...category,
  };
}

export const categoryService = {
  async create(
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ): Promise<Category> {
    const newCategory = buildCategoryPayload(category);

    if (category.name === "Ajuste de saldo") {
      SYSTEM_CATEGORY_IDS.add(newCategory.id);
    }

    await db.categories.add(newCategory);

    return newCategory;
  },

  async update(category: Category): Promise<void> {
    await db.categories.update(category.id, {
      ...category,
      updatedAt: Date.now(),
    });
  },

  async delete(id: string): Promise<void> {
    await db.categories.delete(id);
    SYSTEM_CATEGORY_IDS.delete(id);
  },

  async getAll(): Promise<Category[]> {
    return db.categories.toArray();
  },

  async getById(id: string): Promise<Category | undefined> {
    return db.categories.get(id);
  },

  isSystemCategory(id: string): boolean {
    return SYSTEM_CATEGORY_IDS.has(id);
  },

  async cleanupDuplicates(): Promise<{
    removed: number;
    reassignedTransactions: number;
  }> {
    return db.transaction(
      "rw",
      db.categories,
      db.transactions,
      async () => {
        const categories = await db.categories.toArray();
        const transactions = await db.transactions.toArray();

        const categoryMap = new Map<string, Category>();
        const duplicateMap = new Map<string, string>();

        for (const category of categories) {
          const key = `${category.type}::${category.name
            .trim()
            .toLowerCase()}`;

          const existing = categoryMap.get(key);

          if (!existing) {
            categoryMap.set(key, category);
            continue;
          }

          duplicateMap.set(category.id, existing.id);
        }

        let reassignedTransactions = 0;

        for (const transaction of transactions) {
          if (!transaction.category) {
            continue;
          }

          const replacementId = duplicateMap.get(
            transaction.category
          );

          if (!replacementId) {
            continue;
          }

          await db.transactions.update(transaction.id, {
            category: replacementId,
            updatedAt: Date.now(),
          });

          reassignedTransactions++;
        }

        for (const duplicateId of duplicateMap.keys()) {
          await db.categories.delete(duplicateId);
          SYSTEM_CATEGORY_IDS.delete(duplicateId);
        }

        return {
          removed: duplicateMap.size,
          reassignedTransactions,
        };
      }
    );
  },
};