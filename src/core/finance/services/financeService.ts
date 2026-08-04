import { db } from "../../../db/database";
import { buildFinanceSnapshot } from "../calculations";

export const financeService = {
  async getSnapshot(referenceDate: Date = new Date()) {
    const [accounts, transactions, assets, liabilities] = await Promise.all([db.accounts.toArray(), db.transactions.toArray(), db.assets.toArray(), db.liabilities.toArray()]);

    return buildFinanceSnapshot(accounts, transactions, referenceDate, assets, liabilities);
  },
};
