import { db } from "../../../db/database";
import type { Transaction } from "../types/transaction";

export const transactionService = {

  async create(
    transaction: Omit<
      Transaction,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<Transaction> {

    if (
      transaction.type === "transfer" &&
      !transaction.destinationAccountId
    ) {

      throw new Error(
        "Una transferencia necesita una cuenta destino"
      );

    }

    if (
      transaction.type === "transfer" &&
      transaction.accountId === transaction.destinationAccountId
    ) {

      throw new Error(
        "La cuenta origen y destino no pueden ser iguales"
      );

    }

    const now = Date.now();

    const id = crypto.randomUUID();

    const newTransaction: Transaction = {

      id,

      createdAt: now,

      updatedAt: now,

      ...transaction,

      transferId:

        transaction.type === "transfer"

          ? id

          : transaction.transferId,

    };

    await db.transactions.add(
      newTransaction
    );

    return newTransaction;

  },

  async update(
    transaction: Transaction
  ): Promise<void> {

    const updated =
      await db.transactions.update(
        transaction.id,
        {

          ...transaction,

          updatedAt: Date.now(),

        }
      );

    if (updated === 0) {

      throw new Error(
        "La transacción no existe"
      );

    }

  },

  async delete(
    id: string
  ): Promise<void> {

    await db.transactions.delete(
      id
    );

  },

  async getById(
    id: string
  ): Promise<Transaction | undefined> {

    return db.transactions.get(id);

  },

  async getAll(): Promise<Transaction[]> {

    return db.transactions
      .orderBy("createdAt")
      .reverse()
      .toArray();

  },

  async exists(
    id: string
  ): Promise<boolean> {

    return (
      (await db.transactions.get(id))
      !== undefined
    );

  },

  async clear(): Promise<void> {

    await db.transactions.clear();

  },

};