import type { ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-900/70 text-left text-slate-400">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 text-slate-300">{children}</tbody>
      </table>
    </div>
  );
}
