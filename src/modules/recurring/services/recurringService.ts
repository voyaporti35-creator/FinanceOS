import { db } from "../../../db/database";
import type { RecurringTransaction } from "../types/recurringTransaction";

export const recurringService = {
  async create(recurring: Omit<RecurringTransaction, "id" | "createdAt" | "updatedAt">): Promise<RecurringTransaction> {
    const newRecurring: RecurringTransaction = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...recurring,
    };

    await db.recurringTransactions.add(newRecurring);
    return newRecurring;
  },

  async update(recurring: RecurringTransaction): Promise<void> {
    await db.recurringTransactions.update(recurring.id, { ...recurring, updatedAt: Date.now() });
  },

  async delete(id: string): Promise<void> {
    await db.recurringTransactions.delete(id);
  },

  async getAll(): Promise<RecurringTransaction[]> {
    return db.recurringTransactions.toArray();
  },
};
