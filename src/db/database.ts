import Dexie from "dexie";
import type { Table } from "dexie";
import type { Account } from "../modules/accounts/types/account";
import type { Asset } from "../modules/assets/types/asset";
import type { Category } from "../modules/categories/types/category";
import type { Liability } from "../modules/liabilities/types/liability";
import type { RecurringTransaction } from "../modules/recurring/types/recurringTransaction";
import type { Transaction } from "../modules/transactions/types/transaction";

class FinanceDatabase extends Dexie {
  transactions!: Table<Transaction>;
  accounts!: Table<Account>;
  categories!: Table<Category>;
  assets!: Table<Asset>;
  liabilities!: Table<Liability>;
  recurringTransactions!: Table<RecurringTransaction>;

  constructor() {
    super("FinanceOS");

    this.version(5).stores({
      transactions: "id, date, accountId, category, type, createdAt",
      accounts: "id, name, type, createdAt",
      categories: "id, name, type, parentId, createdAt, updatedAt",
      assets: "id, name, type, accountId, createdAt, updatedAt",
      liabilities: "id, name, type, createdAt, updatedAt",
      recurringTransactions: "id, name, enabled, type, accountId, frequency, nextExecution, createdAt, updatedAt",
    });
  }
}

export const db = new FinanceDatabase();