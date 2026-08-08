import { db } from "../../../db/database";

import type { Loan } from "../types/loan";

export const loanService = {

  async create(
    loan: Omit<
      Loan,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<Loan> {

    const now = Date.now();

    const newLoan: Loan = {

      id: crypto.randomUUID(),

      createdAt: now,

      updatedAt: now,

      ...loan,

    };

    await db.loans.add(
      newLoan
    );

    return newLoan;

  },

  async update(
    loan: Loan
  ): Promise<void> {

    const updated =
      await db.loans.update(
        loan.id,
        {

          ...loan,

          updatedAt: Date.now(),

        }
      );

    if (updated === 0) {

      throw new Error(
        "El préstamo no existe"
      );

    }

  },

  async delete(
    id: string
  ): Promise<void> {

    await db.loans.delete(id);

  },

  async getById(
    id: string
  ): Promise<Loan | undefined> {

    return db.loans.get(id);

  },

  async getAll(): Promise<Loan[]> {

    return db.loans
      .orderBy("createdAt")
      .toArray();

  },

  async exists(
    id: string
  ): Promise<boolean> {

    return (
      (
        await db.loans.get(id)
      ) !== undefined
    );

  },

  async clear(): Promise<void> {

    await db.loans.clear();

  },

};