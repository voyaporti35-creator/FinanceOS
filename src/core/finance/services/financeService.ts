import { db } from "../../../db/database";
import { buildFinanceSnapshot } from "../calculations";

export const financeService = {
  async getSnapshot(referenceDate: Date = new Date()) {
    const [accounts, transactions] = await Promise.all([db.accounts.toArray(), db.transactions.toArray()]);

    return buildFinanceSnapshot(accounts, transactions, referenceDate);
  },
};
