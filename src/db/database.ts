import Dexie from "dexie";
import type { Table } from "dexie";
import type { Account } from "../modules/accounts/types/account";
import type { Transaction } from "../modules/ledger/types/transaction";

class FinanceDatabase extends Dexie {
  transactions!: Table<Transaction>;
  accounts!: Table<Account>;

  constructor() {
    super("FinanceOS");

    this.version(3).stores({
      transactions: "id, date, accountId, categoryId, type, createdAt, updatedAt",
      accounts: "id, name, type, createdAt",
    });
  }
}

export const db = new FinanceDatabase();