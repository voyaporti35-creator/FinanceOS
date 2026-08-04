import type {
  FinancialGoal,
  GoalProgress,
} from "../models";


export function calculateGoalProgress(
  goal: FinancialGoal
): GoalProgress {

  if (goal.targetAmount <= 0) {

    return {
      percentage: 0,
      remaining: 0,
      completed: false,
    };

  }


  const percentage =
    (goal.currentAmount / goal.targetAmount) * 100;


  return {

    percentage:
      Math.min(
        percentage,
        100
      ),

    remaining:
      Math.max(
        goal.targetAmount - goal.currentAmount,
        0
      ),

    completed:
      goal.currentAmount >= goal.targetAmount,

  };

}