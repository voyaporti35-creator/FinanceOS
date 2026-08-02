import type { ReactNode } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
        {children ? <div className="mt-4">{children}</div> : null}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300">
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
