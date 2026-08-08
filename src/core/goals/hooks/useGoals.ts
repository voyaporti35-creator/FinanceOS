import { useMemo } from "react";

import { useFinanceSnapshot } from "../../finance/hooks/useFinanceSnapshot";

import { calculateGoalProgress } from "../calculations/goalProgress";

import type {
  FinancialGoal,
} from "../models";


export function useGoals() {


  const {
    snapshot,
  } = useFinanceSnapshot();



  const goals: FinancialGoal[] =
    useMemo(
      () => [

        {
          id: "emergency-fund",

          title:
            "Fondo de emergencia",

          type:
            "saving",

          targetAmount:
            10000,

          currentAmount:
            snapshot.liquidityTotal,

        },


        {
          id: "net-worth",

          title:
            "Patrimonio objetivo",

          type:
            "wealth",

          targetAmount:
            250000,

          currentAmount:
            snapshot.netWorth,

        },

      ],

      [
        snapshot,
      ]
    );



  const progress =
    goals.map(
      (goal) => ({
        goal,

        progress:
          calculateGoalProgress(
            goal
          ),
      })
    );



  return {

    goals,

    progress,

  };

}