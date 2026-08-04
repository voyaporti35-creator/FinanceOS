import { useEffect, useState } from "react";
import { Button, Input, Select } from "../../../components/ui";
import type { Category, CategoryType } from "../types/category";

interface CategoryFormProps {
  initialCategory?: Category;
  onSubmit: (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => Promise<void> | void;
  onCancel: () => void;
  submitLabel: string;
  isSystemCategory?: boolean;
}

const categoryTypes: Array<{ value: CategoryType; label: string }> = [
  { value: "income", label: "Ingresos" },
  { value: "expense", label: "Gastos" },
  { value: "transfer", label: "Transferencias" },
  { value: "system", label: "Sistema" },
];

const defaultValues: Omit<Category, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  type: "expense",
  icon: "📌",
  color: "#38bdf8",
  parentId: undefined,
};

export function CategoryForm({ initialCategory, onSubmit, onCancel, submitLabel }: CategoryFormProps) {
  const [form, setForm] = useState<Omit<Category, "id" | "createdAt" | "updatedAt">>(defaultValues);

  useEffect(() => {
    if (initialCategory) {
      setForm({
        name: initialCategory.name,
        type: initialCategory.type,
        icon: initialCategory.icon,
        color: initialCategory.color,
        parentId: initialCategory.parentId,
      });
    }
  }, [initialCategory]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Nombre" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <Select label="Tipo" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as CategoryType })} options={categoryTypes} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Icono" value={form.icon} onChange={(event) => setForm({ ...form, icon: event.target.value })} />
        <Input label="Color" value={form.color} onChange={(event) => setForm({ ...form, color: event.target.value })} />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
