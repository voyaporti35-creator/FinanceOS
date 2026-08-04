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

import { useLiabilities } from "../hooks/useLiabilities";
import { LiabilityForm } from "../components/LiabilityForm";
import type { Liability } from "../types/liability";


const liabilityLabels: Record<string, string> = {
  mortgage: "Hipoteca",
  loan: "Préstamo",
  credit_card: "Tarjeta",
  financing: "Financiación",
  personal: "Personal",
  other: "Otro",
};


export default function LiabilitiesPage() {

  const {
    liabilities,
    isLoading,
    error,
    createLiability,
    updateLiability,
    deleteLiability,
  } = useLiabilities();


  const [
    editingLiability,
    setEditingLiability,
  ] = useState<Liability | null>(null);


  const [
    isCreating,
    setIsCreating,
  ] = useState(false);



  const totalLiabilities = useMemo(
    () =>
      liabilities.reduce(
        (sum, liability) =>
          sum + liability.currentValue,
        0
      ),
    [liabilities]
  );


  const includedLiabilities = useMemo(
    () =>
      liabilities
        .filter(
          (liability) =>
            liability.isIncludedInNetWorth
        )
        .reduce(
          (sum, liability) =>
            sum + liability.currentValue,
          0
        ),
    [liabilities]
  );



  const handleCreate = async (
    payload: Omit<
      Liability,
      "id" | "createdAt" | "updatedAt"
    >
  ) => {

    await createLiability(payload);

    setIsCreating(false);

  };



  const handleUpdate = async (
    payload: Omit<
      Liability,
      "id" | "createdAt" | "updatedAt"
    >
  ) => {

    if (!editingLiability) {
      return;
    }


    await updateLiability({
      ...editingLiability,
      ...payload,
    });


    setEditingLiability(null);

  };



  return (

    <div className="space-y-6">


      <PageHeader
        title="Pasivos"
        subtitle="Controla tus deudas y obligaciones financieras."
        action={
          <Button
            variant="primary"
            onClick={() => {
              setEditingLiability(null);
              setIsCreating(true);
            }}
          >
            Nuevo pasivo
          </Button>
        }
      />



      <div className="grid gap-4 md:grid-cols-3">


        <Card
          title="Pasivos totales"
          subtitle="Valor actual acumulado"
        >

          <p className="text-2xl font-semibold text-white">

            {totalLiabilities.toLocaleString(
              "es-ES",
              {
                style: "currency",
                currency: "EUR",
              }
            )}

          </p>

        </Card>



        <Card
          title="Impacto patrimonio"
          subtitle="Pasivos incluidos"
        >

          <p className="text-2xl font-semibold text-white">

            {includedLiabilities.toLocaleString(
              "es-ES",
              {
                style: "currency",
                currency: "EUR",
              }
            )}

          </p>

        </Card>



        <Card
          title="Número de pasivos"
          subtitle="Registros activos"
        >

          <p className="text-2xl font-semibold text-white">

            {liabilities.length}

          </p>

        </Card>


      </div>




      {error ? (
        <p className="text-sm text-red-300">
          {error}
        </p>
      ) : null}




      {isCreating ? (

        <Card
          title="Crear pasivo"
          subtitle="Añade una nueva deuda"
        >

          <LiabilityForm
            onSubmit={handleCreate}
            onCancel={() =>
              setIsCreating(false)
            }
            submitLabel="Crear pasivo"
          />

        </Card>

      ) : null}





      {editingLiability ? (

        <Card
          title="Editar pasivo"
          subtitle="Actualiza la información"
        >

          <LiabilityForm
            initialLiability={
              editingLiability
            }
            onSubmit={handleUpdate}
            onCancel={() =>
              setEditingLiability(null)
            }
            submitLabel="Guardar cambios"
          />

        </Card>

      ) : null}





      <Card
        title="Listado de pasivos"
        subtitle="Todas tus obligaciones registradas"
      >


        {isLoading ? (

          <Spinner />

        ) : liabilities.length === 0 ? (

          <EmptyState
            title="No existen pasivos"
            description="Registra hipotecas, préstamos o deudas para calcular tu patrimonio real."
          />

        ) : (


          <div className="overflow-x-auto">

            <Table
              headers={[
                "Nombre",
                "Tipo",
                "Entidad",
                "Capital pendiente",
                "Cuota",
                "Interés",
                "Acciones",
              ]}
            >


              {liabilities.map(
                (liability) => (

                <tr
                  key={liability.id}
                >

                  <td className="px-4 py-3">
                    {liability.name}
                  </td>


                  <td className="px-4 py-3">

                    <Badge>
                      {
                        liabilityLabels[
                          liability.type
                        ] ??
                        liability.type
                      }
                    </Badge>

                  </td>


                  <td className="px-4 py-3">

                    {liability.institution ?? "—"}

                  </td>


                  <td className="px-4 py-3">

                    {liability.currentValue.toLocaleString(
                      "es-ES",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}

                  </td>


                  <td className="px-4 py-3">

                    {liability.monthlyPayment
                      ? liability.monthlyPayment.toLocaleString(
                          "es-ES",
                          {
                            style:
                              "currency",
                            currency:
                              "EUR",
                          }
                        )
                      : "—"}

                  </td>


                  <td className="px-4 py-3">

                    {liability.interestRate !==
                    undefined
                      ? `${liability.interestRate}%`
                      : "—"}

                  </td>



                  <td className="px-4 py-3">

                    <div className="flex gap-2">

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          setEditingLiability(
                            liability
                          )
                        }
                      >
                        Editar
                      </Button>


                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          void deleteLiability(
                            liability.id
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