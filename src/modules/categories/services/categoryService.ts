import { db } from "../../../db/database";
import type { Category } from "../types/category";

const SYSTEM_CATEGORY_IDS = new Set<string>();

function buildCategoryPayload(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Category {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...category,
  };
}

export const categoryService = {
  async create(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
    const newCategory = buildCategoryPayload(category);
    if (category.name === "Ajuste de saldo") {
      SYSTEM_CATEGORY_IDS.add(newCategory.id);
    }
    await db.categories.add(newCategory);
    return newCategory;
  },

  async update(category: Category): Promise<void> {
    await db.categories.update(category.id, { ...category, updatedAt: Date.now() });
  },

  async delete(id: string): Promise<void> {
    await db.categories.delete(id);
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
};
