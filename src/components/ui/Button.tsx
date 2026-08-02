import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
  secondary: "border border-slate-700 bg-slate-900/70 text-slate-200 hover:bg-slate-800",
  ghost: "border border-transparent bg-transparent text-slate-300 hover:bg-slate-800/60",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export function Button({ children, variant = "secondary", size = "md", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
