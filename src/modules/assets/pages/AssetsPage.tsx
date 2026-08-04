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
import { AssetForm } from "../components/AssetForm";
import { useAssets } from "../hooks/useAssets";
import {
  calculateAssetGain,
  calculateTotalAssets,
  calculateTotalGain,
} from "../utils/assetCalculations";
import type { Asset } from "../types/asset";

function formatCurrency(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

export default function AssetsPage() {
  const {
    assets,
    isLoading,
    error,
    createAsset,
    updateAsset,
    deleteAsset,
  } = useAssets();

  const [creating, setCreating] = useState(false);
  const [editingAsset, setEditingAsset] =
    useState<Asset | null>(null);

  const totalAssets = useMemo(
    () => calculateTotalAssets(assets),
    [assets]
  );

  const totalGain = useMemo(
    () => calculateTotalGain(assets),
    [assets]
  );

  async function handleCreate(
    payload: Omit<
      Asset,
      "id" | "createdAt" | "updatedAt"
    >
  ) {
    await createAsset(payload);
    setCreating(false);
  }

  async function handleUpdate(
    payload: Omit<
      Asset,
      "id" | "createdAt" | "updatedAt"
    >
  ) {
    if (!editingAsset) return;

    await updateAsset({
      ...editingAsset,
      ...payload,
    });

    setEditingAsset(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activos"
        subtitle="Controla todo tu patrimonio desde un único lugar."
        action={
          <Button
            variant="primary"
            onClick={() => {
              setEditingAsset(null);
              setCreating(true);
            }}
          >
            Nuevo activo
          </Button>
        }
      />

      {error ? (
        <p className="text-sm text-red-400">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <Card
          title="Patrimonio en activos"
          subtitle="Valor actual incluido"
        >
          <p className="text-2xl font-semibold text-white">
            {formatCurrency(totalAssets)}
          </p>
        </Card>

        <Card
          title="Número de activos"
          subtitle="Registros actuales"
        >
          <p className="text-2xl font-semibold text-white">
            {assets.length}
          </p>
        </Card>

        <Card
          title="Rentabilidad acumulada"
          subtitle="Valor actual vs compra"
        >
          <p className="text-2xl font-semibold text-white">
            {formatCurrency(totalGain)}
          </p>
        </Card>
      </div>

      {creating ? (
        <Card
          title="Crear activo"
          subtitle="Añade un nuevo elemento patrimonial"
        >
          <AssetForm
            onSubmit={handleCreate}
            onCancel={() => setCreating(false)}
            submitLabel="Crear activo"
          />
        </Card>
      ) : null}

      {editingAsset ? (
        <Card
          title="Editar activo"
          subtitle="Actualiza la información"
        >
          <AssetForm
            initialAsset={editingAsset}
            onSubmit={handleUpdate}
            onCancel={() =>
              setEditingAsset(null)
            }
            submitLabel="Guardar cambios"
          />
        </Card>
      ) : null}

      <Card
        title="Listado de activos"
        subtitle="Información almacenada localmente"
      >
        {isLoading ? (
          <Spinner />
        ) : assets.length === 0 ? (
          <EmptyState
            title="No existen activos"
            description="Crea tu primer activo para empezar a construir tu patrimonio."
          />
        ) : (
          <div className="overflow-x-auto">
            <Table
              headers={[
                "Nombre",
                "Tipo",
                "Valor actual",
                "Ganancia",
                "Moneda",
                "Acciones",
              ]}
            >
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-4 py-3">
                    {asset.name}
                  </td>

                  <td className="px-4 py-3">
                    <Badge>
                      {asset.type}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    {formatCurrency(
                      asset.currentValue
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {formatCurrency(
                      calculateAssetGain(asset)
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {asset.currency}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          setEditingAsset(asset)
                        }
                      >
                        Editar
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          void deleteAsset(asset.id)
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