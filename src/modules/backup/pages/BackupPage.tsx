import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { Button, Card, ConfirmDialog, EmptyState, Input, PageHeader, Spinner } from "../../../components/ui";
import { useBackup } from "../hooks/useBackup";
import { BackupActions } from "../components/BackupActions";

export default function BackupPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isProcessing, error, success, exportData, importDataFromFile, clearDatabase } = useBackup();
  const [isConfirmingImport, setIsConfirmingImport] = useState(false);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const handleImportSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setPendingFile(file);
    setIsConfirmingImport(true);
    event.target.value = "";
  };

  const handleConfirmImport = async () => {
    if (!pendingFile) {
      return;
    }

    const result = await importDataFromFile(pendingFile);
    if (result) {
      setSummary(`${result.accountsCount} cuentas, ${result.transactionsCount} transacciones y ${result.categoriesCount} categorías importadas.`);
    }
    setPendingFile(null);
    setIsConfirmingImport(false);
  };

  const handleConfirmClear = async () => {
    await clearDatabase();
    setSummary("La base de datos quedó vacía.");
    setIsConfirmingClear(false);
  };

  const statusMessage = useMemo(() => {
    if (error) {
      return <p className="text-sm text-red-300">{error}</p>;
    }

    if (success) {
      return <p className="text-sm text-emerald-300">{success}</p>;
    }

    return null;
  }, [error, success]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Respaldo y restauración"
        subtitle="Gestiona una copia de seguridad local de tus cuentas, transacciones y categorías."
      />

      {statusMessage}

      <BackupActions onExport={() => void exportData()} onImport={() => fileInputRef.current?.click()} onClear={() => setIsConfirmingClear(true)} isProcessing={isProcessing} />

      <Card title="Importar respaldo" subtitle="Selecciona un archivo JSON para restaurar tus datos locales.">
        <div className="space-y-4">
          <Input ref={fileInputRef} label="Archivo JSON" type="file" accept=".json,application/json" onChange={handleImportSelection} className="cursor-pointer" />
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={isProcessing}>
              Seleccionar archivo
            </Button>
          </div>
          {summary ? <p className="text-sm text-slate-400">{summary}</p> : null}
        </div>
      </Card>

      <Card title="Estado de la base local" subtitle="La información se gestiona desde servicios y se refleja en la app automáticamente.">
        {isProcessing ? (
          <div className="flex items-center gap-3">
            <Spinner />
            <span className="text-sm text-slate-400">Procesando respaldo...</span>
          </div>
        ) : (
          <EmptyState title="Listo para gestionar copias" description="Puedes exportar, importar o vaciar tus datos sin salir del flujo principal de la app." />
        )}
      </Card>

      <ConfirmDialog
        isOpen={isConfirmingImport}
        title="Importar respaldo"
        description="Esta acción reemplazará tus cuentas, transacciones y categorías actuales. ¿Deseas continuar?"
        confirmLabel="Importar"
        onConfirm={handleConfirmImport}
        onCancel={() => {
          setPendingFile(null);
          setIsConfirmingImport(false);
        }}
      />

      <ConfirmDialog
        isOpen={isConfirmingClear}
        title="Vaciar base de datos"
        description="Esta operación eliminará todos los datos locales. No se podrá deshacer. ¿Deseas continuar?"
        confirmLabel="Vaciar"
        onConfirm={handleConfirmClear}
        onCancel={() => setIsConfirmingClear(false)}
      />
    </div>
  );
}
