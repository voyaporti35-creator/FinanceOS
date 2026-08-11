import { useCallback, useEffect, useState } from "react";

import { financeService } from "../services/financeService";

import type { FinanceSnapshot } from "../types";

export function useFinanceSnapshot() {
  const [snapshot, setSnapshot] =
    useState({} as FinanceSnapshot);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data =
        await financeService.getSnapshot();

      setSnapshot(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo cargar el resumen financiero"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSnapshot() {
      try {
        const data =
          await financeService.getSnapshot();

        if (!cancelled) {
          setSnapshot(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudo cargar el resumen financiero"
          );

          setIsLoading(false);
        }
      }
    }

    void loadSnapshot();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    snapshot,
    isLoading,
    error,
    refresh,
  };
}