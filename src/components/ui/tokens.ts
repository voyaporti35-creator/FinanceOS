export const designTokens = {
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    full: "9999px",
  },
  spacing: {
    xs: "0.375rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    xxl: "1.5rem",
  },
  colors: {
    background: "#020617",
    surface: "#0f172a",
    surfaceElevated: "#111827",
    border: "#1e293b",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    positive: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
  },
  shadows: {
    sm: "0 1px 2px rgba(2, 6, 23, 0.24)",
    md: "0 10px 25px rgba(2, 6, 23, 0.22)",
    lg: "0 20px 40px rgba(2, 6, 23, 0.28)",
  },
  transitions: {
    fast: "150ms ease",
    normal: "220ms ease",
  },
} as const;

export type DesignTokenRadius = keyof typeof designTokens.radius;
export type DesignTokenSpacing = keyof typeof designTokens.spacing;
export type DesignTokenTone = "default" | "positive" | "warning" | "error";
