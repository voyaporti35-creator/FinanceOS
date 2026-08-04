import { Button, Card } from "../../../components/ui";

interface BackupActionsProps {
  onExport: () => void;
  onImport: () => void;
  onClear: () => void;
  isProcessing: boolean;
}

export function BackupActions({ onExport, onImport, onClear, isProcessing }: BackupActionsProps) {
  return (
    <Card title="Acciones de respaldo" subtitle="Exporta tus datos, importa un respaldo o limpia la base local.">
      <div className="grid gap-4 md:grid-cols-3">
        <Button variant="primary" onClick={onExport} disabled={isProcessing}>
          Exportar datos
        </Button>
        <Button variant="secondary" onClick={onImport} disabled={isProcessing}>
          Importar datos
        </Button>
        <Button variant="ghost" onClick={onClear} disabled={isProcessing} className="border-red-500/30 text-red-300 hover:bg-red-500/10">
          Vaciar base
        </Button>
      </div>
    </Card>
  );
}
