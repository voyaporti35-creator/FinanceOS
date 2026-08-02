import { useMemo, useState } from "react";
import { Badge, Button, Card, EmptyState, PageHeader, Spinner, Table } from "../../../components/ui";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionForm } from "../components/TransactionForm";
import { formatCurrency, formatTransactionType } from "../utils/transactionUtils";
import type { Transaction } from "../types/transaction";

export default function TransactionsPage() {
  const { transactions, isLoading, error, createTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const totalAmount = useMemo(() => transactions.reduce((sum, transaction) => sum + transaction.amount, 0), [transactions]);

  const handleCreate = async (payload: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
    await createTransaction(payload);
    setIsCreating(false);
  };

  const handleUpdate = async (payload: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
    if (!editingTransaction) {
      return;
    }

    await updateTransaction({ ...editingTransaction, ...payload });
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transacciones"
        subtitle="Gestiona tus movimientos financieros desde un único lugar."
        action={
          <Button variant="primary" onClick={() => {
            setEditingTransaction(null);
            setIsCreating(true);
          }}>
            Nueva transacción
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Total del periodo" subtitle="Suma de movimientos registrados">
          <p className="text-2xl font-semibold text-white">{formatCurrency(totalAmount)}</p>
        </Card>
        <Card title="Movimientos" subtitle="Cantidad registrada">
          <p className="text-2xl font-semibold text-white">{transactions.length}</p>
        </Card>
        <Card title="Estado" subtitle="Sincronización local">
          <p className="text-2xl font-semibold text-white">{isLoading ? "Cargando" : "Listo"}</p>
        </Card>
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      {isCreating ? (
        <Card title="Nueva transacción" subtitle="Registra un movimiento financiero">
          <TransactionForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} submitLabel="Crear transacción" />
        </Card>
      ) : null}

      {editingTransaction ? (
        <Card title="Editar transacción" subtitle="Actualiza los datos del movimiento">
          <TransactionForm initialTransaction={editingTransaction} onSubmit={handleUpdate} onCancel={() => setEditingTransaction(null)} submitLabel="Guardar cambios" />
        </Card>
      ) : null}

      <Card title="Movimientos" subtitle="Listado de transacciones registradas">
        {isLoading ? (
          <Spinner />
        ) : transactions.length === 0 ? (
          <EmptyState title="No existen movimientos todavía" description="Registra tu primera transacción para empezar a construir el ledger." />
        ) : (
          <div className="overflow-x-auto">
            <Table headers={["Fecha", "Descripción", "Cuenta", "Categoría", "Tipo", "Importe", "Acciones"]}>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-4 py-3">{transaction.date}</td>
                  <td className="px-4 py-3">{transaction.description}</td>
                  <td className="px-4 py-3">{transaction.accountId}</td>
                  <td className="px-4 py-3">{transaction.categoryId}</td>
                  <td className="px-4 py-3">
                    <Badge tone={transaction.type === "income" ? "positive" : transaction.type === "expense" ? "warning" : "default"}>{formatTransactionType(transaction.type)}</Badge>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(transaction.amount)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setEditingTransaction(transaction)}>
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => void deleteTransaction(transaction.id)}>
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
