import { useMemo, useState } from "react";
import { Badge, Button, Card, EmptyState, PageHeader, Spinner, Table } from "../../../components/ui";
import { useCategories } from "../hooks/useCategories";
import { CategoryForm } from "../components/CategoryForm";
import type { Category } from "../types/category";

export default function CategoriesPage() {
  const { categories, isLoading, error, createCategory, updateCategory, deleteCategory, ensureSystemCategories } = useCategories();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const systemCategories = useMemo(() => categories.filter((item) => item.type === "system"), [categories]);

  const handleCreate = async (payload: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
    await createCategory(payload);
    setIsCreating(false);
  };

  const handleUpdate = async (payload: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
    if (!editingCategory) {
      return;
    }

    await updateCategory({ ...editingCategory, ...payload });
    setEditingCategory(null);
  };

  const handleEnsureSystem = async () => {
    await ensureSystemCategories();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorías"
        subtitle="Gestiona las categorías del sistema de forma local y consistente."
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => void handleEnsureSystem()}>
              Crear sistema
            </Button>
            <Button variant="primary" onClick={() => {
              setEditingCategory(null);
              setIsCreating(true);
            }}>
              Nueva categoría
            </Button>
          </div>
        }
      />

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      {isCreating ? (
        <Card title="Crear categoría" subtitle="Registra una nueva categoría">
          <CategoryForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} submitLabel="Crear categoría" />
        </Card>
      ) : null}

      {editingCategory ? (
        <Card title="Editar categoría" subtitle="Actualiza los datos de la categoría seleccionada">
          <CategoryForm initialCategory={editingCategory} onSubmit={handleUpdate} onCancel={() => setEditingCategory(null)} submitLabel="Guardar cambios" isSystemCategory={systemCategories.some((item) => item.id === editingCategory.id)} />
        </Card>
      ) : null}

      <Card title="Listado de categorías" subtitle="Categorias disponibles para las transacciones">
        {isLoading ? (
          <Spinner />
        ) : categories.length === 0 ? (
          <EmptyState title="No existen categorías todavía" description="Crea las categorías del sistema o añade nuevas manualmente." />
        ) : (
          <div className="overflow-x-auto">
            <Table headers={["Nombre", "Tipo", "Icono", "Color", "Acciones"]}>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">
                    <Badge>{category.type}</Badge>
                  </td>
                  <td className="px-4 py-3">{category.icon}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setEditingCategory(category)}>
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => void deleteCategory(category.id)}>
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
