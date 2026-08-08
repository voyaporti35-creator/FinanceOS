import { useState } from "react";

import {
  CalendarClock,
} from "lucide-react";

import {
  RecurringTransactionForm,
} from "../components/RecurringTransactionForm";

import {
  RecurringTransactionList,
} from "../components/RecurringTransactionList";

import {
  useRecurringTransactions,
} from "../hooks/useRecurringTransactions";

import type {
  RecurringTransaction,
} from "../types/recurringTransaction";

export default function RecurringTransactionsPage() {

  const {

    createRecurringTransaction,

    updateRecurringTransaction,

    recurringTransactions,

    error,

  } =
    useRecurringTransactions();



  const [showForm, setShowForm] =
    useState(false);



  const [

    editingRecurring,

    setEditingRecurring,

  ] =
    useState<
      RecurringTransaction | undefined
    >();



  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Operaciones recurrentes
          </h1>

          <p className="text-slate-400">
            Gestiona ingresos y gastos automáticos
          </p>

        </div>



        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          onClick={() => {

            setEditingRecurring(undefined);

            setShowForm(!showForm);

          }}
        >

          {
            showForm
              ? "Cancelar"
              : "Nueva recurrencia"
          }

        </button>

      </div>





      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <CalendarClock />

            <span>
              Total recurrencias
            </span>

          </div>

          <p className="mt-3 text-3xl font-bold">

            {recurringTransactions.length}

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

          <RecurringTransactionForm

            initialRecurring={
              editingRecurring
            }

            submitLabel={
              editingRecurring
                ? "Actualizar"
                : "Crear"
            }

            onCancel={() => {

              setEditingRecurring(undefined);

              setShowForm(false);

            }}

            onSubmit={async (

              recurring:
                Omit<
                  RecurringTransaction,
                  "id" |
                  "createdAt" |
                  "updatedAt"
                >

            ) => {

              if (editingRecurring) {

                await updateRecurringTransaction({

                  ...editingRecurring,

                  ...recurring,

                });

              } else {

                await createRecurringTransaction(
                  recurring
                );

              }

              setEditingRecurring(undefined);

              setShowForm(false);

            }}

          />

        )

      }






      <RecurringTransactionList

        onEdit={(recurring) => {

          setEditingRecurring(
            recurring
          );

          setShowForm(true);

        }}

      />

    </div>

  );

}