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

import { useCategories } from "../hooks/useCategories";
import { CategoryForm } from "../components/CategoryForm";
import type { Category } from "../types/category";

export default function CategoriesPage() {
  const {
    categories,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    ensureSystemCategories,
    cleanupDuplicates,
  } = useCategories();

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [isCreating, setIsCreating] =
    useState(false);

  const [isEnsuringSystem, setIsEnsuringSystem] =
    useState(false);

  const [isCleaningDuplicates, setIsCleaningDuplicates] =
    useState(false);

  const [systemMessage, setSystemMessage] =
    useState<string | null>(null);

  const [cleanupMessage, setCleanupMessage] =
    useState<string | null>(null);

  const systemCategories = useMemo(
    () =>
      categories.filter(
        (item) => item.type === "system"
      ),
    [categories]
  );

  const handleCreate = async (
    payload: Omit<
      Category,
      "id" | "createdAt" | "updatedAt"
    >
  ) => {
    await createCategory(payload);
    setIsCreating(false);
  };

  const handleUpdate = async (
    payload: Omit<
      Category,
      "id" | "createdAt" | "updatedAt"
    >
  ) => {
    if (!editingCategory) {
      return;
    }

    await updateCategory({
      ...editingCategory,
      ...payload,
    });

    setEditingCategory(null);
  };

  const handleEnsureSystem = async () => {
    console.log("CREAR SISTEMA - CLICK");

    if (isEnsuringSystem) {
      return;
    }

    setIsEnsuringSystem(true);
    setSystemMessage(null);
    setCleanupMessage(null);

    try {
      const result =
        await ensureSystemCategories();

      setSystemMessage(
        `Sistema comprobado. Categorías creadas: ${result.created}. Total actual: ${result.total}.`
      );
    } catch (error) {
      setSystemMessage(
        error instanceof Error
          ? error.message
          : "No se pudo comprobar el sistema de categorías."
      );
    } finally {
      setIsEnsuringSystem(false);
    }
  };

  const handleCleanupDuplicates = async () => {
    console.log("LIMPIAR DUPLICADOS - CLICK");

    if (isCleaningDuplicates) {
      return;
    }

    setIsCleaningDuplicates(true);
    setCleanupMessage(null);
    setSystemMessage(null);

    try {
      const result =
        await cleanupDuplicates();

      setCleanupMessage(
        `Limpieza completada. Categorías eliminadas: ${result.removed}. Transacciones reasignadas: ${result.reassignedTransactions}.`
      );
    } catch (error) {
      setCleanupMessage(
        error instanceof Error
          ? error.message
          : "No se pudieron limpiar los duplicados."
      );
    } finally {
      setIsCleaningDuplicates(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorías"
        subtitle="Gestiona las categorías del sistema de forma local y consistente."
        action={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                void handleCleanupDuplicates()
              }
              disabled={isCleaningDuplicates}
            >
              {isCleaningDuplicates
                ? "Limpiando..."
                : "Limpiar duplicados"}
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                void handleEnsureSystem()
              }
              disabled={isEnsuringSystem}
            >
              {isEnsuringSystem
                ? "Comprobando..."
                : "Crear sistema"}
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                setEditingCategory(null);
                setIsCreating(true);
              }}
            >
              Nueva categoría
            </Button>
          </div>
        }
      />

      {error ? (
        <p className="text-sm text-red-300">
          {error}
        </p>
      ) : null}

      {systemMessage ? (
        <Card
          title="Sistema de categorías"
          subtitle="Resultado de la comprobación"
        >
          <p className="text-sm">
            {systemMessage}
          </p>
        </Card>
      ) : null}

      {cleanupMessage ? (
        <Card
          title="Limpieza completada"
          subtitle="Resultado de la limpieza de categorías duplicadas"
        >
          <p className="text-sm">
            {cleanupMessage}
          </p>
        </Card>
      ) : null}

      {isCreating ? (
        <Card
          title="Crear categoría"
          subtitle="Registra una nueva categoría"
        >
          <CategoryForm
            onSubmit={handleCreate}
            onCancel={() =>
              setIsCreating(false)
            }
            submitLabel="Crear categoría"
          />
        </Card>
      ) : null}

      {editingCategory ? (
        <Card
          title="Editar categoría"
          subtitle="Actualiza los datos de la categoría seleccionada"
        >
          <CategoryForm
            initialCategory={editingCategory}
            onSubmit={handleUpdate}
            onCancel={() =>
              setEditingCategory(null)
            }
            submitLabel="Guardar cambios"
            isSystemCategory={systemCategories.some(
              (item) =>
                item.id === editingCategory.id
            )}
          />
        </Card>
      ) : null}

      <Card
        title="Listado de categorías"
        subtitle="Categorías disponibles para las transacciones"
      >
        {isLoading ? (
          <Spinner />
        ) : categories.length === 0 ? (
          <EmptyState
            title="No existen categorías todavía"
            description="Crea las categorías del sistema o añade nuevas manualmente."
          />
        ) : (
          <div className="overflow-x-auto">
            <Table
              headers={[
                "Nombre",
                "Tipo",
                "Icono",
                "Color",
                "Acciones",
              ]}
            >
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3">
                    {category.name}
                  </td>

                  <td className="px-4 py-3">
                    <Badge>
                      {category.type}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    {category.icon}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className="inline-block h-4 w-4 rounded-full"
                      style={{
                        backgroundColor:
                          category.color,
                      }}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          setEditingCategory(
                            category
                          )
                        }
                      >
                        Editar
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          void deleteCategory(
                            category.id
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