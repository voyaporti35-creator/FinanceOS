import { useEffect, useMemo, useState } from "react";
import { Button, Input, Select } from "../../../components/ui";
import { useAccountStore } from "../../accounts/store/accountStore";
import { useCategories } from "../../categories/hooks/useCategories";
import type { Transaction, TransactionType } from "../types/transaction";

interface TransactionFormProps {
  initialTransaction?: Transaction;
  onSubmit: (
    transaction: Omit<Transaction, "id" | "createdAt">
  ) => Promise<void> | void;
  onCancel: () => void;
  submitLabel: string;
}

const defaultValues: Omit<Transaction, "id" | "createdAt"> = {
  date: new Date().toISOString().slice(0, 10),
  amount: 0,
  description: "",
  accountId: "",
  destinationAccountId: undefined,
  type: "expense",
  category: undefined,
  transferId: undefined,
};

const transactionTypes: Array<{
  value: TransactionType;
  label: string;
}> = [
  { value: "income", label: "Ingreso" },
  { value: "expense", label: "Gasto" },
  { value: "transfer", label: "Transferencia" },
];

export function TransactionForm({
  initialTransaction,
  onSubmit,
  onCancel,
  submitLabel,
}: TransactionFormProps) {
  const accounts = useAccountStore((state) => state.accounts);

  const loadAccounts = useAccountStore(
    (state) => state.loadAccounts
  );

  const { categories, ensureSystemCategories } =
    useCategories();

  const [form, setForm] = useState<
    Omit<Transaction, "id" | "createdAt">
  >(defaultValues);

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  useEffect(() => {
    void ensureSystemCategories();
  }, [ensureSystemCategories]);

  useEffect(() => {
    if (initialTransaction) {
      setForm({
        date: initialTransaction.date,
        amount: initialTransaction.amount,
        description: initialTransaction.description,
        accountId: initialTransaction.accountId,
        destinationAccountId:
          initialTransaction.destinationAccountId,
        type: initialTransaction.type,
        category: initialTransaction.category,
        transferId: initialTransaction.transferId,
      });
    }
  }, [initialTransaction]);

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        value: account.id,
        label: account.name,
      })),
    [accounts]
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories]
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (form.type === "transfer") {
      if (
        !form.accountId ||
        !form.destinationAccountId ||
        form.accountId === form.destinationAccountId ||
        form.amount <= 0
      ) {
        return;
      }

      if (
        !accounts.some((a) => a.id === form.accountId) ||
        !accounts.some(
          (a) => a.id === form.destinationAccountId
        )
      ) {
        return;
      }
    } else {
      if (!form.accountId || form.amount <= 0) {
        return;
      }
    }

    await onSubmit(form);
  };

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
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
              amount: Number(event.target.value),
            })
          }
        />
      </div>

      <Input
        label="Descripción"
        value={form.description ?? ""}
        onChange={(event) =>
          setForm({
            ...form,
            description: event.target.value,
          })
        }
      />

      <Select
        label="Tipo"
        value={form.type}
        onChange={(event) =>
          setForm({
            ...form,
            type: event.target.value as TransactionType,
          })
        }
        options={transactionTypes}
      />

      {form.type === "transfer" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Cuenta origen"
            value={form.accountId}
            onChange={(event) =>
              setForm({
                ...form,
                accountId: event.target.value,
              })
            }
            options={accountOptions}
          />

          <Select
            label="Cuenta destino"
            value={form.destinationAccountId ?? ""}
            onChange={(event) =>
              setForm({
                ...form,
                destinationAccountId: event.target.value,
              })
            }
            options={accountOptions}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Cuenta"
            value={form.accountId}
            onChange={(event) =>
              setForm({
                ...form,
                accountId: event.target.value,
              })
            }
            options={accountOptions}
          />

          <Select
            label="Categoría"
            value={form.category ?? ""}
            onChange={(event) =>
              setForm({
                ...form,
                category: event.target.value,
              })
            }
            options={categoryOptions}
          />
        </div>
      )}

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