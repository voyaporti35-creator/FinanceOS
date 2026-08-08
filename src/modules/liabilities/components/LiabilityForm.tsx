import { useState } from "react";

import {
  Button,
  Input,
  Select,
} from "../../../components/ui";

import type {
  Liability,
  LiabilityType,
} from "../types/liability";


interface LiabilityFormProps {

  initialLiability?: Liability;

  onSubmit: (
    liability: Omit<
      Liability,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void> | void;

  onCancel: () => void;

  submitLabel: string;

}


const liabilityTypes: Array<{
  value: LiabilityType;
  label: string;
}> = [

  {
    value: "mortgage",
    label: "Hipoteca",
  },

  {
    value: "loan",
    label: "Préstamo",
  },

  {
    value: "credit_card",
    label: "Tarjeta",
  },

  {
    value: "financing",
    label: "Financiación",
  },

  {
    value: "personal",
    label: "Personal",
  },

  {
    value: "other",
    label: "Otro",
  },

];


const defaultValues: Omit<
  Liability,
  "id" | "createdAt" | "updatedAt"
> = {

  name: "",

  type: "loan",

  initialValue: 0,

  currentValue: 0,

  interestRate: undefined,

  monthlyPayment: undefined,

  startDate:
    new Date()
      .toISOString()
      .slice(0, 10),

  endDate: undefined,

  institution: "",

  notes: "",

  isIncludedInNetWorth: true,

  isActive: true,

};



export function LiabilityForm({

  initialLiability,

  onSubmit,

  onCancel,

  submitLabel,

}: LiabilityFormProps) {


  const [form, setForm] =
    useState<
      Omit<
        Liability,
        "id" | "createdAt" | "updatedAt"
      >
    >(

      initialLiability

        ? {

            name:
              initialLiability.name,

            type:
              initialLiability.type,

            initialValue:
              initialLiability.initialValue,

            currentValue:
              initialLiability.currentValue,

            interestRate:
              initialLiability.interestRate,

            monthlyPayment:
              initialLiability.monthlyPayment,

            startDate:
              initialLiability.startDate,

            endDate:
              initialLiability.endDate,

            institution:
              initialLiability.institution,

            notes:
              initialLiability.notes ?? "",

            isIncludedInNetWorth:
              initialLiability.isIncludedInNetWorth,

            isActive:
              initialLiability.isActive,

          }

        : defaultValues

    );



  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    if (
      !form.name ||
      form.currentValue < 0
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
                event.target.value as LiabilityType,

            })
          }

          options={liabilityTypes}

        />


      </div>



      <div className="grid gap-4 md:grid-cols-2">


        <Input

          label="Valor inicial"

          type="number"

          step="0.01"

          value={form.initialValue}

          onChange={(event) =>
            setForm({

              ...form,

              initialValue:
                Number(event.target.value),

            })
          }

        />



        <Input

          label="Capital pendiente"

          type="number"

          step="0.01"

          value={form.currentValue}

          onChange={(event) =>
            setForm({

              ...form,

              currentValue:
                Number(event.target.value),

            })
          }

        />


      </div>



      <div className="grid gap-4 md:grid-cols-2">


        <Input

          label="Interés (%)"

          type="number"

          step="0.01"

          value={form.interestRate ?? ""}

          onChange={(event) =>
            setForm({

              ...form,

              interestRate:
                event.target.value === ""

                  ? undefined

                  : Number(event.target.value),

            })
          }

        />



        <Input

          label="Cuota mensual"

          type="number"

          step="0.01"

          value={form.monthlyPayment ?? ""}

          onChange={(event) =>
            setForm({

              ...form,

              monthlyPayment:
                event.target.value === ""

                  ? undefined

                  : Number(event.target.value),

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

        label="Fecha inicio"

        type="date"

        value={form.startDate}

        onChange={(event) =>
          setForm({

            ...form,

            startDate:
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