import { useMemo, useState } from "react";
import { Badge, Button, Card, EmptyState, PageHeader, Spinner, Table } from "../../../components/ui";
import { useRecurringTransactions } from "../hooks/useRecurringTransactions";
import { RecurringTransactionForm } from "../components/RecurringTransactionForm";
import type { RecurringTransaction } from "../types/recurringTransaction";

export default function RecurringTransactionsPage() {
  const { recurringTransactions, isLoading, error, createRecurringTransaction, updateRecurringTransaction, deleteRecurringTransaction } = useRecurringTransactions();
  const [editingRecurring, setEditingRecurring] = useState<RecurringTransaction | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const enabledCount = useMemo(() => recurringTransactions.filter((item) => item.enabled).length, [recurringTransactions]);

  const handleCreate = async (payload: Omit<RecurringTransaction, "id" | "createdAt" | "updatedAt">) => {
    await createRecurringTransaction(payload);
    setIsCreating(false);
  };

  const handleUpdate = async (payload: Omit<RecurringTransaction, "id" | "createdAt" | "updatedAt">) => {
    if (!editingRecurring) {
      return;
    }

    await updateRecurringTransaction({ ...editingRecurring, ...payload });
    setEditingRecurring(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Operaciones recurrentes" subtitle="Gestiona pagos, ingresos y cargos periódicos sin perder el control del historial." action={<Button variant="primary" onClick={() => { setEditingRecurring(null); setIsCreating(true); }}>Nueva operación</Button>} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Operaciones activas" subtitle="Cantidad de operaciones recurrentes habilitadas">
          <p className="text-2xl font-semibold text-white">{enabledCount}</p>
        </Card>
        <Card title="Total registradas" subtitle="Operaciones recurrentes en el sistema">
          <p className="text-2xl font-semibold text-white">{recurringTransactions.length}</p>
        </Card>
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      {isCreating ? (
        <Card title="Crear operación recurrente" subtitle="Registra una nueva entrada periódica">
          <RecurringTransactionForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} submitLabel="Crear operación" />
        </Card>
      ) : null}

      {editingRecurring ? (
        <Card title="Editar operación recurrente" subtitle="Actualiza la entrada periódica seleccionada">
          <RecurringTransactionForm initialRecurring={editingRecurring} onSubmit={handleUpdate} onCancel={() => setEditingRecurring(null)} submitLabel="Guardar cambios" />
        </Card>
      ) : null}

      <Card title="Listado de operaciones recurrentes" subtitle="Aquí se muestran las operaciones registradas">
        {isLoading ? (
          <Spinner />
        ) : recurringTransactions.length === 0 ? (
          <EmptyState title="No existen operaciones recurrentes" description="Añade la primera entrada periódica para prepararla para su ejecución." />
        ) : (
          <div className="overflow-x-auto">
            <Table headers={["Nombre", "Tipo", "Frecuencia", "Próxima ejecución", "Estado", "Acciones"]}>
              {recurringTransactions.map((recurring) => (
                <tr key={recurring.id}>
                  <td className="px-4 py-3">{recurring.name}</td>
                  <td className="px-4 py-3"><Badge>{recurring.type}</Badge></td>
                  <td className="px-4 py-3">{recurring.frequency}</td>
                  <td className="px-4 py-3">{recurring.nextExecution}</td>
                  <td className="px-4 py-3"><Badge>{recurring.enabled ? "Activa" : "Inactiva"}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setEditingRecurring(recurring)}>Editar</Button>
                      <Button variant="ghost" size="sm" onClick={() => void deleteRecurringTransaction(recurring.id)}>Eliminar</Button>
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
