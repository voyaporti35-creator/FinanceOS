import type { Transaction } from "../../transactions/types/transaction";
import type { RecurringTransaction } from "../types/recurringTransaction";

import {
  calculateNextExecution,
  formatDate,
  isDue,
} from "../utils/recurringDate";

export const recurringEngine = {

  generateTransaction(
    recurring: RecurringTransaction
  ): Transaction {

    const now = Date.now();

    return {

      id: crypto.randomUUID(),

      accountId:
        recurring.accountId,

      destinationAccountId:
        undefined,

      type:
        recurring.type,

      amount:
        recurring.amount,

      date:
        formatDate(
          new Date()
        ),

      category:
        recurring.categoryId,

      description:
        recurring.name,

      transferId:
        undefined,

      createdAt:
        now,

      updatedAt:
        now,

    };

  },

  isPending(
    recurring: RecurringTransaction
  ): boolean {

    return isDue(
      recurring
    );

  },

  updateExecution(
    recurring: RecurringTransaction
  ): RecurringTransaction {

    const today =
      formatDate(
        new Date()
      );

    return {

      ...recurring,

      lastExecution:
        today,

      nextExecution:
        calculateNextExecution(
          recurring
        ),

      updatedAt:
        Date.now(),

    };

  },

  async getPendingTransactions(
    recurringTransactions: RecurringTransaction[]
  ): Promise<Transaction[]> {

    return recurringTransactions

      .filter(
        recurring =>
          this.isPending(
            recurring
          )
      )

      .map(
        recurring =>
          this.generateTransaction(
            recurring
          )
      );

  },

};