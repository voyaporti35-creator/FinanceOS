import { transactionService } from "../../transactions/services/transactionService";

import { loanService } from "./loanService";

import { applyLoanPayment } from "./loanEngine";

export const loanExecutor = {

  async execute(): Promise<number> {

    const loans =
      await loanService.getAll();

    let executed = 0;

    const today =
      new Date()
        .toISOString()
        .slice(0, 10);

    for (const loan of loans) {

      if (!loan.isActive) {
        continue;
      }

      if (loan.nextPayment > today) {
        continue;
      }

      await transactionService.create({

        accountId:
          loan.accountId,

        type:
          "expense",

        amount:
          loan.monthlyPayment,

        date:
          today,

        category:
          loan.categoryId,

        description:
          loan.name,

        notes:
          "Pago automático préstamo",

        isRecurring:
          true,

      });

      const updatedLoan =
        applyLoanPayment(
          loan
        );

      await loanService.update({

        ...updatedLoan,

        nextPayment:
          calculateNextPayment(
            loan.nextPayment
          ),

      });

      executed++;

    }

    return executed;

  },

};

function calculateNextPayment(
  current: string
): string {

  const date =
    new Date(current);

  date.setMonth(
    date.getMonth() + 1
  );

  return date
    .toISOString()
    .slice(0, 10);

}