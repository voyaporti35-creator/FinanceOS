import type { Asset } from "../types/asset";

interface AssetListProps {
  assets: Asset[];

  onEdit: (asset: Asset) => void;

  onDelete: (id: string) => void;
}

function formatCurrency(
  value: number,
  currency: string
) {
  return value.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency,
    }
  );
}

export default function AssetList({
  assets,
  onEdit,
  onDelete,
}: AssetListProps) {
  if (assets.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-center text-slate-500">
        No hay activos registrados.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <h3 className="font-semibold">
              {asset.name}
            </h3>

            <p className="text-sm text-slate-500">
              {asset.type}
            </p>

            <p className="text-sm">
              {formatCurrency(
                asset.value,
                asset.currency
              )}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                onEdit(asset)
              }
              className="rounded bg-blue-600 px-3 py-1 text-white"
            >
              Editar
            </button>

            <button
              onClick={() =>
                onDelete(asset.id)
              }
              className="rounded bg-red-600 px-3 py-1 text-white"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}