import { db } from "../../../db/database";
import type { Account } from "../../accounts/types/account";
import type { Category } from "../../categories/types/category";
import type {
  BackupData,
  BackupImportResult,
  BackupTransactionRecord,
} from "../types/backup";

export const BACKUP_VERSION = "1.0.0";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isArrayOfObjects(
  value: unknown
): value is Array<Record<string, unknown>> {
  return Array.isArray(value) && value.every((item) => isRecord(item));
}

function isValidAccount(value: unknown): value is Account {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.type === "string" &&
    typeof value.initialBalance === "number" &&
    typeof value.currency === "string" &&
    typeof value.createdAt === "number"
  );
}

function isValidCategory(value: unknown): value is Category {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.type === "string" &&
    typeof value.icon === "string" &&
    typeof value.color === "string" &&
    typeof value.createdAt === "number" &&
    typeof value.updatedAt === "number"
  );
}

function isValidTransaction(
  value: unknown
): value is BackupTransactionRecord {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.accountId === "string" &&
    typeof value.amount === "number" &&
    typeof value.date === "string" &&
    typeof value.type === "string" &&
    typeof value.createdAt === "string"
  );
}

export const backupService = {
  async exportData(): Promise<BackupData> {
    const [accounts, transactions, categories] = await Promise.all([
      db.accounts.toArray(),
      db.transactions.toArray(),
      db.categories.toArray(),
    ]);

    return {
      version: BACKUP_VERSION,
      createdAt: new Date().toISOString(),
      accounts,
      transactions: transactions.map((transaction) => ({
        ...transaction,
        createdAt: new Date(transaction.createdAt).toISOString(),
      })),
      categories,
      config: {},
    };
  },

  validateBackup(data: unknown): BackupData {
    if (!isRecord(data)) {
      throw new Error(
        "El archivo no tiene un formato de respaldo válido."
      );
    }

    if (data.version !== BACKUP_VERSION) {
      throw new Error(
        `La versión del respaldo no es compatible. Esperada ${BACKUP_VERSION}.`
      );
    }

    if (typeof data.createdAt !== "string") {
      throw new Error(
        "El respaldo no incluye una fecha de creación válida."
      );
    }

    if (!isArrayOfObjects(data.accounts)) {
      throw new Error(
        "El respaldo no contiene una colección de cuentas válida."
      );
    }

    if (!isArrayOfObjects(data.transactions)) {
      throw new Error(
        "El respaldo no contiene una colección de transacciones válida."
      );
    }

    if (!isArrayOfObjects(data.categories)) {
      throw new Error(
        "El respaldo no contiene una colección de categorías válida."
      );
    }

   const accounts = data.accounts
  .filter(isValidAccount)
  .map((account) => account as unknown as Account);

    const transactions = data.transactions
  .filter(isValidTransaction)
  .map((transaction) => transaction as unknown as BackupTransactionRecord);

   const categories = data.categories
  .filter(isValidCategory)
  .map((category) => category as unknown as Category);

    if (accounts.length !== data.accounts.length) {
      throw new Error(
        "El respaldo incluye cuentas con datos incompletos o corruptos."
      );
    }

    if (transactions.length !== data.transactions.length) {
      throw new Error(
        "El respaldo incluye transacciones con datos incompletos o corruptos."
      );
    }

    if (categories.length !== data.categories.length) {
      throw new Error(
        "El respaldo incluye categorías con datos incompletos o corruptos."
      );
    }

    if (data.config !== undefined && !isRecord(data.config)) {
      throw new Error(
        "El campo de configuración del respaldo no es válido."
      );
    }

    return {
      version: data.version as string,
      createdAt: data.createdAt as string,
      accounts,
      transactions,
      categories,
      config: (data.config as Record<string, unknown>) ?? {},
    };
  },

  async importData(data: unknown): Promise<BackupImportResult> {
    const validatedData = this.validateBackup(data);

    await db.transaction(
      "rw",
      db.accounts,
      db.transactions,
      db.categories,
      async () => {
        await db.accounts.clear();
        await db.transactions.clear();
        await db.categories.clear();

        await db.accounts.bulkPut(validatedData.accounts);

        await db.transactions.bulkPut(
          validatedData.transactions.map((transaction) => ({
            ...transaction,
            createdAt: new Date(transaction.createdAt).getTime(),
          }))
        );

        await db.categories.bulkPut(validatedData.categories);
      }
    );

    return {
      accountsCount: validatedData.accounts.length,
      transactionsCount: validatedData.transactions.length,
      categoriesCount: validatedData.categories.length,
    };
  },

  async clearDatabase(): Promise<void> {
    await db.transaction(
      "rw",
      db.accounts,
      db.transactions,
      db.categories,
      async () => {
        await db.accounts.clear();
        await db.transactions.clear();
        await db.categories.clear();
      }
    );
  },
};