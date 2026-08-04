import {
  simulateMortgage,
} from "./mortgageSimulator";

import type {
  MortgageScenario,
  MortgageResult,
} from "../models";


export interface MortgageScenarioResult {

  label: string;

  extraPayment: number;

  result: MortgageResult;

}



export function calculateMortgageScenarios(
  scenario: MortgageScenario
): MortgageScenarioResult[] {


  const extras = [
    {
      label: "Sin amortización extra",
      value: 0,
    },

    {
      label: "+300 €/mes",
      value: 300,
    },

    {
      label: "+600 €/mes",
      value: 600,
    },

    {
      label: "+1000 €/mes",
      value: 1000,
    },
  ];



  return extras.map(
    (item) => {

      const result =
        simulateMortgage({
          ...scenario,
          extraPayment:
            item.value,
        });


      return {

        label:
          item.label,

        extraPayment:
          item.value,

        result,

      };

    }
  );

}