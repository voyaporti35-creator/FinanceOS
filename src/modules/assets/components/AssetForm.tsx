import { useEffect, useState } from "react";
import { Button, Input, Select } from "../../../components/ui";
import type { Asset, AssetType } from "../types/asset";

interface AssetFormProps {
  initialAsset?: Asset;
  onSubmit: (
    asset: Omit<Asset, "id" | "createdAt" | "updatedAt">
  ) => Promise<void> | void;
  onCancel: () => void;
  submitLabel: string;
}

const assetTypes: Array<{
  value: AssetType;
  label: string;
}> = [
  { value: "bank", label: "Cuenta bancaria" },
  { value: "cash", label: "Efectivo" },
  { value: "property", label: "Inmueble" },
  { value: "vehicle", label: "Vehículo" },
  { value: "stock", label: "Acciones" },
  { value: "etf", label: "ETF" },
  { value: "fund", label: "Fondo" },
  { value: "crypto", label: "Criptomoneda" },
  { value: "gold", label: "Oro" },
  { value: "silver", label: "Plata" },
  { value: "pension", label: "Plan de pensiones" },
  { value: "business", label: "Empresa" },
  { value: "collectible", label: "Colección" },
  { value: "other", label: "Otro" },
];

const defaultValues: Omit<
  Asset,
  "id" | "createdAt" | "updatedAt"
> = {
  name: "",
  type: "bank",
  currentValue: 0,
  purchaseValue: 0,
  purchaseDate: new Date().toISOString().slice(0, 10),
  currency: "EUR",
  institution: "",
  notes: "",
  isIncludedInNetWorth: true,
};

export function AssetForm({
  initialAsset,
  onSubmit,
  onCancel,
  submitLabel,
}: AssetFormProps) {
  const [form, setForm] = useState(defaultValues);

  useEffect(() => {
    if (!initialAsset) return;

    setForm({
      name: initialAsset.name,
      type: initialAsset.type,
      currentValue: initialAsset.currentValue,
      purchaseValue: initialAsset.purchaseValue,
      purchaseDate: initialAsset.purchaseDate,
      currency: initialAsset.currency,
      institution: initialAsset.institution ?? "",
      notes: initialAsset.notes ?? "",
      isIncludedInNetWorth:
        initialAsset.isIncludedInNetWorth,
    });
  }, [initialAsset]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.name.trim()) return;

    if (form.currentValue < 0) return;

    await onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nombre"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />

        <Select
          label="Tipo"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value as AssetType,
            })
          }
          options={assetTypes}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Valor actual"
          type="number"
          step="0.01"
          value={form.currentValue}
          onChange={(e) =>
            setForm({
              ...form,
              currentValue: Number(e.target.value),
            })
          }
        />

        <Input
          label="Precio de compra"
          type="number"
          step="0.01"
          value={form.purchaseValue}
          onChange={(e) =>
            setForm({
              ...form,
              purchaseValue: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Fecha de compra"
          type="date"
          value={form.purchaseDate}
          onChange={(e) =>
            setForm({
              ...form,
              purchaseDate: e.target.value,
            })
          }
        />

        <Input
          label="Moneda"
          value={form.currency}
          onChange={(e) =>
            setForm({
              ...form,
              currency: e.target.value.toUpperCase(),
            })
          }
        />
      </div>

      <Input
        label="Entidad"
        value={form.institution}
        onChange={(e) =>
          setForm({
            ...form,
            institution: e.target.value,
          })
        }
      />

      <Input
        label="Notas"
        value={form.notes}
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
      />

      <label className="flex items-center gap-3 rounded-xl border border-slate-700 p-3">
        <input
          type="checkbox"
          checked={form.isIncludedInNetWorth}
          onChange={(e) =>
            setForm({
              ...form,
              isIncludedInNetWorth: e.target.checked,
            })
          }
        />

        <span className="text-sm text-slate-300">
          Incluir en el patrimonio neto
        </span>
      </label>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="primary"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}