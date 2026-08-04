import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  PageHeader,
  Spinner,
  Table,
} from "../../../components/ui";

import { useAccounts } from "../../accounts/hooks/useAccounts";
import { useCategories } from "../../categories/hooks/useCategories";
import { TransactionForm } from "../components/TransactionForm";
import { useTransactions } from "../hooks/useTransactions";
import type { Transaction } from "../types/transaction";

export default function TransactionsPage() {
  const {
    transactions,
    isLoading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const { accounts } = useAccounts();
  const { categories } = useCategories();

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const [isCreating, setIsCreating] = useState(false);

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const handleCreate = async (
    payload: Omit<Transaction, "id" | "createdAt">
  ) => {
    await createTransaction(payload);
    setIsCreating(false);
  };

  const handleUpdate = async (
    payload: Omit<Transaction, "id" | "createdAt">
  ) => {
    if (!editingTransaction) return;

    await updateTransaction({
      ...editingTransaction,
      ...payload,
    });

    setEditingTransaction(null);
  };

  const accountName = (id: string) =>
    accounts.find((a) => a.id === id)?.name ?? "-";

  const categoryName = (id?: string) =>
    categories.find((c) => c.id === id)?.name ?? "-";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Movimientos"
        subtitle="Todos los ingresos, gastos y transferencias."
        action={
          <Button
            variant="primary"
            onClick={() => {
              setEditingTransaction(null);
              setIsCreating(true);
            }}
          >
            Nuevo movimiento
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card
          title="Ingresos"
          subtitle="Total registrado"
        >
          <p className="text-2xl font-semibold text-emerald-400">
            {totalIncome.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </Card>

        <Card
          title="Gastos"
          subtitle="Total registrado"
        >
          <p className="text-2xl font-semibold text-red-400">
            {totalExpense.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </Card>

        <Card
          title="Movimientos"
          subtitle="Número total"
        >
          <p className="text-2xl font-semibold text-white">
            {transactions.length}
          </p>
        </Card>
      </div>

      {error && (
        <p className="text-red-400">{error}</p>
      )}

      {isCreating && (
        <Card
          title="Nuevo movimiento"
          subtitle="Registrar movimiento"
        >
          <TransactionForm
            submitLabel="Guardar"
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
          />
        </Card>
      )}

      {editingTransaction && (
        <Card
          title="Editar movimiento"
          subtitle="Modificar datos"
        >
          <TransactionForm
            initialTransaction={editingTransaction}
            submitLabel="Actualizar"
            onSubmit={handleUpdate}
            onCancel={() =>
              setEditingTransaction(null)
            }
          />
        </Card>
      )}

      <Card
        title="Historial"
        subtitle="Todos los movimientos"
      >
        {isLoading ? (
          <Spinner />
        ) : transactions.length === 0 ? (
          <EmptyState
            title="No hay movimientos"
            description="Registra el primero."
          />
        ) : (
          <div className="overflow-x-auto">
            <Table
              headers={[
                "Fecha",
                "Tipo",
                "Cuenta",
                "Categoría",
                "Importe",
                "Acciones",
              ]}
            >
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-4 py-3">
                    {transaction.date}
                  </td>

                  <td className="px-4 py-3">
                    <Badge>
                      {transaction.type}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    {accountName(
                      transaction.accountId
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {categoryName(
                      transaction.category
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {transaction.amount.toLocaleString(
                      "es-ES",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          setEditingTransaction(
                            transaction
                          )
                        }
                      >
                        Editar
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          void deleteTransaction(
                            transaction.id
                          )
                        }
                      >
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