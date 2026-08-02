export function Spinner() {
  return (
    <div className="flex items-center justify-center py-8" aria-label="Cargando">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />
    </div>
  );
}
