import { useEffect, useState } from "react";
import { Button, Input, Select } from "../../../components/ui";
import type { Transaction, TransactionType } from "../types/transaction";

interface TransactionFormProps {
  initialTransaction?: Transaction;
  onSubmit: (transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => Promise<void> | void;
  onCancel: () => void;
  submitLabel: string;
}

const defaultValues: Omit<Transaction, "id" | "createdAt" | "updatedAt"> = {
  date: new Date().toISOString().slice(0, 10),
  amount: 0,
  description: "",
  accountId: "",
  categoryId: "",
  type: "expense",
  notes: "",
  tags: [],
};

const transactionTypes: Array<{ value: TransactionType; label: string }> = [
  { value: "income", label: "Ingreso" },
  { value: "expense", label: "Gasto" },
  { value: "transfer", label: "Transferencia" },
  { value: "adjustment", label: "Ajuste" },
];

export function TransactionForm({ initialTransaction, onSubmit, onCancel, submitLabel }: TransactionFormProps) {
  const [form, setForm] = useState<Omit<Transaction, "id" | "createdAt" | "updatedAt">>(defaultValues);

  useEffect(() => {
    if (initialTransaction) {
      setForm({
        date: initialTransaction.date,
        amount: initialTransaction.amount,
        description: initialTransaction.description,
        accountId: initialTransaction.accountId,
        categoryId: initialTransaction.categoryId,
        type: initialTransaction.type,
        notes: initialTransaction.notes,
        tags: initialTransaction.tags,
      });
    }
  }, [initialTransaction]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Fecha" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
        <Input label="Importe" type="number" step="0.01" value={form.amount} onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })} />
      </div>

      <Input label="Descripción" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Cuenta" value={form.accountId} onChange={(event) => setForm({ ...form, accountId: event.target.value })} />
        <Input label="Categoría" value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} />
      </div>

      <Select
        label="Tipo"
        value={form.type}
        onChange={(event) => setForm({ ...form, type: event.target.value as TransactionType })}
        options={transactionTypes}
      />

      <Input label="Notas" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
      <Input label="Etiquetas (separadas por coma)" value={form.tags.join(", ")} onChange={(event) => setForm({ ...form, tags: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
