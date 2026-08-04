import type { Account } from "../../accounts/types/account";
import type { Category } from "../../categories/types/category";
import type { Transaction } from "../../transactions/types/transaction";

export interface BackupTransactionRecord extends Omit<Transaction, "createdAt"> {
  createdAt: string;
}

export interface BackupData {
  version: string;
  createdAt: string;
  accounts: Account[];
  transactions: BackupTransactionRecord[];
  categories: Category[];
  config: Record<string, unknown>;
}

export interface BackupImportResult {
  accountsCount: number;
  transactionsCount: number;
  categoriesCount: number;
}
