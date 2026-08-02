import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className="block text-sm text-slate-300">
      {label ? <span className="mb-2 block">{label}</span> : null}
      <input
        className={`w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 ${className}`.trim()}
        {...props}
      />
    </label>
  );
}
