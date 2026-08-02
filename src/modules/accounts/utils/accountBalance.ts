import type { Account } from "../types/account";
import type { Transaction } from "../../transactions/types/transaction";
import { calculateAccountBalance as calculateCoreAccountBalance } from "../../../core/finance";

export function calculateAccountBalance(account: Account, transactions: Transaction[]): number {
  return calculateCoreAccountBalance(account, transactions);
}
