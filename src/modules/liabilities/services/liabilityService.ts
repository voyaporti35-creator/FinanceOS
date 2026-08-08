import { db } from "../../../db/database";
import type { Liability } from "../types/liability";

export const liabilityService = {

  async create(
    liability: Omit<
      Liability,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<Liability> {

    const now = Date.now();

    const newLiability: Liability = {

      id: crypto.randomUUID(),

      createdAt: now,

      updatedAt: now,

      ...liability,

    };

    await db.liabilities.add(
      newLiability
    );

    return newLiability;

  },

  async update(
    liability: Liability
  ): Promise<void> {

    const updated =
      await db.liabilities.update(
        liability.id,
        {

          ...liability,

          updatedAt: Date.now(),

        }
      );

    if (updated === 0) {

      throw new Error(
        "El pasivo no existe"
      );

    }

  },

  async delete(
    id: string
  ): Promise<void> {

    await db.liabilities.delete(
      id
    );

  },

  async getById(
    id: string
  ): Promise<Liability | undefined> {

    return db.liabilities.get(id);

  },

  async getAll(): Promise<Liability[]> {

    return db.liabilities
      .orderBy("createdAt")
      .toArray();

  },

  async exists(
    id: string
  ): Promise<boolean> {

    return (
      (await db.liabilities.get(id))
      !== undefined
    );

  },

  async clear(): Promise<void> {

    await db.liabilities.clear();

  },

};