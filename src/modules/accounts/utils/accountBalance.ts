import type { Account } from "../types/account";
import type { Transaction } from "../../transactions/types/transaction";

export function calculateAccountBalance(account: Account, transactions: Transaction[]): number {
  const baseBalance = account.initialBalance;

  return transactions.reduce((balance, transaction) => {
    if (transaction.accountId !== account.id) {
      return balance;
    }

    switch (transaction.type) {
      case "income":
        return balance + transaction.amount;
      case "expense":
        return balance - transaction.amount;
      case "transfer":
        return balance + transaction.amount;
      default:
        return balance;
    }
  }, baseBalance);
}
