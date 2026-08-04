import { db } from "../../../db/database";
import type { Account } from "../types/account";

export const accountService = {
  async create(account: Omit<Account, "id" | "createdAt">): Promise<Account> {
    const newAccount: Account = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      ...account,
    };

    await db.accounts.add(newAccount);

    return newAccount;
  },

  async update(account: Account): Promise<void> {
    await db.accounts.put(account);
  },

  async delete(id: string): Promise<void> {
    await db.accounts.delete(id);
  },

  async getById(id: string): Promise<Account | undefined> {
    return db.accounts.get(id);
  },

  async getAll(): Promise<Account[]> {
    return db.accounts.orderBy("createdAt").toArray();
  },

  async exists(id: string): Promise<boolean> {
    return (await db.accounts.get(id)) !== undefined;
  },
};