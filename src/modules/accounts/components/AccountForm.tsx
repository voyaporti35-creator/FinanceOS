import { useEffect, useState } from "react";
import { Button, Input, Select } from "../../../components/ui";
import type { Account, AccountType } from "../types/account";

interface AccountFormProps {
  initialAccount?: Account;
  onSubmit: (account: Omit<Account, "id" | "createdAt">) => Promise<void> | void;
  onCancel: () => void;
  submitLabel: string;
}

const accountTypes: Array<{ value: AccountType; label: string }> = [
  { value: "bank", label: "Banco" },
  { value: "cash", label: "Efectivo" },
  { value: "savings", label: "Ahorro" },
  { value: "card", label: "Tarjeta" },
];

const defaultValues: Omit<Account, "id" | "createdAt"> = {
  name: "",
  type: "bank",
  initialBalance: 0,
  currency: "EUR",
};

export function AccountForm({
  initialAccount,
  onSubmit,
  onCancel,
  submitLabel,
}: AccountFormProps) {
  const [form, setForm] =
    useState<Omit<Account, "id" | "createdAt">>(defaultValues);

  useEffect(() => {
    if (initialAccount) {
      setForm({
        name: initialAccount.name,
        type: initialAccount.type,
        initialBalance: initialAccount.initialBalance,
        currency: initialAccount.currency,
      });
    } else {
      setForm(defaultValues);
    }
  }, [initialAccount]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    await onSubmit({
      ...form,
      name: form.name.trim(),
      currency: form.currency.trim().toUpperCase(),
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nombre"
          value={form.name}
          onChange={(event) =>
            setForm({
              ...form,
              name: event.target.value,
            })
          }
          required
        />

        <Select
          label="Tipo"
          value={form.type}
          onChange={(event) =>
            setForm({
              ...form,
              type: event.target.value as AccountType,
            })
          }
          options={accountTypes}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Saldo inicial"
          type="number"
          step="0.01"
          value={form.initialBalance}
          onChange={(event) =>
            setForm({
              ...form,
              initialBalance: Number(event.target.value) || 0,
            })
          }
          required
        />

        <Input
          label="Moneda"
          maxLength={3}
          value={form.currency}
          onChange={(event) =>
            setForm({
              ...form,
              currency: event.target.value.toUpperCase(),
            })
          }
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}