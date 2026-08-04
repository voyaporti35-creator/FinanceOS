import { useEffect, useMemo } from "react";

import { useLiabilityStore } from "../../../modules/liabilities/store/liabilityStore";

import { simulateMortgage } from "../calculations/mortgageSimulator";

import {
  calculateMortgageScenarios,
} from "../calculations/mortgageScenarios";

import {
  calculateMortgageProgress,
} from "../calculations/mortgageProgress";

import {
  calculateMortgageFreedom,
} from "../calculations/mortgageFreedom";


export function useMortgage() {


  const {
    liabilities,
    loadLiabilities,
  } = useLiabilityStore();



  useEffect(() => {

    void loadLiabilities();

  }, [loadLiabilities]);



  const mortgage = useMemo(

    () =>

      liabilities.find(
        (liability) =>
          liability.type === "mortgage"
      ),

    [liabilities]

  );



  const scenario = useMemo(

    () => ({

      currentDebt:
        mortgage?.currentValue ?? 0,


      interestRate:
        mortgage?.interestRate ?? 0,


      monthlyPayment:
        mortgage?.monthlyPayment ?? 0,


      extraPayment:
        600,

    }),

    [mortgage]

  );



  const simulation = useMemo(

    () =>

      simulateMortgage(
        scenario
      ),

    [scenario]

  );



  const scenarios = useMemo(

    () =>

      calculateMortgageScenarios(
        scenario
      ),

    [scenario]

  );



  const progress = useMemo(

    () =>

      calculateMortgageProgress(

        mortgage?.initialValue ?? 0,

        mortgage?.currentValue ?? 0,

        mortgage?.monthlyPayment ?? 0

      ),

    [mortgage]

  );



  const freedom = useMemo(

    () =>

      calculateMortgageFreedom(
        progress.remainingYears
      ),

    [progress]

  );



  return {

    mortgage,

    scenario,

    simulation,

    scenarios,

    progress,

    freedom,

  };

}