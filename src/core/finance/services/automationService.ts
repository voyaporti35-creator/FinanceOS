import { recurringExecutor } from "../../../modules/recurring/services/recurringExecutor";
import { loanExecutor } from "../../../modules/loans/services/loanExecutor";

export interface AutomationResult {

  recurringExecuted: number;

  loanPaymentsExecuted: number;

  totalExecuted: number;

}

export const automationService = {

  async execute(): Promise<AutomationResult> {

    const recurringExecuted =
      await recurringExecutor.execute();

    const loanPaymentsExecuted =
      await loanExecutor.execute();

    return {

      recurringExecuted,

      loanPaymentsExecuted,

      totalExecuted:
        recurringExecuted +
        loanPaymentsExecuted,

    };

  },

};