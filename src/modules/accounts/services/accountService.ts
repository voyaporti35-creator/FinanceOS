import { db } from "../../../db/database";
import type { Account } from "../types/account";

export const accountService = {
  async create(
    account: Omit<
      Account,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "archived"
      | "isDefault"
      | "displayOrder"
    >
  ): Promise<Account> {

    const now = Date.now();

    const newAccount: Account = {
      id: crypto.randomUUID(),

      createdAt: now,
      updatedAt: now,

      archived: false,
      isDefault: false,
      displayOrder: 0,

      ...account,
    };

    await db.accounts.add(newAccount);

    return newAccount;
  },

  async update(account: Account): Promise<void> {

    await db.accounts.put({
      ...account,
      updatedAt: Date.now(),
    });

  },

  async archive(id: string): Promise<void> {

    const account = await db.accounts.get(id);

    if (!account) {
      return;
    }

    await db.accounts.put({
      ...account,
      archived: true,
      updatedAt: Date.now(),
    });

  },

  async delete(id: string): Promise<void> {

    await db.accounts.delete(id);

  },

  async getById(id: string): Promise<Account | undefined> {

    return db.accounts.get(id);

  },

  async getAll(): Promise<Account[]> {

    return db.accounts
      .filter(account => !account.archived)
      .sortBy("displayOrder");

  },

  async getAllIncludingArchived(): Promise<Account[]> {

    return db.accounts
      .orderBy("displayOrder")
      .toArray();

  },

  async exists(id: string): Promise<boolean> {

    return (await db.accounts.get(id)) !== undefined;

  },
};