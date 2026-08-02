import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40">
        <div className="mb-4 flex items-center justify-between">
          {title ? <h3 className="text-lg font-semibold text-white">{title}</h3> : null}
          <button onClick={onClose} className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
