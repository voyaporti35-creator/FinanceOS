import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2, Wallet2 } from "lucide-react";
import { PanelCard } from "../../../components/ui/PanelCard";
import { useAccounts } from "../hooks/useAccounts";
import { AccountForm } from "../components/AccountForm";
import type { Account } from "../types/account";

export default function AccountsPage() {
  const { accounts, isLoading, error, createAccount, updateAccount, deleteAccount } = useAccounts();
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const totalBalance = useMemo(
    () => accounts.reduce((sum, account) => sum + account.balance, 0),
    [accounts],
  );

  const handleCreate = async (payload: Omit<Account, "id" | "createdAt">) => {
    await createAccount(payload);
    setIsCreating(false);
  };

  const handleUpdate = async (payload: Omit<Account, "id" | "createdAt">) => {
    if (!editingAccount) {
      return;
    }

    await updateAccount({ ...editingAccount, ...payload });
    setEditingAccount(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Módulo</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">Cuentas</h2>
        </div>

        <button
          onClick={() => {
            setEditingAccount(null);
            setIsCreating(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950"
        >
          <Plus className="size-4" />
          Nueva cuenta
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Total disponible</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {totalBalance.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Cuentas registradas</p>
          <p className="mt-2 text-2xl font-semibold text-white">{accounts.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Estado</p>
          <p className="mt-2 text-2xl font-semibold text-white">{isLoading ? "Cargando" : "Listo"}</p>
        </div>
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      {isCreating ? (
        <PanelCard title="Crear cuenta" subtitle="Registra una nueva cuenta para organizar tus finanzas">
          <AccountForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
            submitLabel="Crear cuenta"
          />
        </PanelCard>
      ) : null}

      {editingAccount ? (
        <PanelCard title="Editar cuenta" subtitle="Actualiza los datos de la cuenta seleccionada">
          <AccountForm
            initialAccount={editingAccount}
            onSubmit={handleUpdate}
            onCancel={() => setEditingAccount(null)}
            submitLabel="Guardar cambios"
          />
        </PanelCard>
      ) : null}

      <PanelCard title="Tus cuentas" subtitle="Gestiona tus cuentas y su saldo actual">
        {accounts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
            No existen cuentas todavía
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {accounts.map((account) => (
              <article key={account.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl p-2" style={{ backgroundColor: `${account.color}20`, color: account.color }}>
                      <Wallet2 className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{account.name}</h3>
                      <p className="text-sm text-slate-400">{account.type}</p>
                    </div>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: account.color }} />
                </div>

                <p className="mt-5 text-2xl font-semibold text-white">
                  {account.balance.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </p>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingAccount(account)}
                    className="rounded-xl border border-slate-700 p-2 text-slate-300"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={() => void deleteAccount(account.id)}
                    className="rounded-xl border border-rose-500/30 p-2 text-rose-300"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </PanelCard>
    </section>
  );
}
