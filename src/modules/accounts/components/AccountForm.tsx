import { useEffect, useState } from "react";
import type { Account, AccountType } from "../types/account";

interface AccountFormProps {
  initialAccount?: Account;
  onSubmit: (account: Omit<Account, "id" | "createdAt">) => Promise<void> | void;
  onCancel: () => void;
  submitLabel: string;
}

const accountTypes: Array<{ value: AccountType; label: string }> = [
  { value: "checking", label: "Cuenta corriente" },
  { value: "savings", label: "Ahorro" },
  { value: "money_market", label: "Mercado monetario" },
  { value: "cash", label: "Efectivo" },
  { value: "credit_card", label: "Tarjeta" },
];

const defaultValues: Omit<Account, "id" | "createdAt"> = {
  name: "",
  type: "checking",
  balance: 0,
  color: "#06b6d4",
  icon: "wallet",
};

export function AccountForm({ initialAccount, onSubmit, onCancel, submitLabel }: AccountFormProps) {
  const [form, setForm] = useState<Omit<Account, "id" | "createdAt">>(defaultValues);

  useEffect(() => {
    if (initialAccount) {
      setForm({
        name: initialAccount.name,
        type: initialAccount.type,
        balance: initialAccount.balance,
        color: initialAccount.color,
        icon: initialAccount.icon,
      });
    }
  }, [initialAccount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          <span className="mb-2 block">Nombre</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 outline-none ring-0"
          />
        </label>

        <label className="text-sm text-slate-300">
          <span className="mb-2 block">Tipo</span>
          <select
            value={form.type}
            onChange={(event) => setForm({ ...form, type: event.target.value as AccountType })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 outline-none"
          >
            {accountTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          <span className="mb-2 block">Saldo</span>
          <input
            required
            type="number"
            step="0.01"
            value={form.balance}
            onChange={(event) => setForm({ ...form, balance: Number(event.target.value) })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 outline-none"
          />
        </label>

        <label className="text-sm text-slate-300">
          <span className="mb-2 block">Icono</span>
          <input
            value={form.icon}
            onChange={(event) => setForm({ ...form, icon: event.target.value })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 outline-none"
            placeholder="wallet"
          />
        </label>
      </div>

      <label className="block text-sm text-slate-300">
        <span className="mb-2 block">Color</span>
        <input
          type="color"
          value={form.color}
          onChange={(event) => setForm({ ...form, color: event.target.value })}
          className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/70 p-1"
        />
      </label>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
