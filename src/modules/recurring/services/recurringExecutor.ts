import { transactionService } from "../../transactions/services/transactionService";

import {
  recurringService,
} from "./recurringService";

import {
  recurringEngine,
} from "./recurringEngine";

import {
  calculateNextExecution,
} from "../utils/recurringDate";

let isExecuting = false;

export const recurringExecutor = {

  async execute(): Promise<number> {

    if (isExecuting) {
      return 0;
    }

    isExecuting = true;

    try {

      const recurringTransactions =
        await recurringService.getAll();

      let executedCount = 0;

      const now =
        new Date();

      const today =
        `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}-${String(
          now.getDate()
        ).padStart(2, "0")}`;

      for (
        const recurring
        of recurringTransactions
      ) {

        if (
          !recurring.enabled
        ) {
          continue;
        }

        if (
          !recurringEngine.isPending(
            recurring
          )
        ) {
          continue;
        }

        const existingTransactions =
          await transactionService.getAll();

        const alreadyExecuted =
          existingTransactions.some(
            (transaction) =>
              transaction.recurringId === recurring.id &&
              transaction.date === today
          );

        if (
          alreadyExecuted
        ) {

          const nextExecution =
            calculateNextExecution(
              recurring
            );

          await recurringService.update({

            ...recurring,

            lastExecution:
              today,

            nextExecution,

            updatedAt:
              Date.now(),

          });

          continue;
        }

        const transaction =
          recurringEngine.generateTransaction(
            recurring
          );

        await transactionService.create({

          accountId:
            transaction.accountId,

          destinationAccountId:
            transaction.destinationAccountId,

          type:
            transaction.type,

          amount:
            transaction.amount,

          date:
            transaction.date,

          category:
            transaction.category,

          description:
            transaction.description,

          notes:
            recurring.notes,

          isRecurring:
            true,

          recurringId:
            recurring.id,

          transferId:
            transaction.transferId,

        });

        const nextExecution =
          calculateNextExecution(
            recurring
          );

        await recurringService.update({

          ...recurring,

          lastExecution:
            today,

          nextExecution,

          updatedAt:
            Date.now(),

        });

        executedCount++;

      }

      return executedCount;

    } finally {

      isExecuting = false;

    }

  },

};