import { useEffect, useMemo, useState } from "react";

import { Button, Input, Select } from "../../../components/ui";

import { useAccountStore } from "../../accounts/store/accountStore";
import { useCategories } from "../../categories/hooks/useCategories";

import type {
  Transaction,
  TransactionType,
} from "../types/transaction";


interface TransactionFormProps {

  initialTransaction?: Transaction;

  onSubmit: (
    transaction: Omit<
      Transaction,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void> | void;

  onCancel: () => void;

  submitLabel: string;

}


const defaultValues: Omit<
  Transaction,
  "id" | "createdAt" | "updatedAt"
> = {

  date: new Date()
    .toISOString()
    .slice(0, 10),

  amount: 0,

  description: "",

  accountId: "",

  destinationAccountId: undefined,

  type: "expense",

  category: undefined,

  transferId: undefined,

  notes: "",

  isRecurring: false,

  recurringId: undefined,

};


const transactionTypes: Array<{
  value: TransactionType;
  label: string;
}> = [

  {
    value: "income",
    label: "Ingreso",
  },

  {
    value: "expense",
    label: "Gasto",
  },

  {
    value: "transfer",
    label: "Transferencia",
  },

];


export function TransactionForm({
  initialTransaction,
  onSubmit,
  onCancel,
  submitLabel,
}: TransactionFormProps) {


  const accounts = useAccountStore(
    (state) => state.accounts
  );


  const loadAccounts = useAccountStore(
    (state) => state.loadAccounts
  );


  const {
    categories,
    ensureSystemCategories,
  } = useCategories();



  const [form, setForm] = useState<
    Omit<
      Transaction,
      "id" | "createdAt" | "updatedAt"
    >
  >(defaultValues);



  useEffect(() => {

    void loadAccounts();

  }, [loadAccounts]);



  useEffect(() => {

    void ensureSystemCategories();

  }, [ensureSystemCategories]);



  useEffect(() => {

    if (!initialTransaction) {
      return;
    }


    setForm({

      date: initialTransaction.date,

      amount: initialTransaction.amount,

      description: initialTransaction.description,

      accountId: initialTransaction.accountId,

      destinationAccountId:
        initialTransaction.destinationAccountId,

      type: initialTransaction.type,

      category:
        initialTransaction.category,

      transferId:
        initialTransaction.transferId,

      notes:
        initialTransaction.notes,

      isRecurring:
        initialTransaction.isRecurring,

      recurringId:
        initialTransaction.recurringId,

    });


  }, [initialTransaction]);



  const accountOptions = useMemo(
    () =>
      accounts.map(
        (account) => ({
          value: account.id,
          label: account.name,
        })
      ),

    [accounts]
  );



  const categoryOptions = useMemo(
    () =>
      categories.map(
        (category) => ({
          value: category.id,
          label: category.name,
        })
      ),

    [categories]
  );



  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    

    if (!form.accountId) {

      console.log(
        "SIN CUENTA ORIGEN"
      );

      return;

    }


    if (form.amount <= 0) {

      console.log(
        "IMPORTE INVALIDO"
      );

      return;

    }


    if (
      form.type === "transfer" &&
      !form.destinationAccountId
    ) {

      console.log(
        "TRANSFERENCIA SIN DESTINO",
        form
      );

      return;

    }



    await onSubmit({

      ...form,

      destinationAccountId:
        form.type === "transfer"
          ? form.destinationAccountId
          : undefined,

    });


  };



  return (

    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >


      <Input
        label="Fecha"
        type="date"
        value={form.date}
        onChange={(event) =>
          setForm({
            ...form,
            date: event.target.value,
          })
        }
      />



      <Input
        label="Importe"
        type="number"
        step="0.01"
        value={form.amount}
        onChange={(event) =>
          setForm({
            ...form,
            amount:
              Number(event.target.value),
          })
        }
      />



      <Input
        label="Descripción"
        value={form.description ?? ""}
        onChange={(event) =>
          setForm({
            ...form,
            description:
              event.target.value,
          })
        }
      />



      <Select
        label="Tipo"
        value={form.type}
        options={transactionTypes}
        onChange={(event) => {

          const type =
            event.target.value as TransactionType;


          setForm({
            ...form,

            type,

            destinationAccountId:
              type === "transfer"
                ? form.destinationAccountId
                : undefined,

          });

        }}
      />



      <Select
        label="Cuenta origen"
        value={form.accountId}
        options={[
          {
            value: "",
            label: "Selecciona cuenta",
          },
          ...accountOptions,
        ]}
        onChange={(event) =>
          setForm({
            ...form,
            accountId:
              event.target.value,
          })
        }
      />



      {
        form.type === "transfer" && (

          <Select
            label="Cuenta destino"
            value={
              form.destinationAccountId ?? ""
            }
            options={[
              {
                value: "",
                label: "Selecciona cuenta destino",
              },

              ...accountOptions.filter(
                (account) =>
                  account.value !== form.accountId
              ),
            ]}

            onChange={(event) => {

              


              setForm((previous) => ({

                ...previous,

                destinationAccountId:
                  event.target.value ||
                  undefined,

              }));

            }}

          />

        )
      }



      {
        form.type !== "transfer" && (

          <Select
            label="Categoría"
            value={
              form.category ?? ""
            }
            options={[
              {
                value: "",
                label: "Selecciona categoría",
              },

              ...categoryOptions,
            ]}
            onChange={(event) =>
              setForm({
                ...form,
                category:
                  event.target.value ||
                  undefined,
              })
            }
          />

        )
      }



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