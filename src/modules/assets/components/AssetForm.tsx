import { useState } from "react";

import {
  Button,
  Input,
  Select,
} from "../../../components/ui";

import type {
  Asset,
  AssetType,
} from "../types/asset";


interface AssetFormProps {

  initialAsset?: Asset;

  onSubmit: (
    asset: Omit<
      Asset,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void> | void;

  onCancel: () => void;

  submitLabel: string;

}


const assetTypes: Array<{
  value: AssetType;
  label: string;
}> = [

  {
    value: "cash",
    label: "Efectivo",
  },

  {
    value: "property",
    label: "Inmueble",
  },

  {
    value: "vehicle",
    label: "Vehículo",
  },

  {
    value: "investment",
    label: "Inversión",
  },

  {
    value: "business",
    label: "Negocio",
  },

  {
    value: "other",
    label: "Otro",
  },

];


const defaultValues: Omit<
  Asset,
  "id" | "createdAt" | "updatedAt"
> = {

  name: "",

  type: "cash",

  value: 0,

  purchaseDate:
    new Date()
      .toISOString()
      .slice(0, 10),

  currency: "EUR",

  institution: "",

  notes: "",

  isIncludedInNetWorth: true,

};



function AssetForm({

  initialAsset,

  onSubmit,

  onCancel,

  submitLabel,

}: AssetFormProps) {


  const [form, setForm] =
    useState<
      Omit<
        Asset,
        "id" | "createdAt" | "updatedAt"
      >
    >(

      initialAsset

        ? {

            name:
              initialAsset.name,

            type:
              initialAsset.type,

            value:
              initialAsset.value,

            purchaseDate:
              initialAsset.purchaseDate,

            currency:
              initialAsset.currency,

            institution:
              initialAsset.institution,

            notes:
              initialAsset.notes ?? "",

            isIncludedInNetWorth:
              initialAsset.isIncludedInNetWorth,

          }

        : defaultValues

    );



  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    if (
      !form.name ||
      form.value < 0
    ) {

      return;

    }


    await onSubmit(form);

  };



  return (

    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >


      <div className="grid gap-4 md:grid-cols-2">


        <Input

          label="Nombre"

          value={form.name}

          onChange={(event) =>
            setForm({

              ...form,

              name:
                event.target.value,

            })
          }

        />



        <Select

          label="Tipo"

          value={form.type}

          onChange={(event) =>
            setForm({

              ...form,

              type:
                event.target.value as AssetType,

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

          value={form.value}

          onChange={(event) =>
            setForm({

              ...form,

              value:
                Number(event.target.value),

            })
          }

        />



        <Input

          label="Moneda"

          value={form.currency}

          onChange={(event) =>
            setForm({

              ...form,

              currency:
                event.target.value,

            })
          }

        />


      </div>



      <Input

        label="Entidad"

        value={form.institution ?? ""}

        onChange={(event) =>
          setForm({

            ...form,

            institution:
              event.target.value,

          })
        }

      />



      <Input

        label="Fecha adquisición"

        type="date"

        value={form.purchaseDate}

        onChange={(event) =>
          setForm({

            ...form,

            purchaseDate:
              event.target.value,

          })
        }

      />



      <Input

        label="Notas"

        value={form.notes ?? ""}

        onChange={(event) =>
          setForm({

            ...form,

            notes:
              event.target.value,

          })
        }

      />



      <label className="flex items-center gap-2">

        <input

          type="checkbox"

          checked={
            form.isIncludedInNetWorth
          }

          onChange={(event) =>
            setForm({

              ...form,

              isIncludedInNetWorth:
                event.target.checked,

            })
          }

        />

        Incluir en patrimonio

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


export default AssetForm;