import { db } from "../../../db/database";

import type {
  RecurringTransaction,
} from "../types/recurringTransaction";

export const recurringService = {

  async getAll(): Promise<RecurringTransaction[]> {

    return db.recurringTransactions
      .orderBy("nextExecution")
      .toArray();

  },

  async getById(
    id: string
  ): Promise<RecurringTransaction | undefined> {

    return db.recurringTransactions.get(
      id
    );

  },

  async create(
    recurring: Omit<
      RecurringTransaction,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<RecurringTransaction> {

    const now = Date.now();

    const newRecurring: RecurringTransaction = {

      id: crypto.randomUUID(),

      createdAt: now,

      updatedAt: now,

      ...recurring,

    };

    await db.recurringTransactions.add(
      newRecurring
    );

    return newRecurring;

  },

  async update(
    recurring: RecurringTransaction
  ): Promise<void> {

    const updated =
      await db.recurringTransactions.update(
        recurring.id,
        {

          ...recurring,

          updatedAt: Date.now(),

        }
      );

    if (updated === 0) {

      throw new Error(
        "La recurrencia no existe"
      );

    }

  },

  async delete(
    id: string
  ): Promise<void> {

    await db.recurringTransactions.delete(
      id
    );

  },

  async exists(
    id: string
  ): Promise<boolean> {

    return (
      (await db.recurringTransactions.get(id))
      !== undefined
    );

  },

  async clear(): Promise<void> {

    await db.recurringTransactions.clear();

  },

};