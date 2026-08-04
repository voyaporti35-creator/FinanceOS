import { db } from "../../../db/database";
import type { Liability } from "../types/liability";


export const liabilityService = {

  async create(
    liability: Omit<Liability, "id" | "createdAt" | "updatedAt">
  ): Promise<Liability> {

    const newLiability: Liability = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...liability,
    };


    await db.liabilities.add(newLiability);

    return newLiability;
  },


  async update(
    liability: Liability
  ): Promise<void> {

    await db.liabilities.update(
      liability.id,
      {
        ...liability,
        updatedAt: Date.now(),
      }
    );

  },


  async delete(
    id: string
  ): Promise<void> {

    await db.liabilities.delete(id);

  },


  async getAll(): Promise<Liability[]> {

    return db.liabilities.toArray();

  },


  async getById(
    id: string
  ): Promise<Liability | undefined> {

    return db.liabilities.get(id);

  },


  async clear(): Promise<void> {

    await db.liabilities.clear();

  },

};