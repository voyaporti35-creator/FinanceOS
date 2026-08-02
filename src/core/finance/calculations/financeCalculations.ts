import type { Account } from "../../../modules/accounts/types/account";
import type { Transaction } from "../../../modules/transactions/types/transaction";
import type { FinanceSnapshot } from "../types";

export function calculateAccountBalance(account: Account, transactions: Transaction[]): number {
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
  }, account.initialBalance);
}

export function calculateLiquidity(accounts: Account[], transactions: Transaction[]): number {
  return accounts.reduce((sum, account) => sum + calculateAccountBalance(account, transactions), 0);
}

export function calculateMonthlyIncome(transactions: Transaction[], referenceDate: Date = new Date()): number {
  return transactions
    .filter((transaction) => transaction.type === "income" && isTransactionInMonth(transaction, referenceDate))
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function calculateMonthlyExpenses(transactions: Transaction[], referenceDate: Date = new Date()): number {
  return transactions
    .filter((transaction) => transaction.type === "expense" && isTransactionInMonth(transaction, referenceDate))
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function calculateMonthlySavings(income: number, expenses: number): number {
  return income - expenses;
}

export function calculateSavingsRate(income: number, savings: number): number {
  if (income === 0) {
    return 0;
  }

  return savings / income;
}

export function calculateInitialNetWorth(accounts: Account[]): number {
  return accounts.reduce((sum, account) => sum + account.initialBalance, 0);
}

export function buildFinanceSnapshot(accounts: Account[], transactions: Transaction[], referenceDate: Date = new Date()): FinanceSnapshot {
  const monthlyIncome = calculateMonthlyIncome(transactions, referenceDate);
  const monthlyExpenses = calculateMonthlyExpenses(transactions, referenceDate);
  const monthlySavings = calculateMonthlySavings(monthlyIncome, monthlyExpenses);

  return {
    liquidityTotal: calculateLiquidity(accounts, transactions),
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
    savingsRate: calculateSavingsRate(monthlyIncome, monthlySavings),
    initialNetWorth: calculateInitialNetWorth(accounts),
  };
}

function isTransactionInMonth(transaction: Transaction, referenceDate: Date): boolean {
  const [year, month] = transaction.date.split("-").map(Number);
  return year === referenceDate.getFullYear() && month - 1 === referenceDate.getMonth();
}
