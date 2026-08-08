import type { Loan } from "../types/loan";

interface LoanListProps {

  loans: Loan[];

  onEdit: (
    loan: Loan
  ) => void;

  onDelete: (
    id: string
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

export function LoanList({

  loans,

  onEdit,

  onDelete,

}: LoanListProps) {

  if (loans.length === 0) {

    return (

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center text-slate-400">

        No hay préstamos registrados.

      </div>

    );

  }

  return (

    <div className="space-y-4">

      {

        loans.map((loan) => (

          <div
            key={loan.id}
            className="rounded-xl border border-slate-700 bg-slate-900 p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-lg font-semibold">

                  {loan.name}

                </h3>

                <p className="text-sm text-slate-400">

                  {loan.lender}

                </p>

              </div>

              <div className="text-right">

                <div className="font-semibold">

                  {formatAmount(
                    loan.remainingAmount
                  )}

                </div>

                <div className="text-sm text-slate-400">

                  Pendiente

                </div>

              </div>

            </div>

            <div className="mt-4 grid gap-2 md:grid-cols-3">

              <div>

                <span className="text-slate-400">
                  Cuota
                </span>

                <div>

                  {formatAmount(
                    loan.monthlyPayment
                  )}

                </div>

              </div>

              <div>

                <span className="text-slate-400">
                  Interés
                </span>

                <div>

                  {loan.interestRate.toFixed(3)} %

                </div>

              </div>

              <div>

                <span className="text-slate-400">
                  Próximo pago
                </span>

                <div>

                  {loan.nextPayment}

                </div>

              </div>

            </div>

            <div className="mt-5 flex gap-3">

              <button
                className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                onClick={() =>
                  onEdit(loan)
                }
              >
                Editar
              </button>

              <button
                className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                onClick={() =>
                  onDelete(
                    loan.id
                  )
                }
              >
                Eliminar
              </button>

            </div>

          </div>

        ))

      }

    </div>

  );

}