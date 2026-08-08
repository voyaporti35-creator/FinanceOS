import Dexie, { type Table } from "dexie";

import type { Account } from "../modules/accounts/types/account";
import type { Transaction } from "../modules/transactions/types/transaction";
import type { Category } from "../modules/categories/types/category";
import type { Asset } from "../modules/assets/types/asset";
import type { Liability } from "../modules/liabilities/types/liability";
import type { RecurringTransaction } from "../modules/recurring/types/recurringTransaction";
import type { Loan } from "../modules/loans/types/loan";

export class FinanceDatabase extends Dexie {

  accounts!: Table<Account, string>;

  transactions!: Table<Transaction, string>;

  categories!: Table<Category, string>;

  assets!: Table<Asset, string>;

  liabilities!: Table<Liability, string>;

  recurringTransactions!: Table<
    RecurringTransaction,
    string
  >;

  loans!: Table<Loan, string>;

  constructor() {

    super("FinanceOS");

    this.version(4).stores({

      accounts:
        "id, createdAt, displayOrder",

      transactions:
        "id, accountId, date, createdAt",

      categories:
        "id, type",

      assets:
        "id, type, createdAt",

      liabilities:
        "id, type, createdAt",

      recurringTransactions:
        "id, enabled, nextExecution, frequency",

      loans:
        "id, isActive, nextPayment, createdAt",

    });

  }

}

export const db =
  new FinanceDatabase();