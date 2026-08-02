import { useMemo, useState } from "react";
import { Badge, Button, Card, EmptyState, PageHeader, Spinner, Table } from "../../../components/ui";
import { useAccounts } from "../hooks/useAccounts";
import { AccountForm } from "../components/AccountForm";
import type { Account } from "../types/account";

export default function AccountsPage() {
  const { accounts, isLoading, error, createAccount, updateAccount, deleteAccount } = useAccounts();
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const totalBalance = useMemo(
    () => accounts.reduce((sum, account) => sum + account.initialBalance, 0),
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
    <div className="space-y-6">
      <PageHeader
        title="Cuentas"
        subtitle="Gestiona tus cuentas personales desde un único lugar."
        action={
          <Button variant="primary" onClick={() => {
            setEditingAccount(null);
            setIsCreating(true);
          }}>
            Nueva cuenta
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Saldo inicial total" subtitle="Suma de los saldos base">
          <p className="text-2xl font-semibold text-white">{totalBalance.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}</p>
        </Card>
        <Card title="Cuentas registradas" subtitle="Cantidad de cuentas guardadas">
          <p className="text-2xl font-semibold text-white">{accounts.length}</p>
        </Card>
        <Card title="Estado" subtitle="Sincronización local">
          <p className="text-2xl font-semibold text-white">{isLoading ? "Cargando" : "Listo"}</p>
        </Card>
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      {isCreating ? (
        <Card title="Crear cuenta" subtitle="Registra una nueva cuenta personal">
          <AccountForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} submitLabel="Crear cuenta" />
        </Card>
      ) : null}

      {editingAccount ? (
        <Card title="Editar cuenta" subtitle="Actualiza los datos de la cuenta seleccionada">
          <AccountForm initialAccount={editingAccount} onSubmit={handleUpdate} onCancel={() => setEditingAccount(null)} submitLabel="Guardar cambios" />
        </Card>
      ) : null}

      <Card title="Listado de cuentas" subtitle="Aquí se muestran las cuentas registradas en Dexie">
        {isLoading ? (
          <Spinner />
        ) : accounts.length === 0 ? (
          <EmptyState title="No existen cuentas todavía" description="Crea tu primera cuenta para empezar a organizar tus finanzas." />
        ) : (
          <div className="overflow-x-auto">
            <Table headers={["Nombre", "Tipo", "Saldo inicial", "Moneda", "Acciones"]}>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-4 py-3">{account.name}</td>
                  <td className="px-4 py-3">
                    <Badge>{account.type}</Badge>
                  </td>
                  <td className="px-4 py-3">{account.initialBalance.toLocaleString("es-ES", { style: "currency", currency: account.currency })}</td>
                  <td className="px-4 py-3">{account.currency}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setEditingAccount(account)}>
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => void deleteAccount(account.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
