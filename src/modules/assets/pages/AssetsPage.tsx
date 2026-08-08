import { useState } from "react";

import AssetForm from "../components/AssetForm";
import AssetList from "../components/AssetList";

import { useAssets } from "../hooks/useAssets";

import type { Asset } from "../types/asset";


export default function AssetsPage() {

  const {
    assets,
    isLoading,
    error,
    createAsset,
    updateAsset,
    deleteAsset,
  } = useAssets();


  const [
    editingAsset,
    setEditingAsset,
  ] = useState<Asset | undefined>();


  const [
    showForm,
    setShowForm,
  ] = useState(false);



  function handleNewAsset() {

    setEditingAsset(undefined);

    setShowForm(true);

  }



  async function handleSubmit(
    asset: Omit<
      Asset,
      "id" | "createdAt" | "updatedAt"
    >
  ) {

    try {

      if (editingAsset) {

        await updateAsset({

          ...editingAsset,

          ...asset,

        });

      } else {

        await createAsset(asset);

      }


      setEditingAsset(undefined);

      setShowForm(false);


    } catch (error) {

      console.error(
        "Error guardando activo:",
        error
      );

    }

  }



  function handleEdit(
    asset: Asset
  ) {

    setEditingAsset(asset);

    setShowForm(true);

  }



  async function handleDelete(
    id: string
  ) {

    const confirmed =
      window.confirm(
        "¿Eliminar este activo?"
      );


    if (!confirmed) {

      return;

    }


    await deleteAsset(id);


    if (
      editingAsset?.id === id
    ) {

      setEditingAsset(undefined);

      setShowForm(false);

    }

  }



  function handleCancel() {

    setEditingAsset(undefined);

    setShowForm(false);

  }



  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Activos
        </h1>


        {!showForm && (

          <button
            type="button"
            onClick={handleNewAsset}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Nuevo activo
          </button>

        )}

      </div>



      {error && (

        <div className="rounded border border-red-500 p-3 text-red-500">

          {error}

        </div>

      )}



      {isLoading && (

        <p>
          Cargando activos...
        </p>

      )}



      {showForm && (

        <AssetForm

          initialAsset={editingAsset}

          onSubmit={handleSubmit}

          onCancel={handleCancel}

          submitLabel={
            editingAsset
              ? "Actualizar activo"
              : "Crear activo"
          }

        />

      )}



      <AssetList

        assets={assets}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />


    </div>

  );

}