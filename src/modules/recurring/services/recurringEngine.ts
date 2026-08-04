import type { RecurringTransaction } from "../types/recurringTransaction";
import { db } from "../../../db/database";
import type { Transaction } from "../../transactions/types/transaction";

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function addWeeks(date: Date, amount: number): Date {
  return addDays(date, amount * 7);
}

function addMonths(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
}

function addQuarters(date: Date, amount: number): Date {
  return addMonths(date, amount * 3);
}

function addYears(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + amount);
  return next;
}

export const recurringEngine = {
  calculateNextExecution(recurring: RecurringTransaction): string {
    const start = new Date(recurring.nextExecution);

    switch (recurring.frequency) {
      case "daily":
        return addDays(start, 1).toISOString().slice(0, 10);

      case "weekly":
        return addWeeks(start, 1).toISOString().slice(0, 10);

      case "monthly":
        return addMonths(start, 1).toISOString().slice(0, 10);

      case "quarterly":
        return addQuarters(start, 1).toISOString().slice(0, 10);

      case "yearly":
        return addYears(start, 1).toISOString().slice(0, 10);

      default:
        return recurring.nextExecution;
    }
  },

  async executeRecurringTransactions(): Promise<Transaction[]> {
    const recurringTransactions =
      await db.recurringTransactions.toArray();

    const today = new Date().toISOString().slice(0, 10);

    const pending = recurringTransactions.filter(
      (item) =>
        item.enabled &&
        item.nextExecution <= today
    );

    const createdTransactions: Transaction[] = [];

    for (const recurring of pending) {
      const transaction: Transaction = {
        id: crypto.randomUUID(),
        accountId: recurring.accountId,
        type: recurring.type,
        amount: recurring.amount,
        date: recurring.nextExecution,
        category: recurring.categoryId,
        description: recurring.name,
        createdAt: Date.now(),
      };

      await db.transactions.add(transaction);

      createdTransactions.push(transaction);

      const updatedRecurring: RecurringTransaction = {
        ...recurring,
        lastExecution: recurring.nextExecution,
        nextExecution: this.calculateNextExecution(recurring),
        updatedAt: Date.now(),
      };

      await db.recurringTransactions.update(
        recurring.id,
        updatedRecurring
      );
    }

    return createdTransactions;
  },

  async getPendingTransactions(): Promise<RecurringTransaction[]> {
    const recurringTransactions =
      await db.recurringTransactions.toArray();

    const today = new Date().toISOString().slice(0, 10);

    return recurringTransactions.filter(
      (item) =>
        item.enabled &&
        item.nextExecution <= today
    );
  },
};