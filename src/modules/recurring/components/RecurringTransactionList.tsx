import type {
  RecurringFrequency,
  RecurringTransaction,
} from "../types/recurringTransaction";

import {
  useRecurringTransactions,
} from "../hooks/useRecurringTransactions";

interface RecurringTransactionListProps {

  onEdit: (
    recurring: RecurringTransaction
  ) => void;

}

function formatAmount(
  amount: number
): string {

  return amount.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency: "EUR",
    }
  );

}

function formatFrequency(
  frequency: RecurringFrequency
): string {

  switch (frequency) {

    case "daily":
      return "Diaria";

    case "weekly":
      return "Semanal";

    case "monthly":
      return "Mensual";

    case "quarterly":
      return "Trimestral";

    case "yearly":
      return "Anual";

    default:
      return frequency;

  }

}

export function RecurringTransactionList({

  onEdit,

}: RecurringTransactionListProps) {

  const {

    recurringTransactions,

    isLoading,

    error,

    deleteRecurringTransaction,

  } =
    useRecurringTransactions();



  if (isLoading) {

    return (
      <div>
        Cargando operaciones recurrentes...
      </div>
    );

  }



  if (error) {

    return (
      <div>
        {error}
      </div>
    );

  }



  if (
    recurringTransactions.length === 0
  ) {

    return (
      <div>
        No hay operaciones recurrentes creadas.
      </div>
    );

  }



  return (

    <div className="space-y-4">

      {

        recurringTransactions.map(

          (
            recurring: RecurringTransaction
          ) => (

            <div
              key={recurring.id}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5"
            >

              <div>

                <strong className="text-lg">

                  {recurring.name}

                </strong>

              </div>


              <div className="mt-2">

                {formatAmount(
                  recurring.amount
                )}

              </div>


              <div className="mt-2">

                Frecuencia:{" "}

                {

                  formatFrequency(
                    recurring.frequency
                  )

                }

              </div>


              <div>

                Próxima ejecución:{" "}

                {

                  recurring.nextExecution

                }

              </div>


              <div>

                Estado:{" "}

                {

                  recurring.enabled
                    ? "Activa"
                    : "Pausada"

                }

              </div>


              <div className="mt-4 flex gap-3">

                <button
                  className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                  onClick={() =>
                    onEdit(recurring)
                  }
                >
                  Editar
                </button>

                <button
                  className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  onClick={() =>
                    deleteRecurringTransaction(
                      recurring.id
                    )
                  }
                >
                  Eliminar
                </button>

              </div>

            </div>

          )

        )

      }

    </div>

  );

}