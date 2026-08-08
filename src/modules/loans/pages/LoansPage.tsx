import { useState } from "react";

import { Landmark } from "lucide-react";

import { LoanForm } from "../components/LoanForm";
import { LoanList } from "../components/LoanList";

import { useLoans } from "../hooks/useLoans";

import type { Loan } from "../types/loan";

export default function LoansPage() {

  const {

    loans,

    createLoan,

    updateLoan,

    deleteLoan,

    error,

  } = useLoans();

  const [

    showForm,

    setShowForm,

  ] = useState(false);

  const [

    editingLoan,

    setEditingLoan,

  ] = useState<
    Loan | undefined
  >();

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Préstamos
          </h1>

          <p className="text-slate-400">
            Gestiona préstamos e hipotecas
          </p>

        </div>

        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          onClick={() => {

            setEditingLoan(undefined);

            setShowForm(!showForm);

          }}
        >

          {

            showForm
              ? "Cancelar"
              : "Nuevo préstamo"

          }

        </button>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <Landmark />

            <span>
              Total préstamos
            </span>

          </div>

          <p className="mt-3 text-3xl font-bold">

            {loans.length}

          </p>

        </div>

      </div>

      {error && (

        <div className="rounded-lg border border-red-500 bg-red-950 p-3 text-red-300">

          {error}

        </div>

      )}

      {

        showForm && (

          <LoanForm

            initialLoan={
              editingLoan
            }

            submitLabel={
              editingLoan
                ? "Actualizar"
                : "Crear"
            }

            onCancel={() => {

              setEditingLoan(undefined);

              setShowForm(false);

            }}

            onSubmit={async (loan) => {

              if (editingLoan) {

                await updateLoan({

                  ...editingLoan,

                  ...loan,

                });

              } else {

                await createLoan(
                  loan
                );

              }

              setEditingLoan(undefined);

              setShowForm(false);

            }}

          />

        )

      }

      <LoanList

        loans={loans}

        onEdit={(loan) => {

          setEditingLoan(
            loan
          );

          setShowForm(true);

        }}

        onDelete={
          deleteLoan
        }

      />

    </div>

  );

}