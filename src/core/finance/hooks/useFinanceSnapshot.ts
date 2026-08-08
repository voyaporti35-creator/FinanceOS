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

    void refresh();

  }, [refresh]);

  return {

    snapshot,

    isLoading,

    error,

    refresh,

  };

}