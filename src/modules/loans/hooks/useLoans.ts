import { useEffect } from "react";

import { useLoanStore } from "../store/loanStore";

export function useLoans() {

  const loans =
    useLoanStore(
      (state) => state.loans
    );

  const isLoading =
    useLoanStore(
      (state) => state.isLoading
    );

  const error =
    useLoanStore(
      (state) => state.error
    );

  const loadLoans =
    useLoanStore(
      (state) => state.loadLoans
    );

  const createLoan =
    useLoanStore(
      (state) => state.createLoan
    );

  const updateLoan =
    useLoanStore(
      (state) => state.updateLoan
    );

  const deleteLoan =
    useLoanStore(
      (state) => state.deleteLoan
    );

  useEffect(() => {

    void loadLoans();

  }, [
    loadLoans,
  ]);

  return {

    loans,

    isLoading,

    error,

    createLoan,

    updateLoan,

    deleteLoan,

  };

}