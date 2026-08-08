import { useMemo, useState } from "react";

import { Button, Input, Select } from "../../../components/ui";

import { useAccountStore } from "../../accounts/store/accountStore";

import type { Loan } from "../types/loan";

interface LoanFormProps {

  initialLoan?: Loan;

  onSubmit: (
    loan: Omit<
      Loan,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void> | void;

  onCancel: () => void;

  submitLabel: string;

}

const defaultValues:
Omit<
  Loan,
  "id" | "createdAt" | "updatedAt"
> = {

  name: "",

  lender: "",

  accountId: "",

  categoryId: undefined,

  originalAmount: 0,

  remainingAmount: 0,

  interestRate: 0,

  monthlyPayment: 0,

  termMonths: 0,

  startDate:
    new Date()
      .toISOString()
      .slice(0, 10),

  nextPayment:
    new Date()
      .toISOString()
      .slice(0, 10),

  paymentDay:
    new Date().getDate(),

  isActive: true,

  notes: "",

};

export function LoanForm({

  initialLoan,

  onSubmit,

  onCancel,

  submitLabel,

}: LoanFormProps) {

  const accounts =
    useAccountStore(
      (state) => state.accounts
    );

  const accountOptions =
    useMemo(

      () =>

        accounts.map(
          (account) => ({

            value: account.id,

            label: account.name,

          })
        ),

      [accounts]

    );

  const [form, setForm] =
    useState(

      initialLoan
        ? {

            name:
              initialLoan.name,

            lender:
              initialLoan.lender,

            accountId:
              initialLoan.accountId,

            categoryId:
              initialLoan.categoryId,

            originalAmount:
              initialLoan.originalAmount,

            remainingAmount:
              initialLoan.remainingAmount,

            interestRate:
              initialLoan.interestRate,

            monthlyPayment:
              initialLoan.monthlyPayment,

            termMonths:
              initialLoan.termMonths,

            startDate:
              initialLoan.startDate,

            nextPayment:
              initialLoan.nextPayment,

            paymentDay:
              initialLoan.paymentDay,

            isActive:
              initialLoan.isActive,

            notes:
              initialLoan.notes ?? "",

          }

        : defaultValues

    );

  const handleSubmit = async (
    event:
      React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    await onSubmit(form);

  };

  return (

    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >

      <Input
        label="Nombre"
        value={form.name}
        onChange={(event) =>
          setForm({
            ...form,
            name: event.target.value,
          })
        }
      />

      <Input
        label="Entidad"
        value={form.lender}
        onChange={(event) =>
          setForm({
            ...form,
            lender: event.target.value,
          })
        }
      />

      <Select
        label="Cuenta"
        value={form.accountId}
        options={accountOptions}
        onChange={(event) =>
          setForm({
            ...form,
            accountId:
              event.target.value,
          })
        }
      />

      <Input
        label="Capital inicial"
        type="number"
        value={form.originalAmount}
        onChange={(event) =>
          setForm({
            ...form,
            originalAmount:
              Number(
                event.target.value
              ),
          })
        }
      />

      <Input
        label="Capital pendiente"
        type="number"
        value={form.remainingAmount}
        onChange={(event) =>
          setForm({
            ...form,
            remainingAmount:
              Number(
                event.target.value
              ),
          })
        }
      />

      <Input
        label="Interés (%)"
        type="number"
        step="0.001"
        value={form.interestRate}
        onChange={(event) =>
          setForm({
            ...form,
            interestRate:
              Number(
                event.target.value
              ),
          })
        }
      />

      <Input
        label="Cuota mensual"
        type="number"
        value={form.monthlyPayment}
        onChange={(event) =>
          setForm({
            ...form,
            monthlyPayment:
              Number(
                event.target.value
              ),
          })
        }
      />

      <Input
        label="Plazo (meses)"
        type="number"
        value={form.termMonths}
        onChange={(event) =>
          setForm({
            ...form,
            termMonths:
              Number(
                event.target.value
              ),
          })
        }
      />

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="primary"
        >
          {submitLabel}
        </Button>

      </div>

    </form>

  );

}