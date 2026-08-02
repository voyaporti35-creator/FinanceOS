import { db } from "../../../db/database";
import type { Transaction } from "../types/transaction";

export const transactionService = {
  async create(transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">): Promise<Transaction> {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...transaction,
    };

    await db.transactions.add(newTransaction);
    return newTransaction;
  },

  async update(transaction: Transaction): Promise<void> {
    await db.transactions.update(transaction.id, {
      ...transaction,
      updatedAt: Date.now(),
    });
  },

  async delete(id: string): Promise<void> {
    await db.transactions.delete(id);
  },

  async getAll(): Promise<Transaction[]> {
    return db.transactions.toArray();
  },

  async getById(id: string): Promise<Transaction | undefined> {
    return db.transactions.get(id);
  },
};
