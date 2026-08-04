import { useState } from "react";
import { useAccountStore } from "../../accounts/store/accountStore";
import { useCategoryStore } from "../../categories/store/categoryStore";
import { useTransactionStore } from "../../transactions/store/transactionStore";
import { backupService } from "../services/backupService";
import type { BackupImportResult } from "../types/backup";

export function useBackup() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const refreshStores = async () => {
    await Promise.all([
      useAccountStore.getState().loadAccounts(),
      useTransactionStore.getState().loadTransactions(),
      useCategoryStore.getState().loadCategories(),
    ]);
  };

  const exportData = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = await backupService.exportData();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `financeos-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      window.URL.revokeObjectURL(url);
      setSuccess("Respaldo exportado correctamente.");
      return payload;
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "No se pudo exportar el respaldo.");
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const importDataFromFile = async (file: File): Promise<BackupImportResult | null> => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const validatedData = backupService.validateBackup(parsed);
      const result = await backupService.importData(validatedData);
      await refreshStores();
      setSuccess(`Respaldo importado correctamente. ${result.accountsCount} cuentas, ${result.transactionsCount} transacciones y ${result.categoriesCount} categorías.`);
      return result;
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "No se pudo importar el respaldo.");
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const clearDatabase = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      await backupService.clearDatabase();
      await refreshStores();
      setSuccess("La base de datos se vació correctamente.");
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "No se pudo vaciar la base de datos.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    success,
    exportData,
    importDataFromFile,
    clearDatabase,
  };
}
