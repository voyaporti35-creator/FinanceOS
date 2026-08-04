import { useEffect } from "react";
import { useLiabilityStore } from "../store/liabilityStore";


export function useLiabilities() {

  const liabilities = useLiabilityStore(
    (state) => state.liabilities
  );

  const isLoading = useLiabilityStore(
    (state) => state.isLoading
  );

  const error = useLiabilityStore(
    (state) => state.error
  );


  const loadLiabilities = useLiabilityStore(
    (state) => state.loadLiabilities
  );

  const createLiability = useLiabilityStore(
    (state) => state.createLiability
  );

  const updateLiability = useLiabilityStore(
    (state) => state.updateLiability
  );

  const deleteLiability = useLiabilityStore(
    (state) => state.deleteLiability
  );

  const clearLiabilities = useLiabilityStore(
    (state) => state.clearLiabilities
  );


  useEffect(() => {

    void loadLiabilities();

  }, [loadLiabilities]);


  return {
    liabilities,
    isLoading,
    error,

    createLiability,
    updateLiability,
    deleteLiability,
    clearLiabilities,
  };
}