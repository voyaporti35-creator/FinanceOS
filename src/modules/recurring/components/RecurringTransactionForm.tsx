import { useMemo, useState } from "react";
import { Button, Input, Select } from "../../../components/ui";
import { useAccountStore } from "../../accounts/store/accountStore";
import { useCategories } from "../../categories/hooks/useCategories";
import type { RecurringFrequency, RecurringTransaction, RecurringTransactionType } from "../types/recurringTransaction";

interface RecurringTransactionFormProps {
  initialRecurring?: RecurringTransaction;
  onSubmit: (recurring: Omit<RecurringTransaction, "id" | "createdAt" | "updatedAt">) => Promise<void> | void;
  onCancel: () => void;
  submitLabel: string;
}

const frequencyOptions: Array<{ value: RecurringFrequency; label: string }> = [
  { value: "daily", label: "Diaria" },
  { value: "weekly", label: "Semanal" },
  { value: "monthly", label: "Mensual" },
  { value: "quarterly", label: "Trimestral" },
  { value: "yearly", label: "Anual" },
];

const typeOptions: Array<{ value: RecurringTransactionType; label: string }> = [
  { value: "income", label: "Ingreso" },
  { value: "expense", label: "Gasto" },
];

const defaultValues: Omit<RecurringTransaction, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  enabled: true,
  amount: 0,
  type: "expense",
  accountId: "",
  categoryId: undefined,
  frequency: "monthly",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: undefined,
  lastExecution: undefined,
  nextExecution: new Date().toISOString().slice(0, 10),
  notes: "",
};

export function RecurringTransactionForm({ initialRecurring, onSubmit, onCancel, submitLabel }: RecurringTransactionFormProps) {
  const accounts = useAccountStore((state) => state.accounts);
  const { categories } = useCategories();
  const [form, setForm] = useState<Omit<RecurringTransaction, "id" | "createdAt" | "updatedAt">>(initialRecurring ? { name: initialRecurring.name, enabled: initialRecurring.enabled, amount: initialRecurring.amount, type: initialRecurring.type, accountId: initialRecurring.accountId, categoryId: initialRecurring.categoryId, frequency: initialRecurring.frequency, startDate: initialRecurring.startDate, endDate: initialRecurring.endDate, lastExecution: initialRecurring.lastExecution, nextExecution: initialRecurring.nextExecution, notes: initialRecurring.notes ?? "" } : defaultValues);

  const accountOptions = useMemo(() => accounts.map((account) => ({ value: account.id, label: account.name })), [accounts]);
  const categoryOptions = useMemo(() => categories.map((category) => ({ value: category.id, label: category.name })), [categories]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Nombre" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <Select label="Tipo" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as RecurringTransactionType })} options={typeOptions} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Importe" type="number" step="0.01" value={form.amount} onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })} />
        <Select label="Frecuencia" value={form.frequency} onChange={(event) => setForm({ ...form, frequency: event.target.value as RecurringFrequency })} options={frequencyOptions} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Cuenta" value={form.accountId} onChange={(event) => setForm({ ...form, accountId: event.target.value })} options={accountOptions} />
        <Select label="Categoría" value={form.categoryId ?? ""} onChange={(event) => setForm({ ...form, categoryId: event.target.value || undefined })} options={[{ value: "", label: "Sin categoría" }, ...categoryOptions]} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Fecha de inicio" type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} />
        <Input label="Fecha de fin" type="date" value={form.endDate ?? ""} onChange={(event) => setForm({ ...form, endDate: event.target.value || undefined })} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Próxima ejecución" type="date" value={form.nextExecution} onChange={(event) => setForm({ ...form, nextExecution: event.target.value })} />
        <Input label="Última ejecución" type="date" value={form.lastExecution ?? ""} onChange={(event) => setForm({ ...form, lastExecution: event.target.value || undefined })} />
      </div>

      <Input label="Notas" value={form.notes ?? ""} onChange={(event) => setForm({ ...form, notes: event.target.value })} />

      <div className="flex items-center gap-2">
        <input id="enabled" type="checkbox" checked={form.enabled} onChange={(event) => setForm({ ...form, enabled: event.target.checked })} />
        <label htmlFor="enabled" className="text-sm text-slate-300">Activa</label>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary">{submitLabel}</Button>
      </div>
    </form>
  );
}
