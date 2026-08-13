import type { Account } from "../../../modules/accounts/types/account";
import type { Asset } from "../../../modules/assets/types/asset";
import type { Liability } from "../../../modules/liabilities/types/liability";
import type { Transaction } from "../../../modules/transactions/types/transaction";
import type { FinanceSnapshot } from "../types";

import {
  calculateAssetCount,
  calculateAssetsByType,
  calculateTotalAssets,
} from "../../../modules/assets/utils/assetCalculations";

import {
  calculateLiabilityCount,
  calculateMonthlyDebtPayment,
  calculateTotalLiabilities,
} from "../../../modules/liabilities/utils/liabilityCalculations";

export function calculateAccountBalance(
  account: Account,
  transactions: Transaction[]
): number {
  return transactions.reduce(
    (balance, transaction) => {
      if (transaction.type === "transfer") {
        if (transaction.accountId === account.id) {
          return balance - transaction.amount;
        }

        if (
          transaction.destinationAccountId === account.id
        ) {
          return balance + transaction.amount;
        }

        return balance;
      }

      if (transaction.accountId !== account.id) {
        return balance;
      }

      switch (transaction.type) {
        case "income":
          return balance + transaction.amount;

        case "expense":
          return balance - transaction.amount;

        default:
          return balance;
      }
    },
    account.initialBalance
  );
}

export function calculateCurrentAccountBalance(
  account: Account,
  transactions: Transaction[]
): number {
  return calculateAccountBalance(
    account,
    transactions
  );
}

export function calculateLiquidity(
  accounts: Account[],
  transactions: Transaction[]
): number {
  return accounts.reduce(
    (total, account) =>
      total +
      calculateCurrentAccountBalance(
        account,
        transactions
      ),
    0
  );
}

export function calculateAccountCount(
  accounts: Account[]
): number {
  return accounts.length;
}

export function calculateTransactionCount(
  transactions: Transaction[]
): number {
  return transactions.length;
}

export function calculateLastTransactionDate(
  transactions: Transaction[]
): string | null {
  if (transactions.length === 0) {
    return null;
  }

  return (
    transactions
      .map((transaction) => transaction.date)
      .sort()
      .at(-1) ?? null
  );
}

export function calculateNetWorth(
  accounts: Account[],
  transactions: Transaction[],
  assets: Asset[],
  liabilities: Liability[]
): number {
  const liquidity =
    calculateLiquidity(
      accounts,
      transactions
    );

  const assetsTotal =
    calculateTotalAssets(assets);

  const liabilitiesTotal =
    calculateTotalLiabilities(
      liabilities
    );

  return (
    liquidity +
    assetsTotal -
    liabilitiesTotal
  );
}

export function calculateMonthlyIncome(
  transactions: Transaction[],
  referenceDate: Date = new Date()
): number {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "income" &&
        isTransactionInMonth(
          transaction,
          referenceDate
        )
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );
}

export function calculateMonthlyExpenses(
  transactions: Transaction[],
  referenceDate: Date = new Date()
): number {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "expense" &&
        isTransactionInMonth(
          transaction,
          referenceDate
        )
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );
}

export function calculateMonthlySavings(
  income: number,
  expenses: number
): number {
  return income - expenses;
}

export function calculateSavingsRate(
  income: number,
  savings: number
): number {
  if (income <= 0) {
    return 0;
  }

  return savings / income;
}

export function calculateInitialNetWorth(
  accounts: Account[]
): number {
  return accounts.reduce(
    (total, account) =>
      total + account.initialBalance,
    0
  );
}

export function buildFinanceSnapshot(
  accounts: Account[],
  transactions: Transaction[],
  referenceDate: Date = new Date(),
  assets: Asset[] = [],
  liabilities: Liability[] = []
): FinanceSnapshot {
  const monthlyIncome =
    calculateMonthlyIncome(
      transactions,
      referenceDate
    );

  const monthlyExpenses =
    calculateMonthlyExpenses(
      transactions,
      referenceDate
    );

  const monthlySavings =
    calculateMonthlySavings(
      monthlyIncome,
      monthlyExpenses
    );

  const liquidityTotal =
    calculateLiquidity(
      accounts,
      transactions
    );

  const totalAssets =
    calculateTotalAssets(assets);

  const totalLiabilities =
    calculateTotalLiabilities(
      liabilities
    );

  const monthlyDebtPayment =
    calculateMonthlyDebtPayment(
      liabilities
    );

  const debtRatio =
    monthlyIncome > 0
      ? monthlyDebtPayment /
        monthlyIncome
      : 0;

  return {
    liquidityTotal,

    totalAssets,

    totalLiabilities,

    netWorth:
      liquidityTotal +
      totalAssets -
      totalLiabilities,

    monthlyIncome,

    monthlyExpenses,

    monthlySavings,

    savingsRate:
      calculateSavingsRate(
        monthlyIncome,
        monthlySavings
      ),

    initialNetWorth:
      calculateInitialNetWorth(
        accounts
      ),

    accountCount:
      calculateAccountCount(
        accounts
      ),

    transactionCount:
      calculateTransactionCount(
        transactions
      ),

    lastTransactionDate:
      calculateLastTransactionDate(
        transactions
      ),

    assetCount:
      calculateAssetCount(
        assets
      ),

    assetsByType:
      calculateAssetsByType(
        assets
      ),

    liabilityCount:
      calculateLiabilityCount(
        liabilities
      ),

    monthlyDebtPayment,

    debtRatio,
  };
}

function isTransactionInMonth(
  transaction: Transaction,
  referenceDate: Date
): boolean {
  const [
    year,
    month,
  ] = transaction.date
    .split("-")
    .map(Number);

  return (
    year ===
      referenceDate.getFullYear() &&
    month - 1 ===
      referenceDate.getMonth()
  );
}